import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Salem Braha Finance pour toute question sur nos offres de crédit ou d'épargne. Trouvez notre siège à Arconville.",
};

export default function ContactPage() {
  return (
    <>
      <Section variant="primary" className="pt-[160px] pb-16 md:pt-[200px] md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/hero/hero-agency.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay z-0"></div>
        <div className="text-center max-w-3xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contactez-nous</h1>
          <p className="text-xl text-primary-light">
            Une question ? Un projet ? Notre équipe est à votre écoute pour vous accompagner.
          </p>
        </div>
      </Section>

      <Section variant="default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8 reveal-left">
            <div>
              <h2 className="text-3xl font-bold text-primary-dark mb-6">Nos Coordonnées</h2>
              <p className="text-on-surface-variant mb-8">
                N'hésitez pas à nous contacter directement ou à venir nous rencontrer dans l'une de nos agences.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-sm bg-surface-muted">
                <CardContent className="p-6 flex items-start">
                  <MapPin className="h-6 w-6 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-dark text-lg mb-1">Siège social</h3>
                    <p className="text-on-surface-variant">ZOGBO Carré 553 Lot 1907 M 072</p>
                    <p className="text-on-surface-variant">Arconville / Abomey-Calavi, Bénin</p>
                    <p className="text-on-surface-variant mt-2 text-sm">BP: 317</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-surface-muted">
                <CardContent className="p-6 flex items-start">
                  <Phone className="h-6 w-6 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-dark text-lg mb-1">Téléphone & WhatsApp</h3>
                    <p className="text-on-surface-variant">+229 01 21 38 05 87</p>
                    <p className="text-on-surface-variant">+229 01 61 09 20 32</p>
                    <p className="text-on-surface-variant mt-2 text-sm flex items-center">
                      <span className="w-2 h-2 rounded-full bg-[#25D366] mr-2"></span>
                      WhatsApp: +229 01 28 30 59 76
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-surface-muted">
                <CardContent className="p-6 flex items-start">
                  <Mail className="h-6 w-6 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-dark text-lg mb-1">Email</h3>
                    <a href="mailto:contact@sbfinance.bj" className="text-primary hover:underline">contact@sbfinance.bj</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal-right">
            <Card className="shadow-lg border-outline-variant/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary-dark mb-6">Envoyez-nous un message</h2>
                
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-on-surface">Nom complet <span className="text-accent">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
                      placeholder="Votre nom"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-on-surface">Téléphone <span className="text-accent">*</span></label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
                        placeholder="+229..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-on-surface">Email (Optionnel)</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="agency" className="text-sm font-medium text-on-surface">Agence de préférence</label>
                    <select 
                      id="agency" 
                      className="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow appearance-none"
                    >
                      <option value="">Sélectionnez une agence...</option>
                      <option value="arconville">Arconville (Siège)</option>
                      <option value="zogbo">Zogbo</option>
                      <option value="tankpe">Tankpè</option>
                      <option value="togba">Togba</option>
                      <option value="fonctionnaires">Division Crédit aux Fonctionnaires</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-on-surface">Message <span className="text-accent">*</span></label>
                    <textarea 
                      id="message" 
                      rows={5}
                      className="w-full p-4 rounded-md border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none" 
                      placeholder="Comment pouvons-nous vous aider ?"
                      required
                    ></textarea>
                  </div>

                  <Button type="submit" variant="primary" className="w-full" size="lg">
                    Envoyer la demande
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </Section>

      {/* Map Embed Placeholder */}
      <Section variant="muted" container={false} className="p-0">
        <div className="w-full h-[400px] bg-surface-container flex flex-col items-center justify-center">
          <MapPin className="h-12 w-12 text-primary/30 mb-4" />
          <p className="text-on-surface-variant font-medium">Carte d'accès (Google Maps ou Leaflet)</p>
          <p className="text-sm text-on-surface-variant/70">Intégration prévue en phase de finalisation</p>
        </div>
      </Section>
    </>
  );
}
