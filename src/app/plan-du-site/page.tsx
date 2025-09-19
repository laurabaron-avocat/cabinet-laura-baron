import { Metadata } from 'next';
import Link from 'next/link';
import { Home, User, Scale, FileText, BookOpen, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Plan du Site • Navigation Complète | Maître Laura Baron',
  description: 'Plan du site complet du cabinet Maître Laura Baron. Retrouvez facilement toutes les pages et sections de notre site spécialisé en dommage corporel.',
};

export default function SitemapPage() {
  const siteStructure = [
    {
      title: 'Accueil',
      href: '/',
      icon: Home,
      description: 'Page d\'accueil du cabinet, présentation des services et expertise',
    },
    {
      title: 'Avocate & Cabinet',
      href: '/avocate-cabinet',
      icon: User,
      description: 'Présentation de Maître Laura Baron, parcours, valeurs et méthode',
      subPages: [
        { title: 'Formation et parcours', href: '/avocate-cabinet#formation' },
        { title: 'Valeurs et méthode', href: '/avocate-cabinet#methode' },
        { title: 'Honoraires', href: '/avocate-cabinet#honoraires' },
      ],
    },
    {
      title: 'Dommage Corporel',
      href: '/dommage-corporel',
      icon: Scale,
      description: 'Expertise complète en dommage corporel et indemnisation des victimes',
      subPages: [
        { title: 'Accidents de la route', href: '/dommage-corporel#accidents-route' },
        { title: 'Accidents médicaux', href: '/dommage-corporel#accidents-medicaux' },
        { title: 'Agressions - CIVI', href: '/dommage-corporel#agressions' },
        { title: 'Accidents de la vie', href: '/dommage-corporel#accidents-vie' },
      ],
    },
    {
      title: 'Indemnisation des Victimes',
      href: '/indemnisation-victimes',
      icon: FileText,
      description: 'Processus complet d\'indemnisation, de la constitution du dossier au règlement',
    },
    {
      title: 'Ressources & Guides',
      href: '/ressources',
      icon: BookOpen,
      description: 'Blog juridique, guides pratiques et actualités en dommage corporel',
    },
    {
      title: 'Contact',
      href: '/contact',
      icon: Phone,
      description: 'Coordonnées des cabinets, formulaire de contact et prise de rendez-vous',
    },
  ];

  const legalPages = [
    {
      title: 'Mentions Légales',
      href: '/mentions-legales',
      description: 'Informations légales obligatoires du cabinet',
    },
    {
      title: 'Politique de Confidentialité',
      href: '/politique-confidentialite',
      description: 'Traitement des données personnelles et respect du RGPD',
    },
    {
      title: 'Plan du Site',
      href: '/plan-du-site',
      description: 'Navigation complète du site (page actuelle)',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-beige via-white to-beige py-12 md:py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-noir mb-6">
              Plan du Site
            </h1>
            <p className="text-xl text-anthracite mb-8 leading-relaxed max-w-3xl mx-auto">
              Retrouvez facilement toutes les pages et sections de notre site. 
              Navigation complète pour accéder rapidement à l'information recherchée.
            </p>
          </div>
        </div>
      </section>

      {/* Main Navigation */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-playfair font-bold text-noir mb-12 text-center">
            Navigation Principale
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteStructure.map((page, index) => (
              <div key={index} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="bg-beige p-3 rounded-full flex-shrink-0">
                    <page.icon className="w-6 h-6 text-or" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-playfair font-semibold text-anthracite mb-2">
                      <Link href={page.href} className="hover:text-or transition-colors">
                        {page.title}
                      </Link>
                    </h3>
                    <p className="text-gray-700 text-sm mb-4">
                      {page.description}
                    </p>
                    
                    {page.subPages && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-anthracite">Sections :</h4>
                        <ul className="space-y-1">
                          {page.subPages.map((subPage, subIndex) => (
                            <li key={subIndex}>
                              <Link 
                                href={subPage.href}
                                className="text-sm text-gray-600 hover:text-or transition-colors flex items-center"
                              >
                                <span className="w-1.5 h-1.5 bg-or rounded-full mr-2"></span>
                                {subPage.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 md:py-16 bg-beige">
        <div className="container-custom">
          <h2 className="text-3xl font-playfair font-bold text-noir mb-12 text-center">
            Informations de Contact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Cabinet Bayonne */}
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-or" />
                <h3 className="text-xl font-playfair font-semibold text-anthracite">
                  Cabinet Bayonne
                </h3>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <a 
                  href="https://www.google.com/maps/place/24+Av.+Mar%C3%A9chal+Foch,+64100+Bayonne,+France/data=!4m2!3m1!1s0xd51405ff1ec5af5:0x2a57843bc91ed1b0?sa=X&ved=1t:242&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-or transition-colors"
                >
                  24 Av. Maréchal Foch<br />
                  64100 Bayonne, France
                </a>
                <p>
                  <a href="tel:+33750234606" className="hover:text-or transition-colors">
                    07 50 23 46 06
                  </a>
                </p>
                <p>
                  <a href="mailto:contact@cabinet-baron.fr" className="hover:text-or transition-colors">
                    contact@cabinet-baron.fr
                  </a>
                </p>
              </div>
            </div>

            {/* Antenne Toulouse */}
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-or" />
                <h3 className="text-xl font-playfair font-semibold text-anthracite">
                  Antenne Toulouse
                </h3>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Centre ville Toulouse<br />31000 Toulouse</p>
                <p>
                  <a href="tel:+33750234606" className="hover:text-or transition-colors">
                    07 50 23 46 06
                  </a>
                </p>
                <p>Sur rendez-vous uniquement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Pages */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-playfair font-bold text-noir mb-12 text-center">
            Pages Légales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {legalPages.map((page, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-playfair font-semibold text-anthracite mb-3">
                  <Link href={page.href} className="hover:text-or transition-colors">
                    {page.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-700">
                  {page.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom text-center">
          <p className="text-sm text-gray-600">
            Plan du site mis à jour le {new Date().toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </section>
    </>
  );
}