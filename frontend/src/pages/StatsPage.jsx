import { useState, useEffect } from 'react';
import api from '../services/api';

const StatsPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await api.getStats();
                setStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-center mt-20 text-retro-secondary font-display text-2xl animate-pulse">Calcul des stats...</div>;
    if (error) return <div className="text-center mt-20 text-retro-primary font-bold">Erreur: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-display text-retro-secondary mb-12 text-center drop-shadow-sm uppercase tracking-wider">
                Statistiques de la Collection
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white p-8 rounded-xl shadow-retro border-2 border-retro-secondary relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute top-0 left-0 w-full h-3 bg-retro-primary"></div>
                    <div className="text-5xl font-display text-retro-primary mb-2 text-center group-hover:scale-110 transition-transform">{stats.nombre_total_jeux}</div>
                    <div className="text-retro-secondary font-body font-bold text-center uppercase tracking-widest text-sm">Total Jeux</div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-8 rounded-xl shadow-retro border-2 border-retro-secondary relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute top-0 left-0 w-full h-3 bg-retro-surf"></div>
                    <div className="text-5xl font-display text-retro-surf mb-2 text-center group-hover:scale-110 transition-transform">{stats.temps_jeu_total_heures}h</div>
                    <div className="text-retro-secondary font-body font-bold text-center uppercase tracking-widest text-sm">Temps de Jeu Total</div>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-8 rounded-xl shadow-retro border-2 border-retro-secondary relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute top-0 left-0 w-full h-3 bg-retro-accent"></div>
                    <div className="text-5xl font-display text-retro-accent mb-2 text-center group-hover:scale-110 transition-transform">
                        {stats.score_moyen_metacritic ? stats.score_moyen_metacritic.toFixed(1) : 0}
                    </div>
                    <div className="text-retro-secondary font-body font-bold text-center uppercase tracking-widest text-sm">Score Moyen Metacritic</div>
                </div>
            </div>

            <div className="mt-16 text-center">
                <div className="inline-block px-8 py-4 bg-retro-secondary text-retro-bg rounded-lg font-display tracking-widest border-2 border-retro-secondary shadow-[4px_4px_0px_0px_#E9C46A]">
                    KEEP PLAYING & STAY RETRO 🕹️
                </div>
            </div>
        </div>
    );
};

export default StatsPage;
