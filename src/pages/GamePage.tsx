import React, { useState } from 'react';
import Header from '../components/Header';
import DinoGame from '../components/DinoGame';
import { ExternalLink, X } from 'lucide-react';

const GamePage: React.FC = () => {
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setShowGameOverModal(true);
  };

  const closeGameOverModal = () => {
    setShowGameOverModal(false);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
              Dino Run
            </h1>
            <p className="text-gray-300 text-lg">
              Salta los obstáculos y consigue el puntaje más alto
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <DinoGame onGameOver={handleGameOver} />
          </div>
        </div>
      </div>

      {showGameOverModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-md w-full text-center relative">
            <button
              onClick={closeGameOverModal}
              className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-3xl font-bold text-red-500 mb-6">
              ¡Game Over!
            </h3>
            
            <a
              href="https://mpago.la/19BPFvn"
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-6 group"
            >
              <img
                src="/game1.jpg"
                alt="Power-up"
                className="w-full rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </a>
            
            <p className="text-xl text-white mb-4">
              Tu puntuación: <span className="text-orange-500 font-bold">{finalScore}</span>
            </p>
            
            <p className="text-gray-300 mb-4">
              ¿Listo para ganar como un campeon?
            </p>
            
            <p className="text-gray-300 mb-6">
              Haz click en Mercado Pago para ir al modo Premium
            </p>
            
            <a
              href="https://mpago.la/19BPFvn"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button rounded-lg inline-flex items-center space-x-2 px-6 py-3"
            >
              <span>Ir a Premium</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
