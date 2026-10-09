# Portfolio de Mouad Jaalouti

Portfolio personnel en français, anglais et allemand, développé avec React, Vite, JavaScript, CSS et Lucide React. Site entièrement statique : aucun serveur applicatif, aucune base de données, aucun service payant, aucun suivi publicitaire. Les polices sont hébergées localement dans le build.

**Adresse cible :** https://mouad-gamer-2us2.github.io/  
**Dépôt :** https://github.com/mouad-gamer-2us2/mouad-gamer-2us2.github.io  
**Publication :** workflow GitHub Actions prêt pour la branche `main` ; activer GitHub Actions dans Settings → Pages.

## Installation et lancement

Installer [Node.js LTS](https://nodejs.org/en/download) avec npm, puis rouvrir le terminal. Node 22.12+ ou 24+ est compatible. Sur cette machine, npm n’était pas disponible dans le PATH au début du travail. Sous PowerShell, utiliser `npm.cmd` à la place de `npm` si le script `npm.ps1` est bloqué.

Depuis le dossier du projet :

```sh
npm ci
npm run dev
```

Ouvrir l’adresse indiquée par Vite, normalement http://127.0.0.1:5173/. Pour construire et prévisualiser la version publiable :

```sh
npm test
npm run build
npm run preview
```

Le dossier `dist/` contient tous les fichiers à publier. Il est généré et ne doit pas être commité. Ne pas ouvrir `index.html` avec `file://` ; utiliser Vite.

## Modifier les contenus

| Fichier | Contenu |
| --- | --- |
| `src/data/profile.js` | Identité, coordonnées, biographie, langues, formations, stages, compétences, événements et certifications |
| `src/data/projects.js` | Dix projets (dont trois en stage) : objectif, actions, technologies, résultat, image et liens |
| `src/data/site.js` | Nom du dépôt, utilisateur GitHub, domaine éventuel, titre et description SEO |
| `src/styles/index.css` | Palette, typographie, composants et règles responsive |
| `src/components/ProjectVisual.jsx` | Schémas illustratifs originaux des projets |
| `src/components/PortraitReveal.jsx` | Transition entre le portrait et sa variante cybersécurité, avec survol, clic et clavier |
| `public/cv/mouad-jaalouti-cv.pdf` | CV proposé au téléchargement |
| `public/images/` | Portrait optimisé et image de partage Open Graph |
| `public/certificates/` | Copies WebP des trois justificatifs fournis |

Pour remplacer le CV, remplacer le PDF dans `public/cv/` et conserver son nom, ou modifier `profile.cv`. Garder aussi le PDF source synchronisé si l’on utilise le contrôle d’intégrité `test:smoke`.

Pour compléter un projet, renseigner les champs `result`, `image`, `github`, `demo`, `report`. Les liens absents (`null`) sont masqués. Les chemins des images et rapports locaux sont relatifs à `public/`, sans `/` initial, par exemple `images/uniscan.webp` ou `reports/uniscan.pdf`. Les URL externes doivent être complètes et commencer par `https://`. Ajouter une image WebP optimisée, idéalement 1200 × 675, et un résultat étayé par une source. Les notes TODO des fiches disparaissent lorsque les informations et liens attendus sont renseignés ; adapter la condition dans `Projects.jsx` si un projet n’a volontairement aucune démo ou aucun rapport.

Les textes d’interface sont dans `src/sections/` et `src/components/`. Le français sert de contenu de référence. Les traductions locales sont centralisées dans `src/i18n/translations.js` : chaque ligne suit le format `texte français|traduction anglaise|traduction allemande`. Lorsqu’un texte français change, mettre à jour sa ligne de traduction. Les tests contrôlent la couverture des biographies, descriptions, objectifs et actions des projets.

Le sélecteur FR/EN/DE utilise des drapeaux SVG locaux et mémorise le choix dans `localStorage` (`portfolio-language`). Sans préférence enregistrée, le site s’ouvre en français. Le changement est immédiat, conserve les ancres et les filtres, et met à jour la langue HTML et les métadonnées. Aucun service de traduction externe n’est appelé. Les noms officiels des certificats, les technologies et les établissements sont conservés ; le CV et les justificatifs restent dans leur langue d’origine.

Les trois certificats disponibles s’affichent dans une fenêtre modale sur la page, avec transition d’entrée/sortie, fermeture par Échap ou clic extérieur, focus clavier contenu dans la fenêtre et retour au bouton d’origine. Le téléchargement du document reste accessible. Les animations respectent `prefers-reduced-motion`.

### Portrait interactif

L’image `project-images/profile-hacker-pic.png`, fournie pendant le développement, a été optimisée en `public/images/mouad-jaalouti-cyber.webp`. Le portrait normal et l’alternative sont configurés par `profile.photo` et `profile.photoAlternative`. Pour un raccord naturel, utiliser deux images de même cadrage et de même ratio 3:4.

L’accueil occupe le premier écran. Le pointeur révèle localement l’image cybersécurité dans une forme organique, avec inertie et réfraction légère des bords. Cliquer fige la révélation ; recliquer la libère. Au clavier ou au toucher, l’image entière bascule ; Échap réinitialise. `prefers-reduced-motion` remplace le mouvement par une bascule immédiate. Le moteur WebGL est écrit dans `src/components/portraitRenderer.js`, sans bibliothèque supplémentaire. Le motif de fond évolue continuellement, indépendamment du pointeur. Après 1,5 secondes sans mouvement, la révélation suit une trajectoire autonome ; déplacer la souris reprend la main. Le bouton de pause arrête les animations automatiques. Elles sont aussi arrêtées hors écran, dans un onglet masqué et avec `prefers-reduced-motion`. La densité est limitée à 2× et une bascule d’images sert de repli si WebGL est indisponible. Les contrôles sont dans `PortraitReveal.jsx` et le style dans `src/styles/hero.css`. Cette réalisation utilise uniquement les deux photos fournies : elle adapte le principe de la référence, sans reprendre son code ni prétendre recréer son modèle 3D exact.

Les rappels éditoriaux sont conservés dans `CONTENT_CHECKLIST.md`, hors du site compilé. Une donnée absente n’affiche ni avertissement, ni section vide, ni lien factice.

## Structure

```text
src/
  components/        Navigation, liens, tags, schémas des projets
  sections/          Les huit sections du portfolio
  data/              Données personnelles, projets, configuration
  i18n/              Traductions FR/EN/DE et sélecteur de langue
  styles/            CSS responsive
  App.jsx
  main.jsx
public/
  cv/
  images/
  certificates/
  favicon/
scripts/             Configuration des chemins et tests HTTP
tests/               Tests unitaires et audit axe-core local
.github/workflows/deploy.yml
```

Les fichiers originaux restent dans `certificates/`, `project-images/` et le PDF à la racine. Seules leurs copies nécessaires dans `public/` sont incluses dans le site publié.

## Déploiement GitHub Pages

1. Dans le dépôt GitHub, ouvrir **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Pousser le code sur la branche `main` avec les commandes ci-dessous.
3. Consulter l’onglet **Actions**, puis le workflow **Deploy portfolio to GitHub Pages**.
4. Après réussite du job `deploy`, ouvrir https://mouad-gamer-2us2.github.io/.

Le workflow fonctionne également via **Actions → Deploy portfolio to GitHub Pages → Run workflow**. Il installe Node 22, exécute `npm ci`, les tests et le build, téléverse `dist/` et déploie avec les actions officielles GitHub Pages. Aucune clé API à ajouter.

### Chemin Vite et changement de dépôt

`scripts/deployment.js` déduit le chemin depuis `GITHUB_REPOSITORY` dans Actions, ou `src/data/site.js` en local :

- `USERNAME.github.io` → `/`.
- Un autre dépôt, par exemple `portfolio` → `/portfolio/`.
- Un domaine personnalisé → `/`, sauf chemin explicitement configuré.

Le CV, les certificats, les images et le favicon utilisent le même chemin. Le canonical, les métadonnées Open Graph, `robots.txt`, `sitemap.xml` et la page 404 sont générés au build. Les sections utilisent des ancres et ne nécessitent aucun routeur ou réécriture serveur.

Si vous utilisez un domaine, renseigner `customDomain` dans `src/data/site.js` (nom seul), ou la variable de dépôt **SITE_URL** dans **Settings → Secrets and variables → Actions → Variables**, par exemple `https://portfolio.example.com/`. Configurer également le domaine dans Pages et ses DNS. Le build produit automatiquement le fichier `CNAME`. Aucune configuration DNS n’a été effectuée.

La variable facultative **VITE_BASE_PATH** peut forcer le chemin, avec `/` au début et à la fin. Ne pas définir `/portfolio/` pour le dépôt actuel. Après un changement d’adresse, reconstruire pour régénérer les métadonnées.

Références techniques : [déploiement Vite](https://vite.dev/guide/static-deploy) et [configuration de la source GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Tests et entretien

```sh
npm test
npm run build
npm run preview
```

Dans un second terminal, pendant que la prévisualisation tourne :

```sh
npm run test:smoke
```

Ce test vérifie les réponses HTTP, le contenu exact de tous les fichiers générés, les métadonnées et l’intégrité SHA-256 du CV téléchargé par rapport au PDF source. Pour un port différent : `npm run test:smoke -- http://127.0.0.1:4174`.

Pour l’audit d’accessibilité, lancer `npm run dev`, ouvrir http://127.0.0.1:5173/tests/browser-audit.html puis cliquer sur **Analyser avec axe-core**. Cet outil de développement ne figure pas dans `dist/`. Les contrôles automatisés ne remplacent pas les essais clavier et la lecture visuelle. Le compte rendu est dans `VALIDATION.md`.

`npm run format` applique Prettier aux sources. Les styles sont regroupés par composants, puis par points de rupture. Respect de `prefers-reduced-motion` : pas d’animation de frappe, de curseur clignotant ou de défilement animé lorsque la préférence est active.

## Contact et confidentialité

Les liens email ouvrent la messagerie de l’utilisateur. Aucun formulaire ne prétend envoyer un message. Seule la préférence de langue est enregistrée localement dans le navigateur. Le téléphone, l’email universitaire, le domaine de laboratoire BMCI et les identifiants de certification ne sont pas repris dans le texte de la page. Le CV original téléchargeable et les images des justificatifs conservent leur contenu, conformément aux fichiers fournis.

## Premier commit et push

Le dossier initial ne contenait pas de dépôt Git. Vérifier d’abord si le dépôt distant contient déjà des fichiers :

```sh
git ls-remote https://github.com/mouad-gamer-2us2/mouad-gamer-2us2.github.io.git
```

Si le dépôt distant est vide, depuis le dossier de ce portfolio :

```sh
git init -b main
git add .
git commit -m "Build personal cybersecurity portfolio"
git remote add origin https://github.com/mouad-gamer-2us2/mouad-gamer-2us2.github.io.git
git push -u origin main
```

Si le dépôt distant contient déjà une branche, le cloner dans un autre dossier, y recopier les sources du portfolio (sans `node_modules`, `dist`, `tmp` ni `.git`), examiner les différences, puis :

```sh
git add .
git commit -m "Build personal cybersecurity portfolio"
git push origin main
```

Ne pas utiliser de push forcé pour contourner un historique existant. `npm ci` et `npm run build` doivent réussir depuis le clone avant le push.

Voir `CONTENT_CHECKLIST.md` pour les éléments restant à préciser et la traçabilité du CV.

## Défilement et signature

Les sections `#moments` et `#facettes` sont configurées dans `src/data/journey.js`. Pour chaque événement, renseigner `image` (chemin relatif à `public/`) et `alt`. Sans photo, un visuel graphique est affiché. Remplacer `facets.cyberImage` et `facets.normalImage` par les futurs portraits de profil. Le texte expliquant le choix personnel de la cybersécurité reste à fournir : aucun motif autobiographique n’a été inventé. La galerie utilise le scroll natif avec une scène sticky réversible ; sur mobile et avec réduction des mouvements, elle devient verticale.

La citation se configure dans `src/data/quote.js` avec son attribution et sa source. Ses deux lignes défilent en boucle dans des directions opposées, indépendamment du scroll ; un bouton permet de les mettre en pause. La préférence de réduction des mouvements affiche le texte fixe. Les titres apparaissent progressivement, les cartes entrent avec un léger décalage et les étapes du parcours glissent latéralement. Le redimensionnement du canvas et son rendu sont synchronisés pour éviter une image noire pendant la réduction du portrait.

Le hero se réduit progressivement lors du défilement natif, puis la signature apparaît en grand. `profile.signature` indique l’image locale ; un filtre SVG rend le papier transparent et colore l’encre avec l’accent du site. Aucun fichier de la référence n’est réutilisé. `src/components/ScrollEffects.jsx` pilote la progression et l’entrée des sections/cartes. Les styles sont dans `src/styles/hero.css`. La préférence de réduction des mouvements désactive ces transitions et affiche la signature sans animation.
