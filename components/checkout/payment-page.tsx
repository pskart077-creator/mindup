"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CHECKOUT_PAYMENT_STORAGE_KEY,
  CheckoutPaymentPayload,
} from "@/lib/checkout-payment";
import { formatCurrency } from "@/lib/product";

function isCheckoutPaymentPayload(value: unknown): value is CheckoutPaymentPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Partial<CheckoutPaymentPayload>;

  return Boolean(
    payload.payment?.paymentId &&
      payload.totals?.totalCents &&
      payload.productName &&
      payload.customerName
  );
}

export function CheckoutPaymentPage() {
  const [paymentData, setPaymentData] = useState<CheckoutPaymentPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copyFeedback, setCopyFeedback] = useState("");

  useEffect(() => {
    const rawPayment = sessionStorage.getItem(CHECKOUT_PAYMENT_STORAGE_KEY);

    if (rawPayment) {
      try {
        const parsedPayment = JSON.parse(rawPayment) as unknown;

        if (isCheckoutPaymentPayload(parsedPayment)) {
          setPaymentData(parsedPayment);
        }
      } catch {
        setPaymentData(null);
      }
    }

    setIsLoading(false);
  }, []);

  async function handleCopyPix() {
    if (!paymentData?.payment.pixCopyPaste) {
      return;
    }

    await navigator.clipboard.writeText(paymentData.payment.pixCopyPaste);
    setCopyFeedback("PIX copiado");
  }

  return (
    <div className="mindup-payment-page">
      <header className="mindup-payment-topbar">
        <Link href="/checkout" className="mindup-checkout-topbar__back-link">
          Voltar ao checkout
        </Link>

        <p className="mindup-checkout-topbar__text">
          Pagamento PIX oficial MindUp
        </p>
      </header>

      <main className="mindup-payment-layout">
        {isLoading ? (
          <section className="mindup-payment-card">
            <p className="mindup-payment-card__eyebrow">Carregando</p>
            <h1 className="mindup-payment-card__title">
              Preparando seu PIX...
            </h1>
          </section>
        ) : null}

        {!isLoading && !paymentData ? (
          <section className="mindup-payment-card">
            <p className="mindup-payment-card__eyebrow">PIX indisponivel</p>
            <h1 className="mindup-payment-card__title">
              Gere seu pedido antes de abrir esta pagina
            </h1>
            <p className="mindup-payment-card__description">
              O QR Code fica disponivel depois que seus dados sao enviados e a
              VexusPay cria a cobranca.
            </p>
            <Link href="/checkout" className="mindup-payment-card__button">
              Gerar pedido
            </Link>
          </section>
        ) : null}

        {paymentData ? (
          <>
            <section className="mindup-payment-card">
              <p className="mindup-payment-card__eyebrow">
                Pedido gerado para {paymentData.customerName}
              </p>
              <h1 className="mindup-payment-card__title">
                Escaneie o QR Code ou copie o PIX para finalizar agora
              </h1>
              <p className="mindup-payment-card__description">
                Seu pedido fica reservado enquanto o pagamento PIX esta pendente.
                Abra o app do seu banco, escaneie o codigo ou use o copia-e-cola.
              </p>

              <div className="mindup-payment-summary">
                <div>
                  <span>Produto</span>
                  <strong>
                    {paymentData.productName} ({paymentData.quantity}x)
                  </strong>
                </div>
                <div>
                  <span>Frete</span>
                  <strong>{formatCurrency(paymentData.totals.freightCents)}</strong>
                </div>
                <div>
                  <span>Total</span>
                  <strong>{formatCurrency(paymentData.totals.totalCents)}</strong>
                </div>
              </div>
            </section>

            <section className="mindup-payment-card mindup-payment-card--pix">
              <div className="mindup-payment-qr">
                {paymentData.payment.pixQrCodeImage ? (
                  <img
                    src={paymentData.payment.pixQrCodeImage}
                    alt="QR Code PIX MindUp"
                  />
                ) : (
                  <span>QR Code indisponivel</span>
                )}
              </div>

              <div className="mindup-payment-copy">
                <span>PIX copia e cola</span>
                <code>{paymentData.payment.pixCopyPaste}</code>
                <button type="button" onClick={handleCopyPix}>
                  {copyFeedback || "Copiar PIX"}
                </button>
              </div>

              <p className="mindup-payment-id">
                ID do pagamento: <strong>{paymentData.payment.paymentId}</strong>
              </p>
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}
