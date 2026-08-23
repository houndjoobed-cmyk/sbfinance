'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from '@/components/admin/image-upload';

const DEFAULT_CONTENT = {
  hero: {
    title: "MOBILIS Horizon 2027",
    subtitle: "« L'accès à la mobilité pour chaque profil, chaque ambition. »",
    description: "Roulez neuf. Roulez hybride. Sans un franc d'apport. MOBILIS est le premier programme de crédit automobile 100% hybride au Bénin, réservé en exclusivité à Salem Braha Finance.",
    image: "/images/COUVERTIRE C4.png"
  },
  avantages: {
    title: "Ce qui fait la force de MOBILIS",
    items: [
      { id: "1", title: "L'exclusivité que personne d'autre n'a.", description: "SBF est le seul établissement du Bénin autorisé à distribuer les véhicules IRETI SAS. Ailleurs, c'est tout simplement impossible d'y accéder. C'est ici, ou nulle part." },
      { id: "2", title: "Un crédit pensé pour vous, pas pour la banque.", description: "À partir de 2027, chacun trouve sa formule, de 7 à 30 millions FCFA, sur 36 à 60 mois, sans aucun apport initial." },
      { id: "3", title: "Zéro souci après l'achat.", description: "Le Garage MOBILIS Fifadji, propriété exclusive de SBF, entretient votre véhicule. Un seul point d'accès, une vraie garantie, une tranquillité totale." },
      { id: "4", title: "Un choix responsable.", description: "Toute la gamme MOBILIS roule à l'hybride, sans aucune exception." }
    ]
  },
  ciblage: {
    title: "À qui s'adresse MOBILIS ?",
    items: [
      { id: "1", title: "Les fonctionnaires de l'État", description: "Ministères, directions nationales, établissements publics." },
      { id: "2", title: "Les salariés en CDI du privé", description: "Banques, télécoms, BTP, agro-industrie, ONG, multinationales." },
      { id: "3", title: "Les agents des communes", description: "Mairies et collectivités des 77 communes du Bénin." },
      { id: "4", title: "Les cadres et dirigeants", description: "Directeurs généraux, directeurs, experts, professions libérales." }
    ]
  },
  ecologie: {
    title: "Notre engagement écologique",
    text1: "MOBILIS ne se contente pas de vendre des voitures. Le programme porte une vraie ambition environnementale, portée conjointement par Salem Braha Finance et IRETI SAS.",
    text2: "Chaque véhicule proposé, du plus abordable au plus premium, roule en motorisation hybride essence électrique. Pas de gamme thermique en option, pas d'exception selon le budget. C'est un choix assumé dès la conception du programme.",
    text3: "En rendant la mobilité hybride accessible aux fonctionnaires, aux salariés, aux communes et aux entreprises du Bénin, MOBILIS réduit concrètement l'empreinte carbone du parc automobile national, tout en offrant à chaque conducteur une consommation de carburant allégée et des coûts d'usage repensés.",
    quote: "Rouler avec MOBILIS, c'est rouler neuf, rouler serein, et rouler pour l'avenir."
  },
  chiffres: {
    title: "MOBILIS en chiffres",
    items: [
      { id: "1", value: "7M-30M", description: "De financement pour des véhicules neufs garantis de 2 à 5 ans" },
      { id: "2", value: "12%", description: "Taux par an sur des durées de 36, 48 ou 60 mois" },
      { id: "3", value: "15", description: "Jours ouvrables pour obtenir une réponse à votre dossier" },
      { id: "4", value: "Auto", description: "Prélèvement automatique : plus jamais de démarche mensuelle" }
    ]
  },
  parcours: {
    title: "Le parcours, en 3 étapes",
    items: [
      { id: "1", title: "Dépôt du dossier", description: "Je dépose mon dossier et j'obtiens une réponse en 15 jours ouvrables." },
      { id: "2", title: "Signature et livraison", description: "Je signe et mon véhicule arrive, livré en 6 à 10 semaines." },
      { id: "3", title: "En route", description: "Je roule, l'esprit tranquille, avec un entretien assuré au Garage Fifadji." }
    ]
  },
  fleet: {
    title: "Pour les entreprises : MOBILIS Fleet",
    description: "MOBILIS Fleet équipe vos flottes sans immobiliser votre trésorerie. Crédit, leasing, renouvellement ou investissement locatif : de 14 millions à plusieurs milliards de FCFA.",
    note: "Note : le dossier complet (éligibilité détaillée, tableaux de mensualités, documents Fleet, FAQ) reste disponible dans nos agences pour les échanges commerciaux approfondis.",
    buttonText: "Appel à l'action",
    buttonLink: "tel:+2290121380587"
  }
};

