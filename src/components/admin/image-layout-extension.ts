/**
 * Extension Tiptap Image personnalisée avec support de la disposition
 * (float left, float right, center, full width) — effet journal/magazine.
 */
import Image from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/react';

export type ImageLayout = 'center' | 'float-left' | 'float-right' | 'full-width';

/**
 * Étend l'extension Image de Tiptap pour supporter les dispositions
 * d'image avec habillage de texte (text wrapping).
 */
export const ImageWithLayout = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      /** Disposition de l'image dans l'article. */
      layout: {
        default: 'center',
        parseHTML: (element) =>
          element.getAttribute('data-layout') || 'center',
        renderHTML: (attributes) => ({
          'data-layout': attributes.layout,
        }),
      },
      /** Légende de l'image (optionnel). */
      caption: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-caption') || '',
        renderHTML: (attributes) => {
          if (!attributes.caption) return {};
          return { 'data-caption': attributes.caption };
        },
      },
      /** Largeur de l'image (redimensionnement). */
      width: {
        default: null,
        parseHTML: (element) => {
          // On essaie de récupérer depuis le style (ex: width: 50%) ou l'attribut HTML
          return element.style.width || element.getAttribute('width') || null;
        },
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return { style: `width: ${attributes.width}` };
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const layout = HTMLAttributes['data-layout'] || 'center';
    const caption = HTMLAttributes['data-caption'] || '';

    // Classe CSS en fonction de la disposition choisie
    const layoutClass = `img-layout-${layout}`;

    // On enveloppe l'image dans une <figure> pour pouvoir ajouter
    // une légende et contrôler la disposition via CSS
    const figureAttrs: Record<string, string> = {
      class: `image-figure ${layoutClass}`,
      'data-layout': layout,
    };

    const imgAttrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
      class: `editor-image ${layoutClass}`,
    });

    // On applique le style de largeur à la <figure> pour que le wrapper soit dimensionné,
    // mais aussi on garde l'attribut pour l'<img> si nécessaire, 
    // ou plutôt Tiptap le mettra sur l'img si on utilise mergeAttributes.
    // L'attribut style est fusionné dans imgAttrs. On va l'extraire pour la figure.
    if (HTMLAttributes.width) {
      figureAttrs.style = `width: ${HTMLAttributes.width};`;
    }

    // Supprimer les data-* de l'<img> (ils sont sur la <figure>)
    delete imgAttrs['data-layout'];
    delete imgAttrs['data-caption'];

    if (caption) {
      return [
        'figure',
        figureAttrs,
        ['img', imgAttrs],
        ['figcaption', { class: 'image-caption' }, caption],
      ];
    }

    return ['figure', figureAttrs, ['img', imgAttrs]];
  },

  parseHTML() {
    return [
      {
        // Parse <figure> avec <img> dedans
        tag: 'figure[data-layout] img',
        getAttrs: (node) => {
          if (typeof node === 'string') return {};
          const figure = node.closest('figure');
          return {
            src: node.getAttribute('src'),
            alt: node.getAttribute('alt'),
            title: node.getAttribute('title'),
            layout: figure?.getAttribute('data-layout') || 'center',
            caption: figure?.querySelector('figcaption')?.textContent || '',
          };
        },
      },
      {
        // Parse <img> seule avec data-layout
        tag: 'img[data-layout]',
        getAttrs: (node) => {
          if (typeof node === 'string') return {};
          return {
            src: node.getAttribute('src'),
            alt: node.getAttribute('alt'),
            title: node.getAttribute('title'),
            layout: node.getAttribute('data-layout') || 'center',
            width: node.style.width || node.getAttribute('width') || null,
          };
        },
      },
      {
        // Fallback — toute <img> avec src
        tag: 'img[src]',
      },
    ];
  },
});
