import Link from "next/link";
import { ProductConfig, formatCurrency } from "@/lib/product";

type OffersSectionProps = {
  product: ProductConfig;
};

function calculateKitPrice(
  unitPriceCents: number,
  quantity: number,
  discount: number
) {
  const total = unitPriceCents * quantity;
  return Math.round(total * (1 - discount));
}

export function OffersSection({ product }: OffersSectionProps) {
  const kits: Array<{
    name: string;
    quantity: number;
    discount: number;
    tag?: string;
    subtitle: string;
  }> = [
    {
      name: "1 frasco",
      quantity: 1,
      discount: 0,
      subtitle: "Ideal para começar sua experiência com a DopaWay",
    },
    {
      name: "2 frascos",
      quantity: 2,
      discount: 0.08,
      tag: "Mais vendido",
      subtitle: "Melhor equilíbrio entre continuidade e economia",
    },
    {
      name: "3 frascos",
      quantity: 3,
      discount: 0.16,
      subtitle: "Mais constância para manter o ritmo por mais tempo",
    },
    {
      name: "5 frascos",
      quantity: 5,
      discount: 0.24,
      subtitle: "Escolha ideal para quem quer máxima vantagem por frasco",
    },
  ] as const;

  return (
    <section id="kits" className="dopaway-offers-section">
      <div className="dopaway-offers-section__container">
        <div className="dopaway-offers-section__head">
          <span className="dopaway-offers-section__eyebrow">
            Escolha sua quantidade
          </span>

          <h2 className="dopaway-offers-section__title">
            Kits pensados para quem quer mais foco, constância e vantagem na compra
          </h2>

          <p className="dopaway-offers-section__subtitle">
            Escolha a opção que melhor acompanha sua rotina e aproveite condições
            mais vantajosas ao levar mais unidades.
          </p>
        </div>

        <div className="dopaway-offers-section__grid">
          {kits.map((kit) => {
            const fullPrice = product.priceCents * kit.quantity;
            const salePrice = calculateKitPrice(
              product.priceCents,
              kit.quantity,
              kit.discount
            );
            const installment = Math.max(Math.round(salePrice / 12), 100);
            const unitPrice = Math.round(salePrice / kit.quantity);

            return (
              <article
                key={kit.name}
                className={`dopaway-offers-section__card ${
                  kit.tag ? "is-featured" : ""
                }`}
              >
                {kit.tag ? (
                  <span className="dopaway-offers-section__tag">{kit.tag}</span>
                ) : null}

                <h3 className="dopaway-offers-section__card-title">{kit.name}</h3>

                <p className="dopaway-offers-section__card-subtitle">
                  {kit.subtitle}
                </p>

                <div className="dopaway-offers-section__prices">
                  <p className="dopaway-offers-section__old-price">
                    {formatCurrency(fullPrice)}
                  </p>

                  <p className="dopaway-offers-section__new-price">
                    {formatCurrency(salePrice)}
                  </p>

                  <p className="dopaway-offers-section__installments">
                    ou 12x de {formatCurrency(installment)}
                  </p>

                  <p className="dopaway-offers-section__unit-price">
                    {formatCurrency(unitPrice)} por frasco
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="dopaway-offers-section__button"
                >
                  Comprar agora
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}