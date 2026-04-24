import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="mindup-final-cta-section">
      <div className="mindup-final-cta-section__container">
        <span className="mindup-final-cta-section__eyebrow">
          Não deixe para depois
        </span>

        <h2 className="mindup-final-cta-section__title">
          Garanta sua MindUp agora e pare de negociar com a própria falta de energia.
        </h2>

        <p className="mindup-final-cta-section__description">
          Escolha seu kit, aproveite frete grátis e finalize em poucos minutos.
          Sua rotina vai continuar exigindo de você. A decisão de se preparar melhor
          pode ser tomada agora.
        </p>

        <div className="mindup-final-cta-section__actions">
          <Link
            href="/checkout"
            className="mindup-final-cta-section__button"
          >
            Garantir meu MindUp
          </Link>
        </div>
      </div>
    </section>
  );
}
