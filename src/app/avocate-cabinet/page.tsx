import { Metadata } from 'next';
import { Scale, Award, Users, Clock, MapPin, Phone } from 'lucide-react';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Présentation de Maître Laura Baron • Avocat Dommage Corporel',
  description: 'Découvrez le parcours et l\'expertise de Maître Laura Baron, avocat spécialisé en dommage corporel. Inscrite au Barreau de Bayonne depuis 2013.',
};

export default function AvocateCabinetPage() {
  const jsonLD = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Maître Laura Baron',
      jobTitle: 'Avocat',
      worksFor: {
        '@type': 'Organization',
        name: 'Cabinet Maître Laura Baron',
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
      },
      alumniOf: '[Université - À compléter]',
      knowsAbout: ['Droit du dommage corporel', 'Indemnisation des victimes', 'Loi Badinter'],
      memberOf: 'Barreau de Bayonne',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Cabinet Maître Laura Baron',
      description: 'Cabinet d\'avocat spécialisé en dommage corporel et indemnisation des victimes',
      founder: 'Maître Laura Baron',
      foundingDate: '2013',
      legalName: 'Cabinet Maître Laura Baron',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: '[Adresse Bayonne]',
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
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-beige via-white to-beige py-8 md:py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1 lg:order-1 lg:-mt-48">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-noir mb-6">
                Maître Laura Baron
              </h1>
              <p className="text-xl text-anthracite mb-8 leading-relaxed">
                Avocat spécialisé en dommage corporel, je mets mon expertise au service 
                des victimes d'accidents pour obtenir une juste indemnisation de leurs préjudices.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Scale size={20} className="text-or mr-2" />
                  <span>Barreau de Bayonne</span>
                </div>
                <div className="flex items-center">
                  <Award size={20} className="text-or mr-2" />
                  <span>Serment 2013</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={20} className="text-or mr-2" />
                  <span>Bayonne </span>
                </div>
                <div className="flex items-center">
                  <Clock size={20} className="text-or mr-2" />
                  <span>+10 ans d'expérience</span>
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-2">
              <div className="flex flex-col items-center">
                {/* Photo principale de Maître Laura Baron */}
                <div className="mb-8 w-full max-w-md">
                  <img 
                    src="https://qncljsxdjefkimfxdzuf.supabase.co/storage/v1/object/public/images/Maitre-Laura-Baron-Avocat-barreau-bayonne-specialiste-dommage-corporelle-accident-de-la-vie.jpg"
                    alt="Maître Laura Baron, avocat au Barreau de Bayonne, spécialisée en dommage corporel"
                    className="w-full h-[500px] lg:h-[600px] object-cover object-top rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                    loading="eager"
                  />
                </div>
                <div className="bg-white p-8 rounded-sm shadow-lg w-full">
                  <h2 className="text-2xl font-playfair font-semibold mb-4 text-anthracite">
                    Bio courte
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    [À compléter par la cliente : bio courte de 2-3 lignes présentant son parcours 
                    et sa spécialisation en dommage corporel]
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Phone size={16} className="text-or mr-2" />
                      <span>05.XX.XX.XX.XX</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="text-or mr-2" />
                      <span>contact@maitre-laura-baron.fr</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parcours détaillé */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-noir mb-12 text-center">
              Parcours et formation
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-playfair font-semibold mb-4 text-anthracite">
                  Formation académique
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-or pl-4">
                    <p className="font-medium">[Année] - [Diplôme]</p>
                    <p className="text-gray-700 text-sm">[Université/École - À compléter]</p>
                  </div>
                  <div className="border-l-4 border-or pl-4">
                    <p className="font-medium">[Année] - [Diplôme]</p>
                    <p className="text-gray-700 text-sm">[Université/École - À compléter]</p>
                  </div>
                  <div className="border-l-4 border-or pl-4">
                    <p className="font-medium">2013 - Serment d'avocat</p>
                    <p className="text-gray-700 text-sm">Barreau de Bayonne</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-playfair font-semibold mb-4 text-anthracite">
                  Expérience professionnelle
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-beige pl-4">
                    <p className="font-medium">2013 - Aujourd'hui</p>
                    <p className="text-gray-700 text-sm">
                      [À compléter : parcours professionnel, spécialisation progressive 
                      en dommage corporel, expériences marquantes]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs et méthode */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-noir mb-12 text-center">
              Valeurs et méthode
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-playfair font-semibold mb-6 text-anthracite">
                  Nos valeurs
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Scale size={24} className="text-or mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Expertise juridique</h4>
                      <p className="text-gray-700 text-sm">
                        Spécialisation exclusive en dommage corporel pour une expertise pointue 
                        et une défense optimale de vos intérêts.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users size={24} className="text-or mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Accompagnement humain</h4>
                      <p className="text-gray-700 text-sm">
                        Écoute, empathie et soutien tout au long de la procédure. 
                        Chaque client mérite une attention personnalisée.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award size={24} className="text-or mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Déontologie</h4>
                      <p className="text-gray-700 text-sm">
                        Respect strict du secret professionnel et des règles déontologiques. 
                        Transparence sur les honoraires et les démarches.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-playfair font-semibold mb-6 text-anthracite" id="methode">
                  Notre méthode
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-sm">
                    <h4 className="font-semibold mb-2">Réseau médical expert</h4>
                    <p className="text-gray-700 text-sm">
                      Collaboration avec des médecins-conseils spécialisés pour optimiser 
                      l'évaluation de vos préjudices lors des expertises.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-sm">
                    <h4 className="font-semibold mb-2">Préparation minutieuse</h4>
                    <p className="text-gray-700 text-sm">
                      Constitution rigoureuse du dossier, préparation aux expertises 
                      et anticipation des arguments adverses.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-sm">
                    <h4 className="font-semibold mb-2">Communication régulière</h4>
                    <p className="text-gray-700 text-sm">
                      Points d'étape réguliers, explications claires des procédures 
                      et réponse sous 48h à vos interrogations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honoraires */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-noir mb-12 text-center" id="honoraires">
              Honoraires et modalités
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-gray-50 p-8 rounded-sm">
                <h3 className="text-xl font-playfair font-semibold mb-4 text-anthracite">
                  Consultation initiale
                </h3>
                <p className="text-gray-700 mb-4">
                  Premier entretien d'évaluation de votre dossier et de vos droits.
                </p>
                <div className="text-2xl font-bold text-or mb-2">[Tarif à définir]</div>
                <p className="text-sm text-gray-600">
                  Durée : 1h • Remboursée en cas de mandatement
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-sm">
                <h3 className="text-xl font-playfair font-semibold mb-4 text-anthracite">
                  Honoraire de résultat
                </h3>
                <p className="text-gray-700 mb-4">
                  Honoraire calculé sur l'indemnisation obtenue, selon la complexité du dossier.
                </p>
                <div className="text-2xl font-bold text-or mb-2">[% à définir]</div>
                <p className="text-sm text-gray-600">
                  Uniquement en cas de succès • Convention d'honoraire signée
                </p>
              </div>
            </div>
            
            <div className="mt-12 bg-beige p-8 rounded-sm">
              <h3 className="text-xl font-playfair font-semibold mb-4 text-anthracite text-center">
                Aide juridictionnelle
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-2">Éligibilité</h4>
                  <p className="text-gray-700 text-sm">
                    L'aide juridictionnelle peut être accordée selon vos ressources. 
                    Nous étudions votre éligibilité lors de notre premier entretien.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Avantages</h4>
                  <p className="text-gray-700 text-sm">
                    Prise en charge totale ou partielle des frais d'avocat. 
                    Possibilité de cumul avec l'honoraire de résultat selon les cas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="section-padding bg-noir text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12">
              Nos engagements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Clock size={48} className="mx-auto mb-4 text-or" />
                <h3 className="text-xl font-playfair font-semibold mb-2">Réactivité</h3>
                <p className="text-gray-300 text-sm">
                  Réponse sous 48h à vos messages et disponibilité pour les urgences
                </p>
              </div>
              <div>
                <Scale size={48} className="mx-auto mb-4 text-or" />
                <h3 className="text-xl font-playfair font-semibold mb-2">Transparence</h3>
                <p className="text-gray-300 text-sm">
                  Information claire sur les démarches, délais et coûts prévisionnels
                </p>
              </div>
              <div>
                <Users size={48} className="mx-auto mb-4 text-or" />
                <h3 className="text-xl font-playfair font-semibold mb-2">Accompagnement</h3>
                <p className="text-gray-300 text-sm">
                  Soutien et conseil à chaque étape de votre indemnisation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton pageType="about" />
    </>
  );
}