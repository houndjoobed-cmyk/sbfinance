"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StaggeredMenu } from '@/components/ui/staggered-menu';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Qui sommes-nous', href: '/a-propos' },
    { name: 'Nos produits', href: '/produits' },
    { name: 'Notre réseau', href: '/reseau' },
    { name: 'Actualités', href: '/actualites' },
    { name: 'Contact', href: '/contact' },
  ];

  const mobileMenuLinks = navLinks.map(link => ({
    label: link.name,
    link: link.href
  }));

  const mobileSocials = [
    { label: 'WhatsApp', link: 'https://wa.me/2290128305976' },
    { label: 'Téléphone', link: 'tel:+2290121380587' },
    { label: 'Email', link: 'mailto:contact@sbfinance.bj' }
  ];

  if (pathname.startsWith('/sbf-gestion')) return null;

  return (
    <header className="absolute top-0 z-40 w-full">
      {/* Top Bar — White with color logo + CTA */}
      <div className={cn(
        "hidden md:block w-full transition-colors duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      )}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Color Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/images/logos/logo-sbf-color.png"
                alt="Salem Braha Finance Logo"
                width={240}
                height={80}
                className="h-14 w-auto object-contain"
                priority
              />
            </Link>

            {/* CTA Button only */}
            <div className="flex items-center">
              <Button asChild variant="accent">
                <Link href="/produits">Offres clients</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar — Solid SBF blue */}
      <div className="hidden md:block w-full bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-3">
            <nav className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-base font-semibold transition-colors",
                    pathname === link.href
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <StaggeredMenu
          isFixed={true}
          isScrolled={isScrolled}
          items={mobileMenuLinks}
          socialItems={mobileSocials}
          logoUrl="/images/logos/logo-sbf-color.png"
          colors={['#01438F', '#00326e']}
          accentColor="#EB001B"
          menuButtonColor="#01438F"
          openMenuButtonColor="#fff"
        />
      </div>
    </header>
  );
}
