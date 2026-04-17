const TESTIMONIALS = [
  {
    name: "Leandro, 34 anos",
    text: "Percebi mais constância na minha rotina e uma sensação melhor de ritmo ao longo do dia. Para mim, isso fez diferença principalmente nas horas em que eu costumava perder rendimento.",
  },
  {
    name: "Camila, 29 anos",
    text: "Gostei da proposta da DopaWay porque combina com uma rotina mais intensa. Senti mais presença para manter o foco nas atividades e seguir o dia com mais clareza.",
  },
  {
    name: "Rafael, 41 anos",
    text: "O que mais me chamou atenção foi a sensação de continuidade. Em vez de começar bem e cair depois, senti minha rotina mais estável e produtiva.",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="dopaway-testimonials-section">
      <div className="dopaway-testimonials-section__container">
        <div className="dopaway-testimonials-section__head">
          <span className="dopaway-testimonials-section__eyebrow">
            Experiências com a DopaWay
          </span>

          <h2 className="dopaway-testimonials-section__title">
            Quem experimenta destaca mais constância, foco e presença na rotina
          </h2>

          <p className="dopaway-testimonials-section__subtitle">
            Relatos de pessoas que buscavam uma proposta mais premium para acompanhar
            dias intensos com mais clareza, ritmo e continuidade.
          </p>
        </div>

        <div className="dopaway-testimonials-section__grid">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.name}
              className="dopaway-testimonials-section__card"
            >
              <span className="dopaway-testimonials-section__quote">“</span>

              <p className="dopaway-testimonials-section__text">{item.text}</p>

              <strong className="dopaway-testimonials-section__name">
                {item.name}
              </strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
