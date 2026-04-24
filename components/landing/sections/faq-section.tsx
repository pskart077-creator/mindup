const FAQ_ITEMS = [
  {
    question: "O frete é grátis mesmo?",
    answer:
      "Sim. Você consulta o frete no checkout, escolhe a opção grátis disponível para o seu CEP e finaliza o pedido sem pagar entrega.",
  },
  {
    question: "Qual kit vale mais a pena?",
    answer:
      "Os kits com mais frascos reduzem o valor por unidade. Se você quer continuidade e melhor custo por frasco, os kits maiores são a escolha mais agressiva.",
  },
  {
    question: "Tenho garantia para comprar sem medo?",
    answer:
      "Sim. A MindUp conta com 30 dias de garantia para você avaliar a experiência dentro do prazo informado.",
  },
  {
    question: "Quando meu pedido começa a andar?",
    answer:
      "Após a confirmação do pagamento, o pedido segue para separação e envio conforme o prazo da opção de frete grátis escolhida no checkout.",
  },
] as const;

export function FaqSection() {
  return (
    <section id="faq" className="mindup-faq-section">
      <div className="mindup-faq-section__container">
        <div className="mindup-faq-section__head">
          <span className="mindup-faq-section__eyebrow">
            Tire a dúvida e compre
          </span>

          <h2 className="mindup-faq-section__title">
            O que falta para você garantir sua MindUp hoje?
          </h2>

          <p className="mindup-faq-section__subtitle">
            Frete grátis, garantia de 30 dias e kits com melhor custo por frasco.
            A compra foi pensada para ser simples, rápida e sem fricção.
          </p>
        </div>

        <div className="mindup-faq-section__grid">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="mindup-faq-section__item">
              <summary className="mindup-faq-section__question">
                <span>{item.question}</span>
                <span className="mindup-faq-section__plus" />
              </summary>

              <div className="mindup-faq-section__answer-wrap">
                <p className="mindup-faq-section__answer">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
