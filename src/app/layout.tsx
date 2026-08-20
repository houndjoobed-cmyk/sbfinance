import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import { ScrollReveal } from "@/components/layout/scroll-reveal";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
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
    <html lang="fr" className={`h-full antialiased ${openSans.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-surface text-on-surface" suppressHydrationWarning>
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
