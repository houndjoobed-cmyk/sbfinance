'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from '@/components/admin/image-upload';

const DEFAULT_CONTENT = {
  hero: [
    {
      id: "1",
      image: "/images/hero/Osez entreprendre.png",
      title: "Osez entreprendre, nous finançons la suite",
      subtitle: "Des solutions de financement adaptées pour accompagner la croissance de vos activités.",
      cta: "Découvrir nos crédits",
      href: "/produits/credit"
    },
    {
      id: "2",
      image: "/images/hero/Cultivons la prospérité.png",
      title: "Cultivons la prospérité ensemble",
      subtitle: "Votre partenaire financier de confiance pour bâtir un avenir solide et sécurisé.",
      cta: "Notre mission",
      href: "/a-propos"
    },
    {
      id: "3",
      image: "/images/hero/Soutenir l'économie local.png",
      title: "Soutenir l'économie locale",
      subtitle: "Nous accompagnons les commerçants et artisans béninois dans leur développement.",
      cta: "Voir nos produits",
      href: "/produits"
    },
    {
      id: "4",
      image: "/images/hero/BANNIERE 05.png",
      title: "Pour une finance inclusive et responsable",
      subtitle: "Nous favorisons l'inclusion financière des populations à travers tout le Bénin.",
      cta: "Notre réseau",
      href: "/reseau",
      objectPosition: "center 10%"
    }
  ],
  dgQuote: {
    image: "/images/home/dg-new.png",
    quote: "Notre mission dépasse la simple gestion de l'argent ; nous protégeons vos efforts. Chez SBF, nous croyons que chaque trajectoire, qu'elle soit dans le secteur formel ou informel, mérite d'être sécurisée et valorisée. Bienvenue dans notre communauté de progrès.",
    author: "Dr. Ahonon Houekin Augustine",
    role: "Directrice Générale, Salem Braha Finance"
  },
  features: {
    backgroundText: "Atouts",
    title: "Pourquoi SBF ?",
    subtitle: "Nos piliers fondateurs",
    items: [
      { id: "1", title: "Vision à l'horizon 2035", description: "Être une institution de microfinance leader...", icon: "TrendingUp", link: "/a-propos" },
      { id: "2", title: "Mission", description: "Contribuer à l'amélioration des conditions de vie...", icon: "Users", link: "/a-propos" },
      { id: "3", title: "Nos Valeurs", description: "Le Respect, l'Intégrité et l'Efficacité guident toutes nos actions.", icon: "ShieldCheck", link: "/a-propos" }
    ]
  },
  missionVision: {
    image: "/images/home/Engagement.jpeg",
    backgroundText: "Vision",
    title: "Plus que du financement, un véritable partenaire de croissance.",
    buttonText: "En savoir plus",
    buttonLink: "/a-propos"
  },
  partners: {
    title: "Ils nous font confiance",
    items: [] as any[]
  },
  productsPreview: {
    backgroundText: "Produits",
    title: "Nos Offres de Crédit",
    subtitle: "Découvrez nos solutions de financement"
  },
  newsPreview: {
    backgroundText: "ACTUALITÉS",
    title: "Restez informés",
    subtitle: "Les dernières nouveautés"
  },
  testimonials: {
    title: "Ce qu'ils disent de nous",
    subtitle: "Découvrez les retours d'expérience"
  },
  joinUs: {
    image: "/images/home/REJOIGNEZ-NOUS.png",
    title: "Rejoignez-nous",
    text: "Travailler chez SBF, c'est rejoindre une institution engagée auprès de ses clients",
    buttons: [
      { id: "1", text: "Demande de crédit", link: "/contacts" },
      { id: "2", text: "Compte d'épargne", link: "/produits" },
      { id: "3", text: "Nos offres d'emploi", link: "/carrieres" }
    ]
  },
  stats: [
    { id: "1", value: "15", label: "Années d'expérience", suffix: "+" },
    { id: "2", value: "5", label: "Points de service", suffix: "" },
    { id: "3", value: "10000", label: "Clients satisfaits", suffix: "+" },
    { id: "4", value: "1,5", label: "Milliard FCFA Capital", suffix: "" }
  ]
};

