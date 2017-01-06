"use strict";
var PawnTable = [
    0, 0, 0, 0, 0, 0, 0, 0,
    10, 10, 0, -10, -10, 0, 10, 10,
    5, 0, 0, 5, 5, 0, 0, 5,
    0, 0, 10, 20, 20, 10, 0, 0,
    5, 5, 5, 10, 10, 5, 5, 5,
    10, 10, 10, 20, 20, 10, 10, 10,
    20, 20, 20, 30, 30, 20, 20, 20,
    0, 0, 0, 0, 0, 0, 0, 0
];


var KnightTable = [
    0, -10, 0, 0, 0, 0, -10, 0,
    0, 0, 0, 5, 5, 0, 0, 0,
    0, 0, 10, 10, 10, 10, 0, 0,
    0, 0, 10, 20, 20, 10, 5, 0,
    5, 10, 15, 20, 20, 15, 10, 5,
    5, 10, 10, 20, 20, 10, 10, 5,
    0, 0, 5, 10, 10, 5, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
];

var BishopTable = [
    0, 0, -10, 0, 0, -10, 0, 0,
    0, 0, 0, 10, 10, 0, 0, 0,
    0, 0, 10, 15, 15, 10, 0, 0,
    0, 10, 15, 20, 20, 15, 10, 0,
    0, 10, 15, 20, 20, 15, 10, 0,
    0, 0, 10, 15, 15, 10, 0, 0,
    0, 0, 0, 10, 10, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
];

var RookTable = [
    0, 0, 5, 10, 10, 5, 0, 0,
    0, 0, 5, 10, 10, 5, 0, 0,
    0, 0, 5, 10, 10, 5, 0, 0,
    0, 0, 5, 10, 10, 5, 0, 0,
    0, 0, 5, 10, 10, 5, 0, 0,
    0, 0, 5, 10, 10, 5, 0, 0,
    25, 25, 25, 25, 25, 25, 25, 25,
    0, 0, 5, 10, 10, 5, 0, 0
];

var KingTable = [
    10, 10, 15, 10, 10, 10, 10, 10,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
];

var WhitePawnTable = PawnTable.reverse();
var WhiteKnightTable = KnightTable.reverse();
var WhiteBishopTable = BishopTable.reverse();
var WhiteRookTable = RookTable.reverse();
var WhiteKingTable = KingTable.reverse();

var BishopPair = 40;
var score=0;
var PCE;
var PIECES = {
    'wP': 'P',
    'wN': 'N',
    'wB': 'B',
    'wR': 'R',
    'wQ': 'Q',
    'wK': 'K',
    'bp': 'p',
    'bn': 'n',
    'bb': 'b',
    'br': 'r',
    'bq': 'q',
    'bk': 'k'
};

var evalPosition = function(node) {
    var boardState = node.board.fen().split(' ')[0];
    var boardStateSplit = boardState.split("");
    boardStateSplit = boardStateSplit.filter(function(element) {
        if (element !== "/") {
            return element;
        }
        for (var i = 0; i < boardStateSplit.length; i++) {
            if (!isNaN(boardStateSplit[i])) {
                boardStateSplit[i] = new Array(boardStateSplit[i] * 1).fill(0);
            }
        }
    });

    var flattened = boardStateSplit.reduce(function(a, b) {
        return a.concat(b);
    });

    return flattened.split('').filter(function(element) {
        if (element !== ",") {
            return element;
        }
    });
};

function evalute(node) {
    // console.log('evaluate is happening')
    //console.log(WhitePawnTable)
    score = 0;
    var boardState = evalPosition(node);
    PCE = PIECES.wP;
    for (let i = 0; i <= WhitePawnTable.length; i++) {
        if (boardState[i] === PCE) {
            score += WhitePawnTable[i];

        }
    }
    PCE = PIECES.bp;
    for (let i = 0; i <= PawnTable.length; i++) {
        if (boardState[i] === PCE) {
            score -= PawnTable[i];
        }
    }
    PCE = PIECES.wN;
    for (let i = 0; i <= WhiteKnightTable.length; i++) {
        // console.log('WhiteKnights doing heuristics')
        if (boardState[i] === PCE) {
            score += WhiteKnightTable[i];
        }
    }
    PCE = PIECES.bn;
    for (let i = 0; i <= KnightTable.length; i++) {
        // console.log('BlackKnights doing heuristics')
        if (boardState[i] === PCE) {
            score -= KnightTable[i];
        }
    }
    PCE = PIECES.wB;
    for (let i = 0; i <= WhiteBishopTable.length; i++) {
        if (boardState[i] === PCE) {
            score += WhiteBishopTable[i];
        }
    }
    PCE = PIECES.bb;
    for (let i = 0; i <= BishopTable.length; i++) {
        if (boardState[i] === PCE) {
            score -= BishopTable[i];
        }
    }
    PCE = PIECES.wR;
    for (let i = 0; i <= WhiteRookTable.length; i++) {
        if (boardState[i] === PCE) {
            score += WhiteRookTable[i];
        }
    }
    PCE = PIECES.br;
    for (let i = 0; i <= RookTable.length; i++) {
        if (boardState[i] === PCE) {
            score -= RookTable[i];
        }
    }
    PCE = PIECES.wQ;
    for (let i = 0; i <= WhiteRookTable.length; i++) {
        if (boardState[i] === PCE) {
            score += WhiteRookTable[i];
        }
    }
    PCE = PIECES.bq;
    for (let i = 0; i <= RookTable.length; i++) {
        if (boardState[i] === PCE) {
            score -= RookTable[i];
        }
    }
    PCE = PIECES.wK;
    for (let i = 0; i <= WhiteKingTable.length; i++) {
        if (boardState[i] === PCE) {
            score -= WhiteKingTable[i];
        }
    }
    PCE = PIECES.bk;
    for (let i = 0; i <= KingTable.length; i++) {
        if (boardState[i] === PCE) {
            score -= KingTable[i];
        }
    }
    console.log(score)
    return score;
}
