'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Loader2, Plus, Trash2, Wallet, Landmark, ChevronDown, ChevronUp, FileText, CheckCircle2 } from 'lucide-react';
import { ImageUpload } from '@/components/admin/image-upload';

const DEFAULT_EPARGNE_CONTENT = {
  hero: {
    title: "Comptes Courants & Épargne",
    description: "Des solutions souples pour sécuriser vos revenus quotidiens ou préparer l'avenir, avec des conditions de rémunération attractives.",
    image: "/images/banniere.png"
  },
  section: {
    title: "Nos Solutions Bancaires",
    subtitle: "Fidèle aux orientations de sa Direction, Salem Braha Finance adapte ses produits à vos besoins.",
    courantsIntro: "Ces comptes facilitent le versement de vos revenus et la gestion de vos opérations financières au quotidien. Ils ne génèrent pas d'intérêts, mais vous permettent d'obtenir des financements et de sécuriser votre trésorerie.",
    epargneIntro: "Les comptes d'épargne vous permettent de constituer une réserve financière et de concrétiser des projets futurs grâce à des taux d'intérêts très performants."
  },
  comptesCourants: [
    {
      id: "1",
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
      id: "2",
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
      id: "3",
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
      id: "4",
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
      id: "5",
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
      id: "6",
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
  ],
  comptesEpargne: [
    {
      id: "1",
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
      id: "2",
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
      id: "3",
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
      id: "4",
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
      id: "5",
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
      id: "6",
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
      id: "7",
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
  ]
};

export default function ContenuEpargnePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'courants' | 'epargne' | 'textes'>('courants');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [content, setContent] = useState(DEFAULT_EPARGNE_CONTENT);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/parametres');
      if (res.ok) {
        const data = await res.json();
        if (data && data.epargneContenu) {
          setContent({
            ...DEFAULT_EPARGNE_CONTENT,
            ...data.epargneContenu,
            comptesCourants: data.epargneContenu.comptesCourants || DEFAULT_EPARGNE_CONTENT.comptesCourants,
            comptesEpargne: data.epargneContenu.comptesEpargne || DEFAULT_EPARGNE_CONTENT.comptesEpargne,
          });
        }
      }
    } catch (error) {
      console.error('Erreur chargement contenu épargne', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch('/api/admin/parametres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ epargneContenu: content })
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');

      setMessage({ text: 'Contenu des Comptes Courants & Épargne sauvegardé avec succès !', type: 'success' });
    } catch (error: any) {
      setMessage({ text: error.message || 'Erreur lors de la sauvegarde.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // --- Gestion Comptes Courants ---
  const addCompteCourant = () => {
    const newId = Date.now().toString();
    const newCompte = {
      id: newId,
      nom: "Nouveau Pack",
      categorie: "Pack Particulier",
      cible: "Particuliers ou professionnels",
      coutPack: "0 F CFA",
      depotMin: "0 F",
      fraisOuverture: "0 F",
      fraisTenue: "0 F",
      creditsPossibles: "Crédits selon éligibilité",
      pieces: ["Pièce d'identité en cours de validité", "02 photos d'identité"]
    };
    setContent(prev => ({
      ...prev,
      comptesCourants: [newCompte, ...prev.comptesCourants]
    }));
    setExpandedId(newId);
  };

  const updateCompteCourant = (id: string, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      comptesCourants: prev.comptesCourants.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const removeCompteCourant = (id: string) => {
    if (!window.confirm('Voulez-vous supprimer ce compte courant ?')) return;
    setContent(prev => ({
      ...prev,
      comptesCourants: prev.comptesCourants.filter(c => c.id !== id)
    }));
  };

  // --- Gestion Comptes Épargne ---
  const addCompteEpargne = () => {
    const newId = Date.now().toString();
    const newEpargne = {
      id: newId,
      nom: "Nouveau Produit d'Épargne",
      description: "Description de la solution d'épargne...",
      cible: "Personnes physiques et morales",
      depotMin: "10 000 F CFA",
      remuneration: "5% l'an",
      caracteristiques: ["Durée minimale : 3 mois", "Frais d'ouverture : 0 F CFA"],
      pieces: ["Formulaire d'ouverture", "Pièce d'identité en cours de validité"]
    };
    setContent(prev => ({
      ...prev,
      comptesEpargne: [newEpargne, ...prev.comptesEpargne]
    }));
    setExpandedId(newId);
  };

  const updateCompteEpargne = (id: string, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      comptesEpargne: prev.comptesEpargne.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const removeCompteEpargne = (id: string) => {
    if (!window.confirm('Voulez-vous supprimer ce produit d\'épargne ?')) return;
    setContent(prev => ({
      ...prev,
      comptesEpargne: prev.comptesEpargne.filter(c => c.id !== id)
    }));
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion de la Page Épargnes</h1>
          <p className="text-gray-500 text-sm mt-1">
            Modifiez et ajoutez en temps réel les packs de comptes courants et solutions d'épargne affichés sur le site.
          </p>
        </div>
      </div>

      {message.text && (
        <div className={`mb-6 px-4 py-3 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'} border`}>
          {message.text}
        </div>
      )}

      {/* Onglets de navigation */}
      <div className="flex border-b border-gray-200 mb-6 space-x-6 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('courants')}
          className={`whitespace-nowrap pb-3 font-semibold text-sm transition-colors flex items-center gap-2 ${
            activeTab === 'courants' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Wallet className="w-4 h-4" />
          Comptes Courants ({content.comptesCourants.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('epargne')}
          className={`whitespace-nowrap pb-3 font-semibold text-sm transition-colors flex items-center gap-2 ${
            activeTab === 'epargne' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Landmark className="w-4 h-4" />
          Comptes d'Épargne ({content.comptesEpargne.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('textes')}
          className={`whitespace-nowrap pb-3 font-semibold text-sm transition-colors flex items-center gap-2 ${
            activeTab === 'textes' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          Bannière & En-têtes
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">

        {/* TAB 1: COMPTES COURANTS */}
        {activeTab === 'courants' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Liste des Packs & Comptes Courants</h2>
                <p className="text-xs text-gray-500">Ajoutez, modifiez ou supprimez les formules de comptes courants.</p>
              </div>
              <Button type="button" onClick={addCompteCourant} variant="accent" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un Pack
              </Button>
            </div>

            <div className="space-y-4">
              {content.comptesCourants.map((compte, index) => {
                const isExpanded = expandedId === compte.id;
                return (
                  <div key={compte.id || index} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div 
                      className="p-4 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setExpandedId(isExpanded ? null : compte.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-[#0991b5] flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 flex items-center gap-2">
                            {compte.nom}
                            <span className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full font-normal">
                              {compte.categorie}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">Cible : {compte.cible} • Coût : {compte.coutPack}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeCompteCourant(compte.id); }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                          title="Supprimer ce compte"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-6 space-y-6 border-t border-gray-200 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Nom du compte / Pack *</label>
                            <input
                              type="text"
                              value={compte.nom}
                              onChange={(e) => updateCompteCourant(compte.id, 'nom', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: HOUENOUSSOU"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Catégorie / Libellé Pack *</label>
                            <input
                              type="text"
                              value={compte.categorie}
                              onChange={(e) => updateCompteCourant(compte.id, 'categorie', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: Pack Salarié"
                              required
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Cible visée *</label>
                            <input
                              type="text"
                              value={compte.cible}
                              onChange={(e) => updateCompteCourant(compte.id, 'cible', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: Personnel salarié du secteur privé et public"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Coût du PACK</label>
                            <input
                              type="text"
                              value={compte.coutPack}
                              onChange={(e) => updateCompteCourant(compte.id, 'coutPack', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: 17 000F CFA"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Dépôt minimum</label>
                            <input
                              type="text"
                              value={compte.depotMin}
                              onChange={(e) => updateCompteCourant(compte.id, 'depotMin', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: 15 000F"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Frais d'ouverture</label>
                            <input
                              type="text"
                              value={compte.fraisOuverture}
                              onChange={(e) => updateCompteCourant(compte.id, 'fraisOuverture', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: 2 000F"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Frais de tenue de compte</label>
                            <input
                              type="text"
                              value={compte.fraisTenue}
                              onChange={(e) => updateCompteCourant(compte.id, 'fraisTenue', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: 250F / mois"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Crédits possibles</label>
                            <input
                              type="text"
                              value={compte.creditsPossibles}
                              onChange={(e) => updateCompteCourant(compte.id, 'creditsPossibles', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: Crédit aux fonctionnaires (CF), Crédit aux salariés (SA)"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Pièces à fournir (Une par ligne)
                            </label>
                            <textarea
                              rows={4}
                              value={Array.isArray(compte.pieces) ? compte.pieces.join('\n') : ''}
                              onChange={(e) => updateCompteCourant(compte.id, 'pieces', e.target.value.split('\n'))}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="02 photos d'identité&#10;Photocopie de la pièce d'identité en cours de validité"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: COMPTES D'ÉPARGNE */}
        {activeTab === 'epargne' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Liste des Produits d'Épargne</h2>
                <p className="text-xs text-gray-500">Gérez les comptes DAT, DOUKPO, PEP, VIP et solutions d'épargne.</p>
              </div>
              <Button type="button" onClick={addCompteEpargne} variant="accent" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une Épargne
              </Button>
            </div>

            <div className="space-y-4">
              {content.comptesEpargne.map((epargne, index) => {
                const isExpanded = expandedId === epargne.id;
                return (
                  <div key={epargne.id || index} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div 
                      className="p-4 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => setExpandedId(isExpanded ? null : epargne.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 flex items-center gap-2">
                            {epargne.nom}
                            <span className="px-2 py-0.5 text-xs bg-emerald-50 text-emerald-700 rounded-full font-semibold">
                              {epargne.remuneration}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">Dépôt min : {epargne.depotMin} • Cible : {epargne.cible}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeCompteEpargne(epargne.id); }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                          title="Supprimer ce produit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-6 space-y-6 border-t border-gray-200 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Nom du produit d'épargne *</label>
                            <input
                              type="text"
                              value={epargne.nom}
                              onChange={(e) => updateCompteEpargne(epargne.id, 'nom', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: Dépôt A Terme (DAT)"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Rémunération / Taux d'intérêt *</label>
                            <input
                              type="text"
                              value={epargne.remuneration}
                              onChange={(e) => updateCompteEpargne(epargne.id, 'remuneration', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: 6,5% à 10% selon montant"
                              required
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Description *</label>
                            <textarea
                              rows={2}
                              value={epargne.description}
                              onChange={(e) => updateCompteEpargne(epargne.id, 'description', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: Épargne bloquée sur une période déterminée..."
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Cible</label>
                            <input
                              type="text"
                              value={epargne.cible}
                              onChange={(e) => updateCompteEpargne(epargne.id, 'cible', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: Personnes physiques et morales"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Dépôt minimum</label>
                            <input
                              type="text"
                              value={epargne.depotMin}
                              onChange={(e) => updateCompteEpargne(epargne.id, 'depotMin', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Ex: 1 000 000F CFA"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Caractéristiques (Une par ligne)
                            </label>
                            <textarea
                              rows={4}
                              value={Array.isArray(epargne.caracteristiques) ? epargne.caracteristiques.join('\n') : ''}
                              onChange={(e) => updateCompteEpargne(epargne.id, 'caracteristiques', e.target.value.split('\n'))}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Durée minimum : 6 mois&#10;Pénalité de rupture : 15%"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Pièces à fournir (Une par ligne)
                            </label>
                            <textarea
                              rows={4}
                              value={Array.isArray(epargne.pieces) ? epargne.pieces.join('\n') : ''}
                              onChange={(e) => updateCompteEpargne(epargne.id, 'pieces', e.target.value.split('\n'))}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                              placeholder="Formulaire d'ouverture de compte&#10;Photocopie de la pièce d'identité"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: BANNIÈRE & EN-TÊTES */}
        {activeTab === 'textes' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-3">Textes et Bannière de la page</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ImageUpload
                  label="Image de fond de la bannière"
                  value={content.hero.image}
                  onChange={(url) => setContent(prev => ({ ...prev, hero: { ...prev.hero, image: url } }))}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Titre principal de la bannière</label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) => setContent(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Texte descriptif de la bannière</label>
                  <textarea
                    rows={4}
                    value={content.hero.description}
                    onChange={(e) => setContent(prev => ({ ...prev, hero: { ...prev.hero, description: e.target.value } }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Texte d'introduction - Comptes Courants</label>
                <textarea
                  rows={3}
                  value={content.section.courantsIntro}
                  onChange={(e) => setContent(prev => ({ ...prev, section: { ...prev.section, courantsIntro: e.target.value } }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Texte d'introduction - Comptes d'Épargne</label>
                <textarea
                  rows={3}
                  value={content.section.epargneIntro}
                  onChange={(e) => setContent(prev => ({ ...prev, section: { ...prev.section, epargneIntro: e.target.value } }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button type="submit" variant="accent" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Enregistrer le contenu Épargne
          </Button>
        </div>
      </form>
    </div>
  );
}
