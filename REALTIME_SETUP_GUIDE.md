# Guide de Configuration Realtime pour Supabase

## Ce qui a été fait

✅ **Configuration Supabase** : Fichier `.env.local` créé avec vos credentials
✅ **Hook Realtime** : Hook personnalisé `useRealtimePosts` créé pour écouter les changements
✅ **Composant Client** : `RessourcesContent` créé pour utiliser les hooks côté client
✅ **Page Ressources** : Modifiée pour utiliser le nouveau composant avec mise à jour automatique

## Ce qu'il faut faire maintenant

### 1. Activer Realtime dans Supabase

Connectez-vous à votre dashboard Supabase et exécutez le script SQL suivant dans l'éditeur SQL :

```sql
-- Enable realtime for the posts table
ALTER TABLE public.posts REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;

-- Enable realtime for the categories table
ALTER TABLE public.categories REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;

-- Enable realtime for the tags table
ALTER TABLE public.tags REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tags;

-- Enable realtime for the post_tags table
ALTER TABLE public.post_tags REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.post_tags;
```

**Alternative :** Vous pouvez aussi copier le contenu du fichier `enable-realtime.sql` créé dans le projet.

### 2. Vérifier la configuration

1. Allez sur http://localhost:3000/ressources
2. Ouvrez les DevTools (F12) et regardez la console
3. Vous devriez voir des messages comme "Supabase configuration status"

### 3. Tester la mise à jour automatique

1. Avec la page `/ressources` ouverte dans votre navigateur
2. Allez dans votre dashboard Supabase
3. Ajoutez un nouvel article dans la table `posts` avec `status = 'published'`
4. L'article devrait apparaître automatiquement sur votre site web **sans recharger la page**

## Comment ça fonctionne

- **Supabase Realtime** : Écoute les changements dans la base de données
- **Hook useRealtimePosts** : Se connecte aux changements Supabase et met à jour l'état React
- **Composant RessourcesContent** : Utilise les hooks pour afficher les données en temps réel
- **Indicateur de chargement** : Une icône de rechargement s'affiche pendant les mises à jour

## Débogage

Si les mises à jour ne fonctionnent pas :

1. Vérifiez la console du navigateur pour des erreurs
2. Assurez-vous que Realtime est bien activé dans Supabase
3. Vérifiez que les credentials dans `.env.local` sont corrects
4. Redémarrez le serveur de développement si nécessaire

## Structure des fichiers modifiés

```
src/
├── hooks/
│   └── useRealtimePosts.ts        # Hook pour les mises à jour temps réel
├── components/
│   └── RessourcesContent.tsx      # Composant client avec realtime
├── app/ressources/
│   └── page.tsx                   # Page modifiée pour utiliser le composant
└── lib/
    └── supabase.ts                # Configuration Supabase avec Realtime
```