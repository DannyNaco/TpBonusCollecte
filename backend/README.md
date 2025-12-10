# Backend API - Game Collection

API RESTful pour gérer une collection de jeux vidéo.

## 🛠 Configuration
Assurez-vous d'avoir un fichier `.env` à la racine (créé automatiquement ou manuellement) :
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=game_collection_db
```

## 🔌 Endpoints

### Jeux
- `GET /api/games` : Lister tous les jeux (params optionnels: `genre`, `plateforme`).
- `post /api/games` : Ajouter un jeu.
- `GET /api/games/:id` : Détails d'un jeu.
- `PUT /api/games/:id` : Mettre à jour un jeu.
- `DELETE /api/games/:id` : Supprimer un jeu.

### Stats
- `GET /api/games/stats` : Obtenir les statistiques globales (temps total, score moyen).

## 📦 Scripts
- `npm start` : Lancer le serveur (node server.js)
