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
    <html lang="fr" className={`h-full antialiased ${poppins.variable}`}>
      <body className={`min-h-full flex flex-col bg-surface text-on-surface ${poppins.className}`} suppressHydrationWarning>
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
