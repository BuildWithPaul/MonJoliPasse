# Mon Joli Passe — App mobile (Expo)

Cette application mobile (Expo / React Native) permet de **scanner** un QR code de certificat COVID et d’afficher une version **personnalisée** (mise en page, fond, style).

⚠️ Cette app ne génère pas de certificat officiel. Elle ne fait que modifier l’apparence côté affichage.

## Prérequis
- Node.js (LTS recommandé)
- Expo CLI (via `npx`), et l’app **Expo Go** sur votre téléphone (ou un émulateur)

## Installation
```bash
npm install
```

## Lancer en développement
```bash
npx expo start
```

Ensuite:
- Scannez le QR code avec l’app Expo Go (Android) ou l’appareil photo (iOS), ou
- Lancez sur émulateur via les options proposées par Expo.

## Notes
- Les permissions caméra peuvent être requises.
- Si l’app dépend d’une API, vérifiez l’URL dans les fichiers de config du projet.
