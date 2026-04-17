import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="dopaway-final-cta-section">
      <div className="dopaway-final-cta-section__container">
        <span className="dopaway-final-cta-section__eyebrow">
          Sua rotina pode ir além
        </span>

        <h2 className="dopaway-final-cta-section__title">
          Escolha a DopaWay e leve mais foco, energia e constância para o seu dia
        </h2>

        <p className="dopaway-final-cta-section__description">
          Aproveite para garantir sua DopaWay agora e dar o próximo passo com uma
          proposta pensada para quem quer mais presença, intensidade e ritmo na rotina.
        </p>

        <div className="dopaway-final-cta-section__actions">
          <Link
            href="/checkout"
            className="dopaway-final-cta-section__button"
          >
            Comprar agora
          </Link>
        </div>
      </div>
    </section>
  );
}