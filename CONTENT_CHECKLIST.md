# Contenu, sources et informations à compléter

## Sources utilisées

- Lecture intégrale et revue visuelle des **deux pages** de `cv_mouad_jaalouti (3).pdf`.
- Page 1 : identité, profil, trois stages, quatre formations, compétences, langues et savoir-être.
- Page 2 : sept projets, quatre certifications, Innovation Week CIP–UCA et GITEX Africa.
- Photo : `project-images/profile-pic.png`.
- Justificatifs : `certificates/certife1.jpg` (Ethical Hacker), `certife2.jpg` (Pre Security), `certif3.jpg` (Introduction to Cybersecurity).
- Nom GitHub et dépôt : URL fournie explicitement par Mouad pendant la réalisation.
- Après autorisation d’utiliser les profils comme sources complémentaires : [profil GitHub](https://github.com/mouad-gamer-2us2), dépôts [CarDealerShip](https://github.com/mouad-gamer-2us2/CarDealerShip) et [projetONEE](https://github.com/mouad-gamer-2us2/projetONEE). Les routes Laravel correspondent respectivement à la gestion de véhicules et aux réclamations/rendez-vous du CV. Ces liens sont ajoutés au portfolio ; les descriptions restent fondées sur le CV.
- LinkedIn a été consulté, mais affiche une page de connexion. Aucune nouvelle information n’en a été extrapolée.
- Portrait alternatif fourni : `project-images/profile-hacker-pic.png`. L’effet de révélation est inspiré du principe visage/casque de [Lando Norris](https://landonorris.com/), sans reprendre son code, ses images ou son identité.
- Inspiration visuelle seulement : [Ikram Ezziouani](https://ikram856.github.io/), [Hicham Outeha](https://hichamouteha.github.io/portfolio_HO/), [MyS_tiCaaLz](https://mysticaalz.github.io/). Leurs pages ont été consultées et examinées visuellement. Aucun code, texte de présentation ou élément d’identité n’a été repris.

## Vérifié et intégré

- [x] Nom, titre d’élève ingénieur (pas de diplôme d’ingénieur présenté comme obtenu).
- [x] Casablanca, email personnel, URL LinkedIn exacte du PDF.
- [x] GitHub `mouad-gamer-2us2` et dépôt `mouad-gamer-2us2.github.io` confirmés par l’utilisateur.
- [x] Liens GitHub de la gestion automobile et du stage ONEE ajoutés après lecture des dépôts.
- [x] Image alternative du portrait intégrée et contrôles souris/clavier disponibles.
- [x] Recherche d’opportunité formulée comme dans le CV, sans date de disponibilité inventée.
- [x] Formations 2020–2027 et mention « en cours ».
- [x] Stages BMCI, TOOL Consulting et ONEE, dates et missions du CV.
- [x] Les sept projets et leurs technologies ; ni métriques ni résultats inventés.
- [x] Quatre langues et niveaux textuels du CV ; aucune jauge arbitraire.
- [x] TCF présenté comme expiré en 2023.
- [x] Trois certificats consultables ; pas de statut « vérifié » sans vérification externe.
- [x] CV téléchargeable inchangé, photo et certificats optimisés en WebP.
- [x] Corrections de typographie, accents UTF-8 et élimination des glyphes d’icônes cassés de l’extraction PDF.
- [x] Le domaine de laboratoire et les identifiants personnels inutiles ne sont pas répétés dans la page web.

## Points restant à préciser

- [ ] **Date Cisco Introduction to Cybersecurity** : mars 2025 dans le CV, **9 mai 2025** sur le justificatif. Le portfolio affiche uniquement 2025, année commune aux deux documents. Confirmer la date, puis corriger `certifications` dans `src/data/profile.js` et le CV si nécessaire.
- [ ] Pour les projets restants : dépôt public, démo éventuelle, rapport publiable et captures réelles. Aucun de ces liens n’est fourni par le CV ; seuls CarDealerShip et projetONEE ont pu être rapprochés de dépôts existants. `projet_abs` est vide et n’a pas été associé à UniScan. Les autres dépôts ne sont pas attribués à un projet du CV sans preuve suffisante.
- [ ] Pour chaque projet : contribution personnelle, taille de l’équipe si pertinente et résultats vérifiables. Les fiches n’affichent que les faits connus ; les rappels restent dans cette checklist, sans inventer de performances.
- [ ] Medical Assistant : technologies exactes, périmètre du prototype et contribution personnelle. Ne pas ajouter de performance clinique sans preuve.
- [ ] Liens de vérification Cisco/TryHackMe, si souhaités. Les identifiants du CV ne sont pas convertis en URL supposées.
- [ ] Justificatif TCF si vous souhaitez le rendre consultable ; conserver l’expiration visible.
- [ ] Domaine personnalisé éventuel. Aucun n’a été fourni : utilisation de l’adresse GitHub Pages par défaut.
- [ ] Confirmer périodiquement que la recherche d’opportunité et la formation en cours restent d’actualité.

## Décisions éditoriales

Le projet de sécurisation réseau est mis en avant pour sa pertinence avec la spécialisation. Les schémas SVG/CSS sont clairement étiquetés comme **illustrations** et ne représentent pas des captures ou des preuves de déploiement. Les catégories sont des regroupements éditoriaux des compétences du CV. Aucun niveau de maîtrise n’a été ajouté.

Les descriptions abrégées renvoient aux fiches détaillées. Le site n’ajoute pas de compétences en finance, gestion ou audit : elles ne figurent pas dans le CV. La version livrée est en français et en thème sombre ; les options FR/EN et thème clair restent facultatives.

## Avant publication

- [ ] Relire les textes publics et cette checklist.
- [ ] Confirmer ou corriger la divergence de date Cisco.
- [ ] Vérifier l’historique du dépôt distant avant le premier push.
- [ ] Activer GitHub Actions comme source dans Settings → Pages.
- [ ] Pousser sur `main` et vérifier le workflow.
- [ ] Tester l’URL publique et le téléchargement du CV après déploiement.

Les points de contenu ci-dessus n’empêchent pas la compilation ou le déploiement ; ils limitent volontairement les informations publiées à celles qui sont connues.

Les mentions « Informations à compléter », les résultats de remplacement et les notes de date incertaine ont été retirés de l’interface à la demande de l’utilisateur. Cette checklist n’est pas incluse dans `dist/` et n’est pas servie par GitHub Pages. Elle reste visible dans les sources si le dépôt GitHub est public.
