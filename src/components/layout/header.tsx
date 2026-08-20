"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Mail } from 'lucide-react';
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
    <header className="absolute top-0 z-40 w-full transition-all duration-300">
      {/* Top Bar (Logo and Contact Info) - Hidden on Mobile since StaggeredMenu takes over */}
      <div className={cn("hidden md:block w-full transition-colors duration-300", isScrolled ? "bg-[#111e36]/80 backdrop-blur-md shadow-sm" : "bg-transparent")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/images/logos/logo-sbf.png"
                alt="Salem Braha Finance Logo"
                width={240}
                height={80}
                className="h-12 md:h-14 w-auto object-contain brightness-0 invert"
                priority
              />
            </Link>

            {/* Top Right Contact Info */}
            <div className="flex items-center space-x-6 text-white">
              <div className="flex flex-col text-right">
                <span className="text-sm text-gray-300">Appelez-nous au</span>
                <span className="font-bold text-lg">+229 01 21 38 05 87</span>
              </div>
              <Button asChild variant="accent" className="rounded-md">
                <Link href="/contact">Demander un crédit</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar (Navigation Links) */}
      <div className="hidden md:block mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-2">
        <div className="bg-[#243048]/70 backdrop-blur-md rounded-md shadow-lg w-full flex items-center justify-center px-6 py-2.5">
          <nav className="flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-semibold text-white/90 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <StaggeredMenu
          isFixed={true}
          isScrolled={isScrolled}
          items={mobileMenuLinks}
          socialItems={mobileSocials}
          logoUrl="/images/logos/logo-sbf.png"
          colors={['#111e36', '#243048']} // SBF brand colors
          accentColor="#0991b5" // Accent hover color
          menuButtonColor="#fff"
          openMenuButtonColor="#111"
        />
      </div>
    </header>
  );
}
