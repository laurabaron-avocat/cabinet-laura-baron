import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Mapping d'articles avec leurs catégories et tags
const ARTICLE_MAPPING = {
  'accidents-route-responsabilite-dommage-corporel-guide-2025': {
    category_slug: 'accidents-route',
    tags: ['loi-badinter', 'responsabilite-civile', 'indemnisation', 'assurance']
  },
  'preparer-expertise-medicale-accident-guide-2025': {
    category_slug: 'procedures-indemnisation',
    tags: ['expertise-medicale', 'bareme-dintilhac', 'prejudices-corporels']
  },
  'accident-de-voiture-que-faire-etape-par-etape': {
    category_slug: 'accidents-route',
    tags: ['loi-badinter', 'responsabilite-civile', 'conseils-pratiques']
  },
  'accident-de-voiture-demarches-pour-blesses': {
    category_slug: 'accidents-route',
    tags: ['loi-badinter', 'indemnisation', 'victimes']
  },
  'accident-conducteur-non-assure-que-faire-guide-2025': {
    category_slug: 'procedures-indemnisation',
    tags: ['assurance', 'indemnisation', 'responsabilite-civile']
  },
  'itt-vs-ipp-incapacites-dommage-corporel-guide-2025': {
    category_slug: 'procedures-indemnisation',
    tags: ['itt', 'ipp', 'expertise-medicale', 'bareme-dintilhac']
  },
  'delais-indemnisation-accident-voiture-guide-2025': {
    category_slug: 'procedures-indemnisation',
    tags: ['indemnisation', 'delais', 'assurance']
  },
  'qui-paye-mes-soins-apres-un-accident-de-la-route': {
    category_slug: 'procedures-indemnisation',
    tags: ['soins', 'remboursement', 'assurance', 'loi-badinter']
  },
  'accidents-medicaux-cci-oniam-expertise-medicale': {
    category_slug: 'accidents-medicaux',
    tags: ['cci', 'oniam', 'expertise-medicale', 'accidents-medicaux']
  },
  'indemnisation-passagers-victimes-accidents-route': {
    category_slug: 'procedures-indemnisation',
    tags: ['passagers', 'victimes', 'indemnisation', 'loi-badinter']
  },
  'accidents-vie-responsabilite-civile-assurances-guide-2025': {
    category_slug: 'accidents-vie',
    tags: ['responsabilite-civile', 'indemnisation', 'assurance']
  },
  'agression-victimes-infractions-solidarite-nationale-civi': {
    category_slug: 'agressions-civi',
    tags: ['civi', 'indemnisation', 'victimes', 'agression']
  }
};

async function updatePostsWithCategoriesAndTags() {
  console.log('🔄 Mise à jour des articles avec catégories et tags...');

  // Récupérer tous les articles
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('id, slug, title')
    .eq('status', 'published');

  if (postsError) {
    console.error('❌ Erreur récupération articles:', postsError);
    return;
  }

  console.log(`📚 ${posts?.length || 0} articles trouvés`);

  // Mettre à jour chaque article
  for (const post of posts || []) {
    const mapping = ARTICLE_MAPPING[post.slug as keyof typeof ARTICLE_MAPPING];

    if (mapping) {
      console.log(`🔄 Mise à jour de "${post.title}"`);

      const { error: updateError } = await supabase
        .from('posts')
        .update({
          category_slug: mapping.category_slug,
          tags: mapping.tags
        })
        .eq('id', post.id);

      if (updateError) {
        console.error(`❌ Erreur mise à jour ${post.slug}:`, updateError);
      } else {
        console.log(`✅ Article mis à jour: ${mapping.category_slug} avec ${mapping.tags.length} tags`);
      }
    } else {
      // Catégorie par défaut pour les articles non mappés
      const { error: defaultError } = await supabase
        .from('posts')
        .update({
          category_slug: 'conseils-pratiques',
          tags: ['dommage-corporel', 'conseils']
        })
        .eq('id', post.id);

      if (defaultError) {
        console.error(`❌ Erreur catégorie par défaut ${post.slug}:`, defaultError);
      } else {
        console.log(`📝 Catégorie par défaut appliquée à "${post.title}"`);
      }
    }
  }

  // Afficher les statistiques
  const { data: updatedPosts } = await supabase
    .from('posts')
    .select('category_slug, tags')
    .eq('status', 'published');

  const categoryStats: Record<string, number> = {};
  updatedPosts?.forEach(post => {
    if (post.category_slug) {
      categoryStats[post.category_slug] = (categoryStats[post.category_slug] || 0) + 1;
    }
  });

  console.log('\n📊 Statistiques par catégorie:');
  Object.entries(categoryStats).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} articles`);
  });

  console.log('\n✅ Migration terminée avec succès!');
}

if (require.main === module) {
  updatePostsWithCategoriesAndTags();
}

export { updatePostsWithCategoriesAndTags };