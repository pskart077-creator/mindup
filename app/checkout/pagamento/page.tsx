import type { Metadata } from "next";
import { CheckoutPaymentPage } from "@/components/checkout/payment-page";

export const metadata: Metadata = {
  title: "Pagamento PIX",
  description:
    "Escaneie o QR Code PIX ou copie o codigo para finalizar seu pedido MindUp.",
};

export default function PaymentPage() {
  return <CheckoutPaymentPage />;
}
