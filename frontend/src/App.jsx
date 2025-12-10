import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddGamePage from './pages/AddGamePage';
import EditGamePage from './pages/EditGamePage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-retro-bg font-body text-retro-secondary">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddGamePage />} />
          <Route path="/edit/:id" element={<EditGamePage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
