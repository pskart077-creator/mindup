import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout Seguro",
  description:
    "Finalize seu pedido MindUp com frete gratis e pagamento PIX seguro.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
