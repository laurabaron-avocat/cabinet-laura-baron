import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { getPostBySlug, getPosts } from '@/lib/queries';
import SocialShare from '@/components/ui/SocialShare';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: `${post.title} | Ressources Juridiques`,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: post.authors ? [post.authors.name] : undefined,
      images: post.cover_url ? [{ url: post.cover_url }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    
    // If no posts are returned (e.g., Supabase not configured), return fallback slugs
    if (!posts || posts.length === 0) {
      return [
        { slug: 'guide-indemnisation-accident-route' },
        { slug: 'procedure-expertise-medicale' },
        { slug: 'calcul-prejudices-corporels' },
        { slug: 'droits-victimes-accident-travail' }
      ];
    }
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.warn('Error generating static params, using fallback slugs:', error);
    // Return fallback slugs for static export when Supabase is not available
    return [
      { slug: 'guide-indemnisation-accident-route' },
      { slug: 'procedure-expertise-medicale' },
      { slug: 'calcul-prejudices-corporels' },
      { slug: 'droits-victimes-accident-travail' }
    ];
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const jsonLD = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.authors?.name || 'Maître Laura Baron',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cabinet Maître Laura Baron',
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://maitre-laura-baron.fr/ressources/${post.slug}`,
    },
    image: post.cover_url || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />

      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-or">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/ressources" className="text-gray-600 hover:text-or">
              Ressources
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-anthracite">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/ressources"
              className="inline-flex items-center text-or hover:text-yellow-600 mb-8 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Retour aux ressources
            </Link>

            <article>
              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-noir mb-6">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    <span>{post.authors?.name || 'Maître Laura Baron'}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>
                      {post.published_at 
                        ? new Date(post.published_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Date non disponible'
                      }
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>5 min de lecture</span>
                  </div>
                </div>

                {post.post_tags && post.post_tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.post_tags.map((postTag: any) => (
                      <span
                        key={postTag.tags.id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-beige text-anthracite"
                      >
                        <Tag size={12} className="mr-1" />
                        {postTag.tags.name}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xl text-gray-700 leading-relaxed">
                  {post.excerpt}
                </p>
              </header>

              {post.cover_url && (
                <div className="mb-8">
                  <img
                    src={post.cover_url}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover rounded-sm"
                  />
                </div>
              )}

              {/* Social Share */}
              <div className="mb-8">
                <SocialShare 
                  title={post.title}
                  excerpt={post.excerpt}
                  url={`https://maitre-laura-baron.fr/ressources/${post.slug}`}
                />
              </div>

              <div 
                className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-anthracite prose-p:text-gray-700 prose-a:text-or prose-a:no-underline hover:prose-a:underline prose-strong:text-anthracite prose-ul:text-gray-700 prose-ol:text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content_html }}
              />
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-beige">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-playfair font-bold text-noir mb-6">
            Besoin d'un conseil personnalisé ?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Cet article vous a éclairé ? Contactez-nous pour une analyse personnalisée 
            de votre situation juridique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Prendre rendez-vous
            </Link>
            <Link href="/ressources" className="btn-secondary">
              Voir d'autres ressources
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppButton pageType="article" />
    </>
  );
}