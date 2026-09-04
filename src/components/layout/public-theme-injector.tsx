"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export interface ThemeConfig {
  primaryColor?: string;
  primaryDark?: string;
  accentColor?: string;
  accentHover?: string;
  textColor?: string;
  buttonRadius?: string;
}

export function PublicThemeInjector({ 
  theme, 
  faviconUrl 
}: { 
  theme?: ThemeConfig | null; 
  faviconUrl?: string | null; 
}) {
  const pathname = usePathname();

  React.useEffect(() => {
    if (faviconUrl && typeof document !== 'undefined') {
      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    }
  }, [faviconUrl]);

  // Ne jamais appliquer les styles personnalisés au dashboard admin
  if (pathname.startsWith('/sbf-gestion')) {
    return null;
  }

  if (!theme) return null;

  const primary = theme.primaryColor || '#01438F';
  const primaryDark = theme.primaryDark || '#00326e';
  const accent = theme.accentColor || '#EB001B';
  const accentHover = theme.accentHover || '#c80017';
  const textColor = theme.textColor || '#001a40';
  const radius = theme.buttonRadius || '0px';

  return (
    <style
      id="sbf-public-theme"
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --color-primary: ${primary};
            --color-primary-dark: ${primaryDark};
            --color-accent: ${accent};
            --color-accent-hover: ${accentHover};
            --color-on-surface: ${textColor};
            --radius-button: ${radius};
          }
          .liquid-btn {
            border-radius: ${radius} !important;
          }
        `,
      }}
    />
  );
}
