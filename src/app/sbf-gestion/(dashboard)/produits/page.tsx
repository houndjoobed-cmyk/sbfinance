'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Loader2, CreditCard, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ProduitCredit = {
  id: string;
  nom: string;
  categorie: string;
  montantMax: number | null;
  dureeMaxMois: number | null;
};

type ProduitAutre = {
  id: string;
  nom: string;
  type: string;
};

export default function ProduitsPage() {
  const [credits, setCredits] = useState<ProduitCredit[]>([]);
  const [autres, setAutres] = useState<ProduitAutre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resCredits, resAutres] = await Promise.all([
        fetch('/api/admin/produits/credit'),
        fetch('/api/admin/produits/autres')
      ]);

      if (resCredits.ok) setCredits(await resCredits.json());
      if (resAutres.ok) setAutres(await resAutres.json());
    } catch (error) {
      console.error('Erreur', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCredit = async (id: string) => {
    if (!window.confirm('Voulez-vous supprimer ce produit de crédit ?')) return;
    const res = await fetch(`/api/admin/produits/credit/${id}`, { method: 'DELETE' });
    if (res.ok) setCredits(prev => prev.filter(p => p.id !== id));
  };

  const handleDeleteAutre = async (id: string) => {
    if (!window.confirm('Voulez-vous supprimer ce produit ?')) return;
    const res = await fetch(`/api/admin/produits/autres/${id}`, { method: 'DELETE' });
    if (res.ok) setAutres(prev => prev.filter(p => p.id !== id));
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;
  }

  return (
    <div className="space-y-12">
      {/* SECTION CRÉDITS */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <CreditCard className="w-6 h-6 mr-2 text-[#0991b5]" />
            Produits de Crédit
          </h2>
          <Button asChild variant="accent">
            <Link href="/sbf-gestion/produits/credit/nouveau">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Crédit
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du crédit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant Max</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {credits.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Aucun crédit.</td></tr>
              ) : (
                credits.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{c.nom}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.categorie}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {c.montantMax ? `${c.montantMax.toLocaleString('fr-FR')} FCFA` : 'Non défini'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/sbf-gestion/produits/credit/${c.id}`} className="text-[#0991b5] hover:bg-blue-50 p-2 rounded-md"><Edit className="w-4 h-4" /></Link>
                        <button onClick={() => handleDeleteCredit(c.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-md"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION AUTRES PRODUITS */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Landmark className="w-6 h-6 mr-2 text-[#0991b5]" />
            Autres Produits (Épargne, Conseil...)
          </h2>
          <Button asChild variant="accent">
            <Link href="/sbf-gestion/produits/autres/nouveau">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Produit
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du produit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {autres.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">Aucun autre produit.</td></tr>
              ) : (
                autres.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{a.nom}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {a.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/sbf-gestion/produits/autres/${a.id}`} className="text-[#0991b5] hover:bg-blue-50 p-2 rounded-md"><Edit className="w-4 h-4" /></Link>
                        <button onClick={() => handleDeleteAutre(a.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-md"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