export default function ContenuMobilisPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [globalParams, setGlobalParams] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/parametres');
      if (res.ok) {
        const data = await res.json();
        setGlobalParams(data);
        if (data && data.mobilisContenu) {
          setContent({ ...DEFAULT_CONTENT, ...data.mobilisContenu });
        }
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const payload = {
        ...globalParams,
        mobilisContenu: content
      };

      const res = await fetch('/api/admin/parametres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');
      
      setMessage({ text: 'Contenu de MOBILIS sauvegardé avec succès !', type: 'success' });
    } catch (error: any) {
      setMessage({ text: error.message || 'Erreur lors de la sauvegarde.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (section: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  const updateItem = (section: string, itemId: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        items: (prev as any)[section].items.map((item: any) => 
          item.id === itemId ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const renderListEditor = (section: string, fields: {key: string, label: string}[]) => (
    <div className="space-y-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Titre de la section</label>
        <input 
          type="text" 
          className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" 
          value={(content as any)[section].title} 
          onChange={e => updateSection(section, 'title', e.target.value)} 
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Éléments ({ (content as any)[section].items.length })</h3>
        {(content as any)[section].items.map((item: any, index: number) => (
          <div key={item.id} className="p-4 border rounded bg-gray-50 space-y-3">
            <h4 className="text-sm font-bold text-gray-500 uppercase">Élément {index + 1}</h4>
            {fields.map(field => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-gray-700">{field.label}</label>
                {field.key === 'description' ? (
                  <textarea 
                    rows={3}
                    className="w-full mt-1 border-gray-300 rounded-md text-sm border bg-white px-3 py-2"
                    value={item[field.key]}
                    onChange={(e) => updateItem(section, item.id, field.key, e.target.value)}
                  />
                ) : (
                  <input 
                    type="text" 
                    className="w-full mt-1 border-gray-300 rounded-md text-sm border bg-white px-3 py-2"
                    value={item[field.key]}
                    onChange={(e) => updateItem(section, item.id, field.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contenu MOBILIS</h1>
      
      {message.text && (
        <div className={`mb-6 px-4 py-3 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'} border`}>
          {message.text}
        </div>
      )}

      <div className="flex overflow-x-auto border-b border-gray-200 mb-6 space-x-8 pb-2">
        <button type="button" onClick={() => setActiveTab('hero')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'hero' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Bannière Hero
        </button>
        <button type="button" onClick={() => setActiveTab('avantages')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'avantages' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Avantages
        </button>
        <button type="button" onClick={() => setActiveTab('ciblage')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'ciblage' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Ciblage
        </button>
        <button type="button" onClick={() => setActiveTab('ecologie')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'ecologie' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Écologie
        </button>
        <button type="button" onClick={() => setActiveTab('chiffres')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'chiffres' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Chiffres Clés
        </button>
        <button type="button" onClick={() => setActiveTab('parcours')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'parcours' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Parcours
        </button>
        <button type="button" onClick={() => setActiveTab('fleet')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'fleet' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Entreprises (Fleet)
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#111e36] border-b pb-2">Bannière Principale</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ImageUpload 
                  label="Image de couverture"
                  value={content.hero.image} 
                  onChange={(url) => updateSection('hero', 'image', url)} 
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Titre principal</label>
                  <input type="text" className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" value={content.hero.title} onChange={e => updateSection('hero', 'title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sous-titre (Slogan)</label>
                  <input type="text" className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" value={content.hero.subtitle} onChange={e => updateSection('hero', 'subtitle', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea rows={4} className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" value={content.hero.description} onChange={e => updateSection('hero', 'description', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'avantages' && renderListEditor('avantages', [
          { key: 'title', label: 'Titre de l\'avantage' },
          { key: 'description', label: 'Description' }
        ])}

        {activeTab === 'ciblage' && renderListEditor('ciblage', [
          { key: 'title', label: 'Cible' },
          { key: 'description', label: 'Détails' }
        ])}

        {activeTab === 'chiffres' && renderListEditor('chiffres', [
          { key: 'value', label: 'Valeur (ex: 7M-30M)' },
          { key: 'description', label: 'Légende' }
        ])}

        {activeTab === 'parcours' && renderListEditor('parcours', [
          { key: 'title', label: 'Nom de l\'étape' },
          { key: 'description', label: 'Description de l\'étape' }
        ])}

        {activeTab === 'ecologie' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#111e36] border-b pb-2">Engagement Écologique</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Titre de la section</label>
                <input type="text" className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" value={content.ecologie.title} onChange={e => updateSection('ecologie', 'title', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Paragraphe 1</label>
                <textarea rows={3} className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" value={content.ecologie.text1} onChange={e => updateSection('ecologie', 'text1', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Paragraphe 2</label>
                <textarea rows={3} className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" value={content.ecologie.text2} onChange={e => updateSection('ecologie', 'text2', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Paragraphe 3</label>
                <textarea rows={3} className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" value={content.ecologie.text3} onChange={e => updateSection('ecologie', 'text3', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Citation / Slogan (Gras italique)</label>
                <input type="text" className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" value={content.ecologie.quote} onChange={e => updateSection('ecologie', 'quote', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fleet' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#111e36] border-b pb-2">Pour les entreprises (MOBILIS Fleet)</h2>
            <div className="space-y-4 max-w-3xl">
              <div>
                <label className="block text-sm font-medium text-gray-700">Titre de la section</label>
                <input type="text" className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" value={content.fleet.title} onChange={e => updateSection('fleet', 'title', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description principale</label>
                <textarea rows={3} className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" value={content.fleet.description} onChange={e => updateSection('fleet', 'description', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Note de bas de page (Italique)</label>
                <textarea rows={2} className="w-full mt-1 border-gray-300 rounded-md text-sm border bg-white px-3 py-2" value={content.fleet.note} onChange={e => updateSection('fleet', 'note', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Texte du bouton CTA</label>
                  <input type="text" className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" value={content.fleet.buttonText} onChange={e => updateSection('fleet', 'buttonText', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lien du bouton (tel: ou mailto: ou /url)</label>
                  <input type="text" className="w-full mt-1 border-gray-300 rounded-md border bg-white px-3 py-2" value={content.fleet.buttonLink} onChange={e => updateSection('fleet', 'buttonLink', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button type="submit" variant="accent" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Enregistrer le contenu
          </Button>
        </div>
      </form>
    </div>
  );
}
