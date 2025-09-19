'use client';

import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Lock/unlock body scroll when menu opens/closes
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      // Fermeture avec animation
      setIsAnimating(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      // Ouverture
      setIsMenuOpen(true);
    }
  };

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Avocate & Cabinet', href: '/avocate-cabinet' },
    { name: 'Dommage corporel', href: '/dommage-corporel' },
    { name: 'Indemnisation', href: '/indemnisation-victimes' },
    { name: 'Ressources', href: '/ressources' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="https://qncljsxdjefkimfxdzuf.supabase.co/storage/v1/object/public/images/Logo-laura-baron-maitre-avocat-bayonne.png"
              alt="Logo Maître Laura Baron"
              className="h-12 w-auto"
            />
            <div className="block">
              <h1 className="text-sm sm:text-lg font-semibold text-gray-900 leading-tight">Maître Laura Baron</h1>
              <p className="text-xs text-gray-600 leading-tight">Avocate - Dommage corporel</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-amber-600 px-2 xl:px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:+33750234606"
              className="flex items-center space-x-1 md:space-x-2 bg-amber-600 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm whitespace-nowrap"
            >
              <Phone className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span className="text-xs md:text-sm font-medium">07 50 23 46 06</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={handleMenuToggle}
            className={`lg:hidden p-2 rounded-md text-gray-700 hover:text-amber-600 transition-colors ${isMenuOpen ? 'burger-open' : ''}`}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <span className="burger-line w-5 h-0.5 bg-current block"></span>
              <span className="burger-line w-5 h-0.5 bg-current block"></span>
              <span className="burger-line w-5 h-0.5 bg-current block"></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {(isMenuOpen || isAnimating) && (
          <div className={`lg:hidden fixed inset-0 z-50 bg-white ${isAnimating ? 'menu-slide-out' : 'menu-slide-in'}`}>
            {/* Header with close button */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100 menu-content-fade">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://qncljsxdjefkimfxdzuf.supabase.co/storage/v1/object/public/images/Logo-laura-baron-maitre-avocat-bayonne.png"
                  alt="Logo Maître Laura Baron"
                  className="h-10 w-auto"
                />
                <div>
                  <h1 className="text-sm font-semibold text-gray-900">Maître Laura Baron</h1>
                  <p className="text-xs text-gray-600">Avocate - Dommage corporel</p>
                </div>
              </div>
              <button
                onClick={handleMenuToggle}
                className="p-2 rounded-md text-gray-700 hover:text-amber-600"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation menu */}
            <div className="flex flex-col h-full menu-content-fade">
              <nav className="flex-1 px-4 py-8">
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="menu-item-stagger block px-4 py-4 text-lg font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-all duration-200 border-b border-gray-100 last:border-b-0 hover:translate-x-2"
                      onClick={handleMenuToggle}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Contact section at bottom */}
              <div className="px-4 py-6 border-t border-gray-100 bg-gray-50 menu-content-fade">
                <div className="space-y-4">
                  <a
                    href="tel:+33750234606"
                    className="flex items-center justify-center space-x-3 bg-amber-600 text-white px-6 py-4 rounded-lg hover:bg-amber-700 hover:scale-105 transition-all duration-200 w-full"
                    onClick={handleMenuToggle}
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">07 50 23 46 06</span>
                  </a>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Cabinets à Bayonne & Toulouse</p>
                    <p className="text-xs text-gray-500">Consultation sur rendez-vous</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}