const TESTIMONIALS = [
  {
    name: "Leandro, 34 anos",
    text: "Eu compraria de novo. A MindUp encaixou na minha rotina e me ajudou a manter mais ritmo justamente nas horas em que eu costumava cair de rendimento.",
  },
  {
    name: "Camila, 29 anos",
    text: "Escolhi o kit porque não queria testar só por poucos dias. Foi uma compra prática, com frete grátis, e senti mais presença para atravessar uma rotina puxada.",
  },
  {
    name: "Rafael, 41 anos",
    text: "O que me ganhou foi a constância. Não é sobre promessa mágica, é sobre ter um apoio para parar de empurrar o dia e executar melhor.",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="mindup-testimonials-section">
      <div className="mindup-testimonials-section__container">
        <div className="mindup-testimonials-section__head">
          <span className="mindup-testimonials-section__eyebrow">
            Quem compra entende
          </span>

          <h2 className="mindup-testimonials-section__title">
            MindUp é para quem quer parar de aceitar uma rotina pela metade
          </h2>

          <p className="mindup-testimonials-section__subtitle">
            A decisão é simples: continuar reclamando da falta de ritmo ou escolher
            um apoio para entrar no dia com mais foco, energia e constância.
          </p>
        </div>

        <div className="mindup-testimonials-section__grid">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.name}
              className="mindup-testimonials-section__card"
            >
              <span className="mindup-testimonials-section__quote">“</span>

              <p className="mindup-testimonials-section__text">{item.text}</p>

              <strong className="mindup-testimonials-section__name">
                {item.name}
              </strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
