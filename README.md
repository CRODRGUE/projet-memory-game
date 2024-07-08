# Memory Game

Memory Game est une application web progressive (PWA) développée avec Angular 17, conçue pour aider les utilisateurs à réviser et mémoriser des informations grâce à la technique de la répétition espacée. Pour en savoir plus sur cette méthode, consultez [ce lien](https://ncase.me/remember/fr.html).

## Description

Memory Game permet de réviser divers thèmes en triant des cartes de révision par catégorie à travers 7 niveaux différents. Chaque carte contient un recto et un verso qui peuvent inclure du texte, des images, des sons ou des vidéos. L'utilisateur peut créer ses propres catégories, ajouter des thèmes et des cartes, et gérer ses sessions de révision quotidienne.

## Fonctionnalités

- **Création de catégories :** Les utilisateurs peuvent créer des catégories personnalisées pour organiser leurs cartes de révision.
- **Création de cartes :** Les utilisateurs peuvent créer des cartes de révision avec du texte et/ou des éléments multimédias comme des images, liées à une catégorie.
- **Répétition espacée :** L'application utilise la méthode de répétition espacée pour optimiser la mémorisation. Les cartes sont réparties sur 7 niveaux différents, en commençant par le niveau 1.
- **Révision quotidienne :** Les utilisateurs peuvent choisir de réviser la catégorie et le niveau de leur choix. Les cartes vont automatiquement changer de niveau : en cas de validation, elles montent d'un niveau, sinon elles descendent d'un niveau.
- **Notifications :** Possibilité de configurer des rappels quotidiens via des notifications du navigateur ou bien le système de notification de l'OS (utilisation d'un serveur de notification push avec NodeJS et Web Push).
- **Mode hors-ligne :** L'application peut fonctionner sans connexion internet grâce à l'utilisation d'IndexedDB, qui est une base de données locale.

## Prérequis

Pour installer le projet, respectez les prérequis suivants :

- Avoir NodeJS installé avec une version entre ^18.13.0 et ^20.9.0
- Avoir Angular CLI version 17.3.XX ou une version supérieure

## Installation

Pour installer et exécuter l'application localement, suivez ces étapes :

1. Clonez le dépôt :
```bash
git clone https://github.com/CRODRGUE/projet-memory-game.git
cd projet-memory-game
```

2. Installez les dépendances :
```bash
npm install
```

## Lancement du projet 

Le projet peut être lancé de manière différente, en mode développement ou en mode production. 

### Mode développement

1. Exécutez l'application en mode *"développement"*, placez-vous à la racine du projet puis exécutez la commande suivante :
```bash
ng serve
```

2. Ouvrez votre navigateur et accédez à `http://localhost:4200`.

### Mode production 

1. Exécutez la commande ci-dessous pour construire l'application. Pour cela, placez-vous à la racine du projet :
```bash
ng build --configuration production
```

2. Déployez l'application sur un serveur Apache. Pour ce faire, vérifiez que le dossier "dist" a été créé lors de l'étape précédente, puis cherchez le dossier qui contient le fichier "index.html". Pour terminer, placez-vous à la racine du projet, puis exécutez la commande suivante :

```bash 
# /!\ Le chemin peut varier, pensez à bien vérifier /!\
http-server ./dist/projet-memory-game/browser/ -p 8081
```

3. Ouvrez votre navigateur et accédez à une des adresses IP indiquées dans le terminal ! (De préférence 127.0.0.1:XXXX)

## Utilisation

1. **Créer une catégorie :** Cliquez sur "Ajouter une catégorie" et donnez un nom à votre nouvelle catégorie.
2. **Ajouter un thème :** Sélectionnez une catégorie, puis cliquez sur "Ajouter un thème". Entrez le nom du thème.
3. **Créer des cartes :** Dans un thème, cliquez sur "Ajouter une carte". Remplissez le recto et le verso avec du texte et/ou des éléments multimédias.
4. **Commencer la révision :** Sélectionnez un ou plusieurs thèmes, choisissez le nombre de niveaux et de nouvelles cartes à voir chaque jour, puis commencez votre session de révision.