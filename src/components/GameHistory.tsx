import React, { useEffect, useState } from "react";

type Game = {
  _id: string;
  player1: string;
  player2: string;
  winner: string | null;
  player1_score: string;
  player2_score: string;
  createdAt: string;
};

const GameHistory = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/games/retrieve?page=${page}&limit=${limit}`
        );
        const result = await response.json();
        setGames(result.data);
        setTotalPages(result.pages);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchGames();
  }, [page]);

  const getRowColor = (winner: string | null, player1: string, player2: string) => {
    if (winner === "DRAW") return "bg-yellow-500"; 
    if (winner === player1) return "bg-blue-900"; 
    if (winner === player2) return "bg-red-900";
    return "";
  };

  return (
    <div className="mb-10">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left table-auto border border-white">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-sm sm:text-base">Player 1 (O)</th>
              <th className="border px-4 py-2 text-sm sm:text-base">Player 2 (X)</th>
              <th className="border px-4 py-2 text-sm sm:text-base">P1 Score</th>
              <th className="border px-4 py-2 text-sm sm:text-base">P2 Score</th>
              <th className="border px-4 py-2 text-sm sm:text-base">Winner</th>
              <th className="border px-4 py-2 text-sm sm:text-base">Date</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr
                key={game._id}
                className={`${getRowColor(game.winner, game.player1, game.player2)} transition duration-300`}
              >
                <td className="border px-4 py-2 text-sm sm:text-base">{game.player1}</td>
                <td className="border px-4 py-2 text-sm sm:text-base">{game.player2}</td>
                <td className="border px-4 py-2 text-sm sm:text-base">{game.player1_score}</td>
                <td className="border px-4 py-2 text-sm sm:text-base">{game.player2_score}</td>
                <td className="border px-4 py-2 text-sm sm:text-base">{game.winner ?? "Draw"}</td>
                <td className="border px-4 py-2 text-sm sm:text-base">
                  {new Date(game.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center text-white mt-4">
        <button
          className="bg-blue-500 px-4 py-2 rounded disabled:opacity-50 text-sm sm:text-base"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="text-sm sm:text-base">
          Page {page} of {totalPages}
        </span>
        <button
          className="bg-blue-500 px-4 py-2 rounded disabled:opacity-50 text-sm sm:text-base"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GameHistory;
