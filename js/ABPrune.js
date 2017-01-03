'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true

var tree = new Tree();
tree.root = new Node(game.fen());

function AImove() {
    var AIColor = 'black';
    var possibleMoves = game.moves();
    console.log(possibleMoves.length);

    if (possibleMoves.length === 0) return;

    // value of each moves
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

    var bestBoards = futureBoards.reduce(function(accum, cur) {
        if (accum[accum.length - 1].whiteScore > cur.whiteScore) {
            accum = [cur]
        } else if (accum[accum.length - 1].whiteScore === cur.whiteScore) {
            accum.push(cur)
        }

        return accum
    }, [futureBoards[0]])

    // bestBoards.shifta();
    var randomIndex = Math.floor(Math.random() * bestBoards.length);
    // pick a move`\
    console.log('best');
    console.log(bestBoards);
    console.log(game.fen());

    game.move(bestBoards[randomIndex].move)
    board.position(game.fen());
}

function findBestMove(node) {
    var possibleMoves = game.moves();

    if (possibleMoves.length === 0) return;

    // value of each moves
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
