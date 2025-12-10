const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const gameRoutes = require('./routes/gameRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/games', gameRoutes);

// Route de base
app.get('/', (req, res) => {
    res.send('API de Gestion de Collection de Jeux Vidéo est en ligne.');
});

// Gestion des erreurs globale
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Une erreur est survenue !');
});

// Démarrage du serveur
async function startServer() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });
}

startServer();
