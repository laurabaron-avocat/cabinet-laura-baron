import { Metadata } from 'next';
import { getPosts, getFeaturedPosts, getCategories, getTags } from '@/lib/queries';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import RessourcesContent from '@/components/RessourcesContent';

export const metadata: Metadata = {
  title: 'Ressources & Guides • Blog Juridique Dommage Corporel',
  description: 'Guides pratiques, fiches notions et actualités juridiques en dommage corporel. Ressources expertes pour comprendre vos droits et l\'indemnisation des victimes.',
};

// Revalidation toutes les 60 secondes pour récupérer le nouveau contenu
export const revalidate = 60;

export default async function RessourcesPage() {
  // Récupérer les données depuis Supabase
  try {
    const [featuredPosts, recentPosts, categories, tags] = await Promise.all([
      getFeaturedPosts(3),
      getPosts(6),
      getCategories(),
      getTags()
    ]);

    console.log('Featured posts:', featuredPosts?.length || 0);
    console.log('Recent posts:', recentPosts?.length || 0);
    console.log('Categories:', categories?.length || 0);
    console.log('Tags:', tags?.length || 0);

    const jsonLD = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Ressources Juridiques - Dommage Corporel',
      description: 'Blog juridique spécialisé en dommage corporel et indemnisation des victimes',
      url: 'https://maitre-laura-baron.fr/ressources',
      author: {
        '@type': 'Person',
        name: 'Maître Laura Baron',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Cabinet Maître Laura Baron',
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
        />

        <RessourcesContent
          initialFeaturedPosts={featuredPosts || []}
          initialRecentPosts={recentPosts || []}
          initialCategories={categories || []}
          initialTags={tags || []}
        />

        <WhatsAppButton pageType="article" />
      </>
    );
  } catch (error) {
    console.error('Error loading resources page data:', error);
    return (
      <>
        <RessourcesContent
          initialFeaturedPosts={[]}
          initialRecentPosts={[]}
          initialCategories={[]}
          initialTags={[]}
        />
        <WhatsAppButton pageType="article" />
      </>
    );
  }
}