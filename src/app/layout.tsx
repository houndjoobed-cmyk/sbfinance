import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Salem Braha Finance",
    default: "Salem Braha Finance - Cultivons la prospérité",
  },
  description: "Institution de microfinance au Bénin. Nous contribuons à l'amélioration des conditions de vie via des services financiers adaptés.",
  keywords: ["microfinance", "bénin", "finance", "crédit", "épargne", "SBF", "Salem Braha Finance"],
  authors: [{ name: "Salem Braha Finance" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-body bg-surface text-on-surface">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <ScrollReveal />
      </body>
    </html>
  );
}
