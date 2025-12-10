# Game Collection Project (API & Frontend)

Bienvenue sur le projet de gestion de collection de jeux vidéo !  
Ce projet est un monorepo contenant :

1.  **Backend** : Une API RESTful Node.js/Express avec MongoDB.
2.  **Frontend** : Une application React/Vite au style Retro 70s / Outer Banks.

## 📂 Structure du Projet

```
/
├── backend/            # Code de l'API (Node.js)
├── frontend/           # Code de l'interface (React)
└── README.md           # Ce fichier
```

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** (v16 ou supérieur)
- **MongoDB** (installé localement ou URI cloud)
- Deux terminaux ouverts.

### 1️⃣ Lancer le Backend
```bash
cd backend
npm install        # (Première fois seulement)
node server.js
```
Le serveur démarre sur `http://localhost:3000`.

### 2️⃣ Lancer le Frontend
```bash
cd frontend
npm install        # (Première fois seulement)
npm run dev
```
Ouvrez le lien affiché (ex: `http://localhost:5173`) dans votre navigateur.

## ✨ Fonctionnalités
- **CRUD Complet** : Ajouter, lister, modifier et supprimer des jeux.
- **Filtres** : Recherche par genre et plateforme.
- **Statistiques** : Dashboard visuel des temps de jeu et scores.
- **Design Unique** : Interface style "Retro Vintage" avec mode sombre/chaud.

## 🛠 Technologies
- **Backend** : Node.js, Express, MongoDB.
- **Frontend** : React, Vite, TailwindCSS (v3.4), Google Fonts.
