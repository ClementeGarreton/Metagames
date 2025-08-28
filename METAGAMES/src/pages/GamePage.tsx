import React, { useState } from 'react';
import Header from '../components/Header';
import DinoGame from '../components/DinoGame';
import { ExternalLink, X, Settings } from 'lucide-react';

const GamePage: React.FC = () => {
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('hard');

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
              Dino Run - Modo Práctica
            </h1>
            <p className="text-gray-300 text-lg">
              Practica gratis y elige tu dificultad
            </p>
            
            {/* Difficulty Selector */}
            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 font-semibold">Dificultad:</span>
              </div>
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setDifficulty('easy')}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    difficulty === 'easy'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Fácil (15x max)
                </button>
                <button
                  onClick={() => setDifficulty('hard')}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    difficulty === 'hard'
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Difícil (10x max)
                </button>
              </div>
            </div>
            
            {/* Difficulty Description */}
            <div className="mt-4 max-w-2xl mx-auto">
              {difficulty === 'easy' ? (
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-4">
                  <p className="text-green-400 font-semibold mb-2">🎯 Modo Fácil:</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Velocidad máxima: 15x</li>
                    <li>• Obstáculos cada 2-3 segundos (predecible)</li>
                    <li>• Perfecto para conseguir puntajes altos</li>
                    <li>• Botón de pausa disponible</li>
                  </ul>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-lg p-4">
                  <p className="text-orange-400 font-semibold mb-2">🔥 Modo Difícil:</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Velocidad máxima: 10x</li>
                    <li>• Obstáculos aleatorios (impredecible)</li>
                    <li>• Más técnico y desafiante</li>
                    <li>• Botón de pausa disponible</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <DinoGame 
              onGameOver={handleGameOver} 
              allowPause={true}
              difficulty={difficulty}
            />
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
              className="block mb-6 group"
            >
              <img
                src="/game1.png"
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
              Haz click abajo para ir al modo Premium version facil
            </p>
            
            <a
              href="https://mpago.la/2kMbM58"
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