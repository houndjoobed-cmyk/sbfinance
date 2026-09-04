"use client";

import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Save, 
  RotateCcw, 
  Sparkles, 
  Sliders, 
  Check, 
  Eye, 
  Zap, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Valeurs par défaut de la charte graphique officielle SBF
const DEFAULT_THEME = {
  primaryColor: '#01438F',
  primaryDark: '#00326e',
  accentColor: '#EB001B',
  accentHover: '#c80017',
  textColor: '#001a40',
  buttonRadius: '0px',
};

const DEFAULT_HERO_SETTINGS = {
  autoplayDelay: 6000,
  enableZoom: true,
  overlayOpacity: 20,
  textAnimation: 'typing' as 'typing' | 'fade' | 'slide',
  pauseOnHover: true,
};

// Palettes prédéfinies recommandées
const PRIMARY_PRESETS = [
  { name: 'Bleu Officiel SBF', color: '#01438F', dark: '#00326e' },
  { name: 'Bleu Nuit Profond', color: '#002855', dark: '#001938' },
  { name: 'Bleu Océan', color: '#0991b5', dark: '#076983' },
  { name: 'Vert Finance Durable', color: '#059669', dark: '#047857' },
  { name: 'Bleu Canard', color: '#0f766e', dark: '#115e59' },
  { name: 'Bleu Indigo', color: '#4338ca', dark: '#3730a3' },
];

const ACCENT_PRESETS = [
  { name: 'Rouge SBF', color: '#EB001B', hover: '#c80017' },
  { name: 'Orange Énergie', color: '#ea580c', hover: '#c2410c' },
  { name: 'Ambre Or', color: '#d97706', hover: '#b45309' },
  { name: 'Rose Framboise', color: '#e11d48', hover: '#be123c' },
  { name: 'Bleu Cyan Électrique', color: '#0284c7', hover: '#0369a1' },
];

const TEXT_PRESETS = [
  { name: 'Bleu Sombre SBF', color: '#001a40' },
  { name: 'Noir Anthracite', color: '#111827' },
  { name: 'Gris Foncé Pro', color: '#1f2937' },
  { name: 'Ardoise Marine', color: '#0f172a' },
];

const RADIUS_OPTIONS = [
  { id: '0px', label: 'Carré moderne', desc: '0px — Épuré & institutionnel' },
  { id: '6px', label: 'Coins adoucis', desc: '6px — Subtil & élégant' },
  { id: '12px', label: 'Arrondi moderne', desc: '12px — Convivial & doux' },
  { id: '9999px', label: 'Style Pilule', desc: 'Plein arrondi — Tendance & dynamique' },
];

