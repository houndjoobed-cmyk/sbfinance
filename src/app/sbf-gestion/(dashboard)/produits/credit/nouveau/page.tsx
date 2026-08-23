'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ProduitCreditFormPage({ params }: { params?: { id: string } }) {
  const isEditing = !!params?.id;
  const router = useRouter();
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nom: '',
    categorie: 'Besoin de fonds de roulement',
    description: '',
    cible: '',
    garantieExigee: '',
    montantMin: '',
    montantMax: '',
    dureeMinMois: '',
    dureeMaxMois: '',
    tauxInteretAnnuel: '',
    periodicite: 'Mensuelle',
  });

  const [conditions, setConditions] = useState<string[]>(['']);
  const [pieces, setPieces] = useState<string[]>(['']);

  useEffect(() => {
    if (isEditing && params?.id) {
      fetchProduit(params.id);
    }
  }, [isEditing, params]);

  const fetchProduit = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/produits/credit/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          nom: data.nom || '',
          categorie: data.categorie || 'Besoin de fonds de roulement',
          description: data.description || '',
          cible: data.cible || '',
          garantieExigee: data.garantieExigee || '',
          montantMin: data.montantMin?.toString() || '',
          montantMax: data.montantMax?.toString() || '',
          dureeMinMois: data.dureeMinMois?.toString() || '',
          dureeMaxMois: data.dureeMaxMois?.toString() || '',
          tauxInteretAnnuel: data.tauxInteretAnnuel || '',
          periodicite: data.periodicite || 'Mensuelle',
        });
        setConditions(data.conditions?.length ? data.conditions : ['']);
        setPieces(data.piecesAFournir?.length ? data.piecesAFournir : ['']);
      }
    } catch (err) {
      setError('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = isEditing ? `/api/admin/produits/credit/${params.id}` : '/api/admin/produits/credit';
    const method = isEditing ? 'PUT' : 'POST';

    const payload = {
      ...formData,
      conditions: conditions.filter(c => c.trim() !== ''),
      piecesAFournir: pieces.filter(p => p.trim() !== '')
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');

      router.push('/sbf-gestion/produits');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Gestion des listes dynamiques (Conditions et Pièces)
  const handleArrayChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });
  };

  const addArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const removeArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/sbf-gestion/produits" className="text-gray-500 hover:text-gray-700 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Modifier le Crédit' : 'Nouveau Produit de Crédit'}
        </h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-8">
        
        {/* Section 1: Informations Générales */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#0991b5] border-b pb-2">Informations Générales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom du crédit *</label>
              <input required name="nom" value={formData.nom} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2" placeholder="Ex: Crédit Groupe Solidaire (CGS)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
              <select name="categorie" value={formData.categorie} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2">
                <option value="Besoin de fonds de roulement">Besoin de fonds de roulement</option>
                <option value="Crédit à la consommation">Crédit à la consommation</option>
                <option value="Crédit Cause">Crédit Cause</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cible *</label>
              <input required name="cible" value={formData.cible} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2" placeholder="Ex: Femmes en groupe, Commerçants..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description courte *</label>
              <textarea required name="description" rows={2} value={formData.description} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2" />
            </div>
          </div>
        </div>

        {/* Section 2: Modalités financières */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#0991b5] border-b pb-2">Modalités Financières</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Montant Min (FCFA)</label>
              <input type="number" name="montantMin" value={formData.montantMin} onChange={handleChange} className="w-full border-gray-300 rounded-md border bg-white px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Montant Max (FCFA)</label>
              <input type="number" name="montantMax" value={formData.montantMax} onChange={handleChange} className="w-full border-gray-300 rounded-md border bg-white px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durée Min (Mois)</label>
              <input type="number" name="dureeMinMois" value={formData.dureeMinMois} onChange={handleChange} className="w-full border-gray-300 rounded-md border bg-white px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durée Max (Mois)</label>
              <input type="number" name="dureeMaxMois" value={formData.dureeMaxMois} onChange={handleChange} className="w-full border-gray-300 rounded-md border bg-white px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Taux d'intérêt (Optionnel, ex: 1.5% par mois)</label>
              <input name="tauxInteretAnnuel" value={formData.tauxInteretAnnuel} onChange={handleChange} className="w-full border-gray-300 rounded-md border bg-white px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Périodicité de remboursement</label>
              <input name="periodicite" value={formData.periodicite} onChange={handleChange} className="w-full border-gray-300 rounded-md border bg-white px-3 py-2" placeholder="Mensuelle, Hebdomadaire..." />
            </div>
          </div>
        </div>

        {/* Section 3: Conditions et Garanties */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#0991b5] border-b pb-2">Conditions & Garanties (Résumé Public)</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Garantie exigée *</label>
            <input required name="garantieExigee" value={formData.garantieExigee} onChange={handleChange} className="w-full border-gray-300 rounded-md border bg-white px-3 py-2" placeholder="Ex: Caution solidaire, Épargne préalable de 10%..." />
            <p className="text-xs text-gray-500 mt-1">Évitez le jargon interne de recouvrement ou co-signature, restez grand public.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Conditions d'éligibilité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Conditions d'éligibilité</label>
              <div className="space-y-2">
                {conditions.map((cond, index) => (
                  <div key={index} className="flex gap-2">
                    <input value={cond} onChange={(e) => handleArrayChange(setConditions, index, e.target.value)} className="flex-1 border-gray-300 rounded-md text-sm border bg-white px-3 py-2" placeholder="Ex: Être majeur..." />
                    <button type="button" onClick={() => removeArrayItem(setConditions, index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-2 text-xs" onClick={() => addArrayItem(setConditions)}>
                <Plus className="w-3 h-3 mr-1" /> Ajouter une condition
              </Button>
            </div>

            {/* Pièces à fournir */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pièces à fournir</label>
              <div className="space-y-2">
                {pieces.map((piece, index) => (
                  <div key={index} className="flex gap-2">
                    <input value={piece} onChange={(e) => handleArrayChange(setPieces, index, e.target.value)} className="flex-1 border-gray-300 rounded-md text-sm border bg-white px-3 py-2" placeholder="Ex: Copie de la pièce d'identité..." />
                    <button type="button" onClick={() => removeArrayItem(setPieces, index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-2 text-xs" onClick={() => addArrayItem(setPieces)}>
                <Plus className="w-3 h-3 mr-1" /> Ajouter une pièce
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" className="mr-4" onClick={() => router.push('/sbf-gestion/produits')}>Annuler</Button>
          <Button type="submit" variant="accent" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {isEditing ? 'Mettre à jour' : 'Créer le crédit'}
          </Button>
        </div>
      </form>
    </div>
  );
}
