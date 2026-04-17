import Link from "next/link";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { getProductConfig } from "@/lib/product";

export default function CheckoutPage() {
  const product = getProductConfig();

  return (
    <div className="dopaway-checkout-page">
      <header className="dopaway-checkout-topbar">
        <Link href="/" className="dopaway-checkout-topbar__back-link">
          Voltar para a DopaWay
        </Link>

        <p className="dopaway-checkout-topbar__text">
          Checkout oficial {product.name}
        </p>
      </header>

      <main className="dopaway-checkout-layout">
        <section className="dopaway-checkout-intro">
          <span className="dopaway-checkout-intro__eyebrow">
            Etapa de compra
          </span>

          <h1 className="dopaway-checkout-intro__title">
            Finalize seu pedido com frete calculado de forma simples e segura
          </h1>

          <p className="dopaway-checkout-intro__description">
            Esta etapa foi pensada para tornar sua compra mais prática. Aqui você
            preenche seus dados, consulta o frete para o seu endereço e conclui
            o pedido com mais segurança.
          </p>

          <div className="dopaway-checkout-intro__points">
            <article className="dopaway-checkout-intro__point">
              <strong>1. Seus dados</strong>
              <span>Preencha as informações para entrega e contato</span>
            </article>

            <article className="dopaway-checkout-intro__point">
              <strong>2. Frete</strong>
              <span>Consulte a opção mais adequada para o seu CEP</span>
            </article>

            <article className="dopaway-checkout-intro__point">
              <strong>3. Pagamento</strong>
              <span>Conclua seu pedido com mais praticidade e segurança</span>
            </article>
          </div>
        </section>

        <CheckoutForm product={product} />
      </main>
    </div>
  );
}