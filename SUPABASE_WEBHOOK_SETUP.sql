-- ============================================
-- CONFIGURATION WEBHOOK SUPABASE → NETLIFY
-- ============================================
--
-- 🎯 OBJECTIF: Synchronisation instantanée sans erreurs React
-- 🔧 MÉTHODE: Webhook Supabase → API Netlify → Revalidation ISR
--
-- ⚠️  IMPORTANT: Exécutez ce script dans votre dashboard Supabase
-- 📍 Aller à: https://supabase.com/dashboard → Votre projet → SQL Editor
--
-- ============================================

-- 1️⃣ Créer la fonction de notification webhook
CREATE OR REPLACE FUNCTION notify_netlify_webhook()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT := 'https://laurabaron-avocat-test.netlify.app/api/revalidate';
  payload JSON;
BEGIN
  -- Construire le payload avec les informations de l'événement
  payload := json_build_object(
    'table', TG_TABLE_NAME,
    'operation', TG_OP,
    'record', CASE
      WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)
      ELSE row_to_json(NEW)
    END,
    'timestamp', NOW()
  );

  -- Envoyer la requête HTTP au webhook Netlify
  PERFORM
    net.http_post(
      url := webhook_url,
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := payload::jsonb
    );

  -- Retourner l'enregistrement approprié
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- 2️⃣ Créer le trigger sur la table posts
DROP TRIGGER IF EXISTS posts_netlify_webhook ON posts;

CREATE TRIGGER posts_netlify_webhook
  AFTER INSERT OR UPDATE OR DELETE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION notify_netlify_webhook();

-- 3️⃣ Test du webhook (optionnel)
-- Décommentez ces lignes pour tester:
-- INSERT INTO posts (title, slug, excerpt, content_html, status)
-- VALUES ('Test Webhook', 'test-webhook', 'Test de synchronisation', '<p>Contenu test</p>', 'published');

-- ============================================
-- 📋 VÉRIFICATION
-- ============================================

-- Vérifier que le trigger est créé
SELECT
    trigger_name,
    event_manipulation,
    event_object_table,
    action_timing
FROM information_schema.triggers
WHERE trigger_name = 'posts_netlify_webhook';

-- ============================================
-- 🎯 RÉSULTAT ATTENDU
-- ============================================
--
-- ✅ Quand vous ajoutez un article dans Supabase :
--    1. Trigger se déclenche automatiquement
--    2. Webhook HTTP envoyé à Netlify
--    3. API /api/revalidate régénère la page
--    4. Nouvel article visible en 1-2 secondes
--
-- ✅ Plus d'erreurs React car plus de WebSocket client
-- ✅ Compatible avec tous les navigateurs
-- ✅ Fonctionne même si JavaScript désactivé
-- ✅ Performance optimale avec ISR Next.js
--
-- ============================================
-- 🚨 IMPORTANT
-- ============================================
--
-- 1. Remplacez l'URL webhook par votre domaine final :
--    'https://votre-site.netlify.app/api/revalidate'
--
-- 2. Assurez-vous que l'extension http est activée :
--    Supabase Dashboard → Project Settings → API → Extensions
--
-- 3. Pour tester, ajoutez un article et vérifiez qu'il
--    apparaît sur le site dans les 1-2 secondes
--
-- ============================================