import { useState, useEffect } from 'react';

const GameForm = ({ initialData, onSubmit, buttonText = "SAUVEGARDER" }) => {
    const [formData, setFormData] = useState({
        titre: '',
        genre: '',
        plateforme: '',
        editeur: '',
        developpeur: '',
        annee_sortie: new Date().getFullYear(),
        metacritic_score: 0,
        temps_jeu_heures: 0,
        termine: false
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                genre: initialData.genre ? initialData.genre.join(', ') : '',
                plateforme: initialData.plateforme ? initialData.plateforme.join(', ') : ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        // Format fields
        const formattedData = {
            ...formData,
            genre: formData.genre.split(',').map(g => g.trim()).filter(g => g),
            plateforme: formData.plateforme.split(',').map(p => p.trim()).filter(p => p),
            annee_sortie: Number(formData.annee_sortie),
            metacritic_score: Number(formData.metacritic_score),
            temps_jeu_heures: Number(formData.temps_jeu_heures)
        };

        if (!formattedData.titre) {
            setError("Le titre est requis.");
            return;
        }

        onSubmit(formattedData);
    };

    const inputClass = "w-full px-4 py-3 bg-retro-bg border-2 border-retro-secondary rounded-lg shadow-[3px_3px_0px_0px_rgba(38,70,83,0.2)] focus:shadow-[3px_3px_0px_0px_rgba(38,70,83,1)] focus:ring-0 focus:border-retro-primary outline-none transition-all duration-200 font-body text-retro-secondary placeholder-retro-secondary/40";
    const labelClass = "block text-sm font-bold text-retro-secondary mb-2 uppercase tracking-wide";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border-2 border-retro-secondary shadow-retro relative overflow-hidden">
            {/* Decorative top bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-retro-primary via-retro-accent to-retro-surf"></div>

            {error && (
                <div className="bg-retro-primary/10 border-2 border-retro-primary p-4 mb-4 rounded-lg">
                    <p className="text-retro-primary font-bold">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className={labelClass}>Titre du jeu</label>
                    <input
                        type="text"
                        name="titre"
                        value={formData.titre}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Ex: The Legend of Zelda: Breath of the Wild"
                        required
                    />
                </div>

                <div>
                    <label className={labelClass}>Genres (séparés par des virgules)</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Ex: Action, Aventure, RPG"
                        required
                    />
                </div>

                <div>
                    <label className={labelClass}>Plateformes (séparées par des virgules)</label>
                    <input
                        type="text"
                        name="plateforme"
                        value={formData.plateforme}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Ex: Switch, PC, PS5"
                        required
                    />
                </div>

                <div>
                    <label className={labelClass}>Éditeur</label>
                    <input
                        type="text"
                        name="editeur"
                        value={formData.editeur}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Développeur</label>
                    <input
                        type="text"
                        name="developpeur"
                        value={formData.developpeur}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Année de sortie</label>
                    <input
                        type="number"
                        name="annee_sortie"
                        value={formData.annee_sortie}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Score Metacritic (0-100)</label>
                    <input
                        type="number"
                        name="metacritic_score"
                        value={formData.metacritic_score}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>Temps de jeu (heures)</label>
                    <input
                        type="number"
                        name="temps_jeu_heures"
                        value={formData.temps_jeu_heures}
                        onChange={handleChange}
                        min="0"
                        className={inputClass}
                    />
                </div>

                <div className="flex items-center p-4 border-2 border-retro-secondary/20 rounded-lg bg-retro-bg/50">
                    <input
                        type="checkbox"
                        id="termine"
                        name="termine"
                        checked={formData.termine}
                        onChange={handleChange}
                        className="h-6 w-6 text-retro-primary focus:ring-retro-primary border-2 border-retro-secondary rounded cursor-pointer"
                    />
                    <label htmlFor="termine" className="ml-3 block text-lg font-bold text-retro-secondary cursor-pointer font-display">
                        Jeu terminé ?
                    </label>
                </div>
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    className="w-full bg-retro-primary text-white font-display tracking-widest text-xl py-4 px-6 rounded-xl border-2 border-retro-secondary shadow-retro hover:shadow-retro-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                >
                    {buttonText}
                </button>
            </div>
        </form>
    );
};

export default GameForm;
