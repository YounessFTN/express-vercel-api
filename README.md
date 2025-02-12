# Express.js on Vercel

Simple Express.js + Vercel example that uses Vercel Postgres to add and display users in a table.

## How to Use

BE sure to create a Vercel Postgres database and add you environment variables to your `.env` file. You can find an example of the `.env` file in the `.env.example` file.

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/examples/tree/main/solutions/express&project-name=express&repository-name=express)

### Clone and Deploy

```bash
git clone https://github.com/YounessFTN/express-vercel-api.git
```

Install the Vercel CLI:

```bash
npm i -g vercel
```

Then run the app at the root of the repository:

```bash
vercel dev
```

# Guide de configuration API Express + Prisma + Neon + Vercel

Ce guide explique comment configurer une API Express utilisant Prisma comme ORM, Neon comme base de données PostgreSQL, et déployée sur Vercel.

## Prérequis

- Un compte [Vercel](https://vercel.com)
- Un compte [Neon](https://neon.tech)
- Node.js installé sur votre machine
- Git installé sur votre machine

## 1. Configuration de la base de données Neon

1. Connectez-vous à votre compte Neon
2. Créez un nouveau projet
3. Une fois le projet créé, copiez la chaîne de connexion ("Connection string")
4. Gardez cette chaîne de connexion, nous en aurons besoin plus tard

## 2. Initialisation du projet

```bash
# Créer un nouveau dossier
mkdir mon-api
cd mon-api

# Initialiser un projet npm
npm init -y

# Installer les dépendances nécessaires
npm install express @prisma/client @vercel/postgres dotenv
npm install --save-dev prisma

# Initialiser un dépôt git
git init
```

## 3. Configuration de Prisma

1. Initialisez Prisma :

```bash
npx prisma init
```

2. Configurez le fichier `.env` à la racine du projet :

```env
DATABASE_URL="votre_chaine_de_connexion_neon"
```

3. Configurez votre schéma Prisma dans `prisma/schema.prisma` :

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Ajoutez vos modèles ici
model Example {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
}
```

## 4. Structure du projet

1. Créez un dossier `api` à la racine et ajoutez un fichier `index.ts` :

```typescript
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/api", async (req, res) => {
  res.json({ message: "API fonctionnelle !" });
});

// Exemple de route avec Prisma
app.get("/api/examples", async (req, res) => {
  const examples = await prisma.example.findMany();
  res.json(examples);
});

export default app;
```

## 5. Configuration pour Vercel

1. Créez un fichier `vercel.json` à la racine :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [{ "src": "/(.*)", "dest": "/api/index.ts" }]
}
```

2. Modifiez le `package.json` pour ajouter les scripts nécessaires :

```json
{
  "name": "mon-api",
  "version": "1.0.0",
  "main": "index.ts",
  "scripts": {
    "dev": "ts-node api/index.ts",
    "build": "prisma generate",
    "vercel-build": "prisma generate"
  },
  "dependencies": {
    "@prisma/client": "^6.3.1",
    "@vercel/postgres": "^0.10.0",
    "dotenv": "^16.4.1",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "prisma": "^6.3.1"
  }
}
```

## 6. Déploiement sur Vercel

1. Créez un dépôt sur GitHub et poussez votre code :

```bash
git add .
git commit -m "Initial commit"
git remote add origin votre_url_github
git push -u origin main
```

2. Sur Vercel :
   - Connectez-vous à votre compte
   - Cliquez sur "New Project"
   - Importez votre dépôt GitHub
   - Dans les variables d'environnement, ajoutez :
     - Nom : `DATABASE_URL`
     - Valeur : votre chaîne de connexion Neon
   - Cliquez sur "Deploy"

## 7. Synchronisation de la base de données

```bash
# Générer et appliquer les migrations Prisma
npx prisma migrate dev --name init

# Si vous avez des problèmes avec les migrations sur Vercel
npx prisma db push
```

## Notes importantes

- Assurez-vous que votre chaîne de connexion Neon est correctement configurée dans les variables d'environnement de Vercel
- Pour le développement local, utilisez `npm run dev`
- Pour tester les routes Prisma localement, n'oubliez pas de générer le client Prisma avec `npx prisma generate`
- En cas de modifications du schéma Prisma, exécutez `npx prisma migrate dev` localement

## Dépannage courant

1. Si vous avez l'erreur "Prisma Client needs to be generated" sur Vercel :

   - Vérifiez que le script `vercel-build` est présent dans package.json
   - Redéployez le projet

2. Si les routes ne fonctionnent pas :

   - Vérifiez que le format des routes dans vercel.json est correct
   - Assurez-vous que toutes vos routes commencent par `/api`

3. Problèmes de connexion à la base de données :
   - Vérifiez que la chaîne de connexion est correcte
   - Assurez-vous que l'IP de Vercel est autorisée dans les paramètres de Neon

## Tester le déploiement

Votre API devrait maintenant être accessible à :
`https://votre-projet.vercel.app/api`
