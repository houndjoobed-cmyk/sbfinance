'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from '@/components/admin/image-upload';

export default function ParametresPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('generale');
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [formData, setFormData] = useState({
    mission: '',
    vision: '',
    valeurs: '',
    anneeCreation: 2009,
    nombreAgences: 5,
    nombreClients: 0,
    telephonePrincipal: '',
    emailPrincipal: '',
    adresseSiege: '',
    histoireTexte: '',
    gouvernanceTexte: '',
    banniereAPropos: '',
    faviconUrl: ''
  });

  useEffect(() => {
    fetchParametres();
  }, []);

  const fetchParametres = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/parametres');
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setFormData({
            ...data,
            valeurs: Array.isArray(data.valeurs) ? data.valeurs.join('\n') : '',
            histoireTexte: data.histoireTexte || '',
            gouvernanceTexte: data.gouvernanceTexte || '',
            banniereAPropos: data.banniereAPropos || '',
            faviconUrl: data.themeConfig?.faviconUrl || data.faviconUrl || ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching parameters', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const currentThemeConfig = (formData as any).themeConfig || {};
      const payload = {
        ...formData,
        valeurs: formData.valeurs.split('\n').filter(v => v.trim() !== ''),
        themeConfig: {
          ...currentThemeConfig,
          faviconUrl: formData.faviconUrl
        }
      };

      const res = await fetch('/api/admin/parametres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');
      
      setMessage({ text: 'Paramètres sauvegardés avec succès !', type: 'success' });
    } catch (error: any) {
      setMessage({ text: error.message || 'Erreur lors de la sauvegarde.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleImageChange = (name: string, url: string) => {
    setFormData(prev => ({ ...prev, [name]: url }));
  };



  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Paramètres Globaux du Site</h1>
      
      {message.text && (
        <div className={`mb-6 px-4 py-3 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'} border`}>
          {message.text}
        </div>
      )}

      {/* TABS */}
      <div className="flex border-b border-gray-200 mb-6 space-x-8">
        <button 
          onClick={() => setActiveTab('generale')}
          className={`pb-4 font-medium text-sm transition-colors ${activeTab === 'generale' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Informations Générales
        </button>
        <button 
          onClick={() => setActiveTab('textes')}
          className={`pb-4 font-medium text-sm transition-colors ${activeTab === 'textes' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Textes longs
        </button>
        <button 
          onClick={() => setActiveTab('medias')}
          className={`pb-4 font-medium text-sm transition-colors ${activeTab === 'medias' ? 'border-b-2 border-[#0991b5] text-[#0991b5]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Images & Bannières
        </button>

      </div>

      <form onSubmit={handleSave} className="space-y-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        
        {/* ONGLET: GENERALE */}
        {activeTab === 'generale' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#111e36] border-b pb-2">Informations de base</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notre Mission (Court)</label>
                <textarea 
                  name="mission" 
                  rows={4} 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                  value={formData.mission}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notre Vision (Court)</label>
                <textarea 
                  name="vision" 
                  rows={4} 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                  value={formData.vision}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nos Valeurs (Une par ligne)</label>
                <textarea 
                  name="valeurs" 
                  rows={4} 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                  value={formData.valeurs}
                  onChange={handleChange}
                  placeholder="Respect&#10;Intégrité&#10;Efficacité"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#111e36] border-b pb-2">Contacts & Chiffres Clés</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone Principal</label>
                <input 
                  type="text" 
                  name="telephonePrincipal" 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                  value={formData.telephonePrincipal}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Principal</label>
                <input 
                  type="email" 
                  name="emailPrincipal" 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                  value={formData.emailPrincipal}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse du Siège</label>
                <input 
                  type="text" 
                  name="adresseSiege" 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                  value={formData.adresseSiege}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Année Création</label>
                  <input 
                    type="number" 
                    name="anneeCreation" 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                    value={formData.anneeCreation}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nb Agences</label>
                  <input 
                    type="number" 
                    name="nombreAgences" 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                    value={formData.nombreAgences}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nb Clients</label>
                  <input 
                    type="number" 
                    name="nombreClients" 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                    value={formData.nombreClients}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ONGLET: TEXTES */}
        {activeTab === 'textes' && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-[#111e36] border-b pb-2">Pages Institutionnelles</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texte "Notre Histoire" (Page A propos)</label>
              <textarea 
                name="histoireTexte" 
                rows={8} 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                value={formData.histoireTexte}
                onChange={handleChange}
                placeholder="Rédigez l'histoire de la création de SBF ici..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texte "Gouvernance" (Page A propos)</label>
              <textarea 
                name="gouvernanceTexte" 
                rows={8} 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                value={formData.gouvernanceTexte}
                onChange={handleChange}
                placeholder="Décrivez l'équipe dirigeante ou la structure de gouvernance..."
              />
            </div>


          </div>
        )}

        {/* ONGLET: MEDIAS */}
        {activeTab === 'medias' && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-[#111e36] border-b pb-2">Gestion des Médias Globaux</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ImageUpload 
                  label="Bannière Page 'Qui sommes-nous'"
                  value={formData.banniereAPropos} 
                  onChange={(url) => handleImageChange('banniereAPropos', url)} 
                />
                <p className="mt-2 text-sm text-gray-500">Image recommandée : 1920x600px. S'affiche en haut de la page "Qui sommes-nous".</p>
              </div>

              <div>
                <ImageUpload 
                  label="Logo du Navigateur (Favicon)"
                  value={formData.faviconUrl} 
                  onChange={(url) => handleImageChange('faviconUrl', url)} 
                />
                <p className="mt-2 text-sm text-gray-500">
                  Icône carrée (PNG, WebP, ICO). S'affiche dans l'onglet du navigateur et dans les résultats Google devant sbfinance.bj.
                </p>
              </div>
            </div>
          </div>
        )}



        <div className="flex justify-end pt-4">
          <Button type="submit" variant="accent" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Enregistrer les paramètres
          </Button>
        </div>
      </form>
    </div>
  );
}
