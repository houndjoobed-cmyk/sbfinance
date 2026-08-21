import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const credits = [
  {
    categorie: "Besoin de fonds de roulement",
    nom: "Crédit aux Groupes de Cautions Solidaires (GCS)",
    slug: "gcs",
    description: "Organisation de femmes en petits groupes solidaires (3 à 5 membres) pour financer commerce, élevage, artisanat ou transformation.",
    cible: "Femmes majeures de la zone de couverture, porteuses d'une AGR.",
    conditions: ["Former un groupe (3-5 femmes)", "Participer aux formations", "Exercer une AGR", "Bonne réputation", "Accepter les visites", "Ouvrir un compte commun", "Désigner une caution personnelle (conjoint idéalement)", "Payer les frais"],
    garantieExigee: "Caution solidaire du groupe + caution personnelle + épargne de garantie préalable + épargne de capitalisation.",
    piecesAFournir: ["Reçu frais d'étude", "Formulaire de demande", "Pièces d'identité (membres + cautions)", "Photo de groupe devant l'activité", "Photo individuelle", "Justificatifs d'activité"],
    montantMin: 50000,
    montantMax: 500000,
    dureeMinMois: 6,
    dureeMaxMois: 12,
    tauxInteretAnnuel: "24% l'an dégressif",
    periodicite: "Hebdo, quinzaine, mensuelle",
    differeMois: null,
    fraisEtEpargne: "Dépôt garantie (10%), Épargne capitalisation (5%), Frais étude (500F/membre), Frais solidarité (500F/membre), Frais dossier (2%), Frais gestion (2%), Assurance (selon compagnie)."
  },
  {
    categorie: "Besoin de fonds de roulement",
    nom: "Crédit aux Groupements (CG)",
    slug: "cg",
    description: "Soutien à l'inclusion financière via des groupements solidaires de 10 à 30 personnes.",
    cible: "Femmes majeures de la zone, porteuses d'une AGR.",
    conditions: ["Former un groupement (10-30 femmes)", "Participer aux formations", "Exercer une AGR", "Bonne réputation", "Accepter les visites", "Compte commun", "Caution personnelle"],
    garantieExigee: "Caution solidaire + caution personnelle + épargne de garantie + épargne de capitalisation.",
    piecesAFournir: ["Reçu frais", "Demande signée", "Pièces d'identité", "Photo de groupe", "Photo individuelle", "Justificatifs d'activité"],
    montantMin: 50000,
    montantMax: 400000,
    dureeMinMois: 6,
    dureeMaxMois: 12,
    tauxInteretAnnuel: "24% l'an dégressif",
    periodicite: "Mensuelle",
    differeMois: null,
    fraisEtEpargne: "Dépôt garantie (10%), Épargne capitalisation (5%), Frais étude (500F/membre), Frais solidarité (500F/membre), Frais dossier (2%), Frais gestion (2%)."
  },
  {
    categorie: "Besoin de fonds de roulement",
    nom: "Crédit Individuel Caution Personnelle (CICP)",
    slug: "cicp",
    description: "Financement pour les micro-entrepreneurs et petits commerçants en activité désireux de développer leurs projets.",
    cible: "Micro-entrepreneurs et petits commerçants en activité.",
    conditions: ["Compte courant mouvementé", "AGR régulière", "Bonne moralité", "Accepter les visites"],
    garantieExigee: "Deux cautions personnelles (dont une propriétaire de son logement), épargne de garantie, épargne de capitalisation.",
    piecesAFournir: ["Reçu frais d'étude", "Formulaire de demande", "Formulaires de cautionnement", "Pièces d'identité", "Preuves juridiques", "Preuves d'activité", "Relevés bancaires"],
    montantMin: 100000,
    montantMax: 500000,
    dureeMinMois: 3,
    dureeMaxMois: 12,
    tauxInteretAnnuel: "24% l'an dégressif",
    periodicite: "Mensuelle",
    differeMois: 1,
    fraisEtEpargne: "Dépôt garantie (10%), Épargne capitalisation (5%), Frais étude (2000F), Frais solidarité (2000F), Frais dossier (2%), Frais gestion (3%)."
  },
  {
    categorie: "Besoin de fonds de roulement",
    nom: "Crédit aux Commerçants (CC)",
    slug: "cc",
    description: "Soutien financier en fonds de roulement pour les entreprises.",
    cible: "Entreprises et entrepreneurs structurés.",
    conditions: ["Avoir un compte courant adapté", "Exercer une AGR régulière", "Bonne moralité", "Accepter les visites"],
    garantieExigee: "Deux cautions personnelles + Sûreté réelle (Titre de propriété à 125% de la valeur, ou cession de loyer, ou DAT) + Domiciliation des recettes (150% de l'échéance).",
    piecesAFournir: ["Frais d'étude", "Formulaire de demande", "Formulaires de cautionnement", "Pièces d'identité", "Preuves juridiques", "Preuves d'activité", "Etat financier", "Relevés de comptes"],
    montantMin: 500001,
    montantMax: 10000000,
    dureeMinMois: 3,
    dureeMaxMois: 12,
    tauxInteretAnnuel: "24% l'an dégressif",
    periodicite: "Mensuelle",
    differeMois: 1,
    fraisEtEpargne: "Dépôt garantie (10%), Frais étude (2000F), Frais dossier (2%), Frais gestion (3%)."
  },
  {
    categorie: "Crédit à la consommation",
    nom: "Crédit aux Fonctionnaires (CF)",
    slug: "cf",
    description: "Crédit à la consommation pour les agents de l'État bénéficiant d'un contrat.",
    cible: "Agents de l'État (traitement domicilié au Trésor).",
    conditions: ["Adhésion aux conditions", "Avoir un compte courant adapté", "Autoriser le suivi de terrain"],
    garantieExigee: "Épargne de garantie.",
    piecesAFournir: ["Reçu frais", "Formulaire de demande", "Demande manuscrite", "Bulletins de paie", "Pièce d'identité", "IFU", "Contrat/Arrêté", "Attestation de service", "Présence au poste", "PVCS", "Photos"],
    montantMin: 100000,
    montantMax: 10000000,
    dureeMinMois: 12,
    dureeMaxMois: 84,
    tauxInteretAnnuel: "14,5% l'an dégressif (Prélèvement à la source mensuel)",
    periodicite: "Mensuelle (prélèvement à la source)",
    differeMois: 0,
    fraisEtEpargne: "Coût du PACK (17 000F), Dépôt garantie (2%), Frais dossier (2%), Frais gestion (1,5%)."
  },
  {
    categorie: "Crédit à la consommation",
    nom: "Crédit aux Salariés (SA)",
    slug: "sa",
    description: "Crédit pour les travailleurs du secteur privé justifiant d'un contrat de travail.",
    cible: "Salariés du secteur privé formel.",
    conditions: ["Homologation de l'entreprise", "Adhésion", "Compte courant à SBF", "Suivi de terrain"],
    garantieExigee: "Garantie de l'employeur (partenariat), Virement permanent ou gage véhicule (50% du prêt), caution personnelle, épargne de garantie, épargne de capitalisation.",
    piecesAFournir: ["Reçu frais", "Formulaire de demande", "Formulaires de cautionnement", "Bulletins de paie", "Relevé bancaire", "Pièces d'identité", "IFU", "Contrat de travail", "Attestation de travail", "PVCS", "Photos"],
    montantMin: 100000,
    montantMax: 5000000,
    dureeMinMois: 6,
    dureeMaxMois: 36,
    tauxInteretAnnuel: "18% l'an dégressif",
    periodicite: "Mensuelle",
    differeMois: 0,
    fraisEtEpargne: "Coût du PACK (16 000F), Dépôt garantie (5%), Frais dossier (2%), Frais gestion (1,5%)."
  },
  {
    categorie: "Crédit à la consommation",
    nom: "Crédit au Personnel (CP)",
    slug: "cp",
    description: "Accompagnement financier pour le personnel de SB Finance.",
    cible: "Agents de SB Finance (minimum 1 an d'ancienneté, CDD ou CDI).",
    conditions: ["Virement permanent", "Caution personnelle"],
    garantieExigee: "Virement permanent (retenue sur salaire), caution personnelle.",
    piecesAFournir: ["Formulaire de demande", "Formulaires de cautionnement", "Demande manuscrite de retenue", "Bulletins de paie", "Pièces d'identité", "IFU", "Contrat de travail", "Photos"],
    montantMin: 100000,
    montantMax: 10000000,
    dureeMinMois: 12,
    dureeMaxMois: 60,
    tauxInteretAnnuel: "6% l'an dégressif",
    periodicite: "Mensuelle",
    differeMois: 0,
    fraisEtEpargne: ""
  },
  {
    categorie: "Crédit à la consommation",
    nom: "Crédit Moto au Personnel (CMP)",
    slug: "cmp",
    description: "Acquisition de motos pour faciliter les déplacements des agents de terrain.",
    cible: "Agents de terrain de SB Finance (minimum 6 mois d'ancienneté).",
    conditions: ["Virement permanent", "Caution personnelle"],
    garantieExigee: "Virement permanent, caution personnelle.",
    piecesAFournir: ["Formulaire de demande", "Justificatif d'achat", "Formulaires de cautionnement", "Demande manuscrite", "Bulletins de paie", "Pièces d'identité", "IFU", "Contrat de travail", "Photos"],
    montantMin: 100000,
    montantMax: 800000,
    dureeMinMois: 6,
    dureeMaxMois: 36,
    tauxInteretAnnuel: "0% dégressif",
    periodicite: "Mensuelle",
    differeMois: 0,
    fraisEtEpargne: ""
  },
  {
    categorie: "Crédit à la consommation",
    nom: "Crédit aux Associés (CA)",
    slug: "ca",
    description: "Financement des biens d'équipement et d'investissement pour les actionnaires.",
    cible: "Actionnaires de Salem Braha Finance.",
    conditions: ["Avoir un compte courant adapté", "Exercer une AGR", "Accepter les visites"],
    garantieExigee: "Deux cautions personnelles + épargne de garantie/capitalisation (Sûreté réelle requise si > 5 000 000 FCFA).",
    piecesAFournir: ["Formulaire de demande", "Formulaires de cautionnement", "Pièces d'identité", "Preuves juridiques", "Preuves d'activité", "Etat financier", "Relevé bancaire", "IFU"],
    montantMin: 500000,
    montantMax: 10000000,
    dureeMinMois: 3,
    dureeMaxMois: 60,
    tauxInteretAnnuel: "3% l'an dégressif",
    periodicite: "Mensuelle",
    differeMois: 3,
    fraisEtEpargne: ""
  },
  {
    categorie: "Crédit Cause",
    nom: "Crédit Bon de Commande (CBC)",
    slug: "cbc",
    description: "Financement de bon de commande pour honorer les commandes importantes.",
    cible: "Entreprises immatriculées au Bénin avec contrats/bons de commande de l'État, structures privées de référence, ou organismes internationaux.",
    conditions: ["Sensibilisation", "Statut", "Activité", "Réputation", "Accepter les visites", "Bon de commande valide", "Capacité financière"],
    garantieExigee: "Deux cautions personnelles (notariées), Épargne de garantie, Deux chèques (un rempli, un à blanc), Co-signature du compte bancaire, Sûreté réelle (Titre foncier obligatoire si >= 10M FCFA).",
    piecesAFournir: ["Formulaire de demande", "Pièces d'identité", "Preuves juridiques", "Frais d'étude", "Attestation de non-engagement", "Etat financier", "Relevés bancaires", "Factures et devis", "Bon de commande", "Cautionnement notarié", "Co-signature", "Copie notification huissier"],
    montantMin: 1000000,
    montantMax: 30000000,
    dureeMinMois: 3,
    dureeMaxMois: 6,
    tauxInteretAnnuel: "24% l'an dégressif (Remboursement In Fine)",
    periodicite: "In Fine",
    differeMois: 3,
    fraisEtEpargne: "Dépôt garantie (10%), Frais étude (10 000F à 30 000F selon montant), Frais dossier (2%), Frais gestion (3%)."
  },
  {
    categorie: "Crédit Cause",
    nom: "Crédit Avance sur Facture (CAF)",
    slug: "caf",
    description: "Paiement anticipé d'une facture émise pour soulager la trésorerie.",
    cible: "Entreprises détenant des factures en cours (prestation réalisée/marchandise livrée) de l'État ou grandes structures.",
    conditions: ["Sensibilisation", "Statut", "Activité", "Réputation", "Accepter les visites", "Factures exigibles", "Capacité financière"],
    garantieExigee: "Idem que CBC (cautions notariées, chèques, co-signature, sûreté réelle si >= 10M FCFA).",
    piecesAFournir: ["Formulaire de demande", "Pièces d'identité", "Preuves juridiques", "Frais d'étude", "Attestation de non-engagement", "Etat financier", "Relevés bancaires", "Facture définitive", "Bon de commande", "Cautionnement notarié", "Co-signature", "Bordereau de livraison / PV de réception"],
    montantMin: 1000000,
    montantMax: 30000000,
    dureeMinMois: 3,
    dureeMaxMois: 6,
    tauxInteretAnnuel: "24% l'an dégressif (Remboursement In Fine)",
    periodicite: "In Fine",
    differeMois: 0,
    fraisEtEpargne: "Dépôt garantie (10%), Frais étude (10 000F à 30 000F), Frais dossier (2%), Frais gestion (3%)."
  }
];

async function main() {
  console.log("Suppression des anciens produits de crédit...");
  await prisma.produitCredit.deleteMany();

  console.log("Insertion des nouveaux produits de crédit...");
  for (const credit of credits) {
    await prisma.produitCredit.create({
      data: {
        categorie: credit.categorie,
        nom: credit.nom,
        slug: credit.slug,
        description: credit.description,
        cible: credit.cible,
        conditions: credit.conditions,
        garantieExigee: credit.garantieExigee,
        piecesAFournir: credit.piecesAFournir,
        montantMin: credit.montantMin,
        montantMax: credit.montantMax,
        dureeMinMois: credit.dureeMinMois,
        dureeMaxMois: credit.dureeMaxMois,
        tauxInteretAnnuel: credit.tauxInteretAnnuel,
        periodicite: credit.periodicite,
        fraisEtEpargne: credit.fraisEtEpargne,
        differeMois: credit.differeMois,
      }
    });
    console.log(`- Injecté: ${credit.nom}`);
  }

  console.log("Terminé avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
