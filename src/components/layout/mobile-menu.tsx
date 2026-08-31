"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" clipRule="evenodd" />
  </svg>
);
import { cn } from '@/lib/utils';

export interface MobileMenuItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

interface MobileMenuProps {
  items: MobileMenuItem[];
  logoUrl: string;
  isScrolled: boolean;
}

export function MobileMenu({ items, logoUrl, isScrolled }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-white rounded-md hover:bg-white/10 transition-colors"
        aria-label="Ouvrir le menu"
      >
        <Menu className="w-8 h-8" />
      </button>

      {/* Fullscreen Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-[#0f0f0f] text-white flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header inside Menu */}
        <div className="flex items-center justify-between p-6">
          <Link href="/" onClick={() => setIsOpen(false)} className="shrink-0 flex items-center gap-3">
            {/* The user provided a logo in the screenshot, we use the white logo here */}
            <Image
              src={logoUrl || "/images/logos/logo-sbf-color.png"}
              alt="Salem Braha Finance"
              width={180}
              height={60}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <nav className="flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.label} className="flex flex-col">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="flex items-center gap-3 text-left font-bold text-2xl tracking-wide hover:text-gray-300 transition-colors"
                    >
                      {item.label}
                      <ArrowRight className={cn(
                        "w-5 h-5 transition-transform duration-300",
                        openSubmenus[item.label] && "rotate-90"
                      )} />
                    </button>
                    {/* Submenu Items */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        openSubmenus[item.label] ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="flex flex-col gap-4 pl-4 border-l-2 border-white/10 ml-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className="font-bold text-2xl tracking-wide hover:text-gray-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer inside Menu */}
        <div className="p-6 border-t border-white/10 mt-auto">
          <div className="flex items-center gap-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <FacebookIcon className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <YoutubeIcon className="w-7 h-7" />
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
