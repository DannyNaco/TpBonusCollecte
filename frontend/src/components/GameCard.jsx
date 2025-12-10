import { Link } from 'react-router-dom';

const GameCard = ({ game, onDelete }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden border-2 border-retro-secondary shadow-retro hover:shadow-retro-hover hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 transform">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-display text-retro-secondary truncate tracking-wide">{game.titre}</h3>
                    <span className={`px-2 py-1 text-xs font-bold font-body uppercase tracking-wider rounded border border-retro-secondary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${game.termine ? 'bg-retro-surf text-white' : 'bg-retro-accent text-retro-secondary'}`}>
                        {game.termine ? 'Terminé' : 'En cours'}
                    </span>
                </div>

                <p className="text-sm font-body text-retro-secondary/80 mb-6 border-b border-retro-secondary/10 pb-4">
                    <span className="font-bold">Genre:</span> {game.genre.join(', ')} <br />
                    <span className="font-bold">Plateforme:</span> {game.plateforme.join(', ')}
                </p>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2 text-sm font-bold text-retro-secondary">
                        <span>Score:</span>
                        <span className={`px-2 py-1 border border-retro-secondary text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${game.metacritic_score >= 80 ? 'bg-retro-surf' : game.metacritic_score >= 50 ? 'bg-retro-accent' : 'bg-retro-primary'}`}>
                            {game.metacritic_score}
                        </span>
                    </div>
                    <div className="text-sm font-bold text-retro-secondary">
                        ⏱ {game.temps_jeu_heures}h
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <Link
                        to={`/edit/${game._id}`}
                        className="px-4 py-2 bg-retro-bg border-2 border-retro-secondary text-retro-secondary rounded-lg hover:bg-retro-secondary hover:text-white transition-colors duration-200 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(38,70,83,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        Modifier
                    </Link>
                    <button
                        onClick={() => onDelete(game._id)}
                        className="px-4 py-2 bg-retro-primary border-2 border-retro-secondary text-white rounded-lg hover:bg-retro-primary/90 transition-all duration-200 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(38,70,83,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
