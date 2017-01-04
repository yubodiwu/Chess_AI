'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true

function getBoardValues(board) {
    var whiteScore = 0;
    var blackScore = 0;

    var fen = board.fen().split(' ')[0].split('/');

    for (let i = 0; i < fen.length; i++) {
        for (let j = 0; j < fen[i].length; j++) {
            let letter = fen[i][j];

            if (possibleWhites.indexOf(letter) !== -1) {
                whiteScore += pieceValues[letter];
            } else if (possibleBlacks.indexOf(letter) !== -1) {
                blackScore += pieceValues[letter];
            }
        }

        if (i === 3 || i === 4) {
            var [whiteMid, blackMid] = isMiddle(fen[i], 0.5);
            whiteScore += whiteMid;
            blackScore += blackMid;
        }

        // if (i === 2 || i === 5) {
        //     var [whiteMid, blackMid] =
        // }
    }

    return {
        whiteScore,
        blackScore
    };
}

function isMiddle(row, midVal) {
    var ind = 0;
    var white = 0;
    var black = 0;

    for (let char of row) {
        if (!isNaN(char)) {
            ind += Number(char);
        } else {
            if (possibleBlacks.indexOf(char) !== -1) {
                if (ind === 3 || ind === 4) {
                    black += midVal;
                }
            } else if (possibleWhites.indexOf(char) !== -1) {
                if (ind === 3 || ind === 4) {
                    white += midVal;
                }
            }

            ind++;
        }
    }

    return [white, black]
}

function createChildren(node) {
    var possibleMoves = node.board.moves();

    if (possibleMoves.length === 0) return;

    node.children = []
    // value of each moves
    for(var i = 0; i < possibleMoves.length; i++) {
        var possibleBoard = new Chess(node.board.fen());
        possibleBoard.move(possibleMoves[i]);

        let boardVals = getBoardValues(possibleBoard)

        node.children.push(new Node(possibleMoves[i] , possibleBoard, boardVals.whiteScore, boardVals.blackScore))
    }



}
