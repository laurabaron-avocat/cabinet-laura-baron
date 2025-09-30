/**
 * Script d'association automatique des articles aux catégories et tags
 * Ce script analyse les articles existants et les associe intelligemment
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/lib/supabase';

// Configuration Supabase (à remplir avec vos vraies clés)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

// Définition des catégories et tags à créer
const CATEGORIES = [
  { name: 'Accidents de la route', slug: 'accidents-route' },
  { name: 'Accidents médicaux', slug: 'accidents-medicaux' },
  { name: 'Agressions et CIVI', slug: 'agressions-civi' },
  { name: 'Accidents de la vie', slug: 'accidents-vie' },
  { name: 'Procédures d\'indemnisation', slug: 'procedures-indemnisation' },
  { name: 'Conseils pratiques', slug: 'conseils-pratiques' },
  { name: 'Actualités juridiques', slug: 'actualites-juridiques' }
];

const TAGS = [
  { name: 'Loi Badinter', slug: 'loi-badinter' },
  { name: 'Expertise médicale', slug: 'expertise-medicale' },
  { name: 'Préjudices corporels', slug: 'prejudices-corporels' },
  { name: 'Assurance', slug: 'assurance' },
  { name: 'Indemnisation', slug: 'indemnisation' },
  { name: 'Responsabilité civile', slug: 'responsabilite-civile' },
  { name: 'Dommage corporel', slug: 'dommage-corporel' },
  { name: 'Victimes', slug: 'victimes' },
  { name: 'Préjudice esthétique', slug: 'prejudice-esthetique' },
  { name: 'Préjudice d\'agrément', slug: 'prejudice-agrement' },
  { name: 'ITT', slug: 'itt' },
  { name: 'IPP', slug: 'ipp' },
  { name: 'Barème Dintilhac', slug: 'bareme-dintilhac' },
  { name: 'Protection juridique', slug: 'protection-juridique' },
  { name: 'CIVI', slug: 'civi' },
  { name: 'CCI', slug: 'cci' },
  { name: 'ONIAM', slug: 'oniam' }
];

// Règles d'association intelligente basées sur les mots-clés
const ASSOCIATION_RULES = {
  'accidents-route': {
    keywords: ['route', 'circulation', 'badinter', 'véhicule', 'auto', 'piéton', 'cycliste', 'moto', 'accident de voiture'],
    tags: ['loi-badinter', 'responsabilite-civile', 'indemnisation', 'assurance']
  },
  'accidents-medicaux': {
    keywords: ['médical', 'hôpital', 'chirurgie', 'nosocomial', 'infection', 'erreur médicale', 'médecin', 'traitement'],
    tags: ['expertise-medicale', 'cci', 'oniam', 'responsabilite-civile']
  },
  'agressions-civi': {
    keywords: ['agression', 'violence', 'civi', 'infraction', 'pénale', 'victime d\'agression', 'coups'],
    tags: ['civi', 'indemnisation', 'victimes']
  },
  'accidents-vie': {
    keywords: ['domestique', 'loisirs', 'sport', 'école', 'travail', 'accident du travail', 'chute'],
    tags: ['responsabilite-civile', 'indemnisation', 'assurance']
  },
  'procedures-indemnisation': {
    keywords: ['procédure', 'expertise', 'évaluation', 'préjudice', 'indemnisation', 'barème', 'dintilhac'],
    tags: ['expertise-medicale', 'bareme-dintilhac', 'prejudices-corporels', 'indemnisation']
  },
  'conseils-pratiques': {
    keywords: ['conseil', 'que faire', 'comment', 'guide', 'étapes', 'démarches', 'protection juridique'],
    tags: ['protection-juridique', 'conseils', 'dommage-corporel']
  }
};

async function createCategoriesAndTags() {
  console.log('🏗️ Création des catégories et tags...');

  // Créer les catégories
  for (const category of CATEGORIES) {
    const { error } = await supabase
      .from('categories')
      .upsert(category, { onConflict: 'slug' });

    if (error) {
      console.error(`❌ Erreur création catégorie ${category.name}:`, error);
    } else {
      console.log(`✅ Catégorie créée: ${category.name}`);
    }
  }

  // Créer les tags
  for (const tag of TAGS) {
    const { error } = await supabase
      .from('tags')
      .upsert(tag, { onConflict: 'slug' });

    if (error) {
      console.error(`❌ Erreur création tag ${tag.name}:`, error);
    } else {
      console.log(`✅ Tag créé: ${tag.name}`);
    }
  }
}

async function analyzeAndAssociateArticles() {
  console.log('🔍 Analyse des articles existants...');

  // Récupérer tous les articles publiés
  const { data: articles, error: articlesError } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published');

  if (articlesError) {
    console.error('❌ Erreur récupération articles:', articlesError);
    return;
  }

  console.log(`📚 ${articles?.length || 0} articles trouvés`);

  // Récupérer les catégories et tags
  const { data: categories } = await supabase.from('categories').select('*');
  const { data: tags } = await supabase.from('tags').select('*');

  if (!articles || !categories || !tags) {
    console.error('❌ Impossible de récupérer les données');
    return;
  }

  // Associer chaque article
  for (const article of articles) {
    console.log(`\n🔄 Analyse de l'article: "${article.title}"`);

    const contentToAnalyze = `${article.title} ${article.excerpt} ${article.content_html}`.toLowerCase();

    // Trouver la meilleure catégorie
    let bestCategory = null;
    let maxScore = 0;

    for (const [categorySlug, rule] of Object.entries(ASSOCIATION_RULES)) {
      const score = rule.keywords.reduce((acc, keyword) => {
        return acc + (contentToAnalyze.includes(keyword.toLowerCase()) ? 1 : 0);
      }, 0);

      if (score > maxScore) {
        maxScore = score;
        bestCategory = categories.find(cat => cat.slug === categorySlug);
      }
    }

    // Associer à la catégorie si trouvée
    if (bestCategory && maxScore > 0) {
      console.log(`📂 Catégorie associée: ${bestCategory.name} (score: ${maxScore})`);

      // Ici on pourrait ajouter l'association category si la table existe
      // Pour l'instant on se concentre sur les tags
    }

    // Trouver les tags pertinents
    const relevantTags = [];

    if (bestCategory) {
      const rule = ASSOCIATION_RULES[bestCategory.slug as keyof typeof ASSOCIATION_RULES];

      // Ajouter les tags automatiques de la règle
      for (const tagSlug of rule.tags) {
        const tag = tags.find(t => t.slug === tagSlug);
        if (tag) relevantTags.push(tag);
      }

      // Ajouter les tags basés sur les mots-clés
      for (const tag of tags) {
        if (contentToAnalyze.includes(tag.name.toLowerCase()) &&
            !relevantTags.find(rt => rt.id === tag.id)) {
          relevantTags.push(tag);
        }
      }
    }

    // Associer les tags
    for (const tag of relevantTags.slice(0, 5)) { // Limiter à 5 tags max
      const { error } = await supabase
        .from('post_tags')
        .upsert({ post_id: article.id, tag_id: tag.id }, { onConflict: 'post_id,tag_id' });

      if (error) {
        console.error(`❌ Erreur association tag ${tag.name}:`, error);
      } else {
        console.log(`🏷️ Tag associé: ${tag.name}`);
      }
    }
  }
}

async function displayStats() {
  console.log('\n📊 Statistiques finales:');

  const { data: articles } = await supabase
    .from('posts')
    .select('id')
    .eq('status', 'published');

  const { data: categories } = await supabase
    .from('categories')
    .select('id');

  const { data: tags } = await supabase
    .from('tags')
    .select('id');

  const { data: associations } = await supabase
    .from('post_tags')
    .select('post_id, tag_id');

  console.log(`📚 Articles publiés: ${articles?.length || 0}`);
  console.log(`📂 Catégories: ${categories?.length || 0}`);
  console.log(`🏷️ Tags: ${tags?.length || 0}`);
  console.log(`🔗 Associations: ${associations?.length || 0}`);
}

async function main() {
  console.log('🚀 Démarrage du script d\'association...\n');

  try {
    await createCategoriesAndTags();
    await analyzeAndAssociateArticles();
    await displayStats();

    console.log('\n✅ Script terminé avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution:', error);
  }
}

// Exécuter le script
if (require.main === module) {
  main();
}

export { main as associateArticles };