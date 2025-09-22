import { supabase, isConfigured } from './supabase';
import type { Database } from './supabase';

type Post = Database['public']['Tables']['posts']['Row'];
type Author = Database['public']['Tables']['authors']['Row'];
type FAQ = Database['public']['Tables']['faq']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];

// Posts queries
export async function getPosts(limit?: number) {
  if (!supabase || !isConfigured) {
    console.log('Supabase not configured, returning mock data');
    return [];
  }

  try {
    const query = supabase
      .from('posts')
      .select(`
        *,
        authors (
          id,
          name,
          role,
          avatar_url
        ),
        post_tags (
          tags (
            id,
            name,
            slug
          )
        )
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (limit) {
      query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    return data || [];
  } catch (fetchError) {
    console.error('Network error fetching posts:', fetchError);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  if (!supabase || !isConfigured) {
    console.log('Supabase not configured, returning null');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        authors (
          id,
          name,
          role,
          avatar_url,
          bio_short
        ),
        post_tags (
          tags (
            id,
            name,
            slug
          )
        )
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error('Error fetching post by slug:', slug, error);
      return null;
    }

    return data;
  } catch (fetchError) {
    console.error('Network error fetching post by slug:', fetchError);
    return null;
  }
}

export async function getFeaturedPosts(limit = 3) {
  return getPosts(limit);
}

// FAQ queries
export async function getFAQByPage(pageKey: string) {
  if (!supabase || !isConfigured) {
    console.log('Supabase not configured, returning mock FAQ data for page:', pageKey);
    return getMockFAQ(pageKey);
  }

  try {
    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .eq('page_key', pageKey)
      .order('order_num', { ascending: true });

    if (error) {
      console.error('Error fetching FAQ:', error);
      console.log('Falling back to mock FAQ data for page:', pageKey);
      return getMockFAQ(pageKey);
    }

    return data || [];
  } catch (fetchError) {
    console.error('Network error fetching FAQ:', fetchError);
    console.log('Falling back to mock FAQ data for page:', pageKey);
    return getMockFAQ(pageKey);
  }
}

export async function getCategories() {
  if (!supabase || !isConfigured) {
    console.log('Supabase not configured, returning mock categories');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data || [];
  } catch (fetchError) {
    console.error('Network error fetching categories:', fetchError);
    return [];
  }
}

// Tags queries
export async function getTags() {
  if (!supabase || !isConfigured) {
    console.log('Supabase not configured, returning mock tags');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching tags:', error);
      return [];
    }

    return data || [];
  } catch (fetchError) {
    console.error('Network error fetching tags:', fetchError);
    return [];
  }
}

export async function submitContactForm(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  topic: string;
  message: string;
}) {
  if (!supabase || !isConfigured) {
    console.log('Supabase not configured, simulating form submission');
    return { success: true, message: 'Form submitted (mock)' };
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        city: formData.city || null,
        topic: formData.topic,
        message: formData.message,
      }]);

    if (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }

    return data;
  } catch (fetchError) {
    console.error('Network error submitting contact form:', fetchError);
    throw fetchError;
  }
}

export async function subscribeNewsletter(email: string) {
  if (!supabase) {
    console.log('Supabase not configured, simulating newsletter subscription');
    return { success: true, message: 'Subscribed (mock)' };
  }

  try {
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }

    return data;
  } catch (fetchError) {
    console.error('Network error subscribing to newsletter:', fetchError);
    throw fetchError;
  }
}

// Mock data functions for when Supabase is not configured
function getMockFAQ(pageKey: string) {
  const mockFAQs = {
    accueil: [
      {
        id: '1',
        question: 'Dans quels délais dois-je consulter après un accident ?',
        answer_html: '<p>Il est recommandé de consulter un avocat le plus rapidement possible après un accident. Certains délais légaux sont impératifs :</p><ul><li><strong>3 ans</strong> pour une action en responsabilité civile</li><li><strong>1 an</strong> pour une demande CIVI</li><li><strong>10 ans</strong> pour une demande CCI/ONIAM</li></ul>',
        page_key: 'accueil',
        order_num: 1,
      },
      {
        id: '2',
        question: 'Quels sont les préjudices indemnisables ?',
        answer_html: '<p>Les préjudices se divisent en deux catégories selon la nomenclature Dintilhac :</p><h4>Préjudices patrimoniaux</h4><ul><li>Pertes de revenus (ITT, IPP)</li><li>Frais médicaux et futurs</li><li>Frais de transport et d\'assistance</li></ul><h4>Préjudices extrapatrimoniaux</h4><ul><li>Souffrances endurées</li><li>Préjudice esthétique</li><li>Préjudice d\'agrément</li><li>Préjudice sexuel</li></ul>',
        page_key: 'accueil',
        order_num: 2,
      },
      {
        id: '3',
        question: 'Comment se déroule une expertise médicale ?',
        answer_html: '<p>L\'expertise médicale est une étape cruciale du processus d\'indemnisation :</p><ol><li><strong>Convocation :</strong> Vous recevez une convocation 15 jours avant</li><li><strong>Examen :</strong> L\'expert examine vos séquelles et votre état général</li><li><strong>Questions :</strong> Il vous interroge sur les circonstances et les conséquences</li><li><strong>Rapport :</strong> Un rapport est rédigé dans les 2 mois</li></ol><p><strong>Important :</strong> Vous avez le droit d\'être accompagné(e) par votre avocat et de demander une contre-expertise.</p>',
        page_key: 'accueil',
        order_num: 3,
      },
      {
        id: '4',
        question: 'Puis-je bénéficier de l\'aide juridictionnelle ?',
        answer_html: '<p>L\'aide juridictionnelle peut financer votre procédure selon vos revenus :</p><h4>Conditions de ressources (2024)</h4><ul><li><strong>Aide totale :</strong> Revenus inférieurs à 1 043€/mois</li><li><strong>Aide partielle :</strong> Revenus entre 1 043€ et 1 565€/mois</li></ul><h4>Avantages</h4><ul><li>Prise en charge des frais d\'avocat</li><li>Dispense d\'avance de frais</li><li>Protection en cas de perte du procès</li></ul><p><strong>Bonne nouvelle :</strong> En dommage corporel, l\'aide peut être accordée même si vos revenus dépassent les plafonds, compte tenu de la complexité des dossiers.</p>',
        page_key: 'accueil',
        order_num: 4,
      },
    ],
    'dommage-corporel': [
      {
        id: '5',
        question: 'Qu\'est-ce que la Loi Badinter ?',
        answer_html: '<p>La Loi Badinter de 1985 améliore l\'indemnisation des victimes d\'accidents de la circulation en instaurant un droit à indemnisation quasi-automatique pour les victimes non conductrices.</p>',
        page_key: 'dommage-corporel',
        order_num: 1,
      },
    ],
    indemnisation: [
      {
        id: '6',
        question: 'Comment se déroule une expertise médicale ?',
        answer_html: '<p>L\'expertise médicale comprend plusieurs étapes :</p><ol><li>Convocation par l\'expert</li><li>Examen médical complet</li><li>Rédaction du rapport</li></ol>',
        page_key: 'indemnisation',
        order_num: 1,
      },
    ],
  };

  return mockFAQs[pageKey as keyof typeof mockFAQs] || [];
}