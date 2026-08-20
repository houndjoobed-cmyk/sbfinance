"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { submitContactForm } from '@/app/contact/actions';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  agencies: { id: string; nom: string }[];
}

export function ContactForm({ agencies }: ContactFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Une erreur est survenue.');
    }
    
    setIsPending(false);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-xl border border-green-200 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Message envoyé avec succès !</h3>
        <p>Nous avons bien reçu votre demande et nous vous contacterons dans les plus brefs délais.</p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-primary-dark mb-6"><TypingAnimation text="Envoyez-nous un message" typeSpeed={50} /></h2>
      
      {status === 'error' && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md flex items-center mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <p className="ml-3 text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-on-surface">Nom complet <span className="text-accent">*</span></label>
          <input 
            type="text" 
            id="name" 
            name="name"
            className="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
            placeholder="Votre nom"
            required
            disabled={isPending}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-on-surface">Téléphone <span className="text-accent">*</span></label>
            <input 
              type="tel" 
              id="phone" 
              name="phone"
              className="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
              placeholder="+229..."
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-on-surface">Email (Optionnel)</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              className="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
              placeholder="votre@email.com"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="agency" className="text-sm font-medium text-on-surface">Agence de préférence (Optionnel)</label>
          <select 
            id="agency" 
            name="agency"
            className="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow appearance-none"
            disabled={isPending}
          >
            <option value="">Sélectionnez une agence...</option>
            {agencies.map((agency) => (
              <option key={agency.id} value={agency.id}>
                {agency.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-on-surface">Message <span className="text-accent">*</span></label>
          <textarea 
            id="message" 
            name="message"
            rows={5}
            className="w-full p-4 rounded-md border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none" 
            placeholder="Comment pouvons-nous vous aider ?"
            required
            disabled={isPending}
          ></textarea>
        </div>

        <Button type="submit" variant="primary" className="w-full" size="lg" disabled={isPending}>
          {isPending ? "Envoi en cours..." : "Envoyer la demande"}
        </Button>
      </form>
    </>
  );
}
