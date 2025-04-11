import { useState } from "react";
import { useRouter } from "next/router";
import GameHistory from "../components/GameHistory";

const HomePage = () => {
  const router = useRouter();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [errors, setErrors] = useState({
    player1: "",
    player2: "",
  });

  const startGame = () => {
    if (player1 && player2) {
      router.push(`/game?player1=${player1}&player2=${player2}`);
    } else {
      setErrors({
        player1: player1 ? "" : "Player 1 name is required.",
        player2: player2 ? "" : "Player 2 name is required.",
      });
    }
  };

  const cancelNewGame = () => {
    setPlayer1("");
    setPlayer2("");
    setShowInputs(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-8 lg:p-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
          Tic Tac Toe
        </h1>
        <div className="bg-gray-800 p-6 rounded-lg mb-8 sm:mb-10 shadow-lg">
          {!showInputs ? (
            <div className="text-center">
              <button
                onClick={() => setShowInputs(true)}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg transition w-full sm:w-auto"
              >
                Start New Game
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <input
                  className="bg-gray-700 text-white w-full p-3 rounded placeholder-gray-400"
                  placeholder="Player 1 Name"
                  value={player1}
                  onChange={(e) => setPlayer1(e.target.value)}
                  maxLength={30}
                  required
                />
                {errors.player1 && (
                  <p className="text-red-500 text-sm mt-1">{errors.player1}</p>
                )}
              </div>
              <div>
                <input
                  className="bg-gray-700 text-white w-full p-3 rounded placeholder-gray-400"
                  placeholder="Player 2 Name"
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                  maxLength={30}
                  required
                />
                {errors.player2 && (
                  <p className="text-red-500 text-sm mt-1">{errors.player2}</p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <button
                  onClick={startGame}
                  className="px-3 bg-green-600 hover:bg-green-700 sm:flex-none py-3 rounded text-lg transition w-full sm:w-auto"
                >
                  Confirm and Start
                </button>
                <button
                  onClick={cancelNewGame}
                  className="px-3 bg-red-600 hover:bg-red-700 sm:flex-none py-3 rounded text-lg transition w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>

            </div>
          )}
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Previous Matches</h2>
          <GameHistory />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
