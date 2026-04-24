const PERFORMANCE_POINTS = [
  "Mais disposição para não entregar metade do que você poderia fazer",
  "Mais clareza para manter a cabeça no que realmente importa",
  "Mais constância para atravessar o dia sem abandonar o ritmo",
  "Mais vantagem comprando em kit, com frete grátis em qualquer opção",
] as const;

export function PerformanceSection() {
  return (
    <section className="mindup-performance-section">
      <div className="mindup-performance-section__container">
        <div className="mindup-performance-section__head">
          <span className="mindup-performance-section__eyebrow">
            Decisão de quem quer render
          </span>

          <h2 className="mindup-performance-section__title">
            O dia vai cobrar. Entre nele com mais foco e energia.
          </h2>

          <p className="mindup-performance-section__subtitle">
            Você já sabe como é começar animado e perder força no meio do caminho.
            MindUp entra como apoio para uma rotina mais intensa, mais presente e
            com menos espaço para desculpa.
          </p>
        </div>

        <div className="mindup-performance-section__grid">
          {PERFORMANCE_POINTS.map((point) => (
            <article key={point} className="mindup-performance-section__item">
              <span className="mindup-performance-section__icon">
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

              <p className="mindup-performance-section__text">{point}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
