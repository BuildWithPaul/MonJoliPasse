# Mon Joli Passe

Mon Joli Passe est un projet open‑source pour **personnaliser l’apparence** d’un « passe sanitaire » / certificat COVID (ex: ajout d’un fond, d’un style, d’un titre) tout en gardant les données telles qu’elles sont encodées dans le QR code.

Exemple : 
<img width="287" height="285" alt="image" src="https://github.com/user-attachments/assets/e606c754-1082-4817-8ff8-05a281152578" />

 Ce projet est **purement visuel**. Il ne crée pas de nouveau certificat et ne remplace pas un document officiel.

## Contenu du dépôt

- `web/` : application web (Vue) pour importer/scanner un QR code et générer une version personnalisée.
- `server/` : API Node.js/Express (facultatif) pour des besoins serveur (proxy, services).
- `app/` : application mobile (Expo / React Native).

Chaque dossier contient un README avec les commandes de démarrage.

## Démarrage rapide

### Prérequis
- Node.js (LTS recommandé)
- Yarn ou npm
- Pour le mobile: Expo Go sur le téléphone, ou un émulateur

### 1) Lancer le web
```bash
cd web
yarn install
yarn serve
```

### 2) Lancer l’API (optionnel)
```bash
cd server
yarn install
yarn dev
```

### 3) Lancer l’app mobile
```bash
cd app
npm install
npx expo start
```

## Structure des données et sécurité

Le QR code contient des données sensibles (nom, prénom, date de naissance, etc.).  
Évitez de partager des captures d’écran ou des exports publiquement.

## Licence

Voir les fichiers `LICENSE` dans les sous‑projets quand ils existent.
