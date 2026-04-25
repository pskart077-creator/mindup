import Image from "next/image";

export function ProductHighlightSection() {
  return (
    <section className="mindup-highlight-section">
      <div className="mindup-highlight-section__container">
        <div className="mindup-highlight-section__visual">
          <div className="mindup-highlight-section__image-wrap">
            <Image
              src="/assets/image/hero/mindup-02.png"
              alt="Produto MindUp"
              fill
              className="mindup-highlight-section__image"
            />
          </div>
        </div>

        <div className="mindup-highlight-section__copy">
          <span className="mindup-highlight-section__eyebrow">
            Produto no carrinho, rotina em outro nível
          </span>

          <h2 className="mindup-highlight-section__title">
            MindUp é para quem cansou de funcionar no mínimo.
          </h2>

          <p className="mindup-highlight-section__description">
            Sua rotina não espera você estar no clima. Ela exige presença, ritmo e
            energia. MindUp foi posicionada para quem quer entrar no dia com mais
            foco e comprar sem complicação: kit escolhido, frete grátis e checkout
            direto.
          </p>

          <ul className="mindup-highlight-section__list">
            <li className="mindup-highlight-section__item">
              <span className="mindup-highlight-section__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12.5L11 14.5L15.5 10"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.9"
                  />
                </svg>
              </span>
              <span>Cada frasco contem 60 capsulas para encaixar na rotina sem complicar seu dia</span>
            </li>

            <li className="mindup-highlight-section__item">
              <span className="mindup-highlight-section__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12.5L11 14.5L15.5 10"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.9"
                  />
                </svg>
              </span>
              <span>Proposta forte para foco, disposição e constância diária</span>
            </li>

            <li className="mindup-highlight-section__item">
              <span className="mindup-highlight-section__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12.5L11 14.5L15.5 10"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.9"
                  />
                </svg>
              </span>
              <span>Kits com vantagem progressiva para você pagar menos por frasco</span>
            </li>

            <li className="mindup-highlight-section__item">
              <span className="mindup-highlight-section__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12.5L11 14.5L15.5 10"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.9"
                  />
                </svg>
              </span>
              <span>Frete grátis, compra segura e garantia de 30 dias</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
