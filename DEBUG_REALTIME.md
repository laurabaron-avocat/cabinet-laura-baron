# 🔍 Debug Realtime - Étapes de Diagnostic

## ⚠️ Si Realtime ne fonctionne pas après avoir exécuté le script SQL

### **1️⃣ Vérifications Console Browser**

Ouvrez `http://localhost:3000/ressources` et F12 → Console

**Messages attendus :**
```javascript
✅ "Supabase configuration status: {configured: true, ...}"
✅ "Realtime update received: {eventType: 'UPDATE', ...}"
✅ "Posts updated successfully"
```

**Messages d'erreur possibles :**
```javascript
❌ "Error refetching posts: ..."
❌ "Network error refetching posts: ..."
❌ "WebSocket connection failed"
```

### **2️⃣ Test Manuel Realtime**

1. **Page ressources ouverte** dans le navigateur
2. **Console F12 ouverte**
3. **Dans Supabase**, modifiez un titre d'article
4. **Observez** si des messages apparaissent dans la console

### **3️⃣ Vérification Supabase Dashboard**

Retournez dans votre **Supabase Dashboard** → **Database** → **Replication** :

- ✅ Vérifiez que **"Realtime"** est activé
- ✅ Vérifiez que la table **"posts"** est listée

### **4️⃣ Re-exécution Script SQL**

Si aucun message dans la console, **re-exécutez** ce script dans Supabase SQL Editor :

```sql
-- Vérifier que Realtime est bien activé
SELECT
    schemaname,
    tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime'
AND tablename = 'posts';
```

**Résultat attendu :**
```
schemaname | tablename
-----------+-----------
public     | posts
```

### **5️⃣ Cache Browser**

Si toujours pas de sync :

1. **Hard refresh** : Ctrl+Shift+R (ou Cmd+Shift+R sur Mac)
2. **Vider cache** : F12 → Network → "Disable cache" ✅
3. **Mode incognito** : Testez en navigation privée

### **6️⃣ Variables Environnement**

Vérifiez `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=https://qncljsxdjefkimfxdzuf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### **7️⃣ Redémarrage Complet**

Si rien ne fonctionne :
```bash
# Arrêtez le serveur Next.js
Ctrl+C

# Redémarrez
npm run dev
```

## 🎯 **Problèmes Communs**

### **Problème : Realtime activé mais pas de sync**
- **Cause** : Mode production dans `next.config.js`
- **Solution** : En dev, Realtime devrait être actif

### **Problème : Messages d'erreur WebSocket**
- **Cause** : Problème de réseau ou configuration Supabase
- **Solution** : Vérifier les credentials dans `.env.local`

### **Problème : Image pas mise à jour**
- **Cause** : Cache navigateur
- **Solution** : Hard refresh ou mode incognito

### **Problème : Pas de messages console**
- **Cause** : Script SQL pas exécuté correctement
- **Solution** : Re-exécuter le script d'activation

## 🚀 **Test Final**

Une fois le diagnostic fait, testez :

1. **Modifiez** une image dans Supabase
2. **La page doit** se mettre à jour **instantanément**
3. **Vous devez voir** "Mise à jour en cours..." brièvement

Si ça ne marche toujours pas, envoyez-moi les messages de la console ! 📋