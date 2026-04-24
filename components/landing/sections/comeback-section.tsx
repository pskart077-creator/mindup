import Link from "next/link";

const COMEBACK_STORIES = [
  {
    title: "Ela disse que você não mudava",
    text: "A resposta não é mensagem, é postura. Quando você para de prometer e começa a agir com mais foco, a conversa muda sem precisar explicar.",
  },
  {
    title: "Te deixaram no pior momento",
    text: "MindUp é para quem cansou de ser visto como fraco, sem energia e sem direção. Você organiza a rotina, sobe o nível e deixa o resultado aparecer.",
  },
  {
    title: "O arrependimento vem depois",
    text: "Quem desacreditou só entende quando vê constância. Mais presença no trabalho, mais ritmo no treino, mais controle no dia e menos espaço para desculpa.",
  },
] as const;

export function ComebackSection() {
  return (
    <section className="mindup-comeback-section">
      <div className="mindup-comeback-section__container">
        <div className="mindup-comeback-section__head">
          <span className="mindup-comeback-section__eyebrow">
            Para quem foi desacreditado
          </span>

          <h2 className="mindup-comeback-section__title">
            Que ela se arrependa pelo homem que você virou, não pelo que você implorou.
          </h2>

          <p className="mindup-comeback-section__subtitle">
            Se uma namorada foi embora porque achou que você ia continuar parado,
            a melhor resposta é evolução. MindUp entra como apoio para quem decidiu
            parar de se arrastar e começar a agir com mais foco, energia e constância.
          </p>
        </div>

        <div className="mindup-comeback-section__grid">
          {COMEBACK_STORIES.map((story, index) => (
            <article key={story.title} className="mindup-comeback-section__card">
              <span className="mindup-comeback-section__number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mindup-comeback-section__card-title">
                {story.title}
              </h3>

              <p className="mindup-comeback-section__card-text">
                {story.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mindup-comeback-section__closing">
          <p>
            MindUp não faz ninguém correr atrás de você. Quem faz a virada é você.
            O produto entra para apoiar uma rotina com mais disposição, presença e
            decisão.
          </p>

          <Link href="/checkout" className="mindup-comeback-section__button">
            Garantir minha virada
          </Link>
        </div>
      </div>
    </section>
  );
}
