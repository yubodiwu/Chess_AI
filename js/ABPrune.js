'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true
var tree = new Tree();
tree.root = new Node(null, game, getBoardValues(board).whiteScore, getBoardValues(board).blackScore);
console.log(tree.board);

var children = []
var best = 0;
var worst = 145;

function findBestMoveMaxi(node, depth) {
    if (depth === 0) return node.whiteScore - node.blackScore;
    createChildren(node);

    var max = -999;

    for (let child of node.children) {
        var score = findBestMoveMini(child, depth - 1);

        if (score > max) {
            max = score;
        }
    }

    return max;
}

function findBestMoveMini(node, depth) {
    if (depth === 0) return node.whiteScore - node.blackScore;
    createChildren(node);
    var min = 999;

    for (let child of node.children) {
        var score = findBestMoveMaxi(child, depth - 1)

        if (score < min) {
            min = score;
        }
    }

    return min;
}
