import prisma from './src/lib/prisma';

const offres = [
  {
    titre: "ASSISTANT(E) JURIDIQUE H/F",
    slug: "assistant-juridique",
    dateLimite: "31 AOÛT 2026",
    missions: [
      "Tenir le secrétariat juridique et rédiger les actes",
      "Suivre les actes et garanties hypothécaires (crédits notariés)",
      "Gérer le recouvrement judiciaire et le contentieux",
      "Gérer les saisies, réquisitions et successions",
      "Administrer les contrats et les modèles internes",
      "Assurer la veille juridique et le conseil (SFD)"
    ],
    profil: [
      "Formation : BAC+3/4 en Droit des Affaires",
      "Expérience : 2 ans minimum à un poste similaire",
      "Savoir-faire : Bonne maîtrise des réglementations et de leur évolution",
      "Communication : Excellente expression écrite et orale",
      "Aptitudes : Rigueur, discrétion, diplomatie, intégrité"
    ]
  },
  {
    titre: "CHARGÉ(E) DE MOBILISATION DES RESSOURCES H/F",
    slug: "charge-de-mobilisation-des-ressources",
    dateLimite: "31 AOÛT 2026",
    missions: [
      "Analyser les opportunités de placement.",
      "Élaborer la stratégie de mobilisation des ressources.",
      "Piloter et suivre le plan de mobilisation.",
      "Développer et fidéliser les épargnants.",
      "Renforcer les capacités des équipes commerciales.",
      "Proposer de nouvelles idées d'affaires."
    ],
    profil: [
      "Formation : BAC+4/5 en Finance ou Gestion.",
      "Expérience : 3 ans minimum à un poste similaire.",
      "Expérience en relations publiques appréciée.",
      "Préparation de propositions et requêtes de mobilisation.",
      "Aptitudes : Rigueur, aisance relationnelle, éthique."
    ]
  },
  {
    titre: "RESPONSABLE RISQUE & MONITORING H/F",
    slug: "responsable-risque-monitoring",
    dateLimite: "31 AOÛT 2026",
    missions: [
      "Superviser toutes les activités de crédit, de la prospection au recouvrement",
      "Veiller à l'application et à la révision de la politique de crédit",
      "Suivre les indicateurs de qualité du portefeuille (PAR, provisions)",
      "Anticiper les risques de surendettement, de fraude et de concentration",
      "Définir les plans de réduction des risques et de recouvrement",
      "Qualités : Rigueur, analyse, intégrité"
    ],
    profil: [
      "Formation : BAC+4/5 en Finance, Gestion ou Économie",
      "Expérience : 5 ans min., dont 2 ans en supervision crédit/risques",
      "Compétences : Analyse financière, gestion des risques et recouvrement",
      "Aptitudes : Leadership avéré et maîtrise de MS Office",
      "Aptitudes : Rigueur, discrétion, diplomatie, intégrité"
    ]
  },
  {
    titre: "RESPONSABLE CONTRÔLE PERMANENT & CONFORMITÉ H/F",
    slug: "responsable-controle-permanent-conformite",
    dateLimite: "31 AOÛT 2026",
    missions: [
      "Piloter le contrôle permanent de Niveau 1 et de Niveau 2",
      "Animer le dispositif de risque opérationnel (cartographie, KRI, fraudes)",
      "Mettre en place la gestion de crise et le PCA",
      "Garantir la conformité réglementaire et la veille normative",
      "Cartographier les risques de non-conformité",
      "Traiter les dossiers LCB/FT/FP et les déclarations"
    ],
    profil: [
      "Formation : BAC+4/5 en Audit, Risque, Finance ou Banque",
      "Expérience : 5 ans minimum à un poste similaire",
      "Savoir-faire : Maîtrise du contrôle interne et de la traçabilité",
      "Connaissances : Finance, comptabilité, droit et risques",
      "Aptitudes : Rigueur, analyse, intégrité, confidentialité"
    ]
  },
  {
    titre: "ASSISTANT(E) DE DIRECTION H/F",
    slug: "assistant-de-direction",
    dateLimite: "31 AOÛT 2026",
    missions: [
      "Accueil physique, téléphonique et courrier.",
      "Agenda et déplacements de la Direction.",
      "Organisation des réunions et rédaction des PV/CR.",
      "Suivi des décisions et des échéances.",
      "Logistique, classement et archivage.",
      "Confidentialité stricte des données."
    ],
    profil: [
      "Formation : BAC+3/4 Assistanat / Secrétariat / Administration.",
      "Expérience : 2 ans min. (Secteur financier/SFD apprécié).",
      "Technique : MS Office (avancé), rédaction, messagerie.",
      "Langues : Français parfait, anglais (atout).",
      "Aptitudes : Discrétion, rigueur, organisation, résistance à la pression."
    ]
  }
];

async function main() {
  console.log("Seeding job offers...");
  for (const offre of offres) {
    await prisma.offreEmploi.upsert({
      where: { slug: offre.slug },
      update: {},
      create: offre,
    });
  }
  console.log("Job offers seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
