'use client';

import React, { useState, useEffect } from 'react';
import {
  Loader2,
  Mail,
  CheckCircle2,
  Trash2,
  XCircle,
  Reply,
  Send,
  X,
  Sparkles,
  AlertCircle,
  ExternalLink,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Contact = {
  id: string;
  nom: string;
  telephone: string;
  email: string | null;
  message: string;
  agencePreference?: string | null;
  agenceRef?: string | null;
  estTraite: boolean;
  createdAt: string;
};

function extractInitialSubject(message: string): string {
  const matchObjet = message.match(/\[Objet\s*:\s*([^\]]+)\]/i);
  if (matchObjet?.[1]) {
    return `Réponse à votre demande : ${matchObjet[1].trim()} - Salem Braha Finance`;
  }
  const matchReclam = message.match(/Objet\s*:\s*([^\n]+)/i);
  if (matchReclam?.[1]) {
    return `Suivi de votre réclamation : ${matchReclam[1].trim()} - Salem Braha Finance`;
  }
  return 'Réponse à votre message - Salem Braha Finance';
}

function splitMessageAndReply(rawMessage: string): {
  clientMessage: string;
  sentReplyHeader: string | null;
  sentReplyBody: string | null;
} {
  const marker = '\n\n--- [RÉPONSE ENVOYÉE ';
  const idx = rawMessage.indexOf(marker);
  if (idx === -1) {
    return { clientMessage: rawMessage, sentReplyHeader: null, sentReplyBody: null };
  }
  const clientMessage = rawMessage.slice(0, idx);
  const rest = rawMessage.slice(idx + 2); // starts with --- [RÉPONSE ENVOYÉE ...
  const firstNewline = rest.indexOf('\n');
  if (firstNewline === -1) {
    return { clientMessage, sentReplyHeader: rest, sentReplyBody: '' };
  }
  return {
    clientMessage,
    sentReplyHeader: rest.slice(0, firstNewline).replace(/^---\s*|\s*---$/g, ''),
    sentReplyBody: rest.slice(firstNewline + 1),
  };
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  // État de la modale de réponse
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyEmail, setReplyEmail] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [sendError, setSendError] = useState('');
  const [missingConfig, setMissingConfig] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/contacts', { cache: 'no-store' });
      if (res.ok) setContacts(await res.json());
    } catch (error) {
      console.error('Erreur', error);
    } finally {
      setLoading(false);
    }
  };

  const openReplyModal = (contact: Contact) => {
    setSelectedContact(contact);
    setReplyEmail(contact.email || '');
    setReplySubject(extractInitialSubject(contact.message));
    setReplyMessage(
      `Nous accusons bonne réception de votre message et vous remercions de l'intérêt que vous portez à Salem Braha Finance (SBF).\n\n`
    );
    setSendStatus('idle');
    setSendError('');
    setMissingConfig(false);
  };

  const closeReplyModal = () => {
    if (sending) return;
    setSelectedContact(null);
    setSendStatus('idle');
    setSendError('');
    setMissingConfig(false);
  };

  const applyTemplate = (type: 'accueil' | 'agence' | 'credit' | 'reclamation') => {
    if (!selectedContact) return;
    const templates: Record<typeof type, string> = {
      accueil: `Nous avons bien reçu votre message et vous remercions d'avoir contacté Salem Braha Finance.\n\nUn conseiller clientèle a pris en charge votre demande et reste à votre entière disposition au +229 01 21 38 05 87 pour tout complément d'information.\n\nCordialement,\nL'équipe Salem Braha Finance`,
      agence: `Suite à votre demande, nous serions ravis de vous accueillir dans l'une de nos agences (Arconville, Zogbo, Tankpè, Togba ou Division Crédit aux Fonctionnaires) afin d'étudier votre dossier de manière personnalisée.\n\nVous pouvez également nous joindre directement au +229 01 21 38 05 87 ou sur WhatsApp au +229 01 28 30 59 76.\n\nCordialement,\nLe Service Clientèle SBF`,
      credit: `Nous vous remercions pour l'intérêt porté à nos solutions d'épargne et de crédit.\n\nPour constituer votre dossier, nous vous invitons à vous rapprocher de notre agence la plus proche muni(e) d'une pièce d'identité en cours de validité et de deux photos d'identité. Nos conseillers vous accompagneront dans le choix de la formule la plus adaptée à votre projet.\n\nCordialement,\nL'équipe Salem Braha Finance`,
      reclamation: `Nous accusons réception de votre réclamation qui a retenu toute notre attention.\n\nVotre dossier a été transmis à notre service compétent pour vérification et traitement prioritaire. Nous reviendrons vers vous dans les plus brefs délais avec une réponse détaillée.\n\nNous vous remercions pour votre confiance.\nCordialement,\nLa Direction de la Relation Clientèle SBF`,
    };
    setReplyMessage(templates[type]);
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) return;

    setSending(true);
    setSendStatus('idle');
    setSendError('');
    setMissingConfig(false);

    try {
      const res = await fetch(`/api/admin/contacts/${selectedContact.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: replyEmail,
          subject: replySubject,
          replyMessage,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSendStatus('success');
        setContacts((prev) =>
          prev.map((c) => (c.id === selectedContact.id ? data.contact : c))
        );
        setTimeout(() => {
          setSelectedContact(null);
          setSendStatus('idle');
        }, 1800);
      } else {
        setSendStatus('error');
        setSendError(data.error || "Erreur lors de l'envoi de l'email.");
        if (data.missingConfig) {
          setMissingConfig(true);
        }
      }
    } catch (error) {
      console.error('Erreur envoi réponse:', error);
      setSendStatus('error');
      setSendError("Impossible de contacter le serveur pour envoyer l'email.");
    } finally {
      setSending(false);
    }
  };

  const toggleTraite = async (id: string, currentState: boolean) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estTraite: !currentState }),
      });
      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, estTraite: !currentState } : c))
        );
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
        setContacts((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error('Erreur', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center">
          <Mail className="w-8 h-8 mr-3 text-[#0991b5]" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Demandes de Contact</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Consultez les messages reçus et répondez directement dans la boîte mail des clients.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message & Suivi
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 z-10 shadow-[-4px_0_10px_-5px_rgba(0,0,0,0.05)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Aucune demande reçue pour l&apos;instant.
                </td>
              </tr>
            ) : (
              contacts.map((c) => {
                const { clientMessage, sentReplyHeader, sentReplyBody } = splitMessageAndReply(
                  c.message
                );
                const agence = c.agencePreference || c.agenceRef;

                return (
                  <tr
                    key={c.id}
                    className={`hover:bg-gray-50 group ${
                      c.estTraite ? 'opacity-80' : 'bg-blue-50/30'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(c.createdAt).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      <div className="mt-1.5 flex flex-col gap-1">
                        {c.estTraite ? (
                          <span className="inline-flex items-center w-fit px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Traitée
                          </span>
                        ) : (
                          <span className="inline-flex items-center w-fit px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            En attente
                          </span>
                        )}
                        {sentReplyHeader && (
                          <span className="inline-flex items-center w-fit px-2 py-0.5 rounded text-[11px] font-medium bg-cyan-50 text-[#0991b5] border border-cyan-200">
                            <Reply className="w-3 h-3 mr-1" /> Répondu par mail
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <div className="font-bold text-gray-900">{c.nom}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>{c.telephone}</span>
                      </div>
                      {c.email ? (
                        <div className="text-sm text-[#0991b5] font-medium flex items-center gap-1 mt-0.5">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{c.email}</span>
                        </div>
                      ) : (
                        <div className="text-xs text-amber-600 mt-1">
                          Aucun email renseigné
                        </div>
                      )}
                      {agence && (
                        <div className="text-xs mt-1 text-gray-500">
                          Agence : <span className="font-medium text-gray-700">{agence}</span>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 align-top max-w-xl">
                      <div className="text-sm text-gray-900 whitespace-pre-wrap">
                        {clientMessage}
                      </div>
                      {sentReplyHeader && (
                        <div className="mt-3 p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs text-gray-700">
                          <div className="font-semibold text-emerald-800 mb-1">
                            {sentReplyHeader}
                          </div>
                          <div className="whitespace-pre-wrap text-gray-600">
                            {sentReplyBody}
                          </div>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium align-top sticky right-0 bg-white/95 backdrop-blur-sm shadow-[-4px_0_10px_-5px_rgba(0,0,0,0.05)] z-10 group-hover:bg-gray-50/95 transition-colors">
                      <div className="flex justify-end items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => openReplyModal(c)}
                          className="bg-[#0991b5] hover:bg-[#077a99] text-white"
                        >
                          <Reply className="w-4 h-4 mr-1.5" />
                          Répondre par mail
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleTraite(c.id, c.estTraite)}
                          className={
                            c.estTraite
                              ? 'text-gray-600'
                              : 'text-green-600 border-green-200 hover:bg-green-50'
                          }
                        >
                          {c.estTraite ? (
                            <>
                              <XCircle className="w-4 h-4 mr-1" /> Non lue
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4 mr-1" /> Marquer traitée
                            </>
                          )}
                        </Button>

                        <button
                          onClick={() => handleDelete(c.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-md"
                          title="Supprimer cette demande"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modale de réponse par email */}
      {selectedContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeReplyModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modale */}
            <div className="bg-[#111e36] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-[#0991b5]/20 text-[#38bdf8]">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold">
                    Répondre à {selectedContact.nom}
                  </h2>
                  <p className="text-xs text-gray-300">
                    La réponse sera envoyée directement dans la boîte mail du client au nom de Salem Braha Finance.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeReplyModal}
                className="text-gray-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenu modale */}
            <form onSubmit={handleSendReply} className="p-6 space-y-4 overflow-y-auto">
              {/* Rappel du message du client */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5 text-xs text-gray-700">
                <div className="font-semibold text-gray-900 mb-1 flex items-center justify-between">
                  <span>Message de {selectedContact.nom} ({selectedContact.telephone})</span>
                  <span className="text-gray-400">
                    {new Date(selectedContact.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="whitespace-pre-wrap text-gray-600 max-h-28 overflow-y-auto">
                  {splitMessageAndReply(selectedContact.message).clientMessage}
                </div>
              </div>

              {/* Champ Email Destinataire */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Email du destinataire <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={replyEmail}
                  onChange={(e) => setReplyEmail(e.target.value)}
                  placeholder="client@exemple.com"
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0991b5]/30 focus:border-[#0991b5]"
                />
                {!selectedContact.email && (
                  <p className="text-xs text-amber-600 mt-1">
                    Ce visiteur n&apos;avait pas rempli le champ email. Saisissez son adresse email ci-dessus si vous en disposez.
                  </p>
                )}
              </div>

              {/* Champ Objet */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Objet de l&apos;email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0991b5]/30 focus:border-[#0991b5]"
                />
              </div>

              {/* Modèles rapides */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#0991b5]" />
                  <span>Modèles de réponse rapide :</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => applyTemplate('accueil')}
                    className="text-xs px-2.5 py-1.5 rounded-md bg-gray-100 hover:bg-cyan-50 hover:text-[#0991b5] text-gray-700 font-medium transition-colors border border-gray-200"
                  >
                    Accusé de réception
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate('agence')}
                    className="text-xs px-2.5 py-1.5 rounded-md bg-gray-100 hover:bg-cyan-50 hover:text-[#0991b5] text-gray-700 font-medium transition-colors border border-gray-200"
                  >
                    Invitation en agence
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate('credit')}
                    className="text-xs px-2.5 py-1.5 rounded-md bg-gray-100 hover:bg-cyan-50 hover:text-[#0991b5] text-gray-700 font-medium transition-colors border border-gray-200"
                  >
                    Infos Crédit / Épargne
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate('reclamation')}
                    className="text-xs px-2.5 py-1.5 rounded-md bg-gray-100 hover:bg-cyan-50 hover:text-[#0991b5] text-gray-700 font-medium transition-colors border border-gray-200"
                  >
                    Suivi Réclamation
                  </button>
                </div>
              </div>

              {/* Message de réponse */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                  Votre réponse <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Rédigez votre réponse ici..."
                  className="w-full p-3.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0991b5]/30 focus:border-[#0991b5] resize-y"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  La formule « Bonjour {selectedContact.nom}, » ainsi que la signature officielle de Salem Braha Finance sont ajoutées automatiquement à l&apos;email.
                </p>
              </div>

              {/* Messages de statut */}
              {sendStatus === 'success' && (
                <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Email envoyé avec succès à <strong>{replyEmail}</strong> ! La demande a été marquée comme traitée.
                  </span>
                </div>
              )}

              {sendStatus === 'error' && (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span>{sendError}</span>
                  </div>
                  {missingConfig && replyEmail && (
                    <div className="pt-1 pl-7">
                      <a
                        href={`mailto:${encodeURIComponent(replyEmail)}?subject=${encodeURIComponent(
                          replySubject
                        )}&body=${encodeURIComponent(
                          `Bonjour ${selectedContact.nom},\n\n${replyMessage}\n\n--\nSalem Braha Finance (SBF)\n+229 01 21 38 05 87`
                        )}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0991b5] hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Envoyer immédiatement via votre application mail par défaut en attendant la clé API
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Actions bas de modale */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeReplyModal}
                  disabled={sending}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={sending || !replyEmail.trim() || !replyMessage.trim()}
                  className="bg-[#0991b5] hover:bg-[#077a99] text-white"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer l&apos;email au client
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
