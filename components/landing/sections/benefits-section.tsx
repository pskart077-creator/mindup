const BENEFITS = [
  {
    title: "Pare de perder o ritmo",
    description:
      "Quando a rotina exige mais, você precisa de uma escolha que acompanhe seu ritmo com mais disposição e constância.",
  },
  {
    title: "Foco para executar",
    description:
      "Menos dia arrastado, mais presença para fazer o que precisa ser feito com clareza e intenção.",
  },
  {
    title: "Atitude de alta performance",
    description:
      "MindUp combina com quem quer parar de aceitar uma rotina no automático e começar a render de verdade.",
  },
  {
    title: "Compra com vantagem real",
    description:
      "Kits com preço melhor por frasco, frete grátis e garantia de 30 dias para você decidir com segurança.",
  },
] as const;

export function BenefitsSection() {
  return (
    <section id="beneficios" className="mindup-benefits-section">
      <div className="mindup-benefits-section__container">
        <div className="mindup-benefits-section__head">
          <span className="mindup-benefits-section__eyebrow">
            Por que comprar agora
          </span>

          <h2 className="mindup-benefits-section__title">
            Sua rotina não precisa vencer você. Coloque foco no carrinho hoje.
          </h2>

          <p className="mindup-benefits-section__subtitle">
            MindUp foi feita para quem sabe que disposição, clareza e constância
            mudam o jogo. Se você vai continuar exigindo mais de si, escolha um
            produto que acompanha essa decisão.
          </p>
        </div>

        <div className="mindup-benefits-section__grid">
          {BENEFITS.map((item) => (
            <article
              key={item.title}
              className="mindup-benefits-section__card"
            >
              <span className="mindup-benefits-section__card-icon">
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

              <h3 className="mindup-benefits-section__card-title">
                {item.title}
              </h3>

              <p className="mindup-benefits-section__card-description">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
