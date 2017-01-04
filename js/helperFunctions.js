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
            var [whiteMid, blackMid] = isMiddle(fen[i]);
            whiteScore += whiteMid;
            blackScore += blackMid;
        }
    }

    return {
        whiteScore,
        blackScore
    };
}

function isMiddle(row) {
    var ind = 0;
    var white = 0;
    var black = 0;

    for (let char of row) {
        if (!isNaN(char)) {
            ind += Number(char);
        } else {
            if (possibleBlacks.indexOf(char) !== -1) {
                if (ind === 3 || ind === 4) {
                    black += 1;
                } //else if (ind === 2 || ind === 5) {
                //     black += 0.5;
                // }
            } else if (possibleWhites.indexOf(char) !== -1) {
                if (ind === 3 || ind === 4) {
                    white += 1;
                } // else if (ind === 2 || ind === 5) {
                    // white += 0.5;
                // }
            }

            ind++;
        }
    }

    return [white, black]
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
