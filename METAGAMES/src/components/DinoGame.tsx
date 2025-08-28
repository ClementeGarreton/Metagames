import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';

interface DinoGameProps {
  onGameOver: (score: number) => void;
  allowPause?: boolean;
  difficulty?: 'easy' | 'hard';
}

const DinoGame: React.FC<DinoGameProps> = ({ onGameOver, allowPause = false, difficulty = 'hard' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Inicializamos score leyendo localStorage
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('lastGameScore');
    return savedScore ? parseInt(savedScore) : 0;
  });

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const gameStateRef = useRef({
    dino: { x: 50, y: 150, radius: 15, dy: 0, gravity: 0.3, jump: -12 },
    obstacles: [] as Array<{ x: number; y: number; width: number; height: number }>,
    speed: 3,
    collisionCount: 0,
    lastObstacleTime: 0,
    animationId: 0,
    gameStartTime: 0,
    lastSpeedIncreaseTime: 0
  });

  const drawDino = useCallback((ctx: CanvasRenderingContext2D) => {
    const { dino } = gameStateRef.current;

    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.arc(dino.x + dino.radius, dino.y + dino.radius, dino.radius, 0, Math.PI * 2);
    ctx.fill();

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
    const { obstacles } = gameStateRef.current;
    const currentTime = Date.now();

    if (difficulty === 'easy') {
      const timeSinceLast = currentTime - gameStateRef.current.lastObstacleTime;
      const minTime = 2000 + Math.random() * 1000;
      const lastObstacle = obstacles[obstacles.length - 1];
      const hasDistance = !lastObstacle || 800 - lastObstacle.x > 180;

      if (timeSinceLast > minTime && hasDistance) {
        const height = Math.random() * 40 + 30;
        obstacles.push({ x: 800, y: 160 - height, width: 25, height });
        gameStateRef.current.lastObstacleTime = currentTime;
      }
    } else {
      const baseChance = 0.006;
      const speedMultiplier = Math.min(gameStateRef.current.speed / 3, 1.5);
      const spawnChance = baseChance * speedMultiplier;
      const lastObstacle = obstacles[obstacles.length - 1];
      const minDistance = 200;

      if (!lastObstacle || 800 - lastObstacle.x >= minDistance) {
        if (Math.random() < spawnChance) {
          const height = Math.random() * 40 + 30;
          obstacles.push({ x: 800, y: 160 - height, width: 25, height });
        }
      }
    }
  }, [difficulty]);

  const updateSpeed = useCallback(() => {
    const currentTime = Date.now();
    const maxSpeed = difficulty === 'easy' ? 15 : 10;

    if (currentTime - gameStateRef.current.lastSpeedIncreaseTime >= 5000 && gameStateRef.current.speed < maxSpeed) {
      gameStateRef.current.speed += 0.1;
      gameStateRef.current.lastSpeedIncreaseTime = currentTime;
      if (gameStateRef.current.speed > maxSpeed) gameStateRef.current.speed = maxSpeed;
    }
  }, [difficulty]);

  const updateObstacles = useCallback((ctx: CanvasRenderingContext2D) => {
    const { obstacles, speed } = gameStateRef.current;

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obstacle = obstacles[i];
      obstacle.x -= speed;

      ctx.fillStyle = '#ef4444';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

      if (obstacle.x < -obstacle.width) {
        obstacles.splice(i, 1);
        setScore(prev => {
          const newScore = prev + 1;
          localStorage.setItem('lastGameScore', newScore.toString());
          return newScore;
        });
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

  const jump = useCallback(() => {
    const { dino } = gameStateRef.current;
    if (dino.y === 150) dino.dy = dino.jump;
  }, []);

  const gameLoop = useCallback(() => {
    if (!canvasRef.current || gameOver || isPaused) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { dino } = gameStateRef.current;

    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    dino.dy += dino.gravity;
    dino.y += dino.dy;
    if (dino.y > 150) {
      dino.y = 150;
      dino.dy = 0;
    }

    updateSpeed();
    drawDino(ctx);
    createObstacle();
    updateObstacles(ctx);

    if (!detectCollision()) {
      gameStateRef.current.animationId = requestAnimationFrame(gameLoop);
    }
  }, [gameOver, isPaused, drawDino, createObstacle, updateObstacles, detectCollision, updateSpeed]);

  const pauseGame = useCallback(() => {
    if (allowPause) setIsPaused(!isPaused);
  }, [allowPause, isPaused]);

  const startGame = useCallback(() => {
    const currentTime = Date.now();
    setGameStarted(true);
    setGameOver(false);
    setIsPaused(false);

    gameStateRef.current = {
      dino: { x: 50, y: 150, radius: 15, dy: 0, gravity: 0.3, jump: -12 },
      obstacles: [],
      speed: 3,
      collisionCount: 0,
      lastObstacleTime: 0,
      animationId: 0,
      gameStartTime: currentTime,
      lastSpeedIncreaseTime: currentTime
    };

    gameLoop();
  }, [gameLoop]);

  const resetGame = useCallback(() => {
    if (gameStateRef.current.animationId) cancelAnimationFrame(gameStateRef.current.animationId);
    setGameStarted(false);
    setGameOver(false);
    setIsPaused(false);
    setScore(0);
    localStorage.removeItem('lastGameScore'); // reinicia puntaje si el jugador quiere

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!gameStarted) startGame();
        else if (!gameOver) jump();
      }
    };

    const handleTouch = (event: TouchEvent) => {
      event.preventDefault();
      if (!gameStarted) startGame();
      else if (!gameOver) jump();
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('touchstart', handleTouch);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('touchstart', handleTouch);
      if (gameStateRef.current.animationId) cancelAnimationFrame(gameStateRef.current.animationId);
    };
  }, [gameStarted, gameOver, startGame, jump]);

  useEffect(() => {
    if (gameStarted && !gameOver && !isPaused) gameLoop();
  }, [isPaused, gameLoop, gameStarted, gameOver]);

  const borderColor = difficulty === 'easy' ? 'border-green-500/50' : 'border-orange-500/50';
  const difficultyLabel = difficulty === 'easy' ? 'FÁCIL' : 'DIFÍCIL';
  const maxSpeed = difficulty === 'easy' ? 15 : 10;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          className={`border-2 ${borderColor} rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl`}
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        <div className="absolute top-4 right-4 bg-black/70 px-4 py-2 rounded-lg">
          <span className={`font-bold text-lg ${difficulty === 'easy' ? 'text-green-500' : 'text-orange-500'}`}>
            Score: {score}
          </span>
        </div>

        <div className="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded-lg">
          <span className={`font-bold text-sm ${difficulty === 'easy' ? 'text-blue-400' : 'text-green-400'}`}>
            {difficultyLabel} - Velocidad: {gameStateRef.current.speed.toFixed(1)}x
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {!gameStarted ? (
          <button onClick={startGame} className="cyber-button rounded-lg flex items-center space-x-2 px-6 py-3 transition-all duration-300">
            <Play className="w-5 h-5" />
            <span>Iniciar Juego</span>
          </button>
        ) : (
          <>
            {allowPause && (
              <button onClick={pauseGame} className="cyber-button rounded-lg flex items-center space-x-2 px-6 py-3 transition-all duration-300" disabled={gameOver}>
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                <span>{isPaused ? 'Reanudar' : 'Pausar'}</span>
              </button>
            )}
            <button onClick={resetGame} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
              <RotateCcw className="w-5 h-5" />
              <span>Reiniciar</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DinoGame;
