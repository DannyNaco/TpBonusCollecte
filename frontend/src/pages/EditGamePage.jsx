import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import GameForm from '../components/GameForm';

const EditGamePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const data = await api.getGameById(id);
                setGame(data);
            } catch (err) {
                alert("Erreur chargement jeu: " + err.message);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchGame();
    }, [id, navigate]);

    const handleUpdate = async (gameData) => {
        try {
            await api.updateGame(id, gameData);
            navigate('/');
        } catch (err) {
            alert("Erreur mise à jour: " + err.message);
        }
    };

    if (loading) return <div className="text-center mt-10">Chargement...</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-4xl font-display text-retro-secondary mb-8 text-center uppercase tracking-widest drop-shadow-sm">Modifier le jeu</h1>
            <GameForm initialData={game} onSubmit={handleUpdate} buttonText="ENREGISTRER" />
        </div>
    );
};

export default EditGamePage;
