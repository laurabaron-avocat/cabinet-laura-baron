-- ============================================
-- WEBHOOK ALTERNATIF SANS EXTENSION HTTP
-- ============================================
--
-- 🎯 SOLUTION: Utiliser Supabase Webhooks natifs au lieu de SQL
-- 📍 Configuration via Dashboard Supabase uniquement
--
-- ============================================

-- 1️⃣ Supprimer l'ancien trigger (si existe)
DROP TRIGGER IF EXISTS posts_netlify_webhook ON posts;
DROP FUNCTION IF EXISTS notify_netlify_webhook();

-- 2️⃣ Vérification de suppression
SELECT
    trigger_name,
    event_manipulation,
    event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'posts_netlify_webhook';

-- Si aucun résultat, c'est parfait ! Le trigger SQL est supprimé.

-- ============================================
-- 📋 CONFIGURATION WEBHOOK VIA DASHBOARD
-- ============================================
--
-- Au lieu d'utiliser SQL, configurez directement dans Supabase:
--
-- 1. Supabase Dashboard → Project Settings → Webhooks
-- 2. Cliquez "Create a new hook"
-- 3. Configurez:
--    - Name: "Netlify Sync"
--    - Table: "posts"
--    - Events: Insert, Update, Delete
--    - URL: https://laurabaron-avocat-test.netlify.app/api/revalidate
--    - HTTP Method: POST
--    - HTTP Headers: Content-Type: application/json
--
-- ============================================
-- ✅ AVANTAGES DE CETTE MÉTHODE
-- ============================================
--
-- ✅ Pas besoin d'extension HTTP
-- ✅ Interface graphique simple
-- ✅ Logs des webhooks visibles dans Dashboard
-- ✅ Retry automatique en cas d'échec
-- ✅ Plus stable et fiable
--
-- ============================================