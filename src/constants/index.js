import tictactoe from "../pages/TicTacToe";

const config = {
  api:"https://bizzzydigital.site:3000"
}

const routes = {
  "/games": [
      { path: "tictactoe", element: tictactoe },
  ]
};
export {
  config,
  routes,
};
