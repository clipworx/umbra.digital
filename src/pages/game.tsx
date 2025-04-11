import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const TicTacToe = dynamic(() => import("../pages/TicTacToe"), {
  ssr: false,
});

const GamePage = () => {
  const router = useRouter();
  const { player1, player2 } = router.query as { player1: string; player2: string };


  if (!player1 || !player2) {
    return (
      <div className="text-center text-white p-10 bg-gray-900 min-h-screen">
        <p className="text-xl">Missing player names. Go back and start a new game.</p>
      </div>
    );
  }

  return (
    <TicTacToe player1={player1 as string} player2={player2 as string} />
  );
};

export default GamePage;
