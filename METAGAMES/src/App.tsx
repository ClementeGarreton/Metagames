import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import ConquestPage from './pages/ConquestPage';
import WinnersPage from './pages/WinnersPage';
import ErrorPage from './pages/ErrorPage';
import StorePage from './pages/StorePage';
import EasyModePage from './pages/EasyModePage';
import MuseumPage from './pages/MuseumPage';
import ProspectForm from './pages/Inscripciones';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/conquest" element={<ConquestPage />} />
          <Route path="/winners" element={<WinnersPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/easymode" element={<EasyModePage />} />
          <Route path="/museo" element={<MuseumPage />} />
        <Route path="/inscripciones" element={<ProspectForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;