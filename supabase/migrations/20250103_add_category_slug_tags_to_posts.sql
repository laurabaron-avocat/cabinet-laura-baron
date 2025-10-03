-- Migration: Ajouter category_slug et tags directement dans la table posts
-- Date: 2025-01-03
-- Description: Simplification de l'architecture - déplacer catégories et tags vers la table posts

-- 1. Ajouter les nouvelles colonnes à la table posts
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS category_slug TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[];

-- 2. Créer un index sur category_slug pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_posts_category_slug ON posts(category_slug);

-- 3. Créer un index GIN sur les tags pour les recherches
CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN(tags);

-- 4. Migrer les données existantes avec les bonnes associations
UPDATE posts SET
  category_slug = 'accidents-route',
  tags = ARRAY['loi-badinter', 'responsabilite-civile', 'indemnisation', 'assurance']
WHERE slug IN (
  'accidents-route-responsabilite-dommage-corporel-guide-2025',
  'accident-de-voiture-que-faire-etape-par-etape',
  'accident-de-voiture-demarches-pour-blesses'
);

UPDATE posts SET
  category_slug = 'procedures-indemnisation',
  tags = ARRAY['expertise-medicale', 'bareme-dintilhac', 'prejudices-corporels', 'indemnisation']
WHERE slug IN (
  'accident-conducteur-non-assure-que-faire-guide-2025',
  'itt-vs-ipp-incapacites-dommage-corporel-guide-2025',
  'delais-indemnisation-accident-voiture-guide-2025',
  'qui-paye-mes-soins-apres-un-accident-de-la-route',
  'indemnisation-passagers-victimes-accidents-route',
  'preparer-expertise-medicale-accident-guide-2025'
);

UPDATE posts SET
  category_slug = 'accidents-medicaux',
  tags = ARRAY['cci', 'oniam', 'expertise-medicale', 'accidents-medicaux']
WHERE slug IN (
  'accidents-medicaux-cci-oniam-expertise-medicale'
);

UPDATE posts SET
  category_slug = 'accidents-vie',
  tags = ARRAY['responsabilite-civile', 'indemnisation', 'assurance']
WHERE slug = 'accidents-vie-responsabilite-civile-assurances-guide-2025';

UPDATE posts SET
  category_slug = 'agressions-civi',
  tags = ARRAY['civi', 'indemnisation', 'victimes', 'agression']
WHERE slug = 'agression-victimes-infractions-solidarite-nationale-civi';

-- 5. Définir une catégorie par défaut pour les articles sans catégorie
UPDATE posts
SET
  category_slug = 'conseils-pratiques',
  tags = ARRAY['dommage-corporel', 'conseils']
WHERE category_slug IS NULL AND status = 'published';

-- 6. Commentaire pour documentation
COMMENT ON COLUMN posts.category_slug IS 'Slug de la catégorie principale de l''article';
COMMENT ON COLUMN posts.tags IS 'Array des tags associés à l''article';