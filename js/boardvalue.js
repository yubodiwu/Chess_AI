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
    var sideToMove = board.fen().split(' ')[1];
    var [whitePositions, blackPositions] = getPositions(board);

    for (let i = 0; i < fen.length; i++) {
        for (let j = 0; j < fen[i].length; j++) {
            let letter = fen[i][j];

            if (possibleWhites.indexOf(letter) !== -1) {
                whiteScore += pieceValues[letter];
            } else if (possibleBlacks.indexOf(letter) !== -1) {
                blackScore += pieceValues[letter];
            }
        }
    }

    [whiteScore, blackScore] = gameEnders(board, whiteScore, blackScore, sideToMove);

    return whiteScore - blackScore;
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
