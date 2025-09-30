/**
 * Script de test de connexion Supabase
 * À exécuter avant le script d'association pour vérifier que tout fonctionne
 */

import { createClient } from '@supabase/supabase-js';

// Configuration (utilise les variables d'environnement ou des valeurs par défaut)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('🔍 Test de connexion Supabase...\n');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement manquantes:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Définie' : '❌ Manquante');
  console.error('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Définie' : '❌ Manquante');
  console.error('\n📝 Ajoutez ces variables dans votre fichier .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  try {
    console.log('🔌 Test de connexion...');

    // Test 1: Connexion basique
    const { data: healthCheck, error: healthError } = await supabase
      .from('posts')
      .select('count', { count: 'exact', head: true });

    if (healthError) {
      console.error('❌ Erreur de connexion:', healthError);
      return false;
    }

    console.log('✅ Connexion réussie !');

    // Test 2: Compter les articles
    const { count: postsCount } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true });

    console.log(`📚 Articles en base: ${postsCount || 0}`);

    // Test 3: Compter les articles publiés
    const { count: publishedCount } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    console.log(`📖 Articles publiés: ${publishedCount || 0}`);

    // Test 4: Vérifier les tables nécessaires
    const tables = ['posts', 'categories', 'tags', 'post_tags'];

    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error(`❌ Table '${table}' non accessible:`, error.message);
      } else {
        console.log(`✅ Table '${table}' accessible`);
      }
    }

    // Test 5: Lister quelques articles pour vérification
    if (publishedCount && publishedCount > 0) {
      console.log('\n📋 Aperçu des articles publiés:');
      const { data: samplePosts } = await supabase
        .from('posts')
        .select('title, slug, published_at')
        .eq('status', 'published')
        .limit(5);

      samplePosts?.forEach((post, index) => {
        console.log(`${index + 1}. "${post.title}" (${post.slug})`);
      });
    }

    return true;

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
    return false;
  }
}

async function main() {
  const success = await testConnection();

  if (success) {
    console.log('\n🎉 Tous les tests sont passés !');
    console.log('✨ Vous pouvez maintenant exécuter le script d\'association');
    console.log('💡 Commande: npm run associate');
  } else {
    console.log('\n❌ Certains tests ont échoué');
    console.log('🔧 Vérifiez votre configuration Supabase');
  }
}

if (require.main === module) {
  main();
}