'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true
var potMoveVal = 0.025

function getBoardValues(board) {
    var whiteScore = 0;
    var blackScore = 0;

    var fen = board.fen().split(' ')[0].split('/');
    var sideToMove = board.fen().split(' ')[1];
    var [whitePositions, blackPositions] = getPositions(board);

    // for (let position of whitePositions) {
    //     var posMoves = board.moves({square: position})
    //     whiteScore += posMoves.length * potMoveVal;
    //
    //     for (let move of posMoves) {
    //         let xind = move.indexOf('x');
    //
    //         if (xind !== -1) {
    //             let pos = move.substring(xind + 1, xind + 3);
    //             let pieceVal = pieceValues[board.get(pos).type];
    //             whiteScore += potMoveVal * pieceVal
    //         }
    //     }
    // }
    //
    // for (let position of blackPositions) {
    //     var posMoves = board.moves({square: position})
    //     blackScore += posMoves.length * potMoveVal;
    //
    //     for (let move of posMoves) {
    //         let xind = move.indexOf('x');
    //
    //         if (xind !== -1) {
    //             let pos = move.substring(xind + 1, xind + 3);
    //             let pieceVal = pieceValues[board.get(pos).type];
    //             whiteScore += potMoveVal * pieceVal
    //         }
    //     }
    // }

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
            let [whiteMid, blackMid] = isMiddle(fen[i], 0.5);
            let [whiteMid2, blackMid2] = isMiddle2(fen[i], 0.3);
            whiteScore = whiteScore + whiteMid + whiteMid2;
            blackScore = blackScore + blackMid + blackMid2;
        }

        if (i === 2 || i === 5) {
            let [whiteMid, blackMid] = isMiddle(fen[i], 0.3);
            let [whiteMid2, blackMid2] = isMiddle2(fen[i], 0.3);
            whiteScore = whiteScore + whiteMid + whiteMid2;
            blackScore = blackScore + blackMid + blackMid2;
        }
    }

    [whiteScore, blackScore] = gameEnders(board, whiteScore, blackScore, sideToMove);

    return {
        whiteScore,
        blackScore
    };
}

function getPositions(board) {
    var whiteSpaces = [];
    var blackSpaces = [];

    for (let letter of 'abcdefgh') {
        for (let i = 1; i <= 8; i++) {
            var space = board.get(letter + i);

            if (space) {
                if (space.color === 'b') {
                    blackSpaces.push(letter + i);
                } else if (space.color === 'w') {
                    whiteSpaces.push(letter + i);
                }
            }
        }
    }

    return [whiteSpaces, blackSpaces];
}

function gameEnders(board, whiteScore, blackScore, sideToMove) {
    if (board.in_stalemate() || board.in_draw()) {
        whiteScore = 0;
        blackScore = 0;
    } else if (board.in_checkmate()) {
        if (sideToMove === 'w') {
            whiteScore = 0;
        } else if (sideToMove === 'b') {
            blackScore = 0;
        }
    } else if (board.in_check()) {
        if (sideToMove === 'w') {
            blackScore += 0.8;
        } else if (sideToMove === 'b') {
            whiteScore += 0.8
        }
    }

    return [whiteScore, blackScore];
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

function isMiddle2(row, midVal) {
    var ind = 0;
    var white = 0;
    var black = 0;

    for (let char of row) {
        if (!isNaN(char)) {
            ind += Number(char);
        } else {
            if (possibleBlacks.indexOf(char) !== -1) {
                if (ind === 2 || ind === 5) {
                    black += midVal;
                }
            } else if (possibleWhites.indexOf(char) !== -1) {
                if (ind === 2 || ind === 5) {
                    white += midVal;
                }
            }

            ind++;
        }
    }

    return [white, black]
}
