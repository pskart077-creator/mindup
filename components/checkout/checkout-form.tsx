"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CHECKOUT_PAYMENT_STORAGE_KEY,
  CheckoutPaymentResult,
  CheckoutPaymentTotals,
} from "@/lib/checkout-payment";
import { ProductConfig, formatCurrency } from "@/lib/product";

type FreightOption = {
  id: "standard" | "express";
  label: string;
  priceCents: number;
  etaDays: number;
};

type CheckoutFormProps = {
  product: ProductConfig;
};

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  cep: string;
  street: string;
  addressNumber: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  quantity: number;
};

const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  cpfCnpj: "",
  cep: "",
  street: "",
  addressNumber: "",
  complement: "",
  district: "",
  city: "",
  state: "",
  quantity: 1,
};

function formatFreightPrice(priceCents: number) {
  return priceCents === 0 ? "Gratis" : formatCurrency(priceCents);
}

export function CheckoutForm({ product }: CheckoutFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [freightOptions, setFreightOptions] = useState<FreightOption[]>([]);
  const [selectedFreightId, setSelectedFreightId] = useState<string>("");
  const [isFreightLoading, setIsFreightLoading] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const selectedFreight = useMemo(
    () => freightOptions.find((option) => option.id === selectedFreightId),
    [freightOptions, selectedFreightId]
  );

  const subtotalCents = product.priceCents * formData.quantity;
  const freightCents = selectedFreight?.priceCents ?? 0;
  const totalCents = subtotalCents + freightCents;

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setFormData((previous) => ({ ...previous, [field]: value }));
  }

  async function handleCalculateFreight() {
    if (!formData.cep.trim()) {
      setErrorMessage("Informe o CEP para calcular o frete.");
      return;
    }

    setErrorMessage("");
    setIsFreightLoading(true);

    try {
      const response = await fetch("/api/freight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cep: formData.cep,
          quantity: formData.quantity,
        }),
      });

      const data = (await response.json()) as {
        options?: FreightOption[];
        error?: string;
      };

      if (!response.ok || !data.options?.length) {
        throw new Error(data.error ?? "Nao foi possivel calcular o frete.");
      }

      setFreightOptions(data.options);
      setSelectedFreightId(data.options[0].id);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao calcular o frete.";
      setErrorMessage(message);
      setFreightOptions([]);
      setSelectedFreightId("");
    } finally {
      setIsFreightLoading(false);
    }
  }

  async function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFreightId) {
      setErrorMessage("Calcule e selecione um frete antes de finalizar.");
      return;
    }

    setErrorMessage("");
    setIsCheckoutLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          freightOptionId: selectedFreightId,
        }),
      });

      const data = (await response.json()) as {
        payment?: CheckoutPaymentResult;
        totals?: CheckoutPaymentTotals;
        error?: string;
      };

      if (!response.ok || !data.payment || !data.totals) {
        throw new Error(data.error ?? "Nao foi possivel gerar o pagamento.");
      }

      sessionStorage.setItem(
        CHECKOUT_PAYMENT_STORAGE_KEY,
        JSON.stringify({
          payment: data.payment,
          totals: data.totals,
          productName: product.name,
          quantity: formData.quantity,
          customerName: formData.fullName,
          createdAt: new Date().toISOString(),
        })
      );

      router.push("/checkout/pagamento");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao iniciar o pagamento.";
      setErrorMessage(message);
    } finally {
      setIsCheckoutLoading(false);
    }
  }

  return (
    <div className="mindup-checkout-panel">
      <div className="mindup-checkout-panel__head">
        <span className="mindup-checkout-panel__eyebrow">
          Pedido MindUp
        </span>
        <h2 className="mindup-checkout-panel__title">
          Preencha seus dados e garanta seu pedido agora
        </h2>
        <p className="mindup-checkout-panel__subtitle">
          Quanto antes voce finaliza, antes sua MindUp entra em separacao.
          Consulte o frete gratis, confirme os dados e gere o PIX com seguranca.
        </p>
      </div>

      <form className="mindup-checkout-form" onSubmit={handleCheckout}>
        <label className="mindup-checkout-field">
          <span>Nome completo</span>
          <input
            value={formData.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            placeholder="Digite seu nome completo"
            required
          />
        </label>

        <div className="mindup-checkout-grid-two">
          <label className="mindup-checkout-field">
            <span>E-mail</span>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="voce@email.com"
              required
            />
          </label>

          <label className="mindup-checkout-field">
            <span>Telefone</span>
            <input
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="(11) 90000-0000"
              required
            />
          </label>
        </div>

        <div className="mindup-checkout-grid-two">
          <label className="mindup-checkout-field">
            <span>CPF ou CNPJ</span>
            <input
              value={formData.cpfCnpj}
              onChange={(event) => updateField("cpfCnpj", event.target.value)}
              placeholder="Digite apenas numeros"
              required
            />
          </label>

          <label className="mindup-checkout-field">
            <span>Quantidade</span>
            <select
              value={formData.quantity}
              onChange={(event) => updateField("quantity", Number(event.target.value))}
            >
              <option value={1}>1 unidade</option>
              <option value={2}>2 unidades</option>
              <option value={3}>3 unidades</option>
              <option value={4}>4 unidades</option>
              <option value={5}>5 unidades</option>
            </select>
          </label>
        </div>

        <div className="mindup-checkout-grid-two">
          <label className="mindup-checkout-field">
            <span>CEP</span>
            <input
              value={formData.cep}
              onChange={(event) => updateField("cep", event.target.value)}
              placeholder="00000-000"
              required
            />
          </label>

          <label className="mindup-checkout-field">
            <span>Numero</span>
            <input
              value={formData.addressNumber}
              onChange={(event) => updateField("addressNumber", event.target.value)}
              placeholder="123"
              required
            />
          </label>
        </div>

        <label className="mindup-checkout-field">
          <span>Rua ou avenida</span>
          <input
            value={formData.street}
            onChange={(event) => updateField("street", event.target.value)}
            placeholder="Digite sua rua ou avenida"
            required
          />
        </label>

        <div className="mindup-checkout-grid-two">
          <label className="mindup-checkout-field">
            <span>Bairro</span>
            <input
              value={formData.district}
              onChange={(event) => updateField("district", event.target.value)}
              placeholder="Digite seu bairro"
              required
            />
          </label>

          <label className="mindup-checkout-field">
            <span>Complemento</span>
            <input
              value={formData.complement}
              onChange={(event) => updateField("complement", event.target.value)}
              placeholder="Apartamento, bloco, referencia..."
            />
          </label>
        </div>

        <div className="mindup-checkout-grid-two">
          <label className="mindup-checkout-field">
            <span>Cidade</span>
            <input
              value={formData.city}
              onChange={(event) => updateField("city", event.target.value)}
              placeholder="Digite sua cidade"
              required
            />
          </label>

          <label className="mindup-checkout-field">
            <span>UF</span>
            <input
              value={formData.state}
              onChange={(event) => updateField("state", event.target.value)}
              placeholder="SP"
              maxLength={2}
              required
            />
          </label>
        </div>

        <button
          type="button"
          className="mindup-checkout-secondary-button"
          onClick={handleCalculateFreight}
          disabled={isFreightLoading}
        >
          {isFreightLoading ? "Calculando frete..." : "Consultar frete gratis"}
        </button>

        {freightOptions.length > 0 ? (
          <label className="mindup-checkout-field">
            <span>Escolha o frete gratis</span>
            <select
              value={selectedFreightId}
              onChange={(event) => setSelectedFreightId(event.target.value)}
            >
              {freightOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label} - {formatFreightPrice(option.priceCents)} -{" "}
                  {option.etaDays} dias uteis
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <div className="mindup-checkout-summary">
          <div className="mindup-checkout-summary__row">
            <span>Produto ({formData.quantity}x)</span>
            <strong>{formatCurrency(subtotalCents)}</strong>
          </div>

          <div className="mindup-checkout-summary__row">
            <span>Frete</span>
            <strong>
              {selectedFreight ? formatFreightPrice(freightCents) : "Consulte o frete"}
            </strong>
          </div>

          <div className="mindup-checkout-summary__row mindup-checkout-summary__row--total">
            <span>Total</span>
            <strong>{formatCurrency(totalCents)}</strong>
          </div>
        </div>

        {errorMessage ? (
          <div className="mindup-checkout-error">{errorMessage}</div>
        ) : null}

        <button
          type="submit"
          className="mindup-checkout-primary-button"
          disabled={isCheckoutLoading}
        >
          {isCheckoutLoading ? "Gerando PIX..." : "Garantir meu pedido"}
        </button>
      </form>
    </div>
  );
}
