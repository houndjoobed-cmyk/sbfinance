"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header className="absolute top-0 z-40 w-full transition-all duration-300">
      {/* Top Bar (Logo and Contact Info) */}
      <div className={cn("w-full transition-colors duration-300", isScrolled ? "bg-[#111e36]/80 backdrop-blur-md shadow-sm" : "bg-transparent")}>
        <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/images/logos/logo-sbf.png" 
                alt="Salem Braha Finance Logo" 
                width={240} 
                height={80}
                className="h-16 md:h-20 w-auto object-contain brightness-0 invert" // White logo for dark background
                priority
              />
            </Link>

            {/* Top Right Contact Info */}
            <div className="hidden md:flex items-center space-x-6 text-white">
              <div className="flex flex-col text-right">
                <span className="text-sm text-gray-300">Appelez-nous au</span>
                <span className="font-bold text-lg">+229 01 21 38 05 87</span>
              </div>
              <Button asChild variant="accent" className="rounded-md">
                <Link href="/contact">Demander un crédit</Link>
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="text-white hover:text-gray-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Ouvrir le menu</span>
                {mobileMenuOpen ? (
                  <X className="h-8 w-8" aria-hidden="true" />
                ) : (
                  <Menu className="h-8 w-8" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar (Navigation Links) */}
      <div className="hidden md:block mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8 mt-2">
        <div className="bg-[#243048]/70 backdrop-blur-md rounded-md shadow-lg w-full flex items-center justify-center px-6 py-4">
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
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111e36] absolute top-full left-0 w-full shadow-xl border-t border-[#243048]">
          <div className="space-y-1 px-4 pb-6 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block rounded-md px-3 py-3 text-base font-medium text-white hover:bg-[#243048]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-[#243048] px-3">
              <div className="flex items-center text-white font-medium mb-4">
                <Phone className="h-5 w-5 mr-2" />
                <span>+229 01 21 38 05 87</span>
              </div>
              <Button asChild variant="accent" className="w-full">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Demander un crédit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
