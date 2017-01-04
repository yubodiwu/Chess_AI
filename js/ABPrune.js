'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true
var tree = new Tree();
tree.root = new Node(null, game, getBoardValues(board).whiteScore, getBoardValues(board).blackScore);

var children = []
var best = 0;
var worst = 145;
var max = -999;
var min = 999;

function findBestMoveMaxi(node, depth, max, min) {
    if (depth === 0) return node.whiteScore - node.blackScore;
    createChildren(node);


    for (let child of node.children) {
        var score = findBestMoveMini(child, depth - 1, max, min);
        if(score >= min){
            return min
        }
        if (score > max) {
            console.log("max");
            max = score;
        }
    }

    return max;
}

function findBestMoveMini(node, depth, max, min) {
    if (depth === 0) return node.whiteScore - node.blackScore;
    createChildren(node);

    for (let child of node.children) {
        var score = findBestMoveMaxi(child, depth - 1, max, min);
        if(score <= max){
            return max;
        }
        if (score < min) {
            //console.log("min");
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
    var startBoard = tree.root;
    createChildren(startBoard);

    var futureBoardValues = startBoard.children.map(function(ele) {
        return findBestMoveMaxi(ele, 1, max, min);
    })

    console.log(futureBoardValues);

    var bestBoards = startBoard.children.reduce(function(accum, cur) {
        if (accum[accum.length - 1].whiteScore > cur.whiteScore) {
            accum = [cur]
        } else if (accum[accum.length - 1].whiteScore === cur.whiteScore) {
            accum.push(cur)
        }

        return accum
    }, [startBoard.children[0]])

    var minVal = Math.min(...futureBoardValues);
    var minInds = futureBoardValues.reduce(function(accum, cur, i) {
        if (cur === minVal) {
            accum.push(i);
        }

        return accum;
    }, [])
    var minInd = minInds[Math.floor(Math.random() * minInds.length)];
    game.move(startBoard.children[minInd].prevMove)
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
