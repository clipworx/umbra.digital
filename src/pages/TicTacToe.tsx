import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

type TicTacToeProps = {
  player1: string;
  player2: string;
};

const TicTacToe: React.FC<TicTacToeProps> = ({ player1, player2 }) => {
  const router = useRouter();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);  // Keep this as is, since X will still be the second player
  const [winner, setWinner] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameStarted, setGameStarted] = useState(true); 
  const [xMoves, setXMoves] = useState<number[]>([]);
  const [oMoves, setOMoves] = useState<number[]>([]);
  const [roundEnded, setRoundEnded] = useState(false);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  useEffect(() => {
    if (!gameStarted || winner) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          const winningPlayer = isXNext ? "O" : "X";
          
          setWinner(winningPlayer); 
          setRoundEnded(true);

          if (!roundEnded) {
            if (winningPlayer === "X") {
              setXScore((prevScore) => prevScore + 1);
            } else {
              setOScore((prevScore) => prevScore + 1);
            }
          }

          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [gameStarted, winner, isXNext]);

  const handleClick = (index: number) => {
    if (!gameStarted || board[index] || winner) return;
  
    const newBoard = [...board];
    const currentPlayer = isXNext ? "X" : "O";  // This logic stays the same
    const currentMoves = isXNext ? [...xMoves] : [...oMoves];
  
    if (currentMoves.length === 3) {
      const oldestIndex = currentMoves.shift()!;
      newBoard[oldestIndex] = null;
    }
  
    newBoard[index] = currentPlayer;
  
    if (isXNext) {
      setXMoves([...currentMoves, index]);
    } else {
      setOMoves([...currentMoves, index]);
    }
  
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setRoundEnded(true);
        if (board[a] === "X") {
          setXScore((prev) => prev + 1);
        } else {
          setOScore((prev) => prev + 1);
        }
        return;
      }
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(false);
    setTimeLeft(15);
    setXMoves([]);
    setOMoves([]);
  };

  const handleContinueRound = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(false);
    setTimeLeft(15);
    setXMoves([]);
    setOMoves([]);
    setRoundEnded(false);
  };
  
  const handleStopGame = () => {
    saveGameResult();
    setXScore(0);
    setOScore(0);
    router.push("/");
  };


  const saveGameResult = async () => {
    try {
      let winnerName: string;
      switch (true) {
        case xScore > oScore:
          winnerName = player2; 
          break;
        case oScore > xScore:
          winnerName = player1; 
          break;
        default:
          winnerName = "DRAW";
          break;
      }

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player1,
          player2,
          winner: winnerName,
          board,
          player1_score: oScore,
          player2_score: xScore,
          date: new Date(),
        }),
      });
    } catch (error) {
      console.error("Error saving game result:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Tic Tac Toe</h1>

      {gameStarted ? (
        <>
        
        <div className="flex justify-between w-full max-w-md mb-6">
          <div className={`text-left ${!isXNext ? "font-bold text-blue-400" : "text-white"}`}>
            <p className="text-lg">Player 1</p>
            <p className="text-xl">{player1} <span className="text-blue-500">(O)</span></p>
          </div>
          <div className={`text-right ${isXNext ? "font-bold text-red-400" : "text-white"}`}>
            <p className="text-lg">Player 2</p>
            <p className="text-xl">{player2} <span className="text-red-500">(X)</span></p> 
          </div>
        </div>
        <div className="text-xl mb-4 flex justify-between w-full max-w-md">
          <p>
            <span className="text-blue-400">{player1}</span>: {oScore}
          </p>
          <p>
            <span className="text-red-400">{player2}</span>: {xScore}
          </p>
        </div>
          <div className="text-2xl mb-4">
            Time Left: <span className="font-bold">{timeLeft.toFixed(1)}s</span>
          </div>

          <p className="text-xl mb-4">
            Turn: <span style={{ color: isXNext ? "red" : "blue" }}>{isXNext ? player2 : player1} ({isXNext ? "X" : "O"})</span>
          </p>

          <div className="grid grid-cols-3 gap-0">
            {board.map((value, index) => {
              let borderRadius = "0";
              if (index === 0) borderRadius = "15px 0 0 0";
              if (index === 2) borderRadius = "0 15px 0 0";
              if (index === 6) borderRadius = "0 0 0 15px";
              if (index === 8) borderRadius = "0 0 15px 0";

              return (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className="w-28 h-28 border-4 border-white flex items-center justify-center text-6xl font-bold"
                  style={{
                    color: value === "X" ? "red" : value === "O" ? "blue" : "white",
                    borderRadius: borderRadius,
                    borderTop: index < 3 ? "none" : "4px solid white",
                    borderBottom: index > 5 ? "none" : "4px solid white",
                    borderLeft: index % 3 === 0 ? "none" : "4px solid white",
                    borderRight: index % 3 === 2 ? "none" : "4px solid white",
                  }}
                >
                  {value}
                </button>
              );
            })}
          </div>

          {roundEnded && (
              <div className="mt-6 flex flex-col items-center space-y-4">
                <p className="text-2xl">
                  Winner:{" "}
                  <span style={{ color: winner === "X" ? "red" : "blue" }}>{winner}</span>
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleContinueRound}
                    className="p-2 bg-green-500 hover:bg-green-700 text-white rounded"
                  >
                    Continue
                  </button>
                  <button
                    onClick={handleStopGame}
                    className="p-2 bg-red-500 hover:bg-red-700 text-white rounded"
                  >
                    Stop
                  </button>
                </div>
              </div>
            )}
        </>
      ) : (
        <button
          onClick={handleReset}
          className="p-3 bg-green-500 hover:bg-green-700 text-white rounded text-lg"
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
