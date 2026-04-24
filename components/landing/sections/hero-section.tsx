import Image from "next/image";
import Link from "next/link";
import { ProductConfig } from "@/lib/product";

type HeroSectionProps = {
  product: ProductConfig;
};

export function HeroSection({ product }: HeroSectionProps) {
  return (
    <section id="inicio" className="mindup-hero">
      <div className="mindup-hero__container">
        <div className="mindup-hero__content">
          <span className="mindup-hero__eyebrow">
            Oferta ativa com frete grátis para todo o Brasil
          </span>

          <h1 className="mindup-hero__title">
            Pare de deixar o cansaço decidir pelo seu dia.
          </h1>

          <p className="mindup-hero__text">
            MindUp é para quem quer mais disposição, clareza e constância sem enrolação. Escolha seu kit, aproveite o frete grátis e coloque sua rotina no modo foco hoje.
          </p>

          <div className="mindup-hero__actions">
            <Link href="/checkout" className="mindup-hero__button">
              Garantir MindUp Agora
            </Link>
          </div>

          <div className="mindup-hero__trust">
            <div className="mindup-hero__trust-item">
              <span className="mindup-hero__trust-icon">
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
                <strong>Frete Grátis</strong>
              </div>
            </div>

            <div className="mindup-hero__trust-item">
              <span className="mindup-hero__trust-icon">
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
                <strong>Garantia de 30 Dias</strong>
              </div>
            </div>

            <div className="mindup-hero__trust-item">
              <span className="mindup-hero__trust-icon">
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
                <strong>Compra Segura</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="mindup-hero__visual">
          <div className="mindup-hero__image-wrap">
            <Image
              src="/assets/image/hero/mindup.png"
              alt="Image MindUp"
              fill
              priority
              className="mindup-hero__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
