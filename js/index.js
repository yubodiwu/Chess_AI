// var Chess = require('./chess');
var chess = new Chess();

while (!chess.game_over()) {
  var moves = chess.moves();
  var move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);
}

var board,
  game = new Chess();

var makeRandomMove = function() {
  var possibleMoves = game.moves();

  // exit if the game is over
  if (game.game_over() === true ||
    game.in_draw() === true ||
    possibleMoves.length === 0) return;

  var randomIndex = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIndex]);
  board.position(game.fen());

  window.setTimeout(makeRandomMove, 10);
};

board = ChessBoard('board', 'start');

window.setTimeout(makeRandomMove, 10);
// var board2 = ChessBoard('board2', {
//   draggable: true,
//   dropOffBoard: 'trash',
//   sparePieces: true
// });
// $('#startBtn').on('click', board2.start);
// $('#clearBtn').on('click', board2.clear);
