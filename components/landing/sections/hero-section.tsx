import Image from "next/image";
import Link from "next/link";
import { ProductConfig } from "@/lib/product";

type HeroSectionProps = {
  product: ProductConfig;
};

export function HeroSection({ product }: HeroSectionProps) {
  return (
    <section id="inicio" className="dopaway-hero">
      <div className="dopaway-hero__top-line" />

      <div className="dopaway-hero__container">
        <div className="dopaway-hero__content">
          <span className="dopaway-hero__eyebrow">
            A Energia Natural Que Impulsiona Seu Foco Todos os Dias
          </span>

          <h1 className="dopaway-hero__title">
            Mais disposição, clareza e presença para uma rotina de alta performance.
          </h1>

          <p className="dopaway-hero__text">
            Se você sente que falta ritmo, motivação e constância no dia a dia, a DopaWay foi criada para acompanhar sua rotina com mais intensidade. Com uma proposta moderna e marcante, ela representa foco, energia e atitude para quem quer produzir mais, render melhor e manter a mente alinhada com seus objetivos.
          </p>

          <div className="dopaway-hero__actions">
            <Link href="/checkout" className="dopaway-hero__button">
              Comprar Agora
            </Link>
          </div>

          <div className="dopaway-hero__trust">
            <div className="dopaway-hero__trust-item">
              <span className="dopaway-hero__trust-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3L18.5 5.5V11.5C18.5 15.5 15.9 19.1 12 20.5C8.1 19.1 5.5 15.5 5.5 11.5V5.5L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 12.1L11.2 13.8L14.8 10.2"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <strong>Compra Segura</strong>
              </div>
            </div>

            <div className="dopaway-hero__trust-item">
              <span className="dopaway-hero__trust-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 5V7"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 5V7"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 10H20"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                  <rect
                    x="4"
                    y="6.5"
                    width="16"
                    height="12.5"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.9"
                  />
                  <path
                    d="M9 14H15"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div>
                <strong>Satisfação Garantida</strong>
              </div>
            </div>

            <div className="dopaway-hero__trust-item">
              <span className="dopaway-hero__trust-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="5"
                    y="11"
                    width="14"
                    height="9"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.9"
                  />
                  <path
                    d="M8 11V8.5C8 6.01 10.01 4 12.5 4C14.99 4 17 6.01 17 8.5V11"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="15.5" r="1" fill="currentColor" />
                </svg>
              </span>
              <div>
                <strong>Privacidade Protegida</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="dopaway-hero__visual">
          <div className="dopaway-hero__image-wrap">
            <Image
              src="/assets/image/hero/dopaway.png"
              alt="Image DopaWay"
              fill
              priority
              className="dopaway-hero__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
