"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGamepad, FaTimes, FaArrowLeft } from "react-icons/fa";
import {
  SiPython,
  SiTypescript,
  SiReact,
  SiDocker,
  SiKubernetes,
  SiTensorflow,
  SiPytorch,
  SiAmazon,
} from "react-icons/si";

type GameType = "menu" | "snake" | "memory" | "reaction" | "typing";

// ============ SNAKE GAME ============
function SnakeGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gridSize = 20;
  const canvasSize = 400;
  const cellSize = canvasSize / gridSize;

  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 0, y: 0 },
    nextDirection: { x: 0, y: 0 },
  });

  const resetGame = useCallback(() => {
    gameStateRef.current = {
      snake: [{ x: 10, y: 10 }],
      food: {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      },
      direction: { x: 0, y: 0 },
      nextDirection: { x: 0, y: 0 },
    };
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { direction } = gameStateRef.current;
      let newDir = { ...direction };

      switch (e.key) {
        case "ArrowUp":
          if (direction.y !== 1) newDir = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (direction.y !== -1) newDir = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (direction.x !== 1) newDir = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (direction.x !== -1) newDir = { x: 1, y: 0 };
          break;
      }

      if (newDir.x !== 0 || newDir.y !== 0) {
        gameStateRef.current.nextDirection = newDir;
        if (!gameStarted) setGameStarted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const gameLoop = setInterval(() => {
      const state = gameStateRef.current;
      state.direction = state.nextDirection;

      // Move snake
      const head = { ...state.snake[0] };
      head.x += state.direction.x;
      head.y += state.direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        setGameOver(true);
        return;
      }

      // Check self collision
      if (state.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        setGameOver(true);
        return;
      }

      state.snake.unshift(head);

      // Check food collision
      if (head.x === state.food.x && head.y === state.food.y) {
        setScore((s) => s + 10);
        state.food = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
        };
      } else {
        state.snake.pop();
      }

      // Draw
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      // Draw snake
      state.snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? "#00d4ff" : "#00d4ff80";
        ctx.fillRect(
          seg.x * cellSize + 1,
          seg.y * cellSize + 1,
          cellSize - 2,
          cellSize - 2
        );
      });

      // Draw food
      ctx.fillStyle = "#ff6b6b";
      ctx.beginPath();
      ctx.arc(
        state.food.x * cellSize + cellSize / 2,
        state.food.y * cellSize + cellSize / 2,
        cellSize / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }, 100);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver]);

  // Initial draw
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    const state = gameStateRef.current;
    ctx.fillStyle = "#00d4ff";
    ctx.fillRect(
      state.snake[0].x * cellSize + 1,
      state.snake[0].y * cellSize + 1,
      cellSize - 2,
      cellSize - 2
    );

    ctx.fillStyle = "#ff6b6b";
    ctx.beginPath();
    ctx.arc(
      state.food.x * cellSize + cellSize / 2,
      state.food.y * cellSize + cellSize / 2,
      cellSize / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-[400px]">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-surface transition-colors"
        >
          <FaArrowLeft />
        </button>
        <h3 className="text-xl font-bold gradient-text">Snake</h3>
        <span className="text-accent font-mono">Score: {score}</span>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="rounded-xl border border-border"
        />

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg/80 rounded-xl">
            <p className="text-text-secondary">Press arrow keys to start</p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/90 rounded-xl gap-4">
            <p className="text-2xl font-bold text-accent">Game Over!</p>
            <p className="text-text-secondary">Final Score: {score}</p>
            <button onClick={resetGame} className="btn-primary">
              Play Again
            </button>
          </div>
        )}
      </div>

      <p className="text-text-muted text-sm">Use arrow keys to move</p>
    </div>
  );
}

// ============ MEMORY MATCH GAME ============
const techIcons = [
  { icon: SiPython, name: "Python" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiReact, name: "React" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiKubernetes, name: "Kubernetes" },
  { icon: SiTensorflow, name: "TensorFlow" },
  { icon: SiPytorch, name: "PyTorch" },
  { icon: SiAmazon, name: "AWS" },
];

interface Card {
  id: number;
  iconIndex: number;
  flipped: boolean;
  matched: boolean;
}

