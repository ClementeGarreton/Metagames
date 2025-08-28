import React, { useState } from 'react';
import Header from '../components/Header';
import DinoGame from '../components/DinoGame';
import { ExternalLink, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConquestPage: React.FC = () => {
  const navigate = useNavigate();
  const [showEmailModal, setShowEmailModal] = useState(true);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [email, setEmail] = useState('');
  const [finalScore, setFinalScore] = useState(0);

  // Redirect to home if page is refreshed (anti-cheat protection)
  React.useEffect(() => {
    const checkAccess = () => {
      // Check if this is a refresh (page was already loaded in this session)
      const wasAlreadyLoaded = sessionStorage.getItem('conquest-loaded');
      const refreshFlag = sessionStorage.getItem('conquest-refresh');
      
      if (refreshFlag === 'true') {
        // This is definitely a refresh, redirect to home
        sessionStorage.removeItem('conquest-refresh');
        sessionStorage.removeItem('conquest-loaded');
        navigate('/');
        return;
      }
      
      if (wasAlreadyLoaded === 'true') {
        // Page was already loaded in this session, this might be direct access
        // But we'll allow it and just mark it as loaded again
        console.log('Conquest page accessed again in same session');
      }
      
      // Mark that this page has been loaded in this session
      sessionStorage.setItem('conquest-loaded', 'true');
      
      // Clear any old refresh flags after a delay
      setTimeout(() => {
        sessionStorage.removeItem('conquest-refresh');
      }, 1000);
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Only set refresh flag if the page is actually being refreshed
      // (not when navigating away normally)
      if (event.type === 'beforeunload') {
        sessionStorage.setItem('conquest-refresh', 'true');
      }
    };

    // Clear history to prevent direct access without payment
    window.history.replaceState(null, '', '/');
    
    // Check access legitimacy
    checkAccess();

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  const handleEmailSubmit = () => {
    if (email.trim()) {
      setShowEmailModal(false);
    } else {
      alert('Por favor, ingresa un email válido.');
    }
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setShowGameOverModal(true);
    
    // Save score to localStorage
    localStorage.setItem('lastGameScore', score.toString());
    localStorage.setItem('lastGameMode', 'conquest');
    localStorage.setItem('lastGameTime', new Date().toISOString());
    
    // Send score to backend - CORREGIDO
    if (email) {
      fetch('https://clementeurzua.pythonanywhere.com/api/add_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, score: score }) // Cambiado de 'wallet' a 'email'
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
            <DinoGame 
              onGameOver={handleGameOver} 
              allowPause={false}
              difficulty="hard"
            />
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-md w-full text-center">
            <h3 className="text-2xl font-bold text-white mb-6">
              Ingresa tu Email
            </h3>
            <p className="text-gray-300 mb-6">
              Para recibir tu premio en caso de ganar
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none mb-6"
            />
            <button
              onClick={handleEmailSubmit}
              className="cyber-button rounded-lg w-full py-3"
            >
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
            
            <h3 className="text-3xl font-bold text-red-500 mb-6">
              ¡Game Over!
            </h3>
            
            <a
              href="https://mpago.la/1nHWMxc"
              className="block mb-6 group"
            >
              <img
                src="/game6.jpg"
                alt="Power-up"
                className="w-full rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </a>
            
            <p className="text-xl text-white mb-4">
              Tu puntuación: <span className="text-orange-500 font-bold">{finalScore}</span>
            </p>
            
            <p className="text-gray-300 mb-4">
              ¡Eres un campeón, no tienes que perder hoy!
            </p>
            
            <p className="text-gray-300 mb-6">
              Compra el power-up para REVIVIR (Click en la imagen)
            </p>
            
            <a
              href="https://mpago.la/1nHWMxc"
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