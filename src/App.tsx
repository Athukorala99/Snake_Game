import { useState, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

interface SnakeGameProps {}

const SnakeGame: React.FC<SnakeGameProps> = () => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (gameOver) return;

      let newSnake = [...snake];
      let head = { ...newSnake[0] };

      switch (direction) {
        case 'RIGHT':
          head.x += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
      }

      newSnake.unshift(head);

      if (newSnake[0].x === food.x && newSnake[0].y === food.y) {
        setScore(score + 1);
        setFood({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) });
      } else {
        newSnake.pop();
      }

      if (
        newSnake[0].x < 0 ||
        newSnake[0].x >= 10 ||
        newSnake[0].y < 0 ||
        newSnake[0].y >= 10 ||
        newSnake.some((part, index) => index !== 0 && part.x === head.x && part.y === head.y)
      ) {
        setGameOver(true);
      }

      setSnake(newSnake);
    }, 100);

    return () => clearInterval(intervalId);
  }, [snake, direction, food, gameOver, score]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        setDirection('UP');
        break;
      case 'ArrowDown':
        setDirection('DOWN');
        break;
      case 'ArrowLeft':
        setDirection('LEFT');
        break;
      case 'ArrowRight':
        setDirection('RIGHT');
        break;
    }
  };

  const handleRestart = () => {
    setSnake([{ x: 5, y: 5 }]);
    setDirection('RIGHT');
    setFood({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) });
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="flex justify-between w-full max-w-md mb-4">
        <span className="text-lg font-bold">Score: {score}</span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRestart}>
          <RefreshCcw size={24} />
        </button>
      </div>
      <div className="grid grid-cols-10 grid-rows-10 gap-1 w-full max-w-md">
        {Array.from({ length: 10 }, (_, y) =>
          Array.from({ length: 10 }, (_, x) => (
            <div
              key={`${x},${y}`}
              className={`w-8 h-8 bg-gray-200 ${
                snake.some(part => part.x === x && part.y === y) ? 'bg-green-500' : ''
              } ${food.x === x && food.y === y ? 'bg-red-500' : ''}`}
            />
          ))
        )}
      </div>
      {gameOver && (
        <div className="text-lg font-bold mt-4">Game Over! Press restart to play again.</div>
      )}
    </div>
  );
};

export default SnakeGame;