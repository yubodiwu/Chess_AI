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
    game = new Chess(),
    statusEl = $('#status'),
    fenEl = $('#fen'),
    pgnEl = $('#pgn');

game = new Chess();

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {

    if (game.game_over() === true || (game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
};

var onDrop = function(source, target) {
    // see if the move is legal
    var move = game.move({
        from: source, to: target, promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null)
        return 'snapback';

    updateStatus();

    if (game.in_checkmate() === true || game.in_draw() === true || piece.search(/^b/) !== -1) {
        return false;
    }
};

var makeRandomMove = function() {
    // AImove(); // testing values
    var possibleMoves = game.moves();

    // game over
    if (possibleMoves.length === 0)
        return;

    var randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    board.position(game.fen());
};

var onDrop = function(source, target) {
    // see if the move is legal
    var move = game.move({
        from: source, to: target, promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null)
        return 'snapback';

    // make random legal move for black
    window.setTimeout(AImove, 250);

};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
    board.position(game.fen());
};

var updateStatus = function() {
    var status = '';

    var moveColor = 'White';
    if (game.turn() === 'b') {
        moveColor = 'Black';
    }

    // checkmate?
    if (game.in_checkmate() === true) {
        status = 'Game over, ' + moveColor + // draw?
        ' is in checkmate.';
    } else if (game.in_draw() === true) {
        status = // game still on
        'Game over, drawn position';
    } else {
        status = moveColor + ' to move';

        // check?
        if (game.in_check() === true) {
            status += ', ' + moveColor + ' is in check';
        }
    }

    statusEl.html(status);
    fenEl.html(game.fen());
    pgnEl.html(game.pgn());
};

function AImove() {
    var AIColor = 'black';
    var possibleMoves = game.moves();

    if (possibleMoves.length === 0)
        return;

    // value of each moves
    var futureBoards = possibleMoves.map(function(ele) {
        var possibleBoard = new Chess(game.fen());
        possibleBoard.move(ele);

        return {'move': ele, possibleBoard, 'whiteScore': getBoardValues(possibleBoard).whiteScore, 'blackScore': getBoardValues(possibleBoard).blackScore}
    });

    var bestBoards = futureBoards.reduce(function(accum, cur) {
        if (accum[accum.length - 1].whiteScore > cur.whiteScore) {
            accum = [cur]
        } else if (accum[accum.length - 1].whiteScore === cur.whiteScore) {
            console.log('happens');
            accum.push(cur)
        }

        return accum
    }, [futureBoards[0]])
    // console.log(bestBoards);
    // bestBoards.shift();
    var randomIndex = Math.floor(Math.random() * bestBoards.length);
    // pick a move`\
    console.log(bestBoards);

    game.move(bestBoards[randomIndex].move)
    board.position(game.fen());
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

    return {whiteScore, blackScore};
}

var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);

updateStatus();
