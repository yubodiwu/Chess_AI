'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true


var possibleWhites = 'PNBRQK'.split('');
var possibleBlacks = 'pnbrqk'.split('');

var pieceValues = {
    'P': 1,
    'N': 3,
    'B': 3,
    'R': 5,
    'Q': 9,
    'K': 104,
    'p': 1,
    'n': 3,
    'b': 3,
    'r': 5,
    'q': 9,
    'k': 104
};

var board,
    game = new Chess();

// do not pick up pieces if the game is over
// only pick up pieces for White
var onDragStart = function(source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
};

var makeRandomMove = function() {
    // AImove(); // testing values
    var possibleMoves = game.moves();

    // game over
    if (possibleMoves.length === 0) return;

    var randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    board.position(game.fen());
};

var onDrop = function(source, target) {
    // see if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return 'snapback';

    // make random legal move for black
    window.setTimeout(AImove, 250);
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
    board.position(game.fen());
};

function AImove() {
    var AIColor = 'black';
    var possibleMoves = game.moves();

    if (possibleMoves.length === 0) return;

    var futureBoards = possibleMoves.map(function(ele) {
        var possibleBoard = new Chess(game.fen());
        possibleBoard.move(ele);

        return {
            'move': ele,
            possibleBoard,
            'whiteScore': getBoardValues(possibleBoard).whiteScore,
            'blackScore': getBoardValues(possibleBoard).blackScore
        }
    });

    var bestBoard = futureBoards.reduce(function(accum, cur) {
        if (accum.whiteScore < cur.whiteScore) {
            accum = cur;
        }

        return accum
    })

    console.log(futureBoards);
    console.log(futureBoards[0]);
    // value of each moves

    // pick a move`\
    game.move(bestBoard.move)
}

function getBoardValues(board) {
    var whiteScore = 0;
    var blackScore = 0;

    var fen = board.fen().split(' ')[0];

    for (let letter of fen) {
        if (possibleWhites.indexOf(letter) !== -1) {
            whiteScore += pieceValues[letter];
        } else if (possibleBlacks.indexOf(letter) !== -1) {
            blackScore += pieceValues[letter];
        }
    }

    return {
        whiteScore,
        blackScore
    };
}

var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);
