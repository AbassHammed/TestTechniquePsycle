## 🛠 Installation & Set Up

1. Download the repo :up:

   > [click here](https://github.com/AbassHammed/TestTechniquePsycle)

2. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm)

   ```sh
   nvm install
   ```

3. Install dependencies from the directory path

   ```sh
   npm install
   ```

4. Start the development server

   ```sh
   npm run dev
   ```

   ## Fonctionnalités implémentés

- Redirection vers le dernier apprentissage créé. ✅
- Changer d'apprentissage en cliquant sur un apprentissage dans la barre latérale droite. ✅
- Liste de données en bas de l'écran. ✅
- Affichage et actualisation de la progression de l'apprentissage. ✅
- Affichage des logs d'un apprentissage en cours. :white_check_mark:
- Affichage des résultats et recommendatations d'un apprentissage terminé.:white_check_mark:(quelques difficultés rencontrées)
- Distinction des données de test et des données de validation. :white_check_mark:

## Bonus

- Remontée des statistiques des données depuis le back. :white_check_mark:
- Routing : pouvoir accéder à un apprentissage directement depuis l'URL. :white_check_mark:
- Raccourci clavier pour suivant/précédent. :white_check_mark:
- Tests unitaires/composants/....
- Version responsive pour mobile (design non fourni).
- Lazy loading des images des données.
  > Le component Image de Next.js fait du lazy loading par default.
- Interdire le lancement d'un apprentissage si un apprentissage est en cours. :white_check_mark:

# Important

> Il faudrait rajouter `created_at` dans le backend lors de la creation de l'apprenstissage.
