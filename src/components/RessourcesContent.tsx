'use client';

import Link from 'next/link';
import { Search, BookOpen, FileText, Users, Calendar, Tag, ArrowRight, RefreshCw, Clock, User } from 'lucide-react';
import { useRealtimePosts, useRealtimeCategories, useRealtimeTags } from '@/hooks/useRealtimePosts';
import RealtimeTest from '@/components/RealtimeTest';
import ProductionRealtime from '@/components/ProductionRealtime';
import type { Database } from '@/lib/supabase';

type Post = Database['public']['Tables']['posts']['Row'] & {
  authors?: {
    id: string;
    name: string;
    role: string;
    avatar_url: string | null;
  };
  post_tags?: Array<{
    tags: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
};

type Category = Database['public']['Tables']['categories']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];

interface RessourcesContentProps {
  initialFeaturedPosts: Post[];
  initialRecentPosts: Post[];
  initialCategories: Category[];
  initialTags: Tag[];
}

export default function RessourcesContent({
  initialFeaturedPosts,
  initialRecentPosts,
  initialCategories,
  initialTags,
}: RessourcesContentProps) {
  const { posts: featuredPosts, isLoading: isFeaturedLoading } = useRealtimePosts(initialFeaturedPosts);
  const { posts: recentPosts, isLoading: isRecentLoading } = useRealtimePosts(initialRecentPosts);
  const categories = useRealtimeCategories(initialCategories);
  const tags = useRealtimeTags(initialTags);

  // Get the most recent posts for featured and recent sections
  const displayFeaturedPosts = featuredPosts.slice(0, 3);
  const displayRecentPosts = recentPosts.slice(0, 6);

  // Handle production realtime updates
  const handleProductionUpdate = () => {
    // Force a page refresh to get new data
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-beige via-white to-beige section-padding">
        <div className="container-custom">
          <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-noir mb-6">
                Ressources & Guides
              </h1>
              <p className="text-xl text-anthracite mb-8 leading-relaxed">
                Guides pratiques, fiches notions et actualités juridiques pour comprendre
                vos droits et optimiser votre indemnisation en dommage corporel.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un guide, une notion juridique..."
                    className="w-full pl-12 pr-4 py-4 rounded-sm border border-gray-300 focus:ring-2 focus:ring-or focus:border-transparent"
                  />
                </div>
              </div>

              {/* Loading indicator */}
              {(isFeaturedLoading || isRecentLoading) && (
                <div className="mt-4 flex items-center justify-center text-or">
                  <RefreshCw size={20} className="animate-spin mr-2" />
                  <span className="text-sm">Mise à jour en cours...</span>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-noir mb-6">
              Guides à la une
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Les ressources essentielles pour comprendre le dommage corporel et l'indemnisation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayFeaturedPosts && displayFeaturedPosts.length > 0 ? displayFeaturedPosts.map((post) => (
              <article key={post.id} className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-or/20">
                <div className="relative aspect-video bg-gradient-to-br from-beige to-gray-200 overflow-hidden">
                  <img
                    src={post.cover_url || 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-anthracite rounded-full border border-or/20">
                      <FileText size={12} className="mr-1 text-or" />
                      Article
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      <span>5 min</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString('fr-FR') : ''}
                    </div>
                  </div>
                  <h3 className="text-lg font-playfair font-semibold text-anthracite mb-3 line-clamp-2 group-hover:text-or transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.post_tags?.slice(0, 2).map((postTag: any) => (
                        <span key={postTag.tags.id} className="text-xs text-gray-600 bg-beige/60 px-2 py-1 rounded-full border border-gray-200">
                          {postTag.tags.name}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/ressources/${post.slug}`}
                      className="inline-flex items-center text-or hover:text-yellow-600 text-sm font-medium group-hover:translate-x-1 transition-transform"
                    >
                      Lire
                      <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">Aucun article disponible pour le moment.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Les articles seront bientôt disponibles.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recent Posts & Sidebar */}
      <section className="section-padding bg-beige">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Recent Posts */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-playfair font-bold text-noir mb-8">
                Articles récents
              </h2>
              <div className="space-y-6">
                {displayRecentPosts && displayRecentPosts.length > 0 ? displayRecentPosts.map((post) => (
                  <article key={post.id} className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-or/20">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-beige to-or/10 text-xs font-medium text-anthracite rounded-full border border-or/20">
                          <FileText size={12} className="mr-1 text-or" />
                          Article
                        </span>
                        {post.post_tags && post.post_tags.length > 0 && (
                          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                            {post.post_tags[0].tags.name}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 space-x-3">
                        <div className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          <span>{new Date(post.published_at || '').toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          <span>5 min</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-playfair font-semibold text-anthracite mb-3 group-hover:text-or transition-colors">
                      <Link href={`/ressources/${post.slug}`} className="hover:text-or transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <User size={12} className="mr-1" />
                        <span>Maître Laura Baron</span>
                      </div>
                      <Link
                        href={`/ressources/${post.slug}`}
                        className="inline-flex items-center text-or hover:text-yellow-600 text-sm font-medium group-hover:translate-x-1 transition-transform"
                      >
                        Lire l'article complet
                        <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </article>
                )) : (
                  <div className="bg-white p-6 rounded-sm shadow-sm text-center">
                    <p className="text-gray-600">Aucun article récent disponible.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-white p-6 rounded-sm shadow-sm">
                <h3 className="text-lg font-playfair font-semibold text-anthracite mb-4 flex items-center">
                  <BookOpen size={20} className="mr-2 text-or" />
                  Catégories
                </h3>
                <div className="space-y-2">
                  {categories && categories.length > 0 ? categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/ressources/categorie/${category.slug}`}
                      className="flex items-center justify-between py-2 px-3 rounded hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        0
                      </span>
                    </Link>
                  )) : (
                    <p className="text-gray-600 text-sm">Aucune catégorie disponible.</p>
                  )}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white p-6 rounded-sm shadow-sm">
                <h3 className="text-lg font-playfair font-semibold text-anthracite mb-4 flex items-center">
                  <Tag size={20} className="mr-2 text-or" />
                  Tags populaires
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags && tags.length > 0 ? tags.slice(0, 10).map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/ressources/tag/${tag.slug}`}
                      className="text-xs text-gray-700 bg-gray-100 hover:bg-or hover:text-white px-3 py-2 rounded transition-colors"
                    >
                      {tag.name}
                    </Link>
                  )) : (
                    <p className="text-gray-600 text-sm">Aucun tag disponible.</p>
                  )}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-noir text-white p-6 rounded-sm">
                <h3 className="text-lg font-playfair font-semibold mb-4">
                  Newsletter juridique
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Recevez nos derniers guides et actualités en dommage corporel directement dans votre boîte mail.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="w-full px-3 py-2 rounded text-noir"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-or hover:bg-yellow-600 text-noir py-2 px-4 rounded font-medium transition-colors"
                  >
                    S'abonner
                  </button>
                </form>
                <p className="text-xs text-gray-400 mt-2">
                  Pas de spam, désinscription à tout moment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-noir mb-6">
            Besoin d'un conseil personnalisé ?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Nos guides vous éclairent, mais chaque situation est unique.
            Contactez-nous pour une analyse personnalisée de votre dossier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Prendre rendez-vous
            </Link>
            <Link href="/dommage-corporel" className="btn-secondary">
              Nos expertises
            </Link>
          </div>
        </div>
      </section>

      {/* Test Realtime - Développement uniquement */}
      {process.env.NODE_ENV === 'development' && <RealtimeTest />}

      {/* Production Realtime - Fonctionne en production sur Netlify */}
      <ProductionRealtime onDataUpdate={handleProductionUpdate} />
    </>
  );
}