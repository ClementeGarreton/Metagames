import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DinoGame from '../components/DinoGame';
import { ExternalLink, X } from 'lucide-react';

const ConquestPage: React.FC = () => {
  const [showEmailModal, setShowEmailModal] = useState(true);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [email, setEmail] = useState('');
  const [finalScore, setFinalScore] = useState(0);
  const [storedScore, setStoredScore] = useState(0);

  // Recuperar puntaje guardado al cargar la página
  useEffect(() => {
    const saved = localStorage.getItem('puntaje');
    if (saved) {
      const numScore = Number(saved);
      setFinalScore(numScore);
      setStoredScore(numScore);
    }
  }, []);

  const handleEmailSubmit = () => {
    if (email.trim()) {
      setShowEmailModal(false);
    } else {
      alert('Por favor, ingresa un email válido.');
    }
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setStoredScore(score);
    localStorage.setItem('puntaje', String(score)); // Guardar puntaje en localStorage
    setShowGameOverModal(true);

    if (email) {
      fetch('https://clementeurzua.pythonanywhere.com/api/add_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, score: score }),
      })
        .then(response => {
          if (response.ok) {
            console.log('Score enviado exitosamente');
          } else {
            console.error('Error al enviar score:', response.status);
          }
        })
        .catch(error => {
          console.error('Error sending score data:', error);
        });
    }
  };

  const closeGameOverModal = () => {
    setShowGameOverModal(false);
    // Opcional: limpiar el puntaje guardado al cerrar el modal
    // localStorage.removeItem('puntaje');
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
            <DinoGame onGameOver={handleGameOver} initialScore={storedScore} />
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-md w-full text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Ingresa tu Email</h3>
            <p className="text-gray-300 mb-6">Para recibir tu premio en caso de ganar</p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none mb-6"
            />
            <button onClick={handleEmailSubmit} className="cyber-button rounded-lg w-full py-3">
              Guardar y Jugar
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {showGameOverModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-md w-full text-center relative">
            <button
              onClick={closeGameOverModal}
              className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-3xl font-bold text-red-500 mb-6">¡Game Over!</h3>

            <a
              href="https://mpago.la/1nHWMxc"
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-6 group"
            >
              <img
                src="/game5.jpg"
                alt="Power-up"
                className="w-full rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </a>

            <p className="text-xl text-white mb-4">
              Tu puntuación: <span className="text-orange-500 font-bold">{finalScore}</span>
            </p>

            <p className="text-gray-300 mb-4">¡Eres un campeón, no tienes que perder hoy!</p>

            <p className="text-gray-300 mb-6">Compra el power-up para REVIVIR (Click en la imagen)</p>

            <a
              href="https://mpago.la/1nHWMxc"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button rounded-lg inline-flex items-center space-x-2 px-6 py-3"
            >
              <span>Comprar Power-up</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConquestPage;
