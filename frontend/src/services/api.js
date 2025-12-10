const API_BASE_URL = "http://localhost:3000/api";

const api = {
    async getGames(filters = {}) {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE_URL}/games?${params}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des jeux");
        return response.json();
    },

    async getGameById(id) {
        const response = await fetch(`${API_BASE_URL}/games/${id}`);
        if (!response.ok) throw new Error("Jeu non trouvé");
        return response.json();
    },

    async createGame(gameData) {
        const response = await fetch(`${API_BASE_URL}/games`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gameData),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.details ? error.details.join(', ') : "Erreur lors de la création");
        }
        return response.json();
    },

    async updateGame(id, gameData) {
        const response = await fetch(`${API_BASE_URL}/games/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gameData),
        });
        if (!response.ok) throw new Error("Erreur lors de la mise à jour");
        return response.json();
    },

    async deleteGame(id) {
        const response = await fetch(`${API_BASE_URL}/games/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erreur lors de la suppression");
        return response.json();
    },

    async getStats() {
        // Note: Route updated to /stats (before /:id in backend) based on fix
        // But in backend routes I defined router.get('/stats', ...); which is relative to /api/games
        // So it is /api/games/stats
        const response = await fetch(`${API_BASE_URL}/games/stats`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des stats");
        return response.json();
    }
};

export default api;
