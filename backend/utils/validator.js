const gameSchema = {
    titre: { type: 'string', required: true, minLength: 1 },
    genre: { type: 'array', required: true, minItems: 1 },
    plateforme: { type: 'array', required: true, minItems: 1 },
    annee_sortie: { type: 'number', min: 1970, max: new Date().getFullYear() },
    metacritic_score: { type: 'number', min: 0, max: 100 },
    temps_jeu_heures: { type: 'number', min: 0 }
};

function validateGame(gameData) {
    const errors = [];

    // Validation des champs requis
    if (gameSchema.titre.required && !gameData.titre) errors.push("Le titre est requis.");
    if (gameSchema.genre.required && (!gameData.genre || gameData.genre.length === 0)) errors.push("Au moins un genre est requis.");
    if (gameSchema.plateforme.required && (!gameData.plateforme || gameData.plateforme.length === 0)) errors.push("Au moins une plateforme est requise.");

    // Validation des types et contraintes
    if (gameData.titre && typeof gameData.titre !== 'string') errors.push("Le titre doit être une chaîne de caractères.");
    if (gameData.genre && !Array.isArray(gameData.genre)) errors.push("Le genre doit être un tableau.");
    if (gameData.plateforme && !Array.isArray(gameData.plateforme)) errors.push("La plateforme doit être un tableau.");

    if (gameData.annee_sortie !== undefined) {
        if (typeof gameData.annee_sortie !== 'number') errors.push("L'année de sortie doit être un nombre.");
        if (gameData.annee_sortie < gameSchema.annee_sortie.min || gameData.annee_sortie > gameSchema.annee_sortie.max) {
            errors.push(`L'année de sortie doit être comprise entre ${gameSchema.annee_sortie.min} et ${gameSchema.annee_sortie.max}.`);
        }
    }

    if (gameData.metacritic_score !== undefined) {
        if (typeof gameData.metacritic_score !== 'number') errors.push("Le score Metacritic doit être un nombre.");
        if (gameData.metacritic_score < gameSchema.metacritic_score.min || gameData.metacritic_score > gameSchema.metacritic_score.max) {
            errors.push(`Le score Metacritic doit être compris entre ${gameSchema.metacritic_score.min} et ${gameSchema.metacritic_score.max}.`);
        }
    }

    if (gameData.temps_jeu_heures !== undefined) {
        if (typeof gameData.temps_jeu_heures !== 'number') errors.push("Le temps de jeu doit être un nombre.");
        if (gameData.temps_jeu_heures < gameSchema.temps_jeu_heures.min) {
            errors.push(`Le temps de jeu doit être positif.`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = { validateGame };
