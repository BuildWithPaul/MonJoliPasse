# Mon Joli Passe — Web (Vue)

Application web (Vue + Bootstrap) pour **importer/scanner** un QR code de certificat COVID et produire un rendu personnalisé.

⚠️ Elle ne change pas le contenu cryptographique du QR code. Elle ne fait que présenter les infos différemment.

## Prérequis
- Node.js (LTS recommandé)
- Yarn

## Installation
```bash
yarn install
```

## Développement
```bash
yarn serve
```

## Build production
```bash
yarn build
```

## Lint
```bash
yarn lint
```

## Notes
- Le scan caméra dépend du navigateur (permissions + compatibilité).
- Certaines librairies de scan QR nécessitent HTTPS en production.
