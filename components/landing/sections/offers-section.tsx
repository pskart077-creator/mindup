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
      subtitle: "Para começar hoje e sentir a diferença na rotina",
    },
    {
      name: "2 frascos",
      quantity: 2,
      discount: 0.08,
      tag: "Mais vendido",
      subtitle: "Mais continuidade, mais economia e compra mais inteligente",
    },
    {
      name: "3 frascos",
      quantity: 3,
      discount: 0.16,
      subtitle: "Para não parar no primeiro frasco e manter o plano",
    },
    {
      name: "5 frascos",
      quantity: 5,
      discount: 0.24,
      subtitle: "O melhor custo por frasco para quem quer vantagem máxima",
    },
  ] as const;

  return (
    <section id="kits" className="mindup-offers-section">
      <div className="mindup-offers-section__container">
        <div className="mindup-offers-section__head">
          <span className="mindup-offers-section__eyebrow">
            Oferta com frete grátis
          </span>

          <h2 className="mindup-offers-section__title">
            Leve mais, pague menos por frasco e não desperdice dinheiro com frete
          </h2>

          <p className="mindup-offers-section__subtitle">
            A compra mais esperta está nos kits. Você garante MindUp para mais tempo,
            reduz o valor por frasco e ainda recebe com frete grátis.
          </p>
        </div>

        <div className="mindup-offers-section__grid">
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
                className={`mindup-offers-section__card ${
                  kit.tag ? "is-featured" : ""
                }`}
              >
                {kit.tag ? (
                  <span className="mindup-offers-section__tag">{kit.tag}</span>
                ) : null}

                <h3 className="mindup-offers-section__card-title">{kit.name}</h3>

                <p className="mindup-offers-section__card-subtitle">
                  {kit.subtitle}
                </p>

                <div className="mindup-offers-section__prices">
                  <p className="mindup-offers-section__old-price">
                    {formatCurrency(fullPrice)}
                  </p>

                  <p className="mindup-offers-section__new-price">
                    {formatCurrency(salePrice)}
                  </p>

                  <p className="mindup-offers-section__installments">
                    ou 12x de {formatCurrency(installment)}
                  </p>

                  <p className="mindup-offers-section__unit-price">
                    {formatCurrency(unitPrice)} por frasco com 30 capsulas
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="mindup-offers-section__button"
                >
                  Garantir este kit
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
