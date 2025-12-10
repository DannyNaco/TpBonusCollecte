import { useState, useEffect } from 'react';
import api from '../services/api';
import GameCard from '../components/GameCard';

const HomePage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ genre: '', plateforme: '' });

    const fetchGames = async () => {
        setLoading(true);
        try {
            const data = await api.getGames(filters); // Pass filters if any
            setGames(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []); // Initial load, or when filters change if we added them to dependency

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = (e) => {
        e.preventDefault();
        fetchGames();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce jeu ?")) {
            try {
                await api.deleteGame(id);
                fetchGames(); // Refresh list
            } catch (err) {
                alert("Erreur lors de la suppression : " + err.message);
            }
        }
    };

    if (loading && games.length === 0) return <div className="text-center mt-20 text-retro-secondary font-display text-2xl animate-pulse">Chargement en cours...</div>;
    if (error) return <div className="text-center mt-20 text-retro-primary font-bold text-xl">Erreur: {error}</div>;

    const inputClass = "block w-full border-2 border-retro-secondary rounded-lg shadow-[2px_2px_0px_0px_rgba(38,70,83,0.5)] p-2 focus:shadow-[2px_2px_0px_0px_rgba(38,70,83,1)] outline-none transition-all duration-200 bg-retro-bg font-body";

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-10 bg-white p-6 rounded-xl border-2 border-retro-secondary shadow-retro">
                <h2 className="text-xl font-display text-retro-secondary mb-4 tracking-wide">🔍 RECHERCHE & FILTRES</h2>
                <form onSubmit={applyFilters} className="flex gap-4 items-end flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-bold text-retro-secondary mb-1 uppercase">Genre</label>
                        <input
                            type="text"
                            name="genre"
                            value={filters.genre}
                            onChange={handleFilterChange}
                            className={inputClass}
                            placeholder="RPG, Action..."
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-bold text-retro-secondary mb-1 uppercase">Plateforme</label>
                        <input
                            type="text"
                            name="plateforme"
                            value={filters.plateforme}
                            onChange={handleFilterChange}
                            className={inputClass}
                            placeholder="Switch, PC..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-retro-secondary text-white px-6 py-2.5 rounded-lg font-bold shadow-retro hover:shadow-retro-hover hover:translate-x-[1px] hover:translate-y-[1px] transition-all border-2 border-retro-secondary"
                    >
                        FILTRER
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map(game => (
                    <GameCard key={game._id} game={game} onDelete={handleDelete} />
                ))}
                {games.length === 0 && (
                    <div className="col-span-3 text-center py-20 border-4 border-dashed border-retro-secondary/20 rounded-xl">
                        <p className="text-retro-secondary/50 font-display text-2xl">Aucun jeu trouvé... Va surfer ! 🏄‍♂️</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
