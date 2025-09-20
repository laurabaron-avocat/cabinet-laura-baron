# Instructions de Test - Realtime et Design

## ✅ Changements Effectués

### 1. **Design Partage Social - Alignement Horizontal**
- ✅ Icônes alignées horizontalement
- ✅ Seulement les icônes visibles (pas de texte)
- ✅ Largeur optimisée sur toute la page
- ✅ Boutons circulaires avec effet hover scale
- ✅ Tooltips au survol pour identifier les plateformes

### 2. **Configuration Realtime Fixée**
- ✅ `next.config.js` modifié pour mode dynamique en développement
- ✅ Mode statique conservé pour la production
- ✅ Erreurs de génération statique résolues

## 🧪 Tests à Effectuer

### **Test 1 : Design Partage Social**

1. **Aller sur une page article :**
   - URL : http://localhost:3000/ressources/[n'importe-quel-slug]

2. **Vérifier l'affichage :**
   - ✅ Composant "Partager" centré sous les métadonnées
   - ✅ 6 icônes alignées horizontalement : Facebook, Twitter, LinkedIn, WhatsApp, Email, Copier
   - ✅ Icônes circulaires avec couleurs officielles
   - ✅ Effet d'agrandissement au survol
   - ✅ Tooltip au survol pour identifier chaque plateforme

3. **Tester la fonctionnalité :**
   - ✅ Clic sur Facebook → Ouvre popup de partage
   - ✅ Clic sur "Copier le lien" → Feedback visuel vert + "Lien copié !"

### **Test 2 : Mise à Jour Automatique**

**Prérequis :** Exécuter le SQL dans Supabase d'abord !

```sql
-- À exécuter dans votre dashboard Supabase
ALTER TABLE public.posts REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;

ALTER TABLE public.categories REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;

ALTER TABLE public.tags REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tags;
```

**Procédure de test :**

1. **Ouvrir la page ressources :**
   - URL : http://localhost:3000/ressources

2. **Ouvrir la console développeur :**
   - F12 → Console tab

3. **Ajouter un article dans Supabase :**
   - Dashboard Supabase → Table `posts`
   - Insérer nouvelle ligne avec `status = 'published'`
   - Remplir : `title`, `excerpt`, `content_html`, `slug`, `author_id`

4. **Vérifier les résultats :**
   - ✅ Console log : "Realtime update received"
   - ✅ Indicateur "Mise à jour en cours..." s'affiche brièvement
   - ✅ Nouvel article apparaît automatiquement SANS refresh de page
   - ✅ Article visible dans les sections "Articles à la une" ou "Articles récents"

### **Test 3 : Responsive Design**

1. **Mode Desktop :** Icônes bien espacées sur toute la largeur
2. **Mode Mobile :** Icônes restent accessibles et cliquables
3. **Tablette :** Layout adaptatif maintenu

## 🚨 Troubleshooting

### Si les mises à jour ne fonctionnent pas :

1. **Vérifier la console :** Erreurs WebSocket ?
2. **SQL exécuté ?** Realtime activé dans Supabase ?
3. **Serveur redémarré ?** Après modification `next.config.js`
4. **Mode développement ?** `NODE_ENV=development`

### Si le design ne s'affiche pas :

1. **Cache navigateur :** Ctrl+F5 pour forcer le reload
2. **CSS compilé ?** Vérifier les logs Next.js
3. **Composant utilisé ?** Vérifier dans la page article

## 📊 Résultats Attendus

### **Design :**
- Interface moderne avec partage horizontal
- UX fluide avec animations
- Accessibilité maintenue

### **Realtime :**
- Mises à jour instantanées
- Performance optimisée
- Indicateurs visuels clairs

## 🔄 Après les Tests

Si tout fonctionne :
1. Committer les changements
2. Documenter pour l'équipe
3. Préparer le déploiement production

Si problèmes :
1. Consulter `REALTIME_TROUBLESHOOTING.md`
2. Vérifier les logs serveur
3. Contacter le support technique