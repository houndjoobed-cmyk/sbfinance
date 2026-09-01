"use client";

import React, { useState } from 'react';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Wallet, Landmark, ChevronDown, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// --- Data ---
const comptesCourants = [
  {
    nom: "HOUENOUSSOU",
    categorie: "Pack Salarié",
    cible: "Personnel salarié du secteur privé et public",
    coutPack: "17 000F CFA",
    depotMin: "15 000F",
    fraisOuverture: "2 000F",
    fraisTenue: "250F / mois",
    creditsPossibles: "Crédit aux fonctionnaires (CF), Crédit aux salariés (SA)",
    pieces: [
      "02 photos d'identité",
      "Photocopie de la pièce d'identité en cours de validité (L'original est obligatoire pour certifier la conformité)"
    ]
  },
  {
    nom: "ALLODO",
    categorie: "Pack Particulier",
    cible: "Toute personne physique, non salariée, disposant de revenus stables",
    coutPack: "11 000F CFA",
    depotMin: "3 000F",
    fraisOuverture: "1 500F",
    fraisTenue: "250F / mois",
    creditsPossibles: "Crédit Individuelle Caution Personnelle (CICP)",
    pieces: [
      "Formulaire d'ouverture de compte",
      "02 photos d'identité",
      "Photocopie de la pièce d'identité en cours de validité (L'original est obligatoire)"
    ]
  },
  {
    nom: "AHOSSOU",
    categorie: "Pack Particulier Premium",
    cible: "Particuliers disposant de revenus réguliers et d'un patrimoine important (cadres, chefs d'entreprise)",
    coutPack: "15 000F CFA",
    depotMin: "6 000F",
    fraisOuverture: "2 500F",
    fraisTenue: "500F / mois",
    creditsPossibles: "Crédit Individuel Caution Personnelle (CICP), Crédit aux Commerçants (CC)",
    pieces: [
      "Formulaire d'ouverture de compte",
      "02 photos d'identité",
      "Photocopie de la pièce d'identité en cours de validité (L'original est obligatoire)"
    ]
  },
  {
    nom: "ZEDAGA",
    categorie: "Pack Entreprise",
    cible: "Entreprises de commerce et de services (SA, SARL, etc), formelles ou informelles",
    coutPack: "25 000F CFA",
    depotMin: "12 000F",
    fraisOuverture: "6 500F",
    fraisTenue: "1 000F / mois",
    creditsPossibles: "Tous types de crédits sauf CICP, CG et GCS",
    pieces: [
      "Formulaire d'ouverture de compte",
      "02 photos d'identité de chaque signataire",
      "Photocopies du registre de commerce, statuts, IFU et règlement intérieur",
      "Photocopie des pièces d'identités en cours de validité des signataires"
    ]
  },
  {
    nom: "KONDOKPO",
    categorie: "Pack Association",
    cible: "Associations, coopératives, ONG ou mutuelles",
    coutPack: "20 000F CFA",
    depotMin: "6 000F",
    fraisOuverture: "7 500F",
    fraisTenue: "500F / mois",
    creditsPossibles: "Non éligible au crédit",
    pieces: [
      "Formulaire d'ouverture de compte",
      "02 photos d'identité de chaque signataire",
      "Photocopies du registre de commerce, statuts, IFU et règlement intérieur",
      "Photocopie des pièces d'identités en cours de validité des signataires"
    ]
  },
  {
    nom: "Dépôt A Vue (DAV)",
    categorie: "Pack Groupement de Femmes",
    cible: "Femmes membres d'associations ou de groupes solidaires",
    coutPack: "2 000F CFA par membre",
    depotMin: "Variable",
    fraisOuverture: "Variable",
    fraisTenue: "250F / mois",
    creditsPossibles: "Crédit aux groupements (CG), Crédit aux groupes de caution solidaire (GCS)",
    pieces: [
      "Formulaire d'ouverture de compte",
      "02 photos d'identité de chaque signataire",
      "Photocopie de la pièce d'identité de chaque signataire (03 membres)"
    ]
  }
];

