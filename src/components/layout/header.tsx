"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MobileMenu, MobileMenuItem } from '@/components/layout/mobile-menu';

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
    { name: 'Mobilis', href: '/mobilis' },
    { name: 'Notre réseau', href: '/reseau' },
    { name: 'Actualités', href: '/actualites' },
    { name: 'Contacts', href: '/contacts' },
  ];

  const mobileMenuItems: MobileMenuItem[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Qui sommes-nous', href: '/a-propos' },
    {
      label: 'Nos produits',
      children: [
        { label: 'Épargnes', href: '/produits/epargne' },
        { label: 'Crédits', href: '/produits#credit' }
      ]
    },
    { label: 'Mobilis', href: '/mobilis' },
    { label: 'Notre réseau', href: '/reseau' },
    { label: 'Actualités', href: '/actualites' },
    { label: 'Contacts', href: '/contacts' },
  ];

  if (pathname.startsWith('/sbf-gestion')) return null;

  const isHomePage = pathname === '/';

  return (
    <header className={cn(
      "top-0 z-40 w-full",
      isHomePage ? "absolute" : "sticky bg-white shadow-sm"
    )}>
      {/* Top Bar — White with color logo + CTA */}
      <div className={cn(
        "hidden md:block w-full transition-colors duration-300",
        (isScrolled && isHomePage) ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
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

      {/* Navigation Bar */}
      <div
        className={cn("hidden md:block w-full", isHomePage && "backdrop-blur-md")}
        style={{ backgroundColor: isHomePage ? 'rgba(1, 67, 143, 0.40)' : '#01438F' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-3">
            <nav className="flex space-x-8">
              {navLinks.map((link) => {
                if (link.name === 'Nos produits') {
                  return (
                    <div key={link.name} className="relative group">
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center text-base font-semibold transition-colors py-2",
                          pathname.startsWith('/produits')
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                        )}
                      >
                        {link.name}
                        <svg className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </Link>

                      <div className="absolute left-0 top-full pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        <div className="w-48 bg-white rounded-md shadow-lg py-2 border border-gray-100 mt-1">
                          <Link
                            href="/produits/epargne"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary font-medium transition-colors"
                          >
                            Épargnes
                          </Link>
                          <Link
                            href="/produits#credit"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary font-medium transition-colors"
                          >
                            Crédits
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-base font-semibold transition-colors py-2",
                      pathname === link.href
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className={cn(
        "md:hidden flex items-center justify-between w-full px-4 py-3 transition-colors duration-300",
        (isScrolled || !isHomePage) ? "bg-primary shadow-sm" : "bg-transparent"
      )}>
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logos/logo-sbf-color.png"
            alt="Salem Braha Finance Logo"
            width={180}
            height={60}
            className="h-10 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>
        <MobileMenu
          items={mobileMenuItems}
          logoUrl="/images/logos/logo-sbf-color.png"
          isScrolled={isScrolled}
        />
      </div>
    </header>
  );
}
