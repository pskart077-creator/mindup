import Link from "next/link";
import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { getProductConfig } from "@/lib/product";

export const metadata: Metadata = {
  title: "Checkout Seguro",
  description:
    "Preencha seus dados, escolha o frete gratis e gere o PIX para garantir sua MindUp.",
};

export default function CheckoutPage() {
  const product = getProductConfig();

  return (
    <div className="mindup-checkout-page">
      <header className="mindup-checkout-topbar">
        <Link href="/" className="mindup-checkout-topbar__back-link">
          Voltar para a MindUp
        </Link>

        <p className="mindup-checkout-topbar__text">
          Checkout oficial {product.name}
        </p>
      </header>

      <main className="mindup-checkout-layout">
        <section className="mindup-checkout-intro">
          <span className="mindup-checkout-intro__eyebrow">
            Último passo
          </span>

          <h1 className="mindup-checkout-intro__title">
            Garanta sua MindUp com frete grátis antes de voltar para a rotina no automático
          </h1>

          <p className="mindup-checkout-intro__description">
            Falta pouco: preencha seus dados, escolha o frete grátis para o seu CEP
            e gere o pagamento. Em poucos minutos seu pedido fica encaminhado.
          </p>

          <div className="mindup-checkout-intro__points">
            <article className="mindup-checkout-intro__point">
              <strong>1. Seus dados</strong>
              <span>Informe entrega e contato para liberar o pedido</span>
            </article>

            <article className="mindup-checkout-intro__point">
              <strong>2. Frete grátis</strong>
              <span>Consulte a opção disponível para o seu CEP</span>
            </article>

            <article className="mindup-checkout-intro__point">
              <strong>3. Pagamento</strong>
              <span>Finalize e garanta sua MindUp com segurança</span>
            </article>
          </div>
        </section>

        <CheckoutForm product={product} />
      </main>
    </div>
  );
}
