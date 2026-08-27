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
    description: "Organisation de femmes en petits groupes solidaires (formels ou informels) de trois à cinq membres visant à obtenir un crédit auprès de Salem Braha Finance. L'objectif est de financer des activités diverses : commerce, élevage, artisanat ou transformation.",
    cible: "Ce produit s'adresse aux femmes majeures résidant dans la zone de couverture de l'institution et porteuses d'une Activité Génératrice de Revenus (AGR). Les bénéficiaires doivent obligatoirement s'associer en groupe avec d'autres femmes présentant des capacités de remboursement similaires.",
    conditions: [
      "Former un groupe solidaire : S'associer avec 3 à 5 femmes de la même localité et du même milieu socio-économique",
      "Participer aux formations : Assister ensemble à une séance de sensibilisation de l'agence et assimiler le principe de solidarité (engagement à rembourser les dettes des membres défaillants)",
      "Exercer une activité : Avoir déjà une Activité Génératrice de Revenus (AGR) individuelle en cours",
      "Jouir d'une bonne réputation : Être reconnu au sein de sa communauté comme un emprunteur fiable et de confiance",
      "Accepter les visites : Autoriser les agents de SB Finance à visiter votre domicile et votre lieu d'activité avant l'octroi du crédit et tout au long du remboursement",
      "Ouvrir un compte commun : Créer un compte d'épargne collectif au nom du groupe solidaire",
      "Désigner une caution personnelle : Fournir une garantie personnelle pour chaque membre, idéalement le conjoint",
      "Payer les frais : Accepter de payer tous les frais liés au crédit"
    ],
    garantieExigee: "L'octroi du crédit est conditionné par un mécanisme de garantie double : une caution solidaire du groupe, complétée par une caution personnelle de chaque membre (de préférence leur conjoint). À cela s'ajoute la constitution d'une épargne de garantie préalable au déblocage des fonds, ainsi qu'une épargne de capitalisation prélevée progressivement lors du remboursement du prêt.",
    piecesAFournir: [
      "Photocopie du reçu de paiement des frais d'étude de dossier",
      "Formulaire de demande de crédit dûment rempli et signé par tous les membres du groupe de caution solidaire",
      "Une copie en cours de validité du CIP, de la carte biométrique ou du passeport de chaque membre du groupe et de leur caution",
      "Une photo récente en pied de l'ensemble des membres du groupe, prise devant l'activité de la responsable (à renouveler tous les deux ans)",
      "Une photo d'identité récente par membre",
      "Tous documents attestant de l'exercice ou de la continuité de l'activité des membres"
    ],
    montantMin: 50000,
    montantMax: 500000,
    dureeMinMois: 6,
    dureeMaxMois: 12,
    tauxInteretAnnuel: "24% l'an dégressif",
    periodicite: "Hebdomadaire, quinzaine ou mensuelle",
    differeMois: null,
    fraisEtEpargne: "Dépôt de garantie : 10% du montant du crédit étalé sur les échéances • Épargne de capitalisation : 5% du montant du crédit octroyé • Frais d'étude de dossier : 500F CFA par membre (non remboursable) • Frais de solidarité : 500F CFA par membre (non remboursable) • Frais de dossier : 2% du montant du crédit octroyé (non remboursable) • Frais de gestion : 2% du montant du crédit octroyé (non remboursable) • Assurance : Taux en vigueur par les compagnies d'assurances agréées par SBF"
  },
  {
    categorie: "Besoin de fonds de roulement",
    nom: "Crédit aux Groupements (CG)",
    slug: "cg",
    description: "Ce produit est conçu pour soutenir l'inclusion financière et les activités génératrices de revenus des femmes (commerce, élevage, artisanat et transformation) par la constitution de groupements solidaires de 10 à 30 personnes. Qu'ils soient formels ou informels, ces groupements permettent à leurs membres d'obtenir des crédits auprès de SB Finance, en garantissant les remboursements grâce à un système de caution solidaire.",
    cible: "Ce produit s'adresse aux femmes majeures résidant dans la zone de couverture de l'institution et porteuses d'une Activité Génératrice de Revenus (AGR). Les bénéficiaires doivent obligatoirement s'associer en groupement avec d'autres femmes présentant des capacités de remboursement similaires.",
    conditions: [
      "Former un groupement : S'associer avec 10 à 30 femmes de la même localité et du même milieu socio-économique",
      "Participer aux formations : Assister ensemble à une séance de sensibilisation de l'agence et assimiler le principe de solidarité (engagement à rembourser les dettes des membres défaillants)",
      "Exercer une activité : Avoir déjà une Activité Génératrice de Revenus (AGR) commune ou individuelle en cours",
      "Jouir d'une bonne réputation : Être reconnu au sein de sa communauté comme un emprunteur fiable et de confiance",
      "Accepter les visites : Autoriser les agents de SB Finance à visiter votre domicile et votre lieu d'activité avant l'octroi du crédit et tout au long du remboursement",
      "Ouvrir un compte commun : Créer un compte d'épargne collectif au nom du groupement",
      "Désigner une caution personnelle : Fournir une garantie personnelle pour chaque membre, idéalement le conjoint",
      "Payer les frais : Accepter de payer tous les frais liés au crédit"
    ],
    garantieExigee: "L'octroi du crédit est conditionné par un mécanisme de garantie double : une caution solidaire du groupe, complétée par une caution personnelle de chaque membre (de préférence leur conjoint). À cela s'ajoute la constitution d'une épargne de garantie préalable au déblocage des fonds, ainsi qu'une épargne de capitalisation prélevée progressivement lors du remboursement du prêt.",
    piecesAFournir: [
      "Photocopie du reçu de paiement des frais d'étude de dossier",
      "Formulaire de demande de crédit dûment rempli et signé par tous les membres du groupement",
      "Une copie en cours de validité du CIP, de la carte biométrique ou du passeport de chaque membre du groupement",
      "Une photo récente en pied de l'ensemble des membres du groupement, prise devant l'activité de la responsable (à renouveler tous les deux ans)",
      "Une photo d'identité récente par membre",
      "Tous documents attestant de l'exercice ou de la continuité de l'activité des membres"
    ],
    montantMin: 50000,
    montantMax: 400000,
    dureeMinMois: 6,
    dureeMaxMois: 12,
    tauxInteretAnnuel: "24% l'an dégressif",
    periodicite: "Hebdomadaire, quinzaine ou mensuelle",
    differeMois: null,
    fraisEtEpargne: "Dépôt de garantie : 10% du montant du crédit étalé sur les échéances • Épargne de capitalisation : 5% du montant du crédit octroyé • Frais d'étude de dossier : 500F CFA par membre (non remboursable) • Frais de solidarité : 500F CFA par membre (non remboursable) • Frais de dossier : 2% du montant du crédit octroyé (non remboursable) • Frais de gestion : 2% du montant du crédit octroyé (non remboursable) • Assurance : Taux en vigueur par les compagnies d'assurances agréées par SBF"
  },
  {
    categorie: "Besoin de fonds de roulement",
    nom: "Crédit Individuel Caution Personnelle (CICP)",
    slug: "cicp",
    description: "Hommes et femmes porteurs d'une activité génératrice de revenus, désireux d'être accompagnés pour développer leurs projets. Ce produit est conçu pour les micro-entrepreneurs et les petits commerçants en activité au sein de notre zone de couverture.",
    cible: "Ce produit est conçu pour les micro-entrepreneurs et les petits commerçants en activité au sein de notre zone de couverture.",
    conditions: [
      "Sensibilisation : Participer au moins à une séance d'information de l'agence",
      "Statut : Avoir un compte courant adapté au sein de l'institution et mouvementer régulièrement ce compte",
      "Activité : Exercer une Activité Génératrice de Revenus (AGR) en situation régulière et avoir un siège social vérifiable",
      "Réputation : Jouir d'une bonne moralité au sein de la communauté et d'un excellent historique de crédit auprès de SBF pour les cas de renouvellement",
      "Accepter les visites : Autoriser les agents de SB Finance à visiter votre domicile et votre lieu d'activité avant l'octroi du crédit et tout au long du remboursement"
    ],
    garantieExigee: "L'octroi de ce financement est subordonné à deux cautions personnelles, dont l'une doit être propriétaire de son logement. L'emprunteur doit également constituer une épargne de garantie avant le décaissement, ainsi qu'une épargne de capitalisation alimentée progressivement pendant toute la durée du remboursement.",
    piecesAFournir: [
      "Photocopie du reçu des frais d'étude de dossier",
      "Formulaire de demande rempli et signé par le demandeur (document fourni par SBF)",
      "Fiches de cautionnement remplies et signées par les cautions (document fourni par SBF)",
      "Une copie en cours de validité du CIP, de la carte biométrique ou du passeport du demandeur et de ses cautions",
      "Documents justifiant l'autorisation d'exercice de l'activité",
      "Documents attestant de la continuité de l'activité (registre des ventes et achats, fiches de stock, etc.)",
      "Relevés de comptes courant et d'épargne si nécessaire (documents fournis par SBF)",
      "Tout autre justificatif jugé nécessaire par l'institution"
    ],
    montantMin: 100000,
    montantMax: 500000,
    dureeMinMois: 3,
    dureeMaxMois: 12,
    tauxInteretAnnuel: "24% l'an dégressif",
    periodicite: "Hebdomadaire, quinzaine ou mensuelle",
    differeMois: 1,
    fraisEtEpargne: "Dépôt de garantie : 10% du montant du crédit octroyé • Épargne de capitalisation : 5% du montant du crédit étalé sur les échéances • Frais d'étude de dossier : 2 000F CFA (non remboursable) • Frais de solidarité : 2 000F CFA (non remboursable) • Frais de dossier : 2% du montant du crédit octroyé (non remboursable) • Frais de gestion : 3% du montant du crédit octroyé (non remboursable) • Assurance : Taux en vigueur par les compagnies d'assurances agréées par SBF"
  },
  {
    categorie: "Besoin de fonds de roulement",
    nom: "Crédit aux Commerçants (CC)",
    slug: "cc",
    description: "Personnes physique ou morale de la zone d'intervention de l'agence, porteurs d'une activité génératrice de revenus. L'octroi du crédit est conditionné par le dépôt d'une garantie matérielle (sûreté réelle) auprès de Salem Braha Finance. Ce produit s'adresse aux entreprises et entrepreneurs déjà structurés qui ont besoin d'un fonds de roulement.",
    cible: "Ce produit s'adresse aux entreprises et entrepreneurs déjà structurés qui ont besoin d'un fonds de roulement.",
    conditions: [
      "Sensibilisation : Participer au moins à une séance d'information de l'agence",
      "Statut : Avoir un compte courant adapté au sein de l'institution et mouvementer régulièrement ce compte",
      "Activité : Exercer une Activité Génératrice de Revenus (AGR) en situation régulière",
      "Réputation : Jouir d'une bonne moralité au sein de la communauté et d'un excellent historique de crédit auprès de SBF pour les cas de renouvellement",
      "Accepter les visites : Autoriser les agents de SB Finance à visiter votre domicile et votre lieu d'activité avant l'octroi du crédit et tout au long du remboursement"
    ],
    garantieExigee: "L'octroi de ce financement est subordonné à : deux cautions personnelles (dont l'une doit être propriétaire de son logement), une épargne de garantie avant le décaissement, une épargne de capitalisation alimentée progressivement, et un engagement de domiciliation des recettes hebdomadaires à hauteur de 150% de l'échéance contractuelle. Une garantie matérielle est également exigée (titre de propriété à 125% de la valeur, contrat de cession de loyer par acte notarié, ou Dépôt À Terme couvrant le montant total).",
    piecesAFournir: [
      "Photocopie du reçu des frais d'étude de dossier",
      "Formulaire de demande rempli et signé par le demandeur (document fourni par SBF)",
      "Fiches de cautionnement remplies et signées par les cautions (document fourni par SBF)",
      "Une copie en cours de validité du CIP, de la carte biométrique ou du passeport du demandeur et de ses cautions",
      "Documents justifiant l'autorisation d'exercice de l'activité (registre de commerce, statut, attestation IFU, RIB, etc.)",
      "Documents attestant de la continuité de l'activité (registre des ventes et achats, fiches de stock, etc.)",
      "État financier de la dernière année si le montant sollicité est supérieur à 5 000 000 FCFA",
      "Relevés du compte courant à SBF pour les trois derniers mois",
      "Relevés bancaires des six derniers mois si le montant est supérieur à 7 000 000 FCFA",
      "Une copie de l'Identifiant Fiscal Unique (IFU)",
      "Tout autre justificatif jugé nécessaire par l'institution"
    ],
    montantMin: 500001,
    montantMax: 10000000,
    dureeMinMois: 3,
    dureeMaxMois: 12,
    tauxInteretAnnuel: "24% l'an dégressif",
    periodicite: "Quinzaine ou mensuelle",
    differeMois: 1,
    fraisEtEpargne: "Dépôt de garantie : 10% du montant du crédit octroyé • Épargne de capitalisation : 5% du montant du crédit étalé sur les échéances • Frais d'étude de dossier : 2 000F CFA (non remboursable) • Frais de solidarité : 2 000F CFA (non remboursable) • Frais de dossier : 2% du montant du crédit octroyé (non remboursable) • Frais de gestion : 3% du montant du crédit octroyé (non remboursable) • Assurance : Taux en vigueur par les compagnies d'assurances agréées par SBF"
  },
  {
    categorie: "Crédit à la consommation",
    nom: "Crédit aux Fonctionnaires (CF)",
    slug: "cf",
    description: "Agent de l'État dont le traitement est domicilié au Trésor public, bénéficiant d'un contrat couvrant l'entièreté de l'échéancier du prêt. Ce produit est destiné aux agents de l'État en fonction sur toute l'étendue du territoire national.",
    cible: "Ce produit est destiné aux agents de l'État en fonction sur toute l'étendue du territoire national.",
    conditions: [
      "Adhésion : Accepter les conditions spécifiques de SB Finance pour ce produit",
      "Compte bancaire : Ouvrir un compte courant au sein de notre institution (possible le jour du décaissement)",
      "Suivi de terrain : Autoriser les agents de SB Finance à visiter votre domicile et votre lieu d'activité, avant l'octroi du crédit et durant toute la période de remboursement"
    ],
    garantieExigee: "L'octroi de ce financement est subordonné à la constitution d'une épargne de garantie avant le décaissement.",
    piecesAFournir: [
      "Photocopie du reçu des frais d'étude de dossier",
      "Formulaire de demande de crédit (à retirer auprès de SBF)",
      "Demande manuscrite adressée au Directeur Général du Trésor Public, en précisant le montant du prélèvement mensuel ainsi que la durée du crédit",
      "Fiches de paie des trois derniers mois (fournir 2 copies pour le dernier mois)",
      "Deux copies du CIP ou de la Carte Biométrique en cours de validité",
      "Une copie de l'Identifiant Fiscal Unique (IFU)",
      "Une copie du contrat de travail ou de l'arrêté de nomination (pour les agents permanents de l'État)",
      "L'original et une photocopie de l'Attestation de validité de service ou de l'Attestation de travail (datant de moins d'un an)",
      "L'original de l'Attestation de présence au poste (datant de moins de trois mois), signée par le Directeur et co-signée par le CRP s'il s'agit des instituteurs",
      "Le Procès-verbal de Cession sur Salaire délivré par le tribunal (Original + 1 photocopie)",
      "Trois photos d'identité récentes et une photo complète récente (nom et prénoms au verso)",
      "Une chemise dossier pour ranger l'ensemble des pièces"
    ],
    montantMin: 100000,
    montantMax: 10000000,
    dureeMinMois: 12,
    dureeMaxMois: 84,
    tauxInteretAnnuel: "14,5% l'an dégressif",
    periodicite: "Mensuelle (prélèvement à la source)",
    differeMois: 0,
    fraisEtEpargne: "Coût du PACK (y compris ouverture de compte) : 17 000F CFA • Frais gestion du PACK (renouvellement) : 6 000F CFA • Dépôt de garantie : 2% du montant du crédit octroyé • Frais d'étude de dossier : 2 000F CFA (non remboursable) • Frais de dossier : 2% du montant du crédit octroyé (non remboursable) • Frais de gestion : 1,5% du montant du crédit octroyé (non remboursable) • Assurance : Taux en vigueur par les compagnies d'assurances agréées par SBF"
  },
  {
    categorie: "Crédit à la consommation",
    nom: "Crédit aux Salariés (CS)",
    slug: "sa",
    description: "Travailleur du secteur privé justifiant d'un contrat de travail dont le terme est postérieur à la dernière échéance du prêt. Ce produit est destiné aux salariés du secteur privé formel justifiant de bases financières solides, de bilans certifiés et d'une excellente réputation. Il est également accessible aux employés des institutions décentralisées.",
    cible: "Ce produit est destiné aux salariés du secteur privé formel justifiant de bases financières solides, de bilans certifiés et d'une excellente réputation. Il est également accessible aux employés des institutions décentralisées.",
    conditions: [
      "Sensibilisation : Participer au moins à une séance d'information de l'agence",
      "Homologation de l'entreprise : La validation de la structure est conditionnée par la transmission de certains documents administratifs et comptables par l'employeur (Registre du commerce, statuts, états financiers des trois dernières années, etc.)",
      "Adhésion : Accepter les conditions spécifiques de SB Finance pour ce produit",
      "Compte courant à SBF : Ouvrir un compte courant au sein de notre institution",
      "Suivi de terrain : Autoriser les agents de SB Finance à visiter votre domicile et votre lieu d'activité, avant l'octroi du crédit et durant toute la période de remboursement"
    ],
    garantieExigee: "L'octroi de ce financement est subordonné aux conditions suivantes : la garantie de l'employeur (cautionnement formel via un contrat de partenariat), le virement permanent ou gage du véhicule (couverture d'au moins 50% du montant total du prêt), une caution personnelle, une épargne de garantie (dépôt bloqué avant le déblocage des fonds), et une épargne de capitalisation constituée progressivement durant toute la période de remboursement.",
    piecesAFournir: [
      "Photocopie du reçu des frais d'étude de dossier",
      "Formulaire de demande rempli et signé par le demandeur (document fourni par SBF)",
      "Fiches de cautionnement remplies et signées par l'employeur et la caution personnelle (document fourni par SBF)",
      "Fiches de paie des trois derniers mois",
      "Relevé bancaire des trois derniers mois",
      "Une copie en cours de validité du CIP, de la carte biométrique ou du passeport du demandeur et de sa caution",
      "Une copie de l'Identifiant Fiscal Unique (IFU)",
      "Une copie du contrat de travail et acte de nomination au besoin",
      "L'original de l'Attestation de travail datant de moins d'un mois",
      "La copie du Procès-verbal de Cession sur Salaire délivré par le tribunal (l'original est déposé auprès de l'employeur)",
      "Trois photos d'identité récentes du demandeur, accompagnées d'une photo en pied récente du demandeur et de sa caution personnelle (nom et prénoms au verso)",
      "Une chemise dossier pour ranger l'ensemble des pièces"
    ],
    montantMin: 100000,
    montantMax: 5000000,
    dureeMinMois: 6,
    dureeMaxMois: 36,
    tauxInteretAnnuel: "18% l'an dégressif",
    periodicite: "Mensuelle (prélèvement à la source)",
    differeMois: 0,
    fraisEtEpargne: "Coût du PACK (y compris ouverture de compte) : 16 000F CFA • Frais gestion du PACK (renouvellement) : 6 000F CFA • Dépôt de garantie : 5% du montant du crédit octroyé • Frais d'étude de dossier : 2 000F CFA (non remboursable) • Frais de dossier : 2% du montant du crédit octroyé (non remboursable) • Frais de gestion : 1,5% du montant du crédit octroyé (non remboursable) • Assurance : Taux en vigueur par les compagnies d'assurances agréées par SBF"
  },
  {
    categorie: "Crédit à la consommation",
    nom: "Crédit au Personnel (CP)",
    slug: "cp",
    description: "SB Finance accompagne ses salariés dans la satisfaction des besoins d'équipements et de petit investissement. Cette démarche vise à améliorer directement leurs conditions de travail et de vie, afin de renforcer durablement leur fidélisation.",
    cible: "Ce produit s'adresse aux agents de SB Finance justifiant d'au moins un an d'ancienneté et titulaires d'un contrat de travail (CDD ou CDI).",
    conditions: [
      "Virement permanent : Les échéances du crédit sont prélevées mensuellement et de manière automatique par SB Finance, sur toute la durée de l'emprunt",
      "Caution personnelle : L'engagement d'au moins une personne physique pour garantir la dette"
    ],
    garantieExigee: "L'octroi de ce financement est subordonné aux conditions suivantes : le virement permanent (les échéances sont prélevées mensuellement et automatiquement par SB Finance sur toute la durée de l'emprunt) et une caution personnelle (l'engagement d'au moins une personne physique pour garantir la dette).",
    piecesAFournir: [
      "Formulaire de demande rempli et signé par le demandeur (document fourni par SBF)",
      "Fiche de cautionnement remplie et signée par la caution personnelle (document fourni par SBF)",
      "Demande manuscrite de retenue sur salaire adressée à la Directrice Générale de Salem Braha Finance, en précisant l'objet du crédit, le montant et la durée (adressée au Président du Conseil d'Administration si le demandeur est un membre du CODIR)",
      "Fiches de paie des trois derniers mois",
      "Une copie en cours de validité du CIP, de la carte biométrique ou du passeport du demandeur et de sa caution",
      "Une copie de l'Identifiant Fiscal Unique (IFU)",
      "Une copie du contrat de travail",
      "Deux photos d'identité récentes du demandeur, accompagnées d'une photo en pied récente du demandeur et de sa caution personnelle (nom et prénoms au verso)"
    ],
    montantMin: 100000,
    montantMax: 10000000,
    dureeMinMois: 12,
    dureeMaxMois: 60,
    tauxInteretAnnuel: "6% l'an dégressif",
    periodicite: "Mensuelle (prélèvement à la source)",
    differeMois: 0,
    fraisEtEpargne: "Assurance : Taux en vigueur par les compagnies d'assurances agréées par SBF"
  },
  {
    categorie: "Crédit à la consommation",
    nom: "Crédit Moto au Personnel (CMP)",
    slug: "cmp",
    description: "Financement destiné à l'acquisition de motos pour les agents opérationnels de Salem Braha Finance, afin de faciliter leurs déplacements sur le terrain dans l'exercice de leurs missions.",
    cible: "Ce produit s'adresse aux agents de terrain (Chargés de Prêt, Chefs d'Agence, Agents de Collecte ou de Recouvrement) ayant besoin d'une moto pour leur activité. Pour en bénéficier, ils doivent justifier d'au moins six (06) mois d'ancienneté à SBF et posséder un contrat de travail couvrant toute la durée du crédit.",
    conditions: [
      "Virement permanent : Les échéances du crédit sont prélevées mensuellement et de manière automatique par SB Finance, sur toute la durée de l'emprunt",
      "Caution personnelle : L'engagement d'au moins une personne physique pour garantir la dette"
    ],
    garantieExigee: "L'octroi de ce financement est subordonné aux conditions suivantes : le virement permanent (les échéances sont prélevées mensuellement et automatiquement par SB Finance sur toute la durée de l'emprunt) et une caution personnelle (l'engagement d'au moins une personne physique pour garantir la dette).",
    piecesAFournir: [
      "Formulaire de demande rempli et signé par le demandeur (document fourni par SBF)",
      "Facture pro-forma délivrée par le concessionnaire de la moto",
      "Fiche de cautionnement remplie et signée par la caution personnelle (document fourni par SBF)",
      "Demande manuscrite de retenue sur salaire adressée à la Directrice Générale de Salem Braha Finance, en précisant l'objet du crédit, le montant et la durée",
      "Fiches de paie des trois derniers mois",
      "Une copie en cours de validité du CIP, de la carte biométrique ou du passeport du demandeur et de sa caution",
      "Une copie de l'Identifiant Fiscal Unique (IFU)",
      "Une copie du contrat de travail",
      "Deux photos d'identité récentes du demandeur, accompagnées d'une photo en pied récente du demandeur et de sa caution personnelle (nom et prénoms au verso)"
    ],
    montantMin: 100000,
    montantMax: 800000,
    dureeMinMois: 6,
    dureeMaxMois: 36,
    tauxInteretAnnuel: "0% dégressif",
    periodicite: "Mensuelle (prélèvement à la source)",
    differeMois: 0,
    fraisEtEpargne: "Assurance : Taux en vigueur par les compagnies d'assurances agréées par SBF"
  },
  {
    categorie: "Crédit à la consommation",
    nom: "Crédit aux Associés (CA)",
    slug: "ca",
    description: "SB Finance accompagne les associés de Salem Braha Finance dans le financement des biens d'équipement et d'investissement.",
    cible: "Être un actionnaire de Salem Braha Finance.",
    conditions: [
      "Statut : Avoir un compte courant adapté au sein de l'institution",
      "Activité : Exercer une Activité Génératrice de Revenus (AGR) en situation régulière",
      "Accepter les visites : Autoriser les agents de SB Finance à visiter votre domicile et votre lieu d'activité avant l'octroi du crédit et tout au long du remboursement"
    ],
    garantieExigee: "L'octroi de ce financement est subordonné à : deux cautions personnelles, une épargne de garantie avant le décaissement, ainsi qu'une épargne de capitalisation alimentée progressivement pendant toute la durée du remboursement. Si le montant du crédit est supérieur à 5 000 000 FCFA, une garantie matérielle est exigée (titre de propriété à 125%, contrat de cession de loyer par acte notarié, ou Dépôt À Terme couvrant le montant total).",
    piecesAFournir: [
      "Formulaire de demande rempli et signé par le demandeur (document fourni par SBF)",
      "Fiches de cautionnement remplies et signées par les cautions (document fourni par SBF)",
      "Une copie en cours de validité du CIP, de la carte biométrique ou du passeport du demandeur et de ses cautions",
      "Documents justifiant l'autorisation d'exercice de l'activité (registre de commerce, statut, attestation IFU, etc.)",
      "Documents attestant de la continuité de l'activité (registre des ventes et achats, fiches de stock, etc.)",
      "État financier de la dernière année si le montant sollicité est supérieur à 5 000 000 FCFA",
      "Relevé du compte courant à SBF pour les trois derniers mois",
      "Une copie de l'Identifiant Fiscal Unique (IFU)",
      "Tout autre justificatif jugé nécessaire par l'institution"
    ],
    montantMin: 500000,
    montantMax: 10000000,
    dureeMinMois: 3,
    dureeMaxMois: 60,
    tauxInteretAnnuel: "3% l'an dégressif",
    periodicite: "Mensuelle, Bimensuelle, Trimestrielle",
    differeMois: 3,
    fraisEtEpargne: "Dépôt de garantie : 5% du montant du crédit octroyé • Épargne de capitalisation : 5% du montant du crédit étalé sur les échéances • Assurance : Taux en vigueur par les compagnies d'assurances agréées par SBF"
  },
  {
    categorie: "Crédit Cause",
    nom: "Crédit Bon de Commande (CBC)",
    slug: "cbc",
    description: "Le financement de bon de commande est une solution de crédit à court terme qui permet aux entreprises d'honorer les commandes importantes de leurs clients sans utiliser leur propre trésorerie.",
    cible: "Peuvent bénéficier de ce crédit les entreprises immatriculées au Bénin justifiant de contrats de marchés publics ou de bons de commande fermes délivrés par : l'Administration publique (ministères et institutions de l'État), des structures semi-étatiques et privées de référence (SONEB, SBEE, PAC, CEB, SOBEBRA, CANAL+, MOOV, MTN, AGeFIB, etc.), ou des organismes internationaux (UNICEF, Banque Mondiale, etc.).",
    conditions: [
      "Sensibilisation : Participer au moins à une séance d'information de l'agence",
      "Statut : Avoir un compte courant adapté au sein de l'institution",
      "Activité : Exercer une Activité Génératrice de Revenus (AGR) en situation régulière et avoir un siège social vérifiable",
      "Réputation : Jouir d'une bonne moralité au sein de la communauté et d'un excellent historique de crédit auprès de SBF. Démontrer une capacité technique et opérationnelle à exécuter la commande",
      "Accepter les visites : Autoriser les agents de SB Finance à visiter votre domicile et votre lieu d'activité avant l'octroi du crédit et tout au long du remboursement",
      "Bon de commande valide : Le document doit provenir d'un donneur d'ordre solvable (institution publique, grande entreprise privée, ONG)",
      "Capacité financière : Prouver une expérience ou des références professionnelles appropriées pour exécuter le marché"
    ],
    garantieExigee: "L'octroi de ce financement est subordonné à : deux cautions personnelles à formaliser par acte notarié (dont l'une doit être propriétaire de son logement), une épargne de garantie avant le décaissement, deux chèques (dont un comportant le montant à payer et l'autre à blanc), et la co-signature du compte bancaire par SB Finance. Une garantie par acte notarié est également requise (titre de propriété à 125%, titre foncier obligatoire si ≥ 10M FCFA, ou Dépôt À Terme couvrant le montant total).",
    piecesAFournir: [
      "Formulaire de demande dûment rempli et signé (document fourni par SBF)",
      "Une copie en cours de validité du CIP, de la carte biométrique ou du passeport du demandeur et de ses cautions",
      "Documents justifiant l'existence et l'autorisation d'exercice de l'activité (RCCM, statuts, attestation IFU, RIB, etc.)",
      "Photocopie du reçu de paiement des frais d'étude de dossier",
      "Attestation de non-engagement (à retirer par le client auprès de sa banque)",
      "État financier de la dernière année si le montant sollicité est supérieur à 5 000 000 FCFA",
      "Relevé du compte courant à SBF pour les trois derniers mois",
      "Relevés bancaires des six derniers mois",
      "Factures pro-forma fournisseurs ou devis estimatifs (s'il s'agit du BTP)",
      "Original du bon de commande ou contrat de marché",
      "Fiches de cautionnement remplies et signées par les cautions, formalisées par voie notariée à charge du client",
      "Lettre de formalisation de la co-signature par SB Finance",
      "Copie de la notification par exploit d'huissier (obligatoire pour les crédits ≥ 10 000 000 FCFA)",
      "Au moins 10 exemplaires du papier à en-tête officiel de l'entreprise cliente",
      "Tout autre justificatif jugé pertinent par l'institution"
    ],
    montantMin: 1000000,
    montantMax: 30000000,
    dureeMinMois: 3,
    dureeMaxMois: 6,
    tauxInteretAnnuel: "24% l'an dégressif",
    periodicite: "In Fine",
    differeMois: 3,
    fraisEtEpargne: "Dépôt de garantie : 10% du montant du crédit octroyé • Frais de solidarité : 2 000F CFA (non remboursable) • Frais de dossier : 2% du montant du crédit octroyé (non remboursable) • Frais de gestion : 3% du montant du crédit octroyé (non remboursable) • Assurance : Taux en vigueur par les compagnies d'assurances agréées par SBF"
  },
  {
    categorie: "Crédit Cause",
    nom: "Crédit Avance sur Facture (CAF)",
    slug: "caf",
    description: "L'avance sur facture est un crédit de trésorerie à court terme permettant aux entreprises d'obtenir immédiatement le paiement anticipé d'une facture émise.",
    cible: "Pour en bénéficier, l'entreprise doit jouir d'une bonne santé financière et détenir des factures en cours provenant de : l'Administration publique (ministères et institutions de l'État), des structures semi-étatiques et privées de référence (SONEB, SBEE, PAC, CEB, SOBEBRA, CANAL+, MOOV, MTN, AGeFIB, etc.), ou des organismes internationaux (UNICEF, Banque Mondiale, etc.).",
    conditions: [
      "Sensibilisation : Participer au moins à une séance d'information de l'agence",
      "Statut : Avoir un compte courant adapté au sein de l'institution",
      "Activité : Exercer une Activité Génératrice de Revenus (AGR) en situation régulière et avoir un siège social vérifiable",
      "Réputation : Jouir d'une bonne moralité au sein de la communauté et d'un excellent historique de crédit auprès de SBF. Démontrer une capacité technique et opérationnelle à exécuter la facture",
      "Accepter les visites : Autoriser les agents de SB Finance à visiter votre domicile et votre lieu d'activité avant l'octroi du crédit et tout au long du remboursement",
      "Factures exigibles : Les factures doivent correspondre à des prestations déjà réalisées ou des marchandises livrées",
      "Capacité financière : Prouver une expérience ou des références professionnelles appropriées pour exécuter le marché"
    ],
    garantieExigee: "L'octroi de ce financement est subordonné à : deux cautions personnelles à formaliser par acte notarié (dont l'une doit être propriétaire de son logement), une épargne de garantie avant le décaissement, deux chèques (dont un comportant le montant à payer et l'autre à blanc), et la co-signature du compte bancaire par SB Finance. Une garantie par acte notarié est également requise (titre de propriété à 125%, titre foncier obligatoire si ≥ 10M FCFA, ou Dépôt À Terme couvrant le montant total).",
    piecesAFournir: [
      "Formulaire de demande dûment rempli et signé (document fourni par SBF)",
      "Une copie en cours de validité du CIP, de la carte biométrique ou du passeport du demandeur et de ses cautions",
      "Documents justifiant l'existence et l'autorisation d'exercice de l'activité (RCCM, statuts, attestation IFU, RIB, etc.)",
      "Photocopie du reçu de paiement des frais d'étude de dossier",
      "Attestation de non-engagement (à retirer par le client auprès de sa banque)",
      "État financier de la dernière année si le montant sollicité est supérieur à 5 000 000 FCFA",
      "Relevé du compte courant à SBF pour les trois derniers mois",
      "Relevés bancaires des six derniers mois",
      "Factures pro-forma fournisseurs ou devis estimatifs (s'il s'agit du BTP)",
      "L'original du bon de commande reçu par le client au début du processus",
      "L'original de la facture définitive visée et validée par le donneur d'ordre",
      "Original du Bordereau de Livraison ou PV de réception (ou Attestation de bonne fin d'exécution pour travaux/prestations)",
      "Fiches de cautionnement remplies et signées par les cautions, formalisées par voie notariée à charge du client",
      "Formalisation de l'accord de co-signature en interne au sein de la banque",
      "Copie de la notification par exploit d'huissier",
      "Au moins 10 exemplaires du papier à en-tête officiel de l'entreprise cliente",
      "Tout autre justificatif jugé pertinent par l'institution"
    ],
    montantMin: 1000000,
    montantMax: 30000000,
    dureeMinMois: 3,
    dureeMaxMois: 6,
    tauxInteretAnnuel: "24% l'an dégressif",
    periodicite: "In Fine",
    differeMois: 3,
    fraisEtEpargne: "Dépôt de garantie : 10% du montant du crédit octroyé • Frais de solidarité : 2 000F CFA (non remboursable) • Frais de dossier : 2% du montant du crédit octroyé (non remboursable) • Frais de gestion : 3% du montant du crédit octroyé (non remboursable) • Assurance : Taux en vigueur par les compagnies d'assurances agréées par SBF"
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
