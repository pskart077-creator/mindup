import { LandingPage } from "@/components/landing/landing-page";
import { getProductConfig } from "@/lib/product";

export default function HomePage() {
  const product = getProductConfig();

  return <LandingPage product={product} />;
}
