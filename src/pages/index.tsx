import { useState } from "react";
import { useRouter } from "next/router";
const HomePage = () => {
  const router = useRouter();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [showInputs, setShowInputs] = useState(false);

  const startGame = () => {
    if (player1 && player2) {
      router.push(`/game?player1=${player1}&player2=${player2}`);
    }
  };

  return (
    <div className="p-10 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Previous Matches</h1>

      <table className="w-full text-left table-auto border border-white mb-10">
        <thead>
          <tr>
            <th className="border px-4 py-2">Player 1</th>
            <th className="border px-4 py-2">Player 2</th>
            <th className="border px-4 py-2">Winner</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Alice</td>
            <td className="border px-4 py-2">Bob</td>
            <td className="border px-4 py-2">Alice</td>
            <td className="border px-4 py-2">2025-04-10</td>
          </tr>
        </tbody>
      </table>

      {!showInputs ? (
        <button
          onClick={() => setShowInputs(true)}
          className="bg-blue-500 px-6 py-3 rounded hover:bg-blue-700"
        >
          Start New Game
        </button>
      ) : (
        <div className="space-y-4">
          <input
            className="block bg-gray-800 p-2 rounded w-full"
            placeholder="Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
          <input
            className="block bg-gray-800 p-2 rounded w-full"
            placeholder="Player 2 Name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
          <button
            onClick={startGame}
            className="bg-green-500 px-6 py-2 rounded hover:bg-green-700"
          >
            Confirm and Start
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
