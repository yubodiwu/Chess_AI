'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true

class Node {
    constructor(prevMove, board, whiteScore, blackScore){
        this.prevMove = prevMove;
        this.board = board;
        this.whiteScore = whiteScore;
        this.blackScore = blackScore;
<<<<<<< HEAD
        this.children = [];
=======
>>>>>>> aa3af056b0f1b3729bf5a1032fbd96bf4708173b
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
