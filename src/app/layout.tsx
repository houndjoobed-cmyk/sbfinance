import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import { ScrollReveal } from "@/components/layout/scroll-reveal";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL('https://sbfinance.bj'),
  title: {
    template: "%s | Salem Braha Finance",
    default: "Salem Braha Finance - Cultivons la prospérité",
  },
  description: "Institution de microfinance au Bénin. Nous contribuons à l'amélioration des conditions de vie via des services financiers adaptés.",
  keywords: ["microfinance", "bénin", "finance", "crédit", "épargne", "SBF", "Salem Braha Finance"],
  authors: [{ name: "Salem Braha Finance" }],
  openGraph: {
    title: "Salem Braha Finance - Cultivons la prospérité",
    description: "Institution de microfinance au Bénin engagée pour l'amélioration des conditions de vie.",
    url: "https://sbfinance.bj",
    siteName: "Salem Braha Finance",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 600,
        alt: "Logo Salem Braha Finance",
      },
    ],
    locale: "fr_BJ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salem Braha Finance - Cultivons la prospérité",
    description: "Institution de microfinance leader dans la finance inclusive au Bénin.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Salem Braha Finance",
    "url": "https://sbfinance.bj",
    "logo": "https://sbfinance.bj/icon.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+229-01-21-38-05-87",
      "contactType": "customer service"
    },
    "sameAs": [
      // Add social links here if available
    ]
  };

  return (
    <html lang="fr" className={`h-full antialiased ${poppins.variable}`}>
      <body className={`min-h-full flex flex-col bg-surface text-on-surface ${poppins.className}`} suppressHydrationWarning>
        <JsonLd data={organizationSchema} />
        <Header />
        <main className="grow">
          {children}
        </main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