export default function ApparencePage() {
  const [activeTab, setActiveTab] = useState<'colors' | 'hero'>('colors');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [heroSettings, setHeroSettings] = useState(DEFAULT_HERO_SETTINGS);
  const [globalParams, setGlobalParams] = useState<any>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/parametres');
      if (res.ok) {
        const data = await res.json();
        setGlobalParams(data);
        if (data.themeConfig) {
          if (data.themeConfig.theme) {
            setTheme({ ...DEFAULT_THEME, ...data.themeConfig.theme });
          }
          if (data.themeConfig.heroSettings) {
            setHeroSettings({ ...DEFAULT_HERO_SETTINGS, ...data.themeConfig.heroSettings });
          }
        }
      }
    } catch (err) {
      console.error('Erreur chargement paramètres:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const payload = {
        ...globalParams,
        themeConfig: {
          theme,
          heroSettings,
        },
      };

      const res = await fetch('/api/admin/parametres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Échec de la sauvegarde');

      setMessage({
        text: 'Les modifications ont été enregistrées avec succès ! Elles sont actives sur le site public.',
        type: 'success',
      });
      setTimeout(() => setMessage(null), 6000);
    } catch (err: any) {
      setMessage({
        text: err.message || 'Erreur lors de la sauvegarde.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Voulez-vous rétablir toutes les couleurs et animations de la charte officielle SBF ?')) {
      setTheme(DEFAULT_THEME);
      setHeroSettings(DEFAULT_HERO_SETTINGS);
      setMessage({
        text: 'Valeurs par défaut rétablies. Cliquez sur « Enregistrer les modifications » pour confirmer.',
        type: 'success',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#111e36]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="p-2 bg-blue-50 text-primary rounded-lg">
              <Palette className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-[#111e36]">Apparence & Thème du Site Public</h1>
          </div>
          <p className="text-sm text-gray-500">
            Personnalisez les couleurs de votre marque, la forme des boutons et les animations du Hero pour le site public.
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch md:self-auto">
          <Button
            type="button"
            variant="outline"
            onClick={handleResetToDefaults}
            className="flex-1 md:flex-none border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Rétablir la charte SBF
          </Button>

          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 md:flex-none bg-primary hover:bg-[#002f66] text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </Button>
        </div>
      </div>

      {/* Notification */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-4 pt-2 rounded-t-xl">
        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'colors'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Palette className="w-4 h-4" />
          Couleurs & Boutons (Style Global)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'hero'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Animations de la Section Hero (Accueil)
        </button>
      </div>

      {/* TAB 1: COULEURS & BOUTONS */}
      {activeTab === 'colors' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Colonne gauche : Paramètres */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Couleur Principale */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <h3 className="font-semibold text-[#111e36] text-base">Couleur Principale (Primary)</h3>
                  <p className="text-xs text-gray-500">
                    Utilisée pour le bandeau supérieur, les boutons principaux et les icônes majeures.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gray-600 uppercase">{theme.primaryColor}</span>
                  <input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => {
                      const color = e.target.value;
                      setTheme((prev) => ({ ...prev, primaryColor: color, primaryDark: color }));
                    }}
                    className="w-10 h-10 p-0 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-500 block mb-2">Suggestions & Nuances SBF :</span>
                <div className="flex flex-wrap gap-2">
                  {PRIMARY_PRESETS.map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => setTheme((prev) => ({ ...prev, primaryColor: p.color, primaryDark: p.dark }))}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all ${
                        theme.primaryColor.toLowerCase() === p.color.toLowerCase()
                          ? 'border-primary bg-blue-50 text-primary ring-2 ring-primary/20'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.color }}></span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Couleur d'Accent (CTA) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <h3 className="font-semibold text-[#111e36] text-base">Couleur d'Action (Accent / CTA)</h3>
                  <p className="text-xs text-gray-500">
                    Utilisée pour les boutons d'appel à l'action importants (« Découvrir nos crédits », badges).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gray-600 uppercase">{theme.accentColor}</span>
                  <input
                    type="color"
                    value={theme.accentColor}
                    onChange={(e) => {
                      const color = e.target.value;
                      setTheme((prev) => ({ ...prev, accentColor: color, accentHover: color }));
                    }}
                    className="w-10 h-10 p-0 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-500 block mb-2">Suggestions d'accent :</span>
                <div className="flex flex-wrap gap-2">
                  {ACCENT_PRESETS.map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => setTheme((prev) => ({ ...prev, accentColor: p.color, accentHover: p.hover }))}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all ${
                        theme.accentColor.toLowerCase() === p.color.toLowerCase()
                          ? 'border-red-500 bg-red-50 text-red-700 ring-2 ring-red-500/20'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.color }}></span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Couleur du Texte */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <h3 className="font-semibold text-[#111e36] text-base">Couleur des Titres & Textes</h3>
                  <p className="text-xs text-gray-500">
                    Appliquée sur les grands titres de sections et paragraphes du site.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gray-600 uppercase">{theme.textColor}</span>
                  <input
                    type="color"
                    value={theme.textColor}
                    onChange={(e) => setTheme((prev) => ({ ...prev, textColor: e.target.value }))}
                    className="w-10 h-10 p-0 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-500 block mb-2">Nuances recommandées :</span>
                <div className="flex flex-wrap gap-2">
                  {TEXT_PRESETS.map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => setTheme((prev) => ({ ...prev, textColor: p.color }))}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all ${
                        theme.textColor.toLowerCase() === p.color.toLowerCase()
                          ? 'border-gray-900 bg-gray-100 text-gray-900 ring-2 ring-gray-900/20'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: p.color }}></span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Forme des Boutons */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div>
                <h3 className="font-semibold text-[#111e36] text-base">Style & Arrondi des Boutons</h3>
                <p className="text-xs text-gray-500">
                  Détermine le niveau d'arrondi sur tous les boutons du site public.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RADIUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme((prev) => ({ ...prev, buttonRadius: opt.id }))}
                    className={`p-3.5 border rounded-lg text-left transition-all flex items-center justify-between ${
                      theme.buttonRadius === opt.id
                        ? 'border-primary bg-blue-50/70 ring-2 ring-primary/20'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-sm text-gray-900">{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </div>
                    <div
                      className="w-8 h-6 border-2 border-gray-400 bg-white"
                      style={{ borderRadius: opt.id }}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite : LIVE PREVIEW */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 space-y-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-[#111e36] text-sm uppercase tracking-wide">Aperçu en Direct</h3>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                    Simulateur
                  </span>
                </div>

                {/* Cadre de simulation */}
                <div className="p-6 rounded-xl bg-gray-50 border border-dashed border-gray-300 space-y-5">
                  <div>
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-1 text-white mb-2"
                      style={{
                        backgroundColor: theme.accentColor,
                        borderRadius: theme.buttonRadius,
                      }}
                    >
                      NOUVEAUTÉ 2026
                    </span>
                    <h4
                      className="text-2xl font-bold leading-tight transition-colors"
                      style={{ color: theme.textColor }}
                    >
                      Cultivons la prospérité ensemble
                    </h4>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      Des solutions de microfinance souples et durables pour dynamiser vos activités au Bénin.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-medium text-gray-500">Exemples de boutons avec vos styles :</div>
                    <div className="flex flex-wrap gap-2.5">
                      {/* Bouton Primaire */}
                      <button
                        type="button"
                        className="px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
                        style={{
                          backgroundColor: theme.primaryColor,
                          borderRadius: theme.buttonRadius,
                        }}
                      >
                        Bouton Primaire
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {/* Bouton Accent */}
                      <button
                        type="button"
                        className="px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform active:scale-95"
                        style={{
                          backgroundColor: theme.accentColor,
                          borderRadius: theme.buttonRadius,
                        }}
                      >
                        Action (CTA)
                      </button>

                      {/* Bouton Outline */}
                      <button
                        type="button"
                        className="px-4 py-2 text-xs font-semibold border transition-all"
                        style={{
                          borderColor: theme.primaryColor,
                          color: theme.primaryColor,
                          borderRadius: theme.buttonRadius,
                        }}
                      >
                        En savoir plus
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 leading-relaxed flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    Ces couleurs s'injectent directement dans les variables CSS Tailwind du site public. Le dashboard admin conserve quant à lui son style neutre.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANIMATIONS DU HERO */}
      {activeTab === 'hero' && (
        <div className="max-w-4xl space-y-6">
          {/* 1. Vitesse de rotation */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-[#111e36] text-base">Vitesse de Défilement Automatique</h3>
                <p className="text-xs text-gray-500">
                  Délai d'affichage de chaque diapositive avant le passage automatique à la suivante.
                </p>
              </div>
              <span className="text-base font-bold text-primary bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                {(heroSettings.autoplayDelay / 1000).toFixed(1)} secondes
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <input
                type="range"
                min={2000}
                max={12000}
                step={500}
                value={heroSettings.autoplayDelay}
                onChange={(e) =>
                  setHeroSettings((prev) => ({ ...prev, autoplayDelay: parseInt(e.target.value) }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Rapide (2s)</span>
                <span>Recommandé (5s - 6s)</span>
                <span>Lent (12s)</span>
              </div>
            </div>
          </div>

          {/* 2. Effet de Zoom Ken-Burns */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[#111e36] text-base">Effet de Zoom Progressif (Ken-Burns)</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Anime doucement l'image d'arrière-plan en l'agrandissant lentement pendant la rotation.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={heroSettings.enableZoom}
                onChange={(e) =>
                  setHeroSettings((prev) => ({ ...prev, enableZoom: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* 3. Style d'Animation du Titre */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <h3 className="font-semibold text-[#111e36] text-base">Animation du Titre Principal</h3>
              <p className="text-xs text-gray-500">
                Choisissez comment le slogan ou le titre apparaît à chaque changement de bannière.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* Option 1: Typing */}
              <button
                type="button"
                onClick={() => setHeroSettings((prev) => ({ ...prev, textAnimation: 'typing' }))}
                className={`p-4 border rounded-xl text-left transition-all ${
                  heroSettings.textAnimation === 'typing'
                    ? 'border-primary bg-blue-50/70 ring-2 ring-primary/20'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-[#111e36]">
                  <Zap className="w-4 h-4 text-primary" />
                  Machine à écrire
                </div>
                <p className="text-xs text-gray-500">
                  Les lettres s'écrivent l'une après l'autre de manière vivante et moderne.
                </p>
              </button>

              {/* Option 2: Fade */}
              <button
                type="button"
                onClick={() => setHeroSettings((prev) => ({ ...prev, textAnimation: 'fade' }))}
                className={`p-4 border rounded-xl text-left transition-all ${
                  heroSettings.textAnimation === 'fade'
                    ? 'border-primary bg-blue-50/70 ring-2 ring-primary/20'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-[#111e36]">
                  <Layers className="w-4 h-4 text-primary" />
                  Fondu progressif
                </div>
                <p className="text-xs text-gray-500">
                  Apparition en douceur avec un fondu transparent très élégant.
                </p>
              </button>

              {/* Option 3: Slide */}
              <button
                type="button"
                onClick={() => setHeroSettings((prev) => ({ ...prev, textAnimation: 'slide' }))}
                className={`p-4 border rounded-xl text-left transition-all ${
                  heroSettings.textAnimation === 'slide'
                    ? 'border-primary bg-blue-50/70 ring-2 ring-primary/20'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-[#111e36]">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Glissement montant
                </div>
                <p className="text-xs text-gray-500">
                  Le texte glisse délicatement du bas vers le haut.
                </p>
              </button>
            </div>
          </div>

          {/* 4. Intensité du Voile Sombre (Overlay) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-[#111e36] text-base">Filtre Sombre sur l'Image (Overlay)</h3>
                <p className="text-xs text-gray-500">
                  Assombrit les photos du Hero pour rendre le texte blanc parfaitement net et contrasté.
                </p>
              </div>
              <span className="text-base font-bold text-primary bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                {heroSettings.overlayOpacity}%
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <input
                type="range"
                min={0}
                max={75}
                step={5}
                value={heroSettings.overlayOpacity}
                onChange={(e) =>
                  setHeroSettings((prev) => ({ ...prev, overlayOpacity: parseInt(e.target.value) }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Transparent (0%)</span>
                <span>Équilibré (20% - 30%)</span>
                <span>Foncé (75%)</span>
              </div>
            </div>
          </div>

          {/* 5. Pause au survol de la souris */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[#111e36] text-base">Pause au Survol de la Souris</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Stoppe le défilement automatique lorsque l'utilisateur survole le Hero avec sa souris pour lui laisser le temps de lire.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={heroSettings.pauseOnHover}
                onChange={(e) =>
                  setHeroSettings((prev) => ({ ...prev, pauseOnHover: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
