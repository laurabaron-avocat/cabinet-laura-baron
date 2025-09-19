/*
  # Schéma complet pour le site Cabinet Laura Baron

  1. Tables principales
    - `authors` - Auteurs des articles (Maître Laura Baron)
    - `categories` - Catégories d'articles (Accidents route, Accidents médicaux, etc.)
    - `tags` - Tags pour les articles
    - `posts` - Articles de blog/ressources
    - `post_tags` - Relation many-to-many posts/tags
    - `faq` - Questions fréquentes par page
    - `leads` - Formulaires de contact
    - `subscribers` - Newsletter

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques de lecture publique pour le contenu
    - Politiques d'insertion pour les formulaires

  3. Données d'exemple
    - Auteur principal (Maître Laura Baron)
    - Catégories de base
    - Tags essentiels
    - FAQ par page
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Authors table
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  role text NOT NULL DEFAULT 'Avocat',
  avatar_url text,
  bio_short text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authors are publicly readable"
  ON authors
  FOR SELECT
  TO public
  USING (true);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly readable"
  ON categories
  FOR SELECT
  TO public
  USING (true);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags are publicly readable"
  ON tags
  FOR SELECT
  TO public
  USING (true);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content_html text NOT NULL,
  cover_url text,
  status text DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  published_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  seo_title text,
  seo_description text,
  lang text DEFAULT 'fr',
  author_id uuid REFERENCES authors(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are publicly readable"
  ON posts
  FOR SELECT
  TO public
  USING (status = 'published');

-- Post tags junction table
CREATE TABLE IF NOT EXISTS post_tags (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Post tags are publicly readable"
  ON post_tags
  FOR SELECT
  TO public
  USING (true);

-- FAQ table
CREATE TABLE IF NOT EXISTS faq (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  question text NOT NULL,
  answer_html text NOT NULL,
  page_key text NOT NULL,
  order_num integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

CREATE POLICY "FAQ are publicly readable"
  ON faq
  FOR SELECT
  TO public
  USING (true);

-- Leads table (contact forms)
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  firstname text NOT NULL,
  lastname text NOT NULL,
  email text NOT NULL,
  phone text,
  city text,
  topic text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Subscribers table (newsletter)
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert initial data
INSERT INTO authors (name, role, bio_short) VALUES 
('Maître Laura Baron', 'Avocat spécialisé en dommage corporel', 'Avocate inscrite au Barreau de Bayonne depuis 2013, spécialisée dans l''indemnisation des victimes d''accidents.')
ON CONFLICT DO NOTHING;

INSERT INTO categories (name, slug, description) VALUES 
('Accidents de la route', 'accidents-route', 'Indemnisation selon la Loi Badinter'),
('Accidents médicaux', 'accidents-medicaux', 'Erreurs médicales, CCI, ONIAM'),
('Agressions', 'agressions', 'CIVI, victimes d''infractions'),
('Accidents de la vie', 'accidents-vie', 'Accidents domestiques, sportifs, scolaires'),
('Guides pratiques', 'guides-pratiques', 'Conseils et démarches'),
('Actualités juridiques', 'actualites', 'Évolutions législatives et jurisprudentielles')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tags (name, slug) VALUES 
('Loi Badinter', 'loi-badinter'),
('Expertise médicale', 'expertise-medicale'),
('Préjudices', 'prejudices'),
('Indemnisation', 'indemnisation'),
('CIVI', 'civi'),
('CCI', 'cci'),
('ONIAM', 'oniam'),
('Responsabilité civile', 'responsabilite-civile'),
('Assurance', 'assurance'),
('Procédure', 'procedure')
ON CONFLICT (slug) DO NOTHING;

-- FAQ data
INSERT INTO faq (question, answer_html, page_key, order_num) VALUES 
(
  'Dans quels délais dois-je consulter après un accident ?',
  '<p>Il est recommandé de consulter un avocat le plus rapidement possible après un accident. Certains délais légaux sont impératifs :</p><ul><li><strong>3 ans</strong> pour une action en responsabilité civile</li><li><strong>1 an</strong> pour une demande CIVI</li><li><strong>10 ans</strong> pour une demande CCI/ONIAM</li></ul><p>Plus vous consultez tôt, mieux nous pouvons préserver vos droits et constituer votre dossier.</p>',
  'accueil',
  1
),
(
  'Quels sont les préjudices indemnisables ?',
  '<p>Les préjudices se divisent en deux catégories selon la nomenclature Dintilhac :</p><h4>Préjudices patrimoniaux</h4><ul><li>Pertes de revenus (ITT, IPP)</li><li>Frais médicaux et futurs</li><li>Adaptation du logement/véhicule</li><li>Assistance par tierce personne</li></ul><h4>Préjudices extrapatrimoniaux</h4><ul><li>Souffrances endurées</li><li>Préjudice esthétique</li><li>Préjudice d''agrément</li><li>Préjudice sexuel</li></ul>',
  'accueil',
  2
),
(
  'Comment se déroule la première consultation ?',
  '<p>La première consultation permet d''évaluer votre dossier :</p><ol><li><strong>Analyse de votre situation</strong> : étude des circonstances et des responsabilités</li><li><strong>Évaluation de vos droits</strong> : identification des préjudices et des recours possibles</li><li><strong>Stratégie juridique</strong> : définition de la meilleure approche pour votre indemnisation</li><li><strong>Modalités d''intervention</strong> : explication des honoraires et du déroulement</li></ol>',
  'accueil',
  3
),
(
  'Qu''est-ce que la Loi Badinter ?',
  '<p>La Loi Badinter de 1985 améliore l''indemnisation des victimes d''accidents de la circulation en instaurant un droit à indemnisation quasi-automatique pour les victimes non conductrices.</p><h4>Victimes protégées :</h4><ul><li><strong>Piétons</strong> : indemnisation systématique sauf faute inexcusable</li><li><strong>Cyclistes</strong> : même protection que les piétons</li><li><strong>Passagers</strong> : indemnisation automatique</li><li><strong>Conducteurs</strong> : indemnisation sauf faute inexcusable</li></ul>',
  'dommage-corporel',
  1
),
(
  'Comment fonctionne la procédure CCI ?',
  '<p>La Commission de Conciliation et d''Indemnisation (CCI) traite les accidents médicaux :</p><ol><li><strong>Saisine</strong> : dépôt du dossier dans les 10 ans</li><li><strong>Expertise</strong> : mission d''expertise médicale</li><li><strong>Avis</strong> : la CCI rend un avis sur la responsabilité</li><li><strong>Indemnisation</strong> : soit par l''assureur, soit par l''ONIAM</li></ol>',
  'dommage-corporel',
  2
),
(
  'Comment se déroule une expertise médicale ?',
  '<p>L''expertise médicale comprend plusieurs étapes :</p><ol><li><strong>Convocation</strong> : vous recevez une convocation avec la date et le lieu</li><li><strong>Préparation</strong> : constitution du dossier médical et liste des doléances</li><li><strong>Examen</strong> : examen médical complet par l''expert</li><li><strong>Discussion</strong> : échanges contradictoires avec votre médecin-conseil</li><li><strong>Rapport</strong> : l''expert rédige son rapport d''expertise</li></ol><p><strong>Important :</strong> vous pouvez être accompagné par votre avocat et votre médecin-conseil.</p>',
  'indemnisation',
  1
),
(
  'Puis-je contester un rapport d''expertise ?',
  '<p>Oui, plusieurs recours sont possibles :</p><ul><li><strong>Expertise complémentaire</strong> : si des éléments manquent</li><li><strong>Contre-expertise</strong> : en cas de désaccord sur les conclusions</li><li><strong>Recours judiciaire</strong> : saisine du tribunal compétent</li></ul><p>Il est essentiel d''agir rapidement car des délais s''appliquent.</p>',
  'indemnisation',
  2
)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_faq_page_key ON faq(page_key);
CREATE INDEX IF NOT EXISTS idx_faq_order ON faq(page_key, order_num);