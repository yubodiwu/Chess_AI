'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true

var tree = new Tree();
tree.root = new Node(null, game, getBoardValues(board).whiteScore, getBoardValues(board).blackScore);
console.log(tree);

function findBestMoveMaxi(node, depth) {
    if (depth === 0) return evaluate();
    createChildren(node)

    var max = 0;

    for (let child of node.children) {
        var score = findBestMoveMini(child, depth - 1);

        if (score > max) {
            max = score;
        }
    }

    return max;
}

function findBestMoveMini(node, depth) {
    if (depth === 0) return evaluate()

    var min = 145;

    for (let child of node.children) {
        score = findBestMoveMaxi(child, depth - 1)

        if (score < min) {
            min = score;
        }
    }

    return min;
}

function createChildren(node) {
    var possibleMoves = node.board.moves();

    if (possibleMoves.length === 0) return;

    // value of each moves
    node.children = possibleMoves.map(function(ele) {
        var possibleBoard = new Chess(node.board.fen());
        possibleBoard.move(ele);

        return new Node(ele, possibleBoard, getBoardValues(possibleBoard).whiteScore, getBoardValues(possibleBoard).blackScore);
    });
}

function AImove() {
    var AIColor = 'black';
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

    findBestMove(tree.root, 0)
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

    return {
        whiteScore,
        blackScore
    };
}
