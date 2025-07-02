import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface DinoGameProps {
  onGameOver: (score: number) => void;
}

const DinoGame: React.FC<DinoGameProps> = ({ onGameOver }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const gameStateRef = useRef({
    dino: { x: 50, y: 150, radius: 15, dy: 0, gravity: 0.3, jump: -12 },
    obstacles: [] as Array<{ x: number; y: number; width: number; height: number }>,
    speed: 3,
    collisionCount: 0,
    lastObstacleTime: 0,
    animationId: 0
  });

  const drawDino = useCallback((ctx: CanvasRenderingContext2D) => {
    const { dino } = gameStateRef.current;
    
    // Draw dino body
    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.arc(dino.x + dino.radius, dino.y + dino.radius, dino.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw dino eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(dino.x + dino.radius + 5, dino.y + dino.radius - 5, 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(dino.x + dino.radius + 6, dino.y + dino.radius - 5, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const createObstacle = useCallback(() => {
    const currentTime = Date.now();
    const { lastObstacleTime, obstacles } = gameStateRef.current;
    
    if (currentTime - lastObstacleTime > 2000 + Math.random() * 1000) {
      const height = Math.random() * 40 + 30;
      obstacles.push({
        x: 800,
        y: 160 - height,
        width: 25,
        height
      });
      gameStateRef.current.lastObstacleTime = currentTime;
    }
  }, []);

  const updateObstacles = useCallback((ctx: CanvasRenderingContext2D) => {
    const { obstacles, speed } = gameStateRef.current;
    
    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obstacle = obstacles[i];
      obstacle.x -= speed;
      
      // Draw obstacle with gradient
      const gradient = ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x, obstacle.y + obstacle.height);
      gradient.addColorStop(0, '#ef4444');
      gradient.addColorStop(1, '#dc2626');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      
      // Add glow effect
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      ctx.shadowBlur = 0;
      
      if (obstacle.x < -obstacle.width) {
        obstacles.splice(i, 1);
        setScore(prev => prev + 1);
      }
    }
  }, []);

  const detectCollision = useCallback(() => {
    const { dino, obstacles } = gameStateRef.current;
    
    for (const obstacle of obstacles) {
      if (
        dino.x < obstacle.x + obstacle.width &&
        dino.x + dino.radius * 2 > obstacle.x &&
        dino.y < obstacle.y + obstacle.height &&
        dino.y + dino.radius * 2 > obstacle.y
      ) {
        gameStateRef.current.collisionCount++;
        if (gameStateRef.current.collisionCount >= 1) {
          setGameOver(true);
          onGameOver(score);
          return true;
        }
      }
    }
    return false;
  }, [score, onGameOver]);

  const gameLoop = useCallback(() => {
    if (!canvasRef.current || gameOver || isPaused) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { dino } = gameStateRef.current;
    
    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1f2937');
    gradient.addColorStop(1, '#111827');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update dino physics
    dino.dy += dino.gravity;
    dino.y += dino.dy;
    if (dino.y > 150) {
      dino.y = 150;
      dino.dy = 0;
    }
    
    drawDino(ctx);
    createObstacle();
    updateObstacles(ctx);
    
    if (!detectCollision()) {
      gameStateRef.current.animationId = requestAnimationFrame(gameLoop);
    }
  }, [gameOver, isPaused, drawDino, createObstacle, updateObstacles, detectCollision]);

  const jump = useCallback(() => {
    const { dino } = gameStateRef.current;
    if (dino.y === 150) {
      dino.dy = dino.jump;
    }
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    
    gameStateRef.current = {
      dino: { x: 50, y: 150, radius: 15, dy: 0, gravity: 0.3, jump: -12 },
      obstacles: [],
      speed: 3,
      collisionCount: 0,
      lastObstacleTime: 0,
      animationId: 0
    };
    
    gameLoop();
  }, [gameLoop]);

  const pauseGame = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  const resetGame = useCallback(() => {
    if (gameStateRef.current.animationId) {
      cancelAnimationFrame(gameStateRef.current.animationId);
    }
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!gameStarted) {
          startGame();
        } else if (!gameOver) {
          jump();
        }
      }
    };

    const handleTouch = (event: TouchEvent) => {
      event.preventDefault();
      if (!gameStarted) {
        startGame();
      } else if (!gameOver) {
        jump();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('touchstart', handleTouch);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('touchstart', handleTouch);
      if (gameStateRef.current.animationId) {
        cancelAnimationFrame(gameStateRef.current.animationId);
      }
    };
  }, [gameStarted, gameOver, startGame, jump]);

  useEffect(() => {
    if (gameStarted && !gameOver && !isPaused) {
      gameLoop();
    }
  }, [isPaused, gameLoop, gameStarted, gameOver]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          className="border-2 border-orange-500/50 rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        
        <div className="absolute top-4 right-4 bg-black/70 px-4 py-2 rounded-lg">
          <span className="text-orange-500 font-bold text-lg">Score: {score}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {!gameStarted ? (
          <button
            onClick={startGame}
            className="cyber-button rounded-lg flex items-center space-x-2 px-6 py-3"
          >
            <Play className="w-5 h-5" />
            <span>Iniciar Juego</span>
          </button>
        ) : (
          <>
            <button
              onClick={pauseGame}
              className="cyber-button rounded-lg flex items-center space-x-2 px-6 py-3"
              disabled={gameOver}
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              <span>{isPaused ? 'Reanudar' : 'Pausar'}</span>
            </button>
            
            <button
              onClick={resetGame}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reiniciar</span>
            </button>
          </>
        )}
      </div>

      {!gameStarted && (
        <p className="text-gray-300 text-center">
          Presiona <span className="text-orange-500 font-bold">ESPACIO</span> o <span className="text-orange-500 font-bold">TOCA</span> para saltar
        </p>
      )}
    </div>
  );
};

export default DinoGame;