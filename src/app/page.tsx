import Link from 'next/link';
import { Phone, Car, Heart, AlertTriangle, Shield, CheckCircle, Scale, Clock, Users, MapPin } from 'lucide-react';
import DomainCard from '@/components/ui/DomainCard';
import Timeline from '@/components/ui/Timeline';
import FAQ from '@/components/ui/FAQ';
import ContactForm from '@/components/forms/ContactForm';
import { getFAQByPage } from '@/lib/queries';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const processSteps = [
  {
    title: 'Analyse de votre dossier',
    description: 'Étude approfondie de votre situation, évaluation de vos droits et des démarches à entreprendre. Constitution du dossier administratif et médical.',
  },
  {
    title: 'Expertise médicale',
    description: 'Préparation et accompagnement lors de l\'expertise. Mission d\'un médecin-conseil pour défendre vos intérêts et contester si nécessaire.',
  },
  {
    title: 'Évaluation des préjudices',
    description: 'Chiffrage précis de tous vos préjudices selon la nomenclature Dintilhac : préjudices patrimoniaux et extrapatrimoniaux.',
  },
  {
    title: 'Négociation et indemnisation',
    description: 'Négociation avec les assureurs ou saisine du tribunal compétent. Obtention d\'une indemnisation juste et complète de vos préjudices.',
  },
];

