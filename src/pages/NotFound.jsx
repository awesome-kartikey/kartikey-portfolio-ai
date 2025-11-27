import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, RefreshCw, Home, Bug, Code } from 'lucide-react';

// Game Constants
const GRID_SIZE = 20;
const CELL_SIZE = 20; // px (responsive scaling handled via CSS/Transform)
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 2;

const NotFound = () => {
  // Game State
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('snake_highscore') || '0')
  );
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Refs for mutable state in event listeners
  const directionRef = useRef('RIGHT');
  const gameLoopRef = useRef(null);

  // Initialize/Reset Game
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
    setIsPaused(false);
  };

  // Generate random food position
  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  // Handle Keyboard Input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || gameOver) return;

      // Prevent scrolling with arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') directionRef.current = 'UP';
          break;
        case 'ArrowDown':
          if (directionRef.current !== 'UP') directionRef.current = 'DOWN';
          break;
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') directionRef.current = 'LEFT';
          break;
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') directionRef.current = 'RIGHT';
          break;
        case ' ':
          setIsPaused((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver]);

  // Game Loop
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        const currentDir = directionRef.current;
        setDirection(currentDir); // Sync state for UI

        switch (currentDir) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
          default: break;
        }

        // Check Collisions (Walls)
        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE
        ) {
          handleGameOver();
          return prevSnake;
        }

        // Check Collisions (Self)
        for (let segment of prevSnake) {
          if (head.x === segment.x && head.y === segment.y) {
            handleGameOver();
            return prevSnake;
          }
        }

        const newSnake = [head, ...prevSnake];

        // Check Food
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => {
            const newScore = s + 1;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('snake_highscore', newScore.toString());
            }
            return newScore;
          });
          setFood(generateFood());
          // Don't pop tail (grow)
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    };

    const speed = Math.max(50, INITIAL_SPEED - score * SPEED_INCREMENT);
    gameLoopRef.current = setInterval(moveSnake, speed);

    return () => clearInterval(gameLoopRef.current);
  }, [gameStarted, gameOver, isPaused, food, score, highScore]);

  const handleGameOver = () => {
    setGameOver(true);
    setGameStarted(false);
  };

  // Mobile Controls
  const handleMobileControl = (dir) => {
    if (!gameStarted) return;

    const current = directionRef.current;
    if (dir === 'UP' && current !== 'DOWN') directionRef.current = 'UP';
    if (dir === 'DOWN' && current !== 'UP') directionRef.current = 'DOWN';
    if (dir === 'LEFT' && current !== 'RIGHT') directionRef.current = 'LEFT';
    if (dir === 'RIGHT' && current !== 'LEFT') directionRef.current = 'RIGHT';
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 pt-24 font-mono text-green-500 selection:bg-green-900 selection:text-white overflow-hidden">

      {/* Terminal Header */}
      <div className="max-w-2xl w-full mb-8 text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter glitch-text">
            404
          </h1>
          <p className="text-xl md:text-2xl text-green-400 mt-2">
            &lt;PageNotFound /&gt;
          </p>
        </motion.div>

        <p className="text-gray-400 max-w-md mx-auto">
          The page you're looking for has been eaten by a bug.
          <span className="text-green-400 block mt-1">Help us debug the system!</span>
        </p>
      </div>

      {/* Game Container */}
      <div className="relative group">
        {/* CRT Screen Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] rounded-xl" />

        <div className="relative bg-black border-4 border-green-800 rounded-xl p-1 shadow-[0_0_20px_rgba(34,197,94,0.2)]">

          {/* Game Board */}
          <div
            className="relative bg-gray-900/80 grid"
            style={{
              width: 'min(90vw, 400px)',
              height: 'min(90vw, 400px)',
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            }}
          >
            {/* Grid Lines (Optional, for retro feel) */}
            <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] pointer-events-none opacity-10">
              {[...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => (
                <div key={i} className="border-[0.5px] border-green-500/20" />
              ))}
            </div>

            {/* Snake */}
            {snake.map((segment, i) => (
              <div
                key={`${segment.x}-${segment.y}`}
                className="absolute bg-green-500 rounded-sm shadow-[0_0_5px_rgba(34,197,94,0.8)]"
                style={{
                  left: `${(segment.x / GRID_SIZE) * 100}%`,
                  top: `${(segment.y / GRID_SIZE) * 100}%`,
                  width: `${100 / GRID_SIZE}%`,
                  height: `${100 / GRID_SIZE}%`,
                  opacity: i === 0 ? 1 : 0.8 - (i / snake.length) * 0.5, // Fade tail
                  zIndex: 10,
                }}
              >
                {i === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-1 bg-black rounded-full mx-[1px]" />
                    <div className="w-1 h-1 bg-black rounded-full mx-[1px]" />
                  </div>
                )}
              </div>
            ))}

            {/* Food (Bug) */}
            <div
              className="absolute text-red-500 flex items-center justify-center animate-pulse"
              style={{
                left: `${(food.x / GRID_SIZE) * 100}%`,
                top: `${(food.y / GRID_SIZE) * 100}%`,
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
                zIndex: 5,
              }}
            >
              <Bug size={16} />
            </div>

            {/* Start / Game Over Overlay */}
            <AnimatePresence>
              {(!gameStarted || gameOver || isPaused) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-6"
                >
                  {gameOver ? (
                    <>
                      <h3 className="text-3xl font-bold text-red-500 mb-2">SYSTEM FAILURE</h3>
                      <p className="text-gray-300 mb-6">Bugs Fixed: {score}</p>
                      <button
                        onClick={resetGame}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-all hover:scale-105"
                      >
                        <RefreshCw size={20} /> Try Again
                      </button>
                    </>
                  ) : isPaused && gameStarted ? (
                    <>
                      <h3 className="text-3xl font-bold text-yellow-500 mb-6">PAUSED</h3>
                      <button
                        onClick={() => setIsPaused(false)}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
                      >
                        Resume
                      </button>
                    </>
                  ) : (
                    <>
                      <Code size={48} className="text-green-500 mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Debug Mode</h3>
                      <p className="text-gray-400 text-sm mb-6 max-w-[200px]">
                        Use arrow keys to eat bugs and fix the code.
                      </p>
                      <button
                        onClick={resetGame}
                        className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)] animate-pulse"
                      >
                        Start Debugging
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats Bar */}
          <div className="bg-gray-900 p-3 flex justify-between items-center text-sm border-t border-green-800/50">
            <div className="flex gap-4">
              <span>SCORE: {score}</span>
              <span className="text-gray-500">HI: {highScore}</span>
            </div>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="mt-8 grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button
          className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center active:bg-green-900/50 border border-gray-700"
          onClick={() => handleMobileControl('UP')}
        >
          ▲
        </button>
        <div />
        <button
          className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center active:bg-green-900/50 border border-gray-700"
          onClick={() => handleMobileControl('LEFT')}
        >
          ◀
        </button>
        <button
          className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center active:bg-green-900/50 border border-gray-700"
          onClick={() => handleMobileControl('DOWN')}
        >
          ▼
        </button>
        <button
          className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center active:bg-green-900/50 border border-gray-700"
          onClick={() => handleMobileControl('RIGHT')}
        >
          ▶
        </button>
      </div>

      {/* Home Button */}
      <Link
        to="/"
        className="mt-8 flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors"
      >
        <Home size={18} />
        <span>Return to Safe Mode</span>
      </Link>

    </div>
  );
};

export default NotFound;
