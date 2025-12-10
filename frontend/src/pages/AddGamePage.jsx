import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import GameForm from '../components/GameForm';

const AddGamePage = () => {
    const navigate = useNavigate();

    const handleCreate = async (gameData) => {
        try {
            await api.createGame(gameData);
            navigate('/');
        } catch (err) {
            alert("Erreur: " + err.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-4xl font-display text-retro-secondary mb-8 text-center uppercase tracking-widest drop-shadow-sm">Ajouter un nouveau jeu</h1>
            <GameForm onSubmit={handleCreate} buttonText="AJOUTER LE JEU" />
        </div>
    );
};

export default AddGamePage;