export default async function HomePage() {
  // Récupérer les FAQ depuis Supabase
  const faqItems = await getFAQByPage('accueil');

  const jsonLD = {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness'],
    name: 'Maître Laura Baron',
    description: 'Avocat en dommage corporel et indemnisation des victimes',
    url: 'https://laurabaron-avocat.com',
    telephone: '+33XXXxxxXXX',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '24 Av. Maréchal Foch',
        addressLocality: 'Bayonne',
        postalCode: '64100',
        addressCountry: 'FR',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '[Adresse Toulouse]',
        addressLocality: 'Toulouse',
        postalCode: '31000',
        addressCountry: 'FR',
      },
    ],
    geo: [
      {
        '@type': 'GeoCoordinates',
        latitude: 43.4929,
        longitude: -1.4748,
      },
      {
        '@type': 'GeoCoordinates',
        latitude: 43.6043,
        longitude: 1.4437,
      },
    ],
    openingHours: ['Mo-Fr 09:00-18:00'],
    priceRange: 'Consultation sur rendez-vous',
    serviceArea: {
      '@type': 'GeoCircle',
      name: 'Nouvelle-Aquitaine, Occitanie',
    },
    areaServed: ['Bayonne', 'Toulouse', 'Nouvelle-Aquitaine', 'Occitanie'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services juridiques',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Dommage corporel - Accidents de la route',
            description: 'Indemnisation des victimes d\'accidents de la circulation selon la Loi Badinter',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Accidents médicaux',
            description: 'Indemnisation via CCI/ONIAM pour les accidents médicaux et infections nosocomiales',
          },
        },
      ],
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.hero-claim', '.faq-item-1', '.faq-item-2'],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-beige via-white to-beige section-padding">
        <div className="container-custom no-overflow">
          <div className="mobile-grid-2 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-slide-up">
              <div>
                {/* Version Mobile du titre */}
                <h1 className="md:hidden text-3xl font-playfair font-bold text-center mb-6 hero-claim leading-tight">
                  <span className="block text-noir mb-3 text-4xl">Défendre vos droits</span>
                  <span className="block text-anthracite text-2xl mb-3">après un accident,</span>
                  <span className="block text-or text-3xl font-semibold bg-gradient-to-r from-or to-yellow-600 bg-clip-text text-transparent">notre expertise à votre service</span>
                </h1>

                {/* Version Desktop du titre */}
                <h1 className="hidden md:block mobile-title font-playfair font-bold text-noir mb-4 md:mb-6 hero-claim leading-tight">
                  Défendre vos droits après un accident,
                  <span className="text-or block mt-2">notre expertise à votre service</span>
                </h1>
                <p className="mobile-subtitle text-anthracite mb-6 md:mb-8 leading-relaxed">
                  Avocate en <strong>dommage corporel</strong> et indemnisation des victimes.
                  Plus de 10 ans d'expérience pour obtenir la juste réparation de vos préjudices.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8">
                  <Link href="tel:+33750234606" className="btn-primary inline-flex items-center justify-center">
                    <Phone size={18} className="mr-2" />
                    Appeler maintenant
                  </Link>
                  <Link href="/contact" className="btn-secondary">
                    Demander un rendez-vous
                  </Link>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span>Inscrite au Barreau de Bayonne • Cabinet à Bayonne</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <img
                src="https://qncljsxdjefkimfxdzuf.supabase.co/storage/v1/object/public/images/Maitre-Laura-Baron-Avocat-barreau-bayonne-specialiste-dommage-corporelle-accident-de-la-route.jpg"
                alt="Maître Laura Baron - Avocat en dommage corporel"
                className="w-full h-80 md:h-[500px] object-contain md:object-cover rounded-lg shadow-lg md:object-[center_10%] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              />
              <div className="mt-4 md:mt-6">
                <h3 className="text-lg md:text-xl font-playfair font-semibold text-anthracite mb-2">
                  Maître Laura Baron
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  Avocate en dommage corporel
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domaines d'expertise */}
      <section className="section-padding bg-beige">
        <div className="container-custom no-overflow">
          <div className="text-center mb-16">
            <h2 className="mobile-title font-playfair font-bold text-noir mb-4 md:mb-6">
              Nos domaines d'expertise
            </h2>
            <p className="mobile-subtitle text-gray-700 max-w-3xl mx-auto px-4">
              Avocate en dommage corporel, je vous accompagne dans toutes les étapes
              de votre indemnisation, quel que soit l'origine de vos préjudices.
            </p>
          </div>
          
          <div className="mobile-grid-4 lg:grid-cols-4">
            <DomainCard
              title="Accidents de la route"
              description="Indemnisation selon la Loi Badinter. Défense des piétons, cyclistes, conducteurs et passagers."
              href="/dommage-corporel#accidents-route"
              icon={Car}
            />
            <DomainCard
              title="Accidents médicaux"
              description="Erreurs médicales, infections nosocomiales. Procédures CCI et ONIAM."
              href="/dommage-corporel#accidents-medicaux"
              icon={Heart}
            />
            <DomainCard
              title="Agressions - CIVI"
              description="Indemnisation des victimes d'infractions pénales via la Commission d'Indemnisation."
              href="/dommage-corporel#agressions"
              icon={Shield}
            />
            <DomainCard
              title="Accidents de la vie"
              description="Accidents domestiques, de loisirs, scolaires. Expertise de responsabilité et indemnisation."
              href="/dommage-corporel#accidents-vie"
              icon={AlertTriangle}
            />
          </div>
        </div>
      </section>

      {/* Méthode en 3 étapes */}
      <section className="section-padding bg-white">
        <div className="container-custom no-overflow">
          <div className="mobile-grid-2 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2 className="mobile-title font-playfair font-bold text-noir mb-4 md:mb-6">
                Notre méthode éprouvée
              </h2>
              <p className="mobile-subtitle text-gray-700 mb-6 md:mb-8">
                Une approche structurée et personnalisée pour optimiser votre indemnisation.
                Chaque dossier est unique et mérite une attention particulière.
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-anthracite text-sm sm:text-base">
                <div className="flex items-center">
                  <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-or mr-2 flex-shrink-0" />
                  <span>Expertise juridique</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-or mr-2 flex-shrink-0" />
                  <span>Réactivité</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-or mr-2 flex-shrink-0" />
                  <span>Accompagnement humain</span>
                </div>
              </div>
            </div>

            <div>
              <Timeline steps={processSteps} />
            </div>
          </div>
        </div>
      </section>

      {/* Citation statistiques - Design moderne */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-or/5 to-amber-200/10"></div>
        <div className="container-custom no-overflow relative">
          <div className="max-w-5xl mx-auto text-center">
            {/* Grande guillemet d'ouverture */}
            <div className="relative mb-8">
              <svg className="w-16 h-16 md:w-20 md:h-20 text-or/30 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>

            {/* Citation principale */}
            <blockquote className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-playfair font-bold text-anthracite mb-6 leading-tight">
                <span className="text-or">10%</span> seulement des victimes d'accident en France bénéficient d'une juste indemnisation.
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-700 mb-8 leading-relaxed">
                <span className="text-red-600 font-bold">90%</span> seront donc lésés, le plus souvent sans même en être conscients.
              </p>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-or/20">
                <p className="text-lg md:text-xl text-anthracite leading-relaxed italic">
                  Les <span className="font-bold text-or">10% de victimes correctement indemnisées</span> sont les victimes ayant su s'entourer d'un avocat en Droit du dommage corporel pour assurer la défense de leurs intérêts face aux compagnies d'assurance et aux organismes payeurs.
                </p>
              </div>
            </blockquote>

            {/* Grande guillemet de fermeture */}
            <div className="relative mt-8">
              <svg className="w-16 h-16 md:w-20 md:h-20 text-or/30 mx-auto rotate-180" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Section d'aide aux victimes */}
      <section className="section-padding bg-white">
        <div className="container-custom no-overflow">
          
          <div className="mobile-grid-2 md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-12">
            {/* Colonne gauche - Le problème */}
            <div className="bg-white border border-red-200 p-6 md:p-8 rounded-sm shadow-sm">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-2 md:p-3 rounded-full mr-3 md:mr-4 flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
                </div>
                <h3 className="text-lg md:text-2xl font-playfair font-semibold text-red-700 leading-tight">
                  Sans avocat : Vous perdez gros
                </h3>
              </div>
              <div className="space-y-4 text-anthracite">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0 sm:mt-1"></div>
                  <p className="text-sm sm:text-base">
                    <strong className="text-red-700">Offres dérisoires :</strong> Les assurances proposent en moyenne 
                    <span className="text-red-600 font-bold"> 30 à 50% de moins</span> que vos droits réels
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0 sm:mt-1"></div>
                  <p className="text-sm sm:text-base">
                    <strong className="text-red-700">Préjudices oubliés :</strong> Préjudice d'agrément, esthétique, 
                    sexuel... <span className="text-red-600 font-bold">Des milliers d'euros non réclamés</span>
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0 sm:mt-1"></div>
                  <p className="text-sm sm:text-base">
                    <strong className="text-red-700">Expertises biaisées :</strong> Les experts des assurances minimisent 
                    systématiquement vos séquelles
                  </p>
                </div>
                <div className="bg-red-50 p-3 md:p-4 rounded border-l-4 border-red-600 mt-6">
                  <p className="text-red-700 font-semibold text-center text-sm md:text-base">
                    💸 Exemple : 15 000€ proposés au lieu de 45 000€ dus
                  </p>
                </div>
              </div>
            </div>

            {/* Colonne droite - La solution */}
            <div className="bg-white border border-or p-6 md:p-8 rounded-sm shadow-sm">
              <div className="flex items-center mb-6">
                <div className="bg-amber-100 p-2 md:p-3 rounded-full mr-3 md:mr-4 flex-shrink-0">
                  <Scale className="w-6 h-6 md:w-8 md:h-8 text-or" />
                </div>
                <h3 className="text-lg md:text-2xl font-playfair font-semibold text-or leading-tight">
                  Avec Maître Baron : Justice rendue
                </h3>
              </div>
              <div className="space-y-4 text-anthracite">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-or rounded-full mt-2 flex-shrink-0 sm:mt-1"></div>
                  <p className="text-sm sm:text-base">
                    <strong className="text-or">Évaluation complète :</strong> Tous vos préjudices identifiés et 
                    <span className="text-or font-bold"> chiffrés au centime près</span>
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-or rounded-full mt-2 flex-shrink-0 sm:mt-1"></div>
                  <p className="text-sm sm:text-base">
                    <strong className="text-or">Médecin-conseil :</strong> Expert indépendant qui défend 
                    <span className="text-or font-bold"> VOS intérêts</span> lors des expertises
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-or rounded-full mt-2 flex-shrink-0 sm:mt-1"></div>
                  <p className="text-sm sm:text-base">
                    <strong className="text-or">Négociation experte :</strong> 
                    <span className="text-or font-bold"> +10 ans d'expérience</span> face aux assureurs
                  </p>
                </div>
                <div className="bg-amber-50 p-3 md:p-4 rounded border-l-4 border-or mt-6">
                  <p className="text-or font-semibold text-center text-sm md:text-base">
                    ✅ Résultat : 45 000€ obtenus (juste valeur)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8 md:mt-12 px-4">
            <div className="bg-white rounded-lg p-6 md:p-8 max-w-3xl mx-auto border border-or shadow-lg">
              <h4 className="text-xl md:text-2xl font-playfair font-bold text-noir mb-4 md:mb-6 leading-tight">
                Ne commettez pas l'erreur de passer à côté de l'indemnisation à laquelle vous avez réellement droit
              </h4>
              <p className="text-anthracite mb-6 md:mb-8 mobile-text leading-relaxed">
                Vos préjudices ont une valeur. Ne laissez personne vous convaincre du contraire. 
                <strong className="text-noir"> Découvrez ce que vous devriez vraiment recevoir.</strong>
              </p>
              <Link href="/contact" className="bg-or text-noir hover:bg-yellow-600 px-6 md:px-10 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-colors inline-flex items-center justify-center w-full sm:w-auto">
                Connaître mes droits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Preuves sociales */}
      <section className="section-padding bg-beige">
        <div className="container-custom no-overflow">
          <div className="text-center mb-12 md:mb-16 px-4">
            <h2 className="mobile-title font-playfair font-bold text-noir mb-4 md:mb-6">
              Pourquoi nous faire confiance ?
            </h2>
            <p className="mobile-subtitle text-gray-700 max-w-3xl mx-auto">
              Une expertise reconnue et des résultats concrets pour nos clients
            </p>
          </div>
          
          <div className="mobile-grid-3 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-gradient-to-br from-or/20 to-amber-100 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-or/30">
                <Scale className="w-9 h-9 md:w-11 md:h-11 text-or drop-shadow-sm" />
              </div>
              <h3 className="text-xl md:text-2xl font-playfair font-semibold mb-2">+10 ans</h3>
              <p className="text-gray-700 mobile-text">d'expérience en dommage corporel</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-50 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-green-200">
                <CheckCircle className="w-9 h-9 md:w-11 md:h-11 text-green-600 drop-shadow-sm" />
              </div>
              <h3 className="text-xl md:text-2xl font-playfair font-semibold mb-2">100%</h3>
              <p className="text-gray-700 mobile-text">de clients satisfaits</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-sky-50 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-blue-200">
                <Users className="w-9 h-9 md:w-11 md:h-11 text-blue-600 drop-shadow-sm" />
              </div>
              <h3 className="text-xl md:text-2xl font-playfair font-semibold mb-2">500+</h3>
              <p className="text-gray-700 mobile-text">dossiers traités avec succès</p>
            </div>
          </div>
        </div>
      </section>

      {/* Avis Google */}
      <section className="section-padding bg-white">
        <div className="container-custom no-overflow">
          <div className="text-center mb-12 md:mb-16 px-4">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google" 
                className="w-6 h-6 md:w-8 md:h-8"
              />
              <h2 className="mobile-title font-playfair font-bold text-noir">
                Avis clients
              </h2>
            </div>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg md:text-xl font-semibold text-anthracite">5,0</span>
              <span className="text-gray-600 text-sm md:text-base">• 37 avis</span>
            </div>
            <a 
              href="https://share.google/0sunw63oZvRiJfUno" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-or hover:text-yellow-600 text-xs md:text-sm font-medium transition-colors"
            >
              Voir tous les avis sur Google
            </a>
          </div>
          
          {/* Carrousel d'avis */}
          <div className="relative overflow-hidden -mx-4 px-4">
            <div className="flex animate-scroll space-x-4 md:space-x-6">
              {/* Avis 1 */}
              <div className="flex-shrink-0 w-72 md:w-80 bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-or rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white font-semibold text-xs md:text-sm">BS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-anthracite text-sm md:text-base">Bo Sn</h4>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-xs md:text-sm leading-relaxed line-clamp-4">
                  "Je remercie vivement Maître Baron pour son travail remarquable suite à mon accident. Elle a su défendre mes intérêts avec beaucoup de sérieux, d'efficacité et d'engagement. C'est une avocate à la fois très compétente et profondément humaine."
                </p>
                <p className="text-xs text-gray-500 mt-2 md:mt-3">il y a un mois</p>
              </div>
              
              {/* Avis 2 */}
              <div className="flex-shrink-0 w-72 md:w-80 bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-or rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white font-semibold text-xs md:text-sm">RL</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-anthracite text-sm md:text-base">Rox Le Chevalier</h4>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-xs md:text-sm leading-relaxed line-clamp-4">
                  "Maitre BARON a été formidable avec moi. Elle a su m'aider à faire avancer la procédure avec mon assureur, face à qui je me sentais démunie. Grâce à son écoute et ces conseils j'ai aussi pu progresser et laisser derrière moi le traumatisme."
                </p>
                <p className="text-xs text-gray-500 mt-2 md:mt-3">il y a un mois</p>
              </div>
              
              {/* Avis 3 */}
              <div className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-or rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">LS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-anthracite">Léa Se (Lou)</h4>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                  "J'ai été accompagnée par Maître Baron pour un dossier de dommages corporels. Grâce à son expérience et à sa maîtrise, elle a mis tout en œuvre pour que l'affaire aboutisse aux meilleurs résultats possibles."
                </p>
                <p className="text-xs text-gray-500 mt-3">il y a un mois</p>
              </div>
              
              {/* Avis 4 */}
              <div className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-or rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">AD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-anthracite">Alice Duquesnoy</h4>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                  "Maître Laura Baron m'a été d'une très grande aide dans le traitement et l'accompagnement de mon dossier. Son professionnalisme, son expertise et son dévouement ont été remarquables."
                </p>
                <p className="text-xs text-gray-500 mt-3">il y a 3 mois</p>
              </div>
              
              {/* Avis 5 */}
              <div className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-or rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">YH</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-anthracite">Yasmine Hammache</h4>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                  "J'ai pu apprécier depuis plusieurs années déjà les qualités professionnelles et humaines de Maitre Baron Laura. Un travail et une détermination incroyable qui a porté ses fruits."
                </p>
                <p className="text-xs text-gray-500 mt-3">il y a 7 mois</p>
              </div>
              
              {/* Avis 6 */}
              <div className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-or rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">VK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-anthracite">Vallauris Ky-soth</h4>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                  "J'ai consulté Maitre Baron à la suite d'un accident de la route. Je rencontrais des difficultés avec ma compagnie d'assurance pour mon indemnisation. Maitre Baron a été à l'écoute, elle s'est battue pour que j'obtienne une très bonne indemnisation."
                </p>
                <p className="text-xs text-gray-500 mt-3">il y a 3 mois</p>
              </div>
              
              {/* Répétition pour effet de boucle infinie */}
              <div className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-or rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">BS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-anthracite">Bo Sn</h4>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                  "Je remercie vivement Maître Baron pour son travail remarquable suite à mon accident. Elle a su défendre mes intérêts avec beaucoup de sérieux, d'efficacité et d'engagement. C'est une avocate à la fois très compétente et profondément humaine."
                </p>
                <p className="text-xs text-gray-500 mt-3">il y a un mois</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Localisation Cabinet Bayonne */}
      <section className="section-padding bg-beige">
        <div className="container-custom no-overflow">
          <div className="text-center mb-12 md:mb-16 px-4">
            <h2 className="mobile-title font-playfair font-bold text-noir mb-4 md:mb-6">
              Notre cabinet à Bayonne
            </h2>
            <p className="mobile-subtitle text-gray-700 max-w-3xl mx-auto">
              Situé au cœur de Bayonne, notre cabinet vous accueille dans un cadre professionnel 
              pour vous accompagner dans vos démarches d'indemnisation.
            </p>
          </div>
          
          <div className="mobile-grid-2 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Carte Google Maps */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-100 rounded-sm overflow-hidden shadow-lg h-64 md:h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.8234567890123!2d-1.4748!3d43.4929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDI5JzM0LjQiTiAxwrAyOCczMC4zIlc!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Cabinet Maître Laura Baron - Bayonne"
                  className="w-full h-full"
                />
              </div>
            </div>
            
            {/* Informations du cabinet */}
            <div className="order-1 lg:order-2">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-100">
                <h3 className="text-xl md:text-2xl font-playfair font-semibold text-anthracite mb-4 md:mb-6 text-center">
                  Informations pratiques
                </h3>

                <div className="space-y-4 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4.5 h-4.5 md:w-5 md:h-5 text-or flex-shrink-0" />
                      <p className="font-bold text-anthracite text-sm md:text-base">Adresse</p>
                    </div>
                    <div>
                      <a
                        href="https://www.google.com/maps/place/24+Av.+Mar%C3%A9chal+Foch,+64100+Bayonne,+France/data=!4m2!3m1!1s0xd51405ff1ec5af5:0x2a57843bc91ed1b0?sa=X&ved=1t:242&ictx=111"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-or transition-colors cursor-pointer text-sm md:text-base"
                      >
                        24 Av. Maréchal Foch<br />64100 Bayonne, France
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4.5 h-4.5 md:w-5 md:h-5 text-or flex-shrink-0" />
                      <p className="font-bold text-anthracite text-sm md:text-base">Téléphone</p>
                    </div>
                    <div>
                      <a href="tel:+33750234606" className="text-gray-700 hover:text-or transition-colors text-sm md:text-base">
                        07 50 23 46 06
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4.5 h-4.5 md:w-5 md:h-5 text-or flex-shrink-0" />
                      <p className="font-bold text-anthracite text-sm md:text-base">Horaires</p>
                    </div>
                    <div>
                      <div className="text-gray-700 text-sm text-center">
                        <p>Lundi - Jeudi : 9h - 18h</p>
                        <p>Vendredi : 9h - 17h</p>
                        <p className="text-or font-medium">Sur rendez-vous uniquement</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <Car className="w-4.5 h-4.5 md:w-5 md:h-5 text-or flex-shrink-0" />
                      <p className="font-bold text-anthracite text-sm md:text-base">Accès</p>
                    </div>
                    <div>
                      <div className="text-gray-700 text-sm text-center">
                        <p>• Parking public à proximité</p>
                        <p>• Gare SNCF Bayonne (10 min à pied)</p>
                        <p>• Aéroport Biarritz-Bayonne (15 min)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-or/30 text-center">
                  <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
                    Prendre rendez-vous
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Express */}
      <section className="section-padding bg-white">
        <div className="container-custom no-overflow">
          <div className="max-w-2xl mx-auto">
            <div className="bg-beige p-6 md:p-8 rounded-sm shadow-lg">
              <h2 className="text-xl md:text-2xl font-playfair font-semibold mb-4 md:mb-6 text-anthracite text-center">
                Contact express
              </h2>
              <div className="text-center">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-beige">
        <div className="container-custom no-overflow">
          <div className="text-center mb-12 md:mb-16 px-4">
            <h2 className="mobile-title font-playfair font-bold text-noir mb-4 md:mb-6">
              Questions fréquentes
            </h2>
            <p className="mobile-subtitle text-gray-700 max-w-3xl mx-auto">
              Les réponses aux questions les plus courantes sur l'indemnisation du dommage corporel
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <FAQ items={faqItems} pageKey="accueil" />
          </div>
          
          <div className="text-center mt-12">
            <Link href="/indemnisation-victimes" className="btn-secondary inline-flex items-center justify-center">
              Voir toutes les questions
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-noir text-white">
        <div className="container-custom text-center no-overflow px-4">
          <h2 className="mobile-title font-playfair font-bold mb-4 md:mb-6">
            Prêt à défendre vos droits ?
          </h2>
          <p className="mobile-subtitle mb-6 md:mb-8 max-w-2xl mx-auto text-gray-300">
            Contactez-nous dès aujourd'hui pour une première évaluation de votre situation. 
            Consultation confidentielle et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="tel:+33750234606" className="bg-or hover:bg-yellow-600 text-noir px-6 py-3 md:px-8 md:py-4 rounded-sm font-medium transition-colors inline-flex items-center justify-center">
              <Phone className="w-4.5 h-4.5 md:w-5 md:h-5 mr-2" />
              07 50 23 46 06
            </Link>
            <Link href="/contact" className="border border-white hover:bg-white hover:text-noir px-6 py-3 md:px-8 md:py-4 rounded-sm font-medium transition-colors inline-flex items-center justify-center">
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppButton pageType="home" />
    </>
  );
}