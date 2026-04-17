"use client";

import { FormEvent, useMemo, useState } from "react";
import { ProductConfig, formatCurrency } from "@/lib/product";

type FreightOption = {
  id: "standard" | "express";
  label: string;
  priceCents: number;
  etaDays: number;
};

type CheckoutResult = {
  paymentId: string;
  status: string;
  billingType: string;
  invoiceUrl?: string | null;
  bankSlipUrl?: string | null;
  pixCopyPaste?: string | null;
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

export function CheckoutForm({ product }: CheckoutFormProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [freightOptions, setFreightOptions] = useState<FreightOption[]>([]);
  const [selectedFreightId, setSelectedFreightId] = useState<string>("");
  const [isFreightLoading, setIsFreightLoading] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResult | null>(null);

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
    setCheckoutResult(null);
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
        throw new Error(data.error ?? "Não foi possível calcular o frete.");
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
    setCheckoutResult(null);
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
        payment?: CheckoutResult;
        error?: string;
      };

      if (!response.ok || !data.payment) {
        throw new Error(data.error ?? "Não foi possível gerar o pagamento.");
      }

      setCheckoutResult(data.payment);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao iniciar o pagamento.";
      setErrorMessage(message);
    } finally {
      setIsCheckoutLoading(false);
    }
  }

  return (
    <div className="dopaway-checkout-panel">
      <div className="dopaway-checkout-panel__head">
        <span className="dopaway-checkout-panel__eyebrow">
          Finalize sua compra
        </span>
        <h2 className="dopaway-checkout-panel__title">
          Preencha seus dados para calcular o frete e concluir seu pedido
        </h2>
        <p className="dopaway-checkout-panel__subtitle">
          Complete as informações abaixo para escolher o frete e gerar seu pagamento
          com mais segurança.
        </p>
      </div>

      <form className="dopaway-checkout-form" onSubmit={handleCheckout}>
        <label className="dopaway-checkout-field">
          <span>Nome completo</span>
          <input
            value={formData.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            placeholder="Digite seu nome completo"
            required
          />
        </label>

        <div className="dopaway-checkout-grid-two">
          <label className="dopaway-checkout-field">
            <span>E-mail</span>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="voce@email.com"
              required
            />
          </label>

          <label className="dopaway-checkout-field">
            <span>Telefone</span>
            <input
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="(11) 90000-0000"
              required
            />
          </label>
        </div>

        <div className="dopaway-checkout-grid-two">
          <label className="dopaway-checkout-field">
            <span>CPF ou CNPJ</span>
            <input
              value={formData.cpfCnpj}
              onChange={(event) => updateField("cpfCnpj", event.target.value)}
              placeholder="Digite apenas números"
              required
            />
          </label>

          <label className="dopaway-checkout-field">
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

        <div className="dopaway-checkout-grid-two">
          <label className="dopaway-checkout-field">
            <span>CEP</span>
            <input
              value={formData.cep}
              onChange={(event) => updateField("cep", event.target.value)}
              placeholder="00000-000"
              required
            />
          </label>

          <label className="dopaway-checkout-field">
            <span>Número</span>
            <input
              value={formData.addressNumber}
              onChange={(event) => updateField("addressNumber", event.target.value)}
              placeholder="123"
              required
            />
          </label>
        </div>

        <label className="dopaway-checkout-field">
          <span>Rua ou avenida</span>
          <input
            value={formData.street}
            onChange={(event) => updateField("street", event.target.value)}
            placeholder="Digite sua rua ou avenida"
            required
          />
        </label>

        <div className="dopaway-checkout-grid-two">
          <label className="dopaway-checkout-field">
            <span>Bairro</span>
            <input
              value={formData.district}
              onChange={(event) => updateField("district", event.target.value)}
              placeholder="Digite seu bairro"
              required
            />
          </label>

          <label className="dopaway-checkout-field">
            <span>Complemento</span>
            <input
              value={formData.complement}
              onChange={(event) => updateField("complement", event.target.value)}
              placeholder="Apartamento, bloco, referência..."
            />
          </label>
        </div>

        <div className="dopaway-checkout-grid-two">
          <label className="dopaway-checkout-field">
            <span>Cidade</span>
            <input
              value={formData.city}
              onChange={(event) => updateField("city", event.target.value)}
              placeholder="Digite sua cidade"
              required
            />
          </label>

          <label className="dopaway-checkout-field">
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
          className="dopaway-checkout-secondary-button"
          onClick={handleCalculateFreight}
          disabled={isFreightLoading}
        >
          {isFreightLoading ? "Calculando frete..." : "Calcular frete"}
        </button>

        {freightOptions.length > 0 ? (
          <label className="dopaway-checkout-field">
            <span>Escolha o frete</span>
            <select
              value={selectedFreightId}
              onChange={(event) => setSelectedFreightId(event.target.value)}
            >
              {freightOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label} • {formatCurrency(option.priceCents)} • {option.etaDays} dias úteis
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <div className="dopaway-checkout-summary">
          <div className="dopaway-checkout-summary__row">
            <span>Produto ({formData.quantity}x)</span>
            <strong>{formatCurrency(subtotalCents)}</strong>
          </div>

          <div className="dopaway-checkout-summary__row">
            <span>Frete</span>
            <strong>
              {selectedFreight ? formatCurrency(freightCents) : "Calcule o frete"}
            </strong>
          </div>

          <div className="dopaway-checkout-summary__row dopaway-checkout-summary__row--total">
            <span>Total</span>
            <strong>{formatCurrency(totalCents)}</strong>
          </div>
        </div>

        {errorMessage ? (
          <div className="dopaway-checkout-error">{errorMessage}</div>
        ) : null}

        <button
          type="submit"
          className="dopaway-checkout-primary-button"
          disabled={isCheckoutLoading}
        >
          {isCheckoutLoading ? "Gerando pagamento..." : "Gerar pagamento"}
        </button>
      </form>

      {checkoutResult ? (
        <section className="dopaway-checkout-result">
          <p className="dopaway-checkout-result__title">
            Pagamento gerado com sucesso
          </p>

          <p className="dopaway-checkout-result__meta">
            ID do pagamento: <strong>{checkoutResult.paymentId}</strong>
          </p>

          <p className="dopaway-checkout-result__meta">
            Status: <strong>{checkoutResult.status}</strong>
          </p>

          <div className="dopaway-checkout-result__links">
            {checkoutResult.invoiceUrl ? (
              <a href={checkoutResult.invoiceUrl} target="_blank" rel="noreferrer">
                Abrir link de pagamento
              </a>
            ) : null}

            {checkoutResult.bankSlipUrl ? (
              <a href={checkoutResult.bankSlipUrl} target="_blank" rel="noreferrer">
                Abrir boleto
              </a>
            ) : null}
          </div>

          {checkoutResult.pixCopyPaste ? (
            <p className="dopaway-checkout-result__pix">
              PIX copia e cola: {checkoutResult.pixCopyPaste}
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}