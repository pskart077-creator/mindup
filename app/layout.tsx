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
  title: "DopaWay | Foco, Energia e Alta Performance",
  description:
    "Conheça a DopaWay, uma proposta premium para quem busca mais foco, energia, constância e presença na rotina.",
  openGraph: {
    title: "DopaWay | Foco, Energia e Alta Performance",
    description:
      "Conheça a DopaWay, uma proposta premium para quem busca mais foco, energia, constância e presença na rotina.",
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