const comptesEpargne = [
  {
    nom: "Dépôt A Terme (DAT)",
    description: "Épargne bloquée par son titulaire sur une période déterminée (minimum 6 mois).",
    cible: "Personnes physiques et morales",
    depotMin: "1 000 000F CFA",
    remuneration: "6,5% à 10% selon le montant et la durée",
    caracteristiques: [
      "Durée minimum : 6 mois",
      "Pénalité de rupture : 15% des intérêts générés",
      "Opérations transitent par un compte DDV"
    ],
    pieces: [
      "Formulaire d'ouverture de compte",
      "Photocopie de la pièce d'identité en cours de validité"
    ]
  },
  {
    nom: "DOUKPO",
    description: "Épargne volontaire et rémunérée pour sécuriser vos économies à votre rythme.",
    cible: "Personnes physiques et morales",
    depotMin: "2 000F CFA",
    remuneration: "5% l'an (calcul trimestriel)",
    caracteristiques: [
      "Frais d'ouverture : 0F CFA",
      "Période minimale pour générer intérêts : 3 mois",
      "Moyen utilisé : Livret d'épargne"
    ],
    pieces: [
      "Formulaire d'ouverture",
      "02 photos d'identité du client/signataires",
      "Pièce d'identité en cours de validité",
      "Personnes morales: Registre de commerce, IFU, Statut"
    ]
  },
  {
    nom: "VIP",
    description: "Épargne volontaire et rémunérée offrant des privilèges exclusifs (SMS alertes, traitement de faveur).",
    cible: "Clients à forte valeur ajoutée",
    depotMin: "1 000 000F CFA",
    remuneration: "6% l'an (calcul trimestriel)",
    caracteristiques: [
      "Avantages : SMS alerte, Mail Agreement pour retrait ≥ 200.000F CFA",
      "Assurance NAF : 6 500F CFA",
      "Période minimale pour générer intérêts : 3 mois"
    ],
    pieces: [
      "Formulaire d'ouverture de compte",
      "02 photos d'identité",
      "Photocopie de la pièce d'identité"
    ]
  },
  {
    nom: "PLAN EPARGNE PROJET (PEP)",
    description: "Épargne volontaire et rémunérée bloquée sur au moins 12 mois pour financer un projet précis.",
    cible: "Personnes physiques et morales",
    depotMin: "25 000F CFA (Dépôt mensuel)",
    remuneration: "4,5% à 9,5% selon durée et montant",
    caracteristiques: [
      "Durée minimum : 12 mois",
      "Frais d'ouverture : 1 000F CFA",
      "Pénalité de rupture : 15% des intérêts générés"
    ],
    pieces: [
      "Formulaire d'ouverture de compte",
      "Photocopie de la pièce d'identité"
    ]
  },
  {
    nom: "Dépôt Divers à Vue (DDV)",
    description: "Épargne volontaire et non rémunérée, compte de transition.",
    cible: "Personnel SBF, Souscripteurs DAT/PEP",
    depotMin: "0F CFA",
    remuneration: "0%",
    caracteristiques: [
      "Frais d'ouverture : 0F CFA",
      "Avantage : Compte de transition pour DAT et PEP",
      "Traitement des salaires SBF"
    ],
    pieces: [
      "Formulaire d'ouverture de compte",
      "02 photos d'identité",
      "Photocopie de la pièce d'identité"
    ]
  },
  {
    nom: "Dépôt de Garantie (DG)",
    description: "Épargne obligatoire liée à certains types de crédit pour couvrir la dette.",
    cible: "Bénéficiaires de crédit",
    depotMin: "Taux de garantie : 5% à 15% du crédit",
    remuneration: "1% l'an",
    caracteristiques: [
      "Durée : Durée du crédit",
      "Frais d'ouverture : 0F CFA",
      "Remboursé après paiement intégral du crédit"
    ],
    pieces: ["Ouvert automatiquement par SBF lors de l'octroi d'un crédit concerné"]
  },
  {
    nom: "Epargne de Capitalisation (EC)",
    description: "Épargne obligatoire constituée progressivement lors du remboursement d'un crédit.",
    cible: "Bénéficiaires de crédit",
    depotMin: "Taux d'épargne : 5% à 10%",
    remuneration: "1% l'an",
    caracteristiques: [
      "Durée : Durée du crédit",
      "Frais d'ouverture : 0F CFA"
    ],
    pieces: ["Ouvert automatiquement par SBF lors de l'octroi d'un crédit concerné"]
  }
];

export default function EpargnesPage() {
  const [activeTab, setActiveTab] = useState<'courants' | 'epargne'>('courants');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <>
      <title>Nos Épargnes | Salem Braha Finance</title>
      <meta name="description" content="Découvrez nos comptes courants et nos solutions d'épargne adaptées à vos projets et à votre situation." />

      <Section variant="primary" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url('/images/banniere.png')` }}></div>
        <div className="absolute inset-0 bg-primary-dark/70 z-0"></div>
        <div className="text-center max-w-3xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            <TypingAnimation text="Comptes Courants & Épargne" typeSpeed={50} />
          </h1>
          <p className="text-xl text-white drop-shadow-md font-medium">
            Des solutions souples pour sécuriser vos revenus quotidiens ou préparer l'avenir, avec des conditions de rémunération attractives.
          </p>
        </div>
      </Section>

      <Section variant="default" className="py-16">
        <div className="text-center mb-12 reveal-up">
          <h2 className="text-3xl font-bold text-primary-dark mb-4">Nos Solutions Bancaires</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-8">
            Fidèle aux orientations de sa Direction, Salem Braha Finance adapte ses produits à vos besoins.
          </p>

          {/* Custom Tabs */}
          <div className="inline-flex p-1 bg-surface-variant rounded-lg border border-outline-variant/30">
            <button
              onClick={() => setActiveTab('courants')}
              className={cn(
                "px-6 py-3 rounded-md text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                activeTab === 'courants'
                  ? "bg-white text-primary shadow-sm"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              <Wallet className="w-4 h-4" />
              Comptes Courants
            </button>
            <button
              onClick={() => setActiveTab('epargne')}
              className={cn(
                "px-6 py-3 rounded-md text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                activeTab === 'epargne'
                  ? "bg-white text-primary shadow-sm"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              <Landmark className="w-4 h-4" />
              Comptes d'Épargne
            </button>
          </div>
        </div>

        {/* COMPTES COURANTS */}
        {activeTab === 'courants' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-on-surface-variant">
                Ces comptes facilitent le versement de vos revenus et la gestion de vos opérations financières au quotidien. Ils ne génèrent pas d'intérêts, mais vous permettent d'obtenir des financements et de sécuriser votre trésorerie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {comptesCourants.map((compte) => (
                <div key={compte.nom} className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-semibold text-xs rounded-full mb-2">
                          {compte.categorie}
                        </span>
                        <h3 className="text-2xl font-bold text-primary-dark">{compte.nom}</h3>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full shrink-0">
                        <Wallet className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    <p className="text-on-surface-variant text-sm mb-6 pb-6 border-b border-outline-variant/30">
                      <strong>Cible :</strong> {compte.cible}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-surface-variant/50 p-3 rounded-lg">
                        <span className="block text-xs text-on-surface-variant mb-1">Coût du PACK</span>
                        <span className="font-bold text-primary-dark">{compte.coutPack}</span>
                      </div>
                      <div className="bg-surface-variant/50 p-3 rounded-lg">
                        <span className="block text-xs text-on-surface-variant mb-1">Dépôt minimum</span>
                        <span className="font-bold text-primary-dark">{compte.depotMin}</span>
                      </div>
                      <div className="bg-surface-variant/50 p-3 rounded-lg">
                        <span className="block text-xs text-on-surface-variant mb-1">Frais de tenue</span>
                        <span className="font-bold text-primary-dark">{compte.fraisTenue}</span>
                      </div>
                      <div className="bg-surface-variant/50 p-3 rounded-lg">
                        <span className="block text-xs text-on-surface-variant mb-1">Frais d'ouverture</span>
                        <span className="font-bold text-primary-dark">{compte.fraisOuverture}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedCard(expandedCard === compte.nom ? null : compte.nom)}
                      className="flex items-center justify-center w-full py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-md transition-colors"
                    >
                      {expandedCard === compte.nom ? "Voir moins" : "Voir plus de détails"}
                      <ChevronDown className={cn("ml-2 w-4 h-4 transition-transform", expandedCard === compte.nom ? "rotate-180" : "")} />
                    </button>
                  </div>

                  {/* Expanded content */}
                  {expandedCard === compte.nom && (
                    <div className="px-6 pb-6 pt-2 bg-surface-variant/30 animate-in slide-in-from-top-2">
                      <div className="mb-4">
                        <h4 className="font-bold text-primary-dark mb-2 text-sm">Crédits possibles :</h4>
                        <p className="text-sm text-on-surface-variant">{compte.creditsPossibles}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-primary-dark mb-2 text-sm">Pièces à fournir :</h4>
                        <ul className="space-y-2">
                          {compte.pieces.map((piece, idx) => (
                            <li key={idx} className="flex items-start text-sm text-on-surface-variant">
                              <CheckCircle2 className="w-4 h-4 text-accent mr-2 mt-0.5 shrink-0" />
                              <span>{piece}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMPTES D'EPARGNE */}
        {activeTab === 'epargne' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-on-surface-variant">
                Les comptes d'épargne vous permettent de constituer une réserve financière et de concrétiser des projets futurs grâce à des taux d'intérêts très performants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {comptesEpargne.map((epargne) => (
                <div key={epargne.nom} className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                  <div className="p-6 grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-primary-dark">{epargne.nom}</h3>
                      </div>
                      <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-full shrink-0">
                        <Landmark className="h-6 w-6 text-accent" />
                      </div>
                    </div>

                    <p className="text-on-surface-variant text-sm mb-4">
                      {epargne.description}
                    </p>
                    <p className="text-on-surface-variant text-sm mb-6 pb-6 border-b border-outline-variant/30">
                      <strong>Cible :</strong> {epargne.cible}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-surface-variant/50 p-3 rounded-lg col-span-2 sm:col-span-1">
                        <span className="block text-xs text-on-surface-variant mb-1">Dépôt minimum</span>
                        <span className="font-bold text-primary-dark">{epargne.depotMin}</span>
                      </div>
                      <div className="bg-surface-variant/50 p-3 rounded-lg col-span-2 sm:col-span-1">
                        <span className="block text-xs text-on-surface-variant mb-1">Rémunération</span>
                        <span className="font-bold text-accent">{epargne.remuneration}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedCard(expandedCard === epargne.nom ? null : epargne.nom)}
                      className="flex items-center justify-center w-full py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-md transition-colors mt-auto"
                    >
                      {expandedCard === epargne.nom ? "Voir moins" : "Voir plus de détails"}
                      <ChevronDown className={cn("ml-2 w-4 h-4 transition-transform", expandedCard === epargne.nom ? "rotate-180" : "")} />
                    </button>
                  </div>

                  {/* Expanded content */}
                  {expandedCard === epargne.nom && (
                    <div className="px-6 pb-6 pt-2 bg-surface-variant/30 animate-in slide-in-from-top-2">
                      <div className="mb-4">
                        <h4 className="font-bold text-primary-dark mb-2 text-sm">Caractéristiques :</h4>
                        <ul className="space-y-2">
                          {epargne.caracteristiques.map((carac, idx) => (
                            <li key={idx} className="flex items-start text-sm text-on-surface-variant">
                              <CheckCircle2 className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
                              <span>{carac}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-primary-dark mb-2 text-sm">Pièces à fournir :</h4>
                        <ul className="space-y-2">
                          {epargne.pieces.map((piece, idx) => (
                            <li key={idx} className="flex items-start text-sm text-on-surface-variant">
                              <CheckCircle2 className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
                              <span>{piece}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 text-center reveal-up">
          <Button asChild size="lg" variant="accent">
            <Link href="/contacts">Ouvrir un compte en agence</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
