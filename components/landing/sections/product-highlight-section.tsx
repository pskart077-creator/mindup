import Image from "next/image";

export function ProductHighlightSection() {
  return (
    <section className="dopaway-highlight-section">
      <div className="dopaway-highlight-section__container">
        <div className="dopaway-highlight-section__visual">
          <div className="dopaway-highlight-section__image-wrap">
            <Image
              src="/assets/image/hero/dopaway.png"
              alt="Produto DopaWay"
              fill
              className="dopaway-highlight-section__image"
            />
          </div>
        </div>

        <div className="dopaway-highlight-section__copy">
          <span className="dopaway-highlight-section__eyebrow">
            Alta performance com proposta premium
          </span>

          <h2 className="dopaway-highlight-section__title">
            Produto premium para rotina de foco e intensidade
          </h2>

          <p className="dopaway-highlight-section__description">
            Estruturado para pessoas que exigem desempenho constante. A proposta
            é facilitar a adesão diária, mantendo praticidade, consistência e uma
            experiência mais forte para quem busca foco, energia e presença na rotina.
          </p>

          <ul className="dopaway-highlight-section__list">
            <li className="dopaway-highlight-section__item">
              <span className="dopaway-highlight-section__icon">
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
              <span>Uso simples no dia a dia, sem preparo complexo</span>
            </li>

            <li className="dopaway-highlight-section__item">
              <span className="dopaway-highlight-section__icon">
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
              <span>Posicionamento premium para audiência de alta intenção</span>
            </li>

            <li className="dopaway-highlight-section__item">
              <span className="dopaway-highlight-section__icon">
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
              <span>Fluxo comercial completo com landing e checkout dedicado</span>
            </li>

            <li className="dopaway-highlight-section__item">
              <span className="dopaway-highlight-section__icon">
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
              <span>Acompanhamento de pagamento com retorno imediato da cobrança</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}