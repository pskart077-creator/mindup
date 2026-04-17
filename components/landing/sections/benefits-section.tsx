const BENEFITS = [
  {
    title: "Energia mais constante",
    description:
      "A DopaWay foi pensada para acompanhar sua rotina com mais constância, disposição e presença ao longo do dia.",
  },
  {
    title: "Foco para manter o ritmo",
    description:
      "Uma proposta criada para quem busca mais clareza mental, intensidade e continuidade nas atividades diárias.",
  },
  {
    title: "Composição com proposta premium",
    description:
      "Desenvolvida para reforçar uma rotina de performance, disciplina e melhor aproveitamento do seu dia.",
  },
  {
    title: "Mais presença na rotina",
    description:
      "Uma escolha para quem quer sustentar produtividade, atenção e uma sensação de maior controle no dia a dia.",
  },
] as const;

export function BenefitsSection() {
  return (
    <section id="beneficios" className="dopaway-benefits-section">
      <div className="dopaway-benefits-section__container">
        <div className="dopaway-benefits-section__head">
          <span className="dopaway-benefits-section__eyebrow">
            Benefícios da DopaWay
          </span>

          <h2 className="dopaway-benefits-section__title">
            Uma proposta premium para quem quer mais foco, energia e constância
          </h2>

          <p className="dopaway-benefits-section__subtitle">
            A DopaWay foi criada para acompanhar uma rotina intensa com uma
            proposta mais forte de presença, clareza e continuidade ao longo do dia.
          </p>
        </div>

        <div className="dopaway-benefits-section__grid">
          {BENEFITS.map((item) => (
            <article
              key={item.title}
              className="dopaway-benefits-section__card"
            >
              <span className="dopaway-benefits-section__card-icon">
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

              <h3 className="dopaway-benefits-section__card-title">
                {item.title}
              </h3>

              <p className="dopaway-benefits-section__card-description">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