export default function ContenuAccueilPage() {
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
        if (data && data.accueilContenu) {
          setContent({ ...DEFAULT_CONTENT, ...data.accueilContenu });
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
        accueilContenu: content
      };

      const res = await fetch('/api/admin/parametres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');
      
      setMessage({ text: 'Contenu de l\'accueil sauvegardé avec succès !', type: 'success' });
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

  const addPartner = () => {
    setContent(prev => ({
      ...prev,
      partners: {
        ...prev.partners,
        items: [...prev.partners.items, { id: Date.now().toString(), image: '', name: 'Nouveau Partenaire' }]
      }
    }));
  };

  const removePartner = (id: string) => {
    setContent(prev => ({
      ...prev,
      partners: {
        ...prev.partners,
        items: prev.partners.items.filter((p: any) => p.id !== id)
      }
    }));
  };

  const updatePartner = (id: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      partners: {
        ...prev.partners,
        items: prev.partners.items.map((p: any) => p.id === id ? { ...p, [field]: value } : p)
      }
    }));
  };

  const addSlide = () => {
    setContent(prev => ({
      ...prev,
      hero: [...prev.hero, { id: Date.now().toString(), image: '', title: '', subtitle: '', cta: '', href: '' }]
    }));
  };

  const removeSlide = (id: string) => {
    setContent(prev => ({
      ...prev,
      hero: prev.hero.filter((s: any) => s.id !== id)
    }));
  };

  const updateSlide = (id: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      hero: prev.hero.map((s: any) => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const addJoinButton = () => {
    setContent(prev => ({
      ...prev,
      joinUs: {
        ...prev.joinUs,
        buttons: [...(prev.joinUs.buttons || []), { id: Date.now().toString(), text: 'Nouveau Bouton', link: '#' }]
      }
    }));
  };

  const removeJoinButton = (id: string) => {
    setContent(prev => ({
      ...prev,
      joinUs: {
        ...prev.joinUs,
        buttons: (prev.joinUs.buttons || []).filter((b: any) => b.id !== id)
      }
    }));
  };

  const updateJoinButton = (id: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      joinUs: {
        ...prev.joinUs,
        buttons: (prev.joinUs.buttons || []).map((b: any) => b.id === id ? { ...b, [field]: value } : b)
      }
    }));
  };

  const updateStat = (id: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      stats: (prev.stats || DEFAULT_CONTENT.stats).map((s: any) => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contenu de la Page d'Accueil</h1>
      
      {message.text && (
        <div className={`mb-6 px-4 py-3 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'} border`}>
          {message.text}
        </div>
      )}

      <div className="flex overflow-x-auto border-b border-gray-200 mb-6 space-x-6 pb-2">
        <button type="button" onClick={() => setActiveTab('hero')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'hero' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Bannières (Hero)
        </button>
        <button type="button" onClick={() => setActiveTab('sections')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'sections' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Titres Sections
        </button>
        <button type="button" onClick={() => setActiveTab('mission')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'mission' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Bloc Mission/Vision
        </button>
        <button type="button" onClick={() => setActiveTab('dgQuote')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'dgQuote' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Mot du DG
        </button>
        <button type="button" onClick={() => setActiveTab('partners')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'partners' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Partenaires
        </button>
        <button type="button" onClick={() => setActiveTab('join')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'join' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Rejoignez-nous
        </button>
        <button type="button" onClick={() => setActiveTab('stats')} className={`whitespace-nowrap pb-2 font-medium text-sm transition-colors ${activeTab === 'stats' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}>
          Chiffres Clés
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        
        {activeTab === 'hero' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold text-[#111e36]">Carrousel d'Images</h2>
              <Button type="button" onClick={addSlide} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une diapositive
              </Button>
            </div>

            {content.hero.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">Aucune image dans le carrousel. Ajoutez-en une pour commencer.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {content.hero.map((slide: any, index: number) => (
                  <div key={slide.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                    <button 
                      type="button"
                      onClick={() => removeSlide(slide.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-white p-2 rounded-md shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <h3 className="font-medium text-gray-900 mb-4">Diapositive #{index + 1}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <ImageUpload 
                          label="Image de fond"
                          value={slide.image} 
                          onChange={(url) => updateSlide(slide.id, 'image', url)} 
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Titre principal</label>
                          <input 
                            type="text" 
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5]"
                            value={slide.title}
                            onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                            placeholder="Ex: Cultivons la prospérité"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Sous-titre (Optionnel)</label>
                          <textarea 
                            rows={2}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5]"
                            value={slide.subtitle}
                            onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)}
                            placeholder="Texte descriptif affiché sous le titre..."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Texte du bouton CTA</label>
                            <input 
                              type="text" 
                              className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                              value={slide.cta}
                              onChange={(e) => updateSlide(slide.id, 'cta', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lien du bouton</label>
                            <input 
                              type="text" 
                              className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                              value={slide.href}
                              onChange={(e) => updateSlide(slide.id, 'href', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'sections' && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-[#111e36] border-b pb-2">Entêtes des sections de l'accueil</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-4 p-4 border rounded bg-gray-50">
                <h3 className="font-bold text-gray-800">Section Atouts (Pourquoi SBF ?)</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Texte de fond animé</label>
                  <input type="text" className="w-full border-gray-300 rounded-md" value={content.features.backgroundText} onChange={e => updateSection('features', 'backgroundText', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Titre</label>
                  <input type="text" className="w-full border-gray-300 rounded-md" value={content.features.title} onChange={e => updateSection('features', 'title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Sous-titre</label>
                  <input type="text" className="w-full border-gray-300 rounded-md" value={content.features.subtitle} onChange={e => updateSection('features', 'subtitle', e.target.value)} />
                </div>
              </div>

              <div className="space-y-4 p-4 border rounded bg-gray-50">
                <h3 className="font-bold text-gray-800">Section Nos Produits</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Texte de fond animé</label>
                  <input type="text" className="w-full border-gray-300 rounded-md" value={content.productsPreview.backgroundText} onChange={e => updateSection('productsPreview', 'backgroundText', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Titre</label>
                  <input type="text" className="w-full border-gray-300 rounded-md" value={content.productsPreview.title} onChange={e => updateSection('productsPreview', 'title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Sous-titre</label>
                  <input type="text" className="w-full border-gray-300 rounded-md" value={content.productsPreview.subtitle} onChange={e => updateSection('productsPreview', 'subtitle', e.target.value)} />
                </div>
              </div>

              <div className="space-y-4 p-4 border rounded bg-gray-50">
                <h3 className="font-bold text-gray-800">Section Actualités</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Texte de fond animé</label>
                  <input type="text" className="w-full border-gray-300 rounded-md" value={content.newsPreview.backgroundText} onChange={e => updateSection('newsPreview', 'backgroundText', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Titre</label>
                  <input type="text" className="w-full border-gray-300 rounded-md" value={content.newsPreview.title} onChange={e => updateSection('newsPreview', 'title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Sous-titre</label>
                  <input type="text" className="w-full border-gray-300 rounded-md" value={content.newsPreview.subtitle} onChange={e => updateSection('newsPreview', 'subtitle', e.target.value)} />
                </div>
              </div>

              <div className="space-y-4 p-4 border rounded bg-gray-50">
                <h3 className="font-bold text-gray-800">Section Témoignages</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Titre</label>
                  <input type="text" className="w-full border-gray-300 rounded-md" value={content.testimonials.title} onChange={e => updateSection('testimonials', 'title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Sous-titre</label>
                  <input type="text" className="w-full border-gray-300 rounded-md" value={content.testimonials.subtitle} onChange={e => updateSection('testimonials', 'subtitle', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mission' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#111e36] border-b pb-2">Bloc Mission/Vision (Engagement)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ImageUpload 
                  label="Image d'illustration"
                  value={content.missionVision.image} 
                  onChange={(url) => updateSection('missionVision', 'image', url)} 
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Texte de fond (filigrane)</label>
                  <input type="text" className="w-full mt-1 border-gray-300 rounded-md" value={content.missionVision.backgroundText} onChange={e => updateSection('missionVision', 'backgroundText', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Titre principal</label>
                  <textarea rows={3} className="w-full mt-1 border-gray-300 rounded-md" value={content.missionVision.title} onChange={e => updateSection('missionVision', 'title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Texte du bouton</label>
                  <input type="text" className="w-full mt-1 border-gray-300 rounded-md" value={content.missionVision.buttonText} onChange={e => updateSection('missionVision', 'buttonText', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dgQuote' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#111e36] border-b pb-2">Mot de la Direction Générale</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ImageUpload 
                  label="Photo de la DG"
                  value={content.dgQuote.image} 
                  onChange={(url) => updateSection('dgQuote', 'image', url)} 
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message (Citation)</label>
                  <textarea rows={6} className="w-full mt-1 border-gray-300 rounded-md" value={content.dgQuote.quote} onChange={e => updateSection('dgQuote', 'quote', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom et Prénom(s)</label>
                  <input type="text" className="w-full mt-1 border-gray-300 rounded-md" value={content.dgQuote.author} onChange={e => updateSection('dgQuote', 'author', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Titre du poste</label>
                  <input type="text" className="w-full mt-1 border-gray-300 rounded-md" value={content.dgQuote.role} onChange={e => updateSection('dgQuote', 'role', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'join' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#111e36] border-b pb-2">Section "Rejoignez-nous"</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ImageUpload 
                  label="Image de fond"
                  value={content.joinUs.image} 
                  onChange={(url) => updateSection('joinUs', 'image', url)} 
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Titre</label>
                  <input type="text" className="w-full mt-1 border-gray-300 rounded-md" value={content.joinUs.title} onChange={e => updateSection('joinUs', 'title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sous-titre / Texte</label>
                  <textarea rows={3} className="w-full mt-1 border-gray-300 rounded-md" value={content.joinUs.text} onChange={e => updateSection('joinUs', 'text', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">Boutons d'action</h3>
                <Button type="button" onClick={addJoinButton} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un bouton
                </Button>
              </div>

              {(!content.joinUs.buttons || content.joinUs.buttons.length === 0) ? (
                <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-500">Aucun bouton. Ajoutez-en un pour l'afficher dans la section.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {content.joinUs.buttons.map((btn: any, index: number) => (
                    <div key={btn.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                      <button 
                        type="button"
                        onClick={() => removeJoinButton(btn.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white p-1 rounded-md shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="space-y-3 mt-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Texte du bouton</label>
                          <input 
                            type="text" 
                            className="w-full mt-1 border-gray-300 rounded-md text-sm"
                            value={btn.text}
                            onChange={(e) => updateJoinButton(btn.id, 'text', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Lien</label>
                          <input 
                            type="text" 
                            className="w-full mt-1 border-gray-300 rounded-md text-sm"
                            value={btn.link}
                            onChange={(e) => updateJoinButton(btn.id, 'link', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold text-[#111e36]">Logos des Partenaires</h2>
              <Button type="button" onClick={addPartner} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un partenaire
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la section</label>
              <input type="text" className="w-full border-gray-300 rounded-md max-w-md" value={content.partners.title} onChange={e => updateSection('partners', 'title', e.target.value)} />
            </div>

            {content.partners.items.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">Aucun partenaire. Ajoutez-en un pour l'afficher sur l'accueil.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.partners.items.map((partner: any, index: number) => (
                  <div key={partner.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                    <button 
                      type="button"
                      onClick={() => removePartner(partner.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white p-1 rounded-md shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="mb-4">
                      <ImageUpload 
                        label="Logo"
                        value={partner.image} 
                        onChange={(url) => updatePartner(partner.id, 'image', url)} 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500">Nom du partenaire</label>
                      <input 
                        type="text" 
                        className="w-full mt-1 border-gray-300 rounded-md text-sm"
                        value={partner.name}
                        onChange={(e) => updatePartner(partner.id, 'name', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#111e36] border-b pb-2">Chiffres Clés (Statistiques)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(content.stats || DEFAULT_CONTENT.stats).map((stat: any, index: number) => (
                <div key={stat.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative space-y-4">
                  <h3 className="font-medium text-gray-900">Statistique #{index + 1}</h3>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Valeur (Chiffre)</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 border-gray-300 rounded-md text-sm"
                      value={stat.value}
                      onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Suffixe (ex: +, %)</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 border-gray-300 rounded-md text-sm"
                      value={stat.suffix}
                      onChange={(e) => updateStat(stat.id, 'suffix', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Libellé (Texte)</label>
                    <input 
                      type="text" 
                      className="w-full mt-1 border-gray-300 rounded-md text-sm"
                      value={stat.label}
                      onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                    />
                  </div>
                </div>
              ))}
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
