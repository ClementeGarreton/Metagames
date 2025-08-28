import React, { useState } from 'react';
import Header from '../components/Header';
import DinoGame from '../components/DinoGame';
import { ExternalLink, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EasyModePage: React.FC = () => {
  const navigate = useNavigate();
  const [showEmailModal, setShowEmailModal] = useState(true);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [email, setEmail] = useState('');
  const [finalScore, setFinalScore] = useState(0);

  // Redirect to home if page is refreshed (anti-cheat protection)
  React.useEffect(() => {
    const checkAccess = () => {
      // Check if this is a refresh (page was already loaded in this session)
      const wasAlreadyLoaded = sessionStorage.getItem('easymode-loaded');
      const refreshFlag = sessionStorage.getItem('easymode-refresh');
      
      if (refreshFlag === 'true') {
        // This is definitely a refresh, redirect to home
        sessionStorage.removeItem('easymode-refresh');
        sessionStorage.removeItem('easymode-loaded');
        navigate('/');
        return;
      }
      
      if (wasAlreadyLoaded === 'true') {
        // Page was already loaded in this session, this might be direct access
        // But we'll allow it and just mark it as loaded again
        console.log('EasyMode page accessed again in same session');
      }
      
      // Mark that this page has been loaded in this session
      sessionStorage.setItem('easymode-loaded', 'true');
      
      // Clear any old refresh flags after a delay
      setTimeout(() => {
        sessionStorage.removeItem('easymode-refresh');
      }, 1000);
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Only set refresh flag if the page is actually being refreshed
      // (not when navigating away normally)
      if (event.type === 'beforeunload') {
        sessionStorage.setItem('easymode-refresh', 'true');
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
    localStorage.setItem('lastGameMode', 'easymode');
    localStorage.setItem('lastGameTime', new Date().toISOString());
    
    // Send score to backend
    if (email) {
      fetch('https://clementeurzua.pythonanywhere.com/api/add_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, score: score })
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Dino Run - Modo Fácil
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-4">
              Velocidad constante y obstáculos predecibles
            </p>
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-green-400 font-semibold mb-2">🎯 Características del Modo Fácil:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Velocidad aumenta 0.1x cada 5 segundos (máximo 10x)</li>
                <li>• Obstáculos aparecen cada 2-3 segundos</li>
                <li>• Patrón predecible y consistente</li>
                <li>• Perfecto para practicar y conseguir puntajes altos</li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <DinoGame 
              onGameOver={handleGameOver} 
              allowPause={false}
              difficulty="easy"
            />
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-green-500/50 rounded-2xl p-8 max-w-md w-full text-center">
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
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none mb-6"
            />
            <button
              onClick={handleEmailSubmit}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg w-full py-3 transition-all duration-300"
            >
              Guardar y Jugar
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {showGameOverModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-green-500/50 rounded-2xl p-8 max-w-md w-full text-center relative">
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
              href="https://mpago.la/2XXK8sW"
              className="block mb-6 group"
            >
              <img
                src="/game6.jpg"
                alt="Power-up"
                className="w-full rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </a>
            
            <p className="text-xl text-white mb-4">
              Tu puntuación: <span className="text-green-500 font-bold">{finalScore}</span>
            </p>
            
            <p className="text-gray-300 mb-4">
              ¡Excelente puntaje en modo fácil!
            </p>
            
            <p className="text-gray-300 mb-6">
              Compra el power-up para REVIVIR (Click en la imagen)
            </p>
            
            <a
              href="https://mpago.la/2XXK8sW"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg inline-flex items-center space-x-2 px-6 py-3 transition-all duration-300"
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

export default EasyModePage;