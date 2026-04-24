import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MindUp | Foco e Energia com Frete Grátis",
  description:
    "Garanta MindUp com frete grátis, kits com melhor custo por frasco e 30 dias de garantia para uma rotina com mais foco, energia e constância.",
  icons: {
    icon: "/icon.ico",
    shortcut: "/favicon.ico",
    apple: "/assets/image/icon/flaticon.ico",
  },
  openGraph: {
    title: "MindUp | Foco e Energia com Frete Grátis",
    description:
      "Garanta MindUp com frete grátis, kits com melhor custo por frasco e 30 dias de garantia para uma rotina com mais foco, energia e constância.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}
