# Validation du portfolio

Vérifications effectuées le 6 septembre 2026 sur Windows, Node.js 24.19.0 et Chromium via le navigateur intégré. La CI cible Node.js 22. Le site n’a pas été poussé ni publié.

## Compilation et fichiers

- Installation des dépendances npm réussie ; lockfile fourni.
- Serveur de développement Vite lancé et application consultée.
- `npm test` : quatre tests passent (dépôt utilisateur, sous-répertoire, domaine personnalisé, rejet des chemins et protocoles invalides).
- `npm run build` : compilation de production réussie, sans erreur.
- `npm run preview` : version de production consultée et testée.
- `npm run test:smoke` : tous les fichiers générés sont servis correctement, sans réponse HTML de substitution. Le CV est identique au PDF original, vérifié en SHA-256.
- Test HTTP d’une seconde compilation avec `GITHUB_REPOSITORY=mouad-gamer-2us2/portfolio` : chemins `/portfolio/`, canonical et fichiers corrects. Le build final est configuré pour `/`.
- JavaScript de production : environ 232 Ko, soit 74 Ko compressés en gzip. CSS : environ 31 Ko, soit 8 Ko en gzip.
- Portrait normal : 33 Ko ; variante cybersécurité : 38 Ko. Images WebP et polices locales. Les polices inutiles pour les alphabets du site ont été retirées des imports.
- `npm audit --omit=dev` : aucune vulnérabilité signalée au moment du contrôle.

## Interactions

- Huit liens de navigation essayés : bonne ancre et menu mobile refermé après activation.
- Quatre filtres de projets essayés : 7 projets au total, 2 en cybersécurité, 4 en développement, 1 en systèmes/réseaux.
- Sept fiches détaillées ouvertes et fermées. Aucun débordement horizontal dans les dialogues testés.
- Focus à l’ouverture, boucle Tab, fermeture Échap et retour du focus au bouton d’origine vérifiés.
- Liens du CV activés ; réponses HTTP et contenu du fichier contrôlés.
- Trois justificatifs et favicon : fichiers servis correctement.
- Adresse email en `mailto:` ; aucun envoi simulé et aucun formulaire factice.
- Portrait : survol, clic pour figer/libérer, retour après sortie du pointeur, activation Entrée et réinitialisation Échap testés sur le build de production. Les deux images se chargent correctement.
- GitHub : profil et deux dépôts publics consultés. LinkedIn bloque la lecture anonyme avec une page de connexion ; son lien provient du CV et a été confirmé par l’utilisateur.

## Mise en page et accessibilité

- Captures examinées sur ordinateur (1440 px), tablette (768 px), mobile (390 px) et petit mobile (320 px).
- Contrôles DOM d’absence de débordement, incluant la largeur disponible après la barre de défilement. Les débordements décoratifs et le minimum de largeur du `body` repérés à 320 px ont été corrigés.
- Navigation mobile, cartes, contact, certificats et fiches projets inspectés.
- Titres hiérarchisés, HTML français, texte alternatif pour la photo, bouton de menu nommé, attributs `aria-expanded`/`aria-pressed`, lien d’évitement et focus visible.
- Axe-core exécuté via `tests/browser-audit.html` sur la page : aucune violation automatique après correction du compteur de projets. Les contrastes que l’outil ne peut pas résoudre sur fonds dégradés ont fait l’objet d’une revue visuelle ; ce résultat n’est pas une certification d’accessibilité complète.
- `prefers-reduced-motion` vérifié dans le code : frappe remplacée par un titre stable, animations/transitions désactivées et défilement natif non animé. Aucun test sur un lecteur d’écran ou un appareil tactile physique n’est revendiqué.
- Aucun avertissement ni erreur console relevé sur les essais de la version de production.

## Limites et prochaine étape

- Les résultats chiffrés, rapports et captures manquants sont recensés dans la checklist de contenu et omis de la page publique.
- La date de la certification Cisco Introduction to Cybersecurity reste à confirmer (mars dans le CV, mai sur le justificatif).
- Le dépôt de destination a été vérifié en lecture seule : il ne renvoyait aucune référence Git lors du contrôle.
- La réussite réelle du workflow GitHub Actions et le fonctionnement de l’URL publique ne pourront être confirmés qu’après le premier push et l’activation de Pages. Les commandes et réglages sont dans le README.

## Révision finale de l’accueil et des contenus publics

- Portrait plein écran, effet WebGL organique local avec inertie et réfraction des bords. Le ruban Canvas précédent a été supprimé. Rendu GPU confirmé actif dans le navigateur ; aucune erreur ou alerte console.
- Clic pour figer/libérer, Entrée et Échap contrôlés. Les commandes tactiles et le repli sans WebGL sont implémentés ; aucun essai sur appareil tactile physique n’est revendiqué.
- Présentation et boutons projets/CV sous la scène ; lien « Explorer mon portfolio » validé avec arrivée sous la navigation. Défilement natif immédiat.
- Sept fiches projet ouvertes et fermées : aucune mention de contenu manquant ou à compléter. Les résultats absents sont omis. L’année 2025 de Cisco Introduction to Cybersecurity est publiée, sans choisir entre les mois contradictoires des deux sources.
- Les notes de contenu sont conservées uniquement dans CONTENT_CHECKLIST.md, hors du site compilé.
- Build de production et contrôles HTTP des ressources et du CV exact réussis.
- Le rendu reste une interprétation à partir de deux photographies, pas une reproduction garantie du modèle et des déformations 3D de Lando Norris.

Contrôle final après le remplacement WebGL : axe-core rapporte 41 règles réussies et 0 violation automatique (93 éléments de contraste à revue visuelle). À 390 px, largeur du document 375 px avec barre de défilement et aucun débordement ; le rendu GPU reste actif. Les sept dialogues ne contiennent plus de rappels éditoriaux. Les fichiers JavaScript publiés ne contiennent aucune des mentions retirées.

Révision suivante : contours de fond animés par une horloge indépendante du pointeur ; révélation autonome après 1,5 s d’inactivité, bouton pause/reprise, suspension hors écran et respect de la réduction des mouvements.
