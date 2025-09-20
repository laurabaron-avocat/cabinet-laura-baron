-- ============================================
-- SCRIPT D'ACTIVATION SUPABASE REALTIME
-- ============================================
--
-- ⚠️  IMPORTANT: Exécutez ce script dans votre dashboard Supabase
-- 📍 Aller à: https://supabase.com/dashboard → Votre projet → SQL Editor
--
-- Ce script active la synchronisation temps réel pour:
-- ✅ Ajout d'articles → Apparition automatique sur le site
-- ✅ Suppression d'articles → Disparition automatique du site
-- ✅ Modification d'articles → Mise à jour automatique
-- ============================================

-- 1. Activer Realtime pour la table 'posts'
ALTER TABLE public.posts REPLICA IDENTITY FULL;

-- 2. Publier les changements de la table 'posts'
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;

-- 3. Activer Realtime pour la table 'categories' (optionnel)
ALTER TABLE public.categories REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;

-- 4. Activer Realtime pour la table 'tags' (optionnel)
ALTER TABLE public.tags REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tags;

-- 5. Activer Realtime pour la table 'post_tags' (pour les relations)
ALTER TABLE public.post_tags REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.post_tags;

-- 6. Vérifier que Realtime est activé
SELECT
    schemaname,
    tablename,
    attname,
    atttypid::regtype
FROM
    pg_publication_tables ppt
    JOIN pg_attribute pa ON pa.attrelid = (ppt.schemaname||'.'||ppt.tablename)::regclass
WHERE
    ppt.pubname = 'supabase_realtime'
    AND ppt.tablename IN ('posts', 'categories', 'tags', 'post_tags')
ORDER BY tablename, attname;

-- ============================================
-- RÉSULTAT ATTENDU APRÈS EXÉCUTION:
-- ============================================
--
-- 🎯 SYNCHRONISATION TEMPS RÉEL ACTIVE:
--
-- ✅ Vous ajoutez un article dans Supabase
--    → Il apparaît instantanément sur /ressources
--
-- ✅ Vous supprimez un article dans Supabase
--    → Il disparaît instantanément du site
--
-- ✅ Vous modifiez un article dans Supabase
--    → Les changements s'affichent en temps réel
--
-- ✅ Indicateur visuel "Mise à jour en cours..."
--    → S'affiche pendant la synchronisation
--
-- ============================================
-- 📋 INSTRUCTIONS D'UTILISATION:
-- ============================================
--
-- 1. Copiez ce script complet
-- 2. Allez sur https://supabase.com/dashboard
-- 3. Sélectionnez votre projet
-- 4. Cliquez sur "SQL Editor" dans le menu
-- 5. Collez et exécutez ce script
-- 6. Vérifiez que toutes les commandes s'exécutent sans erreur
-- 7. Testez en ajoutant/supprimant un article
--
-- ============================================