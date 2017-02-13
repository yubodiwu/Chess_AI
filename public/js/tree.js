'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true

class Node {
    constructor(prevMove, board, whiteScore, blackScore, totalScore){
        this.prevMove = prevMove;
        this.board = board;
        this.whiteScore = whiteScore;
        this.blackScore = blackScore;
        this.totalScore = totalScore;
    }
}

class Tree {
    constructor(){
        this.root = null;
    }
}

// module.exports = {
//     Node,
//     Tree
// };
