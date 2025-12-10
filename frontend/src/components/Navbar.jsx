import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-retro-secondary p-4 text-retro-bg shadow-retro border-b-4 border-retro-accent">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-3xl font-display tracking-wider text-retro-accent hover:text-retro-primary transition-colors duration-300 drop-shadow-md">
                    Des jeux en l'air
                </Link>
                <div className="space-x-6 font-bold tracking-wide">
                    <Link to="/" className="hover:text-retro-accent transition-colors">ACCUEIL</Link>
                    <Link to="/stats" className="hover:text-retro-accent transition-colors">STATS</Link>
                    <Link to="/add" className="bg-retro-primary text-white hover:bg-retro-primary/90 px-6 py-2 rounded-full shadow-retro-hover hover:shadow-none hover:translate-y-0.5 transition-all border-2 border-retro-bg/10">
                        + AJOUTER
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