function MemoryGame({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = useCallback(() => {
    const shuffled = [...techIcons, ...techIcons]
      .map((_, index) => ({
        id: index,
        iconIndex: index % techIcons.length,
        flipped: false,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].flipped || cards[id].matched) return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = flippedCards;

      if (cards[first].iconIndex === cards[second].iconIndex) {
        const newCards = [...cards];
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setFlippedCards([]);

        if (newCards.every((c) => c.matched)) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-[400px]">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-surface transition-colors"
        >
          <FaArrowLeft />
        </button>
        <h3 className="text-xl font-bold gradient-text">Memory Match</h3>
        <span className="text-accent font-mono">Moves: {moves}</span>
      </div>

      <div className="grid grid-cols-4 gap-2 p-4">
        {cards.map((card) => {
          const IconComponent = techIcons[card.iconIndex].icon;
          return (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                card.flipped || card.matched
                  ? "bg-surface border-accent"
                  : "bg-bg border-border hover:border-accent/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {(card.flipped || card.matched) && (
                <motion.div
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconComponent
                    size={32}
                    className={card.matched ? "text-accent" : "text-text"}
                  />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {gameWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-2xl font-bold text-accent mb-2">You Won!</p>
          <p className="text-text-secondary mb-4">Completed in {moves} moves</p>
          <button onClick={initializeGame} className="btn-primary">
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ============ REACTION TIME GAME ============
function ReactionGame({ onBack }: { onBack: () => void }) {
  const [state, setState] = useState<"waiting" | "ready" | "go" | "result">(
    "waiting"
  );
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const startGame = () => {
    setState("ready");
    const delay = Math.random() * 3000 + 2000; // 2-5 seconds
    timeoutRef.current = setTimeout(() => {
      setState("go");
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (state === "waiting") {
      startGame();
    } else if (state === "ready") {
      clearTimeout(timeoutRef.current);
      setState("waiting");
      setReactionTime(-1); // Too early
    } else if (state === "go") {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setState("result");
      if (bestTime === null || time < bestTime) {
        setBestTime(time);
      }
    } else if (state === "result") {
      startGame();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getBgColor = () => {
    switch (state) {
      case "waiting":
        return "bg-surface";
      case "ready":
        return "bg-red-500/20";
      case "go":
        return "bg-green-500/20";
      case "result":
        return "bg-surface";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-[400px]">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-surface transition-colors"
        >
          <FaArrowLeft />
        </button>
        <h3 className="text-xl font-bold gradient-text">Reaction Time</h3>
        <span className="text-accent font-mono">
          Best: {bestTime ? `${bestTime}ms` : "--"}
        </span>
      </div>

      <motion.button
        onClick={handleClick}
        className={`w-full max-w-[400px] h-64 rounded-xl border-2 border-border flex flex-col items-center justify-center transition-colors duration-300 ${getBgColor()}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {state === "waiting" && (
          <>
            <p className="text-2xl font-bold mb-2">Click to Start</p>
            <p className="text-text-muted">Test your reaction speed</p>
          </>
        )}
        {state === "ready" && (
          <>
            <p className="text-2xl font-bold text-red-400">Wait for green...</p>
            <p className="text-text-muted">Don't click yet!</p>
          </>
        )}
        {state === "go" && (
          <p className="text-4xl font-bold text-green-400">CLICK NOW!</p>
        )}
        {state === "result" && (
          <>
            {reactionTime === -1 ? (
              <>
                <p className="text-2xl font-bold text-red-400">Too Early!</p>
                <p className="text-text-muted">Click to try again</p>
              </>
            ) : (
              <>
                <p className="text-4xl font-bold text-accent">{reactionTime}ms</p>
                <p className="text-text-secondary mt-2">
                  {reactionTime < 200
                    ? "Incredible!"
                    : reactionTime < 250
                    ? "Fast!"
                    : reactionTime < 300
                    ? "Good!"
                    : "Keep practicing!"}
                </p>
                <p className="text-text-muted text-sm mt-2">Click to try again</p>
              </>
            )}
          </>
        )}
      </motion.button>
    </div>
  );
}

// ============ TYPING SPEED GAME ============
const programmingWords = [
  "function",
  "const",
  "return",
  "async",
  "await",
  "import",
  "export",
  "interface",
  "component",
  "useState",
  "useEffect",
  "promise",
  "callback",
  "array",
  "object",
  "string",
  "boolean",
  "number",
  "null",
  "undefined",
  "try",
  "catch",
  "finally",
  "class",
  "extends",
  "constructor",
  "prototype",
  "module",
  "require",
  "default",
];

function TypingGame({ onBack }: { onBack: () => void }) {
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const initializeGame = useCallback(() => {
    const shuffled = [...programmingWords]
      .sort(() => Math.random() - 0.5)
      .slice(0, 15);
    setWords(shuffled);
    setCurrentIndex(0);
    setInput("");
    setStartTime(null);
    setGameOver(false);
    setWpm(0);
    setCorrectWords(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!startTime && value.length === 1) {
      setStartTime(Date.now());
    }

    if (value.endsWith(" ")) {
      const typed = value.trim();
      if (typed === words[currentIndex]) {
        setCorrectWords((c) => c + 1);
      }

      if (currentIndex === words.length - 1) {
        const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
        const calculatedWpm = Math.round((correctWords + (typed === words[currentIndex] ? 1 : 0)) / timeElapsed);
        setWpm(calculatedWpm);
        setGameOver(true);
      } else {
        setCurrentIndex((i) => i + 1);
      }
      setInput("");
    } else {
      setInput(value);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-[500px]">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-surface transition-colors"
        >
          <FaArrowLeft />
        </button>
        <h3 className="text-xl font-bold gradient-text">Typing Speed</h3>
        <span className="text-accent font-mono">
          {currentIndex}/{words.length}
        </span>
      </div>

      {!gameOver ? (
        <>
          <div className="flex flex-wrap gap-2 p-4 bg-surface rounded-xl border border-border max-w-[500px]">
            {words.map((word, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded font-mono text-sm ${
                  index === currentIndex
                    ? "bg-accent/20 text-accent border border-accent"
                    : index < currentIndex
                    ? "text-text-muted line-through"
                    : "text-text-secondary"
                }`}
              >
                {word}
              </span>
            ))}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInput}
            placeholder="Type the highlighted word..."
            className="w-full max-w-[500px] px-4 py-3 rounded-xl bg-bg border-2 border-border focus:border-accent outline-none font-mono text-lg"
            autoFocus
          />

          <p className="text-text-muted text-sm">Press space after each word</p>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-surface rounded-xl border border-border"
        >
          <p className="text-4xl font-bold text-accent mb-2">{wpm} WPM</p>
          <p className="text-text-secondary mb-4">
            {correctWords}/{words.length} words correct
          </p>
          <p className="text-text-muted mb-4">
            {wpm > 60
              ? "Blazing fast!"
              : wpm > 40
              ? "Nice speed!"
              : wpm > 20
              ? "Good start!"
              : "Keep practicing!"}
          </p>
          <button onClick={initializeGame} className="btn-primary">
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ============ MAIN FUN ZONE COMPONENT ============
export default function FunZone() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState<GameType>("menu");

  const closeModal = () => {
    setIsOpen(false);
    setCurrentGame("menu");
  };

  const games = [
    {
      id: "snake" as const,
      title: "Snake",
      description: "Classic arcade game",
      emoji: "🐍",
    },
    {
      id: "memory" as const,
      title: "Memory Match",
      description: "Match the tech icons",
      emoji: "🧠",
    },
    {
      id: "reaction" as const,
      title: "Reaction Time",
      description: "Test your reflexes",
      emoji: "⚡",
    },
    {
      id: "typing" as const,
      title: "Typing Speed",
      description: "How fast can you type?",
      emoji: "⌨️",
    },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg hover:shadow-accent/25 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Bored? Have some fun!"
      >
        <FaGamepad size={24} />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-bg border border-border rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {currentGame === "menu" ? (
                    <>
                      <span className="gradient-text">Bored?</span>{" "}
                      <span className="text-text-secondary font-normal">
                        Have some fun!
                      </span>
                    </>
                  ) : (
                    <span className="gradient-text">Game Zone</span>
                  )}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-surface transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Content */}
              {currentGame === "menu" ? (
                <div className="grid grid-cols-2 gap-4">
                  {games.map((game) => (
                    <motion.button
                      key={game.id}
                      onClick={() => setCurrentGame(game.id)}
                      className="p-4 rounded-xl bg-surface border border-border hover:border-accent/50 transition-all text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-3xl mb-2 block">{game.emoji}</span>
                      <h3 className="font-semibold text-text">{game.title}</h3>
                      <p className="text-text-muted text-sm">
                        {game.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              ) : currentGame === "snake" ? (
                <SnakeGame onBack={() => setCurrentGame("menu")} />
              ) : currentGame === "memory" ? (
                <MemoryGame onBack={() => setCurrentGame("menu")} />
              ) : currentGame === "reaction" ? (
                <ReactionGame onBack={() => setCurrentGame("menu")} />
              ) : (
                <TypingGame onBack={() => setCurrentGame("menu")} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
