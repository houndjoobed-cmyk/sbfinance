import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, AlertCircle, Shield, FileText, Banknote, Calendar, Percent, Receipt } from 'lucide-react';
import Link from 'next/link';
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  let product = null;
  try {
    product = await prisma.produitCredit.findUnique({
      where: { slug }
    });
  } catch (error) {
    console.error("Database fetch error:", error);
  }

  if (!product) {
    notFound();
  }

  let conditions: string[] = [];
  let documents: string[] = [];
  try {
    conditions = (product.conditions as unknown as string[]) || [];
    documents = (product.piecesAFournir as unknown as string[]) || [];
  } catch (e) {
    console.error("Error parsing JSON fields", e);
  }

  const formatAmount = (min: number | null, max: number | null) => {
    if (min && max) return `De ${min.toLocaleString('fr-FR')} à ${max.toLocaleString('fr-FR')} FCFA`;
    if (min) return `À partir de ${min.toLocaleString('fr-FR')} FCFA`;
    if (max) return `Jusqu'à ${max.toLocaleString('fr-FR')} FCFA`;
    return "À consulter";
  };

  const formatDuration = (min: number | null, max: number | null, differe: number | null) => {
    let dur = "";
    if (min && max) dur = `De ${min} à ${max} mois`;
    else if (min) dur = `À partir de ${min} mois`;
    else if (max) dur = `Jusqu'à ${max} mois`;
    else dur = "À consulter";

    if (differe && differe > 0) {
      dur += ` (Différé : ${differe} mois)`;
    }
    return dur;
  };

  const formattedAmount = formatAmount(product.montantMin, product.montantMax);
  const formattedDuration = formatDuration(product.dureeMinMois, product.dureeMaxMois, product.differeMois);

  let parametres = null;
  try {
    parametres = await prisma.parametresSite.findUnique({ where: { id: 1 } });
  } catch (error) {
    console.error("Database fetch error for parametres:", error);
  }

  const bgUrl = parametres?.banniereAPropos || '/images/BANNIERE.png';

  return (
    <>
      {/* Hero Section */}
      <Section variant="primary" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url('${bgUrl}')` }}></div>
        <div className="absolute inset-0 bg-primary-dark/70 z-0"></div>

        {/* Decorative elements */}
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[80%] rounded-full bg-accent/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[60%] rounded-full bg-primary-light/20 blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 reveal-up">
          <div className="flex items-center mb-6">
            <span className="bg-accent text-white font-bold px-4 py-1.5 text-xs uppercase tracking-widest shadow-lg">
              {product.categorie}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
            {product.nom}
          </h1>
          <p className="text-xl md:text-2xl text-primary-light leading-relaxed max-w-3xl border-l-4 border-accent pl-6">
            {product.description}
          </p>
        </div>
      </Section>

      {/* Main Content */}
      <Section variant="default" className="py-16 bg-surface-muted/30">
        <div className="max-w-5xl mx-auto">

          {/* Back Button positioned outside the dark hero, clean and visible */}
          <div className="mb-10 reveal-up">
            <Link href="/produits#credit" className="inline-flex items-center text-primary-dark hover:text-primary transition-colors font-semibold group">
              <span className="bg-white p-2 border border-outline-variant/50 mr-3 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </span>
              Retourner à la liste des offres
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            <div className="lg:col-span-2 space-y-16">

              <div className="reveal-up">
                <h2 className="text-3xl font-bold text-primary-dark mb-8 flex items-center">
                  <CheckCircle2 className="h-8 w-8 text-accent mr-4 shrink-0" />
                  Cible & Éligibilité
                </h2>
                <div className="bg-white p-8 shadow-sm border border-outline-variant/30 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <h3 className="font-semibold text-lg text-primary mb-3">À qui s'adresse ce produit ?</h3>
                  <p className="text-on-surface-variant text-lg leading-relaxed mb-8">{product.cible}</p>

                  {conditions.length > 0 && (
                    <>
                      <h3 className="font-semibold text-lg text-primary mb-4">Conditions d'accès :</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {conditions.map((cond, idx) => (
                          <li key={idx} className="flex items-start bg-surface-muted/50 p-4 border border-outline-variant/20">
                            <span className="w-2 h-2 rounded-none bg-accent mt-2 mr-3 shrink-0"></span>
                            <span className="text-on-surface-variant leading-relaxed">{cond}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {product.garantieExigee && (
                <div className="reveal-up">
                  <h2 className="text-3xl font-bold text-primary-dark mb-8 flex items-center">
                    <Shield className="h-8 w-8 text-primary mr-4" />
                    Garanties Exigées
                  </h2>
                  <div className="bg-primary/5 p-8 border border-primary/20 relative">
                    <p className="text-primary-dark font-medium leading-relaxed text-lg">{product.garantieExigee}</p>
                  </div>
                </div>
              )}

              <div className="reveal-up">
                <h2 className="text-3xl font-bold text-primary-dark mb-8 flex items-center">
                  <FileText className="h-8 w-8 text-accent mr-4" />
                  Pièces à fournir
                </h2>
                {documents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {documents.map((doc, idx) => (
                      <div key={idx} className="bg-white p-5 shadow-sm border border-outline-variant/30 flex items-center hover:border-primary/30 transition-colors">
                        <div className="w-8 h-8 bg-surface-muted flex items-center justify-center mr-4 shrink-0">
                          <span className="text-primary font-bold text-sm">{idx + 1}</span>
                        </div>
                        <span className="text-on-surface-variant font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-on-surface-variant italic bg-surface-muted p-6 border border-outline-variant/30">Aucune pièce spécifique n'est listée. Rapprochez-vous d'une agence pour plus de détails.</p>
                )}
              </div>

            </div>

            <div className="">
              <div className="bg-white shadow-xl border border-outline-variant/50 overflow-hidden">
                <div className="bg-primary-dark p-6 text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">Conditions Financières</h3>
                  <p className="text-primary-light text-sm">Transparence et souplesse</p>
                </div>

                <div className="p-6 space-y-6">

                  <div className="flex items-start pb-6 border-b border-outline-variant/30">
                    <div className="bg-primary/10 p-3 shrink-0 mr-4 border border-primary/20">
                      <Banknote className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-on-surface-variant text-sm font-medium mb-1 uppercase tracking-wide">Montant</p>
                      <p className="font-bold text-primary-dark text-lg">{formattedAmount}</p>
                    </div>
                  </div>

                  <div className="flex items-start pb-6 border-b border-outline-variant/30">
                    <div className="bg-accent/10 p-3 shrink-0 mr-4 border border-accent/20">
                      <Calendar className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-on-surface-variant text-sm font-medium mb-1 uppercase tracking-wide">Durée</p>
                      <p className="font-bold text-primary-dark text-lg">{formattedDuration}</p>
                    </div>
                  </div>

                  <div className="flex items-start pb-6 border-b border-outline-variant/30">
                    <div className="bg-primary/10 p-3 shrink-0 mr-4 border border-primary/20">
                      <Percent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-on-surface-variant text-sm font-medium mb-1 uppercase tracking-wide">Taux</p>
                      <p className="font-bold text-primary-dark text-lg">{product.tauxInteretAnnuel || "Consulter en agence"}</p>
                      <p className="text-sm text-on-surface-variant mt-1">Périodicité : {product.periodicite || "Mensuelle"}</p>
                    </div>
                  </div>

                  {product.fraisEtEpargne && (
                    <div className="flex items-start">
                      <div className="bg-accent/10 p-3 shrink-0 mr-4 border border-accent/20">
                        <Receipt className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-on-surface-variant text-sm font-medium mb-1 uppercase tracking-wide">Frais & Épargne</p>
                        <p className="text-primary-dark font-medium leading-snug">{product.fraisEtEpargne}</p>
                      </div>
                    </div>
                  )}

                </div>

                <div className="p-6 bg-surface-muted/50 space-y-4 border-t border-outline-variant/30">
                  <Button asChild variant="primary" size="lg" className="w-full rounded-none text-base font-semibold shadow-md">
                    <Link href="/contacts">Demander ce financement</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full rounded-none text-base font-semibold">
                    <Link href="/reseau">Trouver une agence</Link>
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex items-start text-xs text-on-surface-variant bg-white border border-outline-variant/50 p-4 shadow-sm">
                <AlertCircle className="h-5 w-5 text-accent mr-3 shrink-0" />
                <p className="leading-relaxed">
                  Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
                </p>
              </div>
            </div>

          </div>
        </div>
      </Section>
    </>
  );
}
