import { BackToTop } from "@/components/ui/back-to-top";
import { ProductConfig } from "@/lib/product";
import Header from "./layout/Header";
import { BenefitsSection } from "./sections/benefits-section";
import { ComplianceSection } from "./sections/compliance-section";
import { FaqSection } from "./sections/faq-section";
import { FinalCtaSection } from "./sections/final-cta-section";
import { HeroSection } from "./sections/hero-section";
import { OffersSection } from "./sections/offers-section";
import { PerformanceSection } from "./sections/performance-section";
import { ProductHighlightSection } from "./sections/product-highlight-section";
import { TestimonialsSection } from "./sections/testimonials-section";
import { WarrantySection } from "./sections/warranty-section";

type LandingPageProps = {
  product: ProductConfig;
};

export function LandingPage({ product }: LandingPageProps) {
  return (
    <div className="landing-shell">
      <div className="bg-orb bg-orb-top" />
      <div className="bg-orb bg-orb-bottom" />

      <main className="landing-main">
        <Header />
        <HeroSection product={product} />
        <ProductHighlightSection />
        <BenefitsSection />
        <PerformanceSection />
        <TestimonialsSection />
        <ComplianceSection />
        <OffersSection product={product} />
        <WarrantySection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <footer className="landing-footer">
        <p>
          Este conteudo possui finalidade comercial. Para uma experiencia de compra
          mais transparente e segura, consulte nossos termos, politicas e condicoes
          aplicaveis.
        </p>
      </footer>

      <BackToTop />
    </div>
  );
}
