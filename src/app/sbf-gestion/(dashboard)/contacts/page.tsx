'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Mail, CheckCircle2, Trash2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Contact = {
  id: string;
  nom: string;
  telephone: string;
  email: string | null;
  message: string;
  agenceRef: string | null;
  estTraite: boolean;
  createdAt: string;
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/contacts');
      if (res.ok) setContacts(await res.json());
    } catch (error) {
      console.error('Erreur', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTraite = async (id: string, currentState: boolean) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estTraite: !currentState })
      });
      if (res.ok) {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, estTraite: !currentState } : c));
      }
    } catch (error) {
      console.error('Erreur', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette demande ?')) return;
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setContacts(prev => prev.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Erreur', error);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;

  return (
    <div>
      <div className="flex items-center mb-8">
        <Mail className="w-8 h-8 mr-3 text-[#0991b5]" />
        <h1 className="text-3xl font-bold text-gray-900">Demandes de Contact</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Aucune demande reçue pour l'instant.</td></tr>
            ) : (
              contacts.map((c) => (
                <tr key={c.id} className={`hover:bg-gray-50 ${c.estTraite ? 'opacity-60' : 'bg-blue-50/30'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{new Date(c.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
                    <div className="mt-1">
                      {c.estTraite ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Traitée
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          En attente
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-gray-900">{c.nom}</div>
                    <div className="text-sm text-gray-500">{c.telephone}</div>
                    {c.email && <div className="text-sm text-gray-500">{c.email}</div>}
                    {c.agenceRef && <div className="text-xs mt-1 text-[#0991b5]">Agence souhaitée: {c.agenceRef}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 whitespace-pre-wrap">{c.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleTraite(c.id, c.estTraite)}
                        className={c.estTraite ? "text-gray-600" : "text-green-600 border-green-200 hover:bg-green-50"}
                      >
                        {c.estTraite ? <><XCircle className="w-4 h-4 mr-1" /> Marquer non lue</> : <><CheckCircle2 className="w-4 h-4 mr-1" /> Marquer traitée</>}
                      </Button>
                      <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
