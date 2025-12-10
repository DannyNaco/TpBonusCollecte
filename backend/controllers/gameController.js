const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const { validateGame } = require('../utils/validator');

const COLLECTION_NAME = "games";

async function getAllGames(req, res) {
    try {
        const db = getDB();
        const { genre, plateforme } = req.query;
        let filter = {};

        if (genre) {
            filter.genre = genre;
        }
        if (plateforme) {
            filter.plateforme = plateforme;
        }

        const games = await db.collection(COLLECTION_NAME).find(filter).toArray();
        res.status(200).json(games);
    } catch (err) {
        console.error("Erreur getAllGames:", err);
        res.status(500).json({ error: "Erreur serveur lors de la récupération des jeux." });
    }
}

async function getGameById(req, res) {
    try {
        const db = getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID invalide." });
        }

        const game = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });

        if (!game) {
            return res.status(404).json({ error: "Jeu non trouvé." });
        }

        res.status(200).json(game);
    } catch (err) {
        console.error("Erreur getGameById:", err);
        res.status(500).json({ error: "Erreur serveur lors de la récupération du jeu." });
    }
}

async function createGame(req, res) {
    try {
        const db = getDB();
        const gameData = req.body;

        const validation = validateGame(gameData);
        if (!validation.isValid) {
            return res.status(400).json({ error: "Données invalides", details: validation.errors });
        }

        const newGame = {
            ...gameData,
            date_ajout: new Date(),
            date_modification: new Date()
        };

        const result = await db.collection(COLLECTION_NAME).insertOne(newGame);
        res.status(201).json({ message: "Jeu ajouté avec succès", id: result.insertedId, game: newGame });
    } catch (err) {
        console.error("Erreur createGame:", err);
        res.status(500).json({ error: "Erreur serveur lors de la création du jeu." });
    }
}

async function updateGame(req, res) {
    try {
        const db = getDB();
        const { id } = req.params;
        const updates = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID invalide." });
        }

        // On ne valide que les champs présents, mais pour simplifier on pourrait revalider tout l'objet fusionné.
        // Ici on met juste à jour la date de modification.
        updates.date_modification = new Date();
        delete updates._id; // On empêche la modification de l'ID

        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Jeu non trouvé." });
        }

        res.status(200).json({ message: "Jeu mis à jour avec succès." });
    } catch (err) {
        console.error("Erreur updateGame:", err);
        res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
    }
}

async function deleteGame(req, res) {
    try {
        const db = getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID invalide." });
        }

        const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Jeu non trouvé." });
        }

        res.status(200).json({ message: "Jeu supprimé avec succès." });
    } catch (err) {
        console.error("Erreur deleteGame:", err);
        res.status(500).json({ error: "Erreur serveur lors de la suppression." });
    }
}

// Fonctionnalités Bonus
async function getStats(req, res) {
    try {
        const db = getDB();
        const totalGames = await db.collection(COLLECTION_NAME).countDocuments();

        const stats = await db.collection(COLLECTION_NAME).aggregate([
            {
                $group: {
                    _id: null,
                    tempsTotal: { $sum: "$temps_jeu_heures" },
                    scoreMoyen: { $avg: "$metacritic_score" }
                }
            }
        ]).toArray();

        res.status(200).json({
            nombre_total_jeux: totalGames,
            temps_jeu_total_heures: stats[0]?.tempsTotal || 0,
            score_moyen_metacritic: stats[0]?.scoreMoyen || 0
        });
    } catch (err) {
        console.error("Erreur getStats:", err);
        res.status(500).json({ error: "Erreur serveur lors du calcul des statistiques." });
    }
}


module.exports = {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
    getStats
};
