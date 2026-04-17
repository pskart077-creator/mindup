const PERFORMANCE_POINTS = [
  "Mais energia para sustentar uma rotina intensa com maior constância",
  "Mais clareza mental para manter atenção em tarefas longas e exigentes",
  "Mais presença, ritmo e disciplina para o dia render em alto nível",
  "Uma proposta premium para quem valoriza foco, desempenho e consistência",
] as const;

export function PerformanceSection() {
  return (
    <section className="dopaway-performance-section">
      <div className="dopaway-performance-section__container">
        <div className="dopaway-performance-section__head">
          <span className="dopaway-performance-section__eyebrow">
            Performance com mais presença
          </span>

          <h2 className="dopaway-performance-section__title">
            Mais foco, energia e constância para sustentar o seu ritmo
          </h2>

          <p className="dopaway-performance-section__subtitle">
            A DopaWay foi pensada para acompanhar rotinas que exigem mais da mente,
            do corpo e da disciplina diária, com uma proposta premium para quem quer
            manter intensidade e presença ao longo do dia.
          </p>
        </div>

        <div className="dopaway-performance-section__grid">
          {PERFORMANCE_POINTS.map((point) => (
            <article key={point} className="dopaway-performance-section__item">
              <span className="dopaway-performance-section__icon">
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

              <p className="dopaway-performance-section__text">{point}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}