const FAQ_ITEMS = [
  {
    question: "Quando meu pedido é enviado?",
    answer:
      "Após a confirmação do pagamento, o pedido segue para separação e envio conforme o prazo da opção de frete escolhida no momento da compra.",
  },
  {
    question: "Posso pagar com PIX?",
    answer:
      "Sim. Você pode concluir sua compra com PIX e também verificar as opções de pagamento disponíveis no checkout no momento do pedido.",
  },
  {
    question: "Como acompanho a entrega?",
    answer:
      "Depois da confirmação do pagamento, você recebe as informações de acompanhamento da entrega pelos dados cadastrados na compra.",
  },
  {
    question: "Se eu tiver dúvida, existe suporte?",
    answer:
      "Sim. Nossa equipe está disponível para ajudar em dúvidas sobre compra, acompanhamento do pedido e atendimento no pós-venda.",
  },
] as const;

export function FaqSection() {
  return (
    <section id="faq" className="dopaway-faq-section">
      <div className="dopaway-faq-section__container">
        <div className="dopaway-faq-section__head">
          <span className="dopaway-faq-section__eyebrow">
            Perguntas frequentes
          </span>

          <h2 className="dopaway-faq-section__title">
            Tire suas dúvidas antes de escolher a sua DopaWay
          </h2>

          <p className="dopaway-faq-section__subtitle">
            Reunimos as respostas para as dúvidas mais comuns para que sua
            experiência de compra seja mais simples, segura e tranquila.
          </p>
        </div>

        <div className="dopaway-faq-section__grid">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="dopaway-faq-section__item">
              <summary className="dopaway-faq-section__question">
                <span>{item.question}</span>
                <span className="dopaway-faq-section__plus" />
              </summary>

              <div className="dopaway-faq-section__answer-wrap">
                <p className="dopaway-faq-section__answer">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}