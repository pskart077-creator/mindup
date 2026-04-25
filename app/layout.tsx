import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const META_PIXEL_ID = "1629165798303888";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "MindUp",
  title: {
    default: "MindUp | Foco e Energia com Frete Gratis",
    template: "%s | MindUp",
  },
  description:
    "Garanta MindUp com frete gratis, kits com melhor custo por frasco e 30 dias de garantia para uma rotina com mais foco, energia e constancia.",
  icons: {
    icon: "/icon.ico",
    shortcut: "/favicon.ico",
    apple: "/assets/image/icon/flaticon.ico",
  },
  openGraph: {
    title: "MindUp | Foco e Energia com Frete Gratis",
    description:
      "Garanta MindUp com frete gratis, kits com melhor custo por frasco e 30 dias de garantia para uma rotina com mais foco, energia e constancia.",
    type: "website",
    locale: "pt_BR",
    siteName: "MindUp",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindUp | Foco e Energia com Frete Gratis",
    description:
      "Garanta MindUp com frete gratis, kits com melhor custo por frasco e 30 dias de garantia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.variable}>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {children}
      </body>
    </html>
  );
}
