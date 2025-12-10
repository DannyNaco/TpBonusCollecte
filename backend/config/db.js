const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "game_collection_db";

let db = null;

async function connectDB() {
    if (db) return db;
    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log("Connecté à MongoDB avec succès");
        db = client.db(dbName);
        return db;
    } catch (err) {
        console.error("Erreur de connexion MongoDB:", err);
        process.exit(1);
    }
}

function getDB() {
    if (!db) {
        throw new Error("La base de données n'est pas initialisée. Appelez connectDB d'abord.");
    }
    return db;
}

module.exports = { connectDB, getDB };
