'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true

var tree = new Tree();
tree.root = new Node(null, game, getBoardValues(game).whiteScore, getBoardValues(game).blackScore);

var children = []
var best = 0;
var worst = 145;

function findBestMoveMaxi(node, depth, max, min) {
    if (depth === 0) return node.whiteScore - node.blackScore;
    createChildren(node);
    if (!node.children) return node.whiteScore - node.blackScore;

    for (let child of node.children) {
        var value = findBestMoveMini(child, depth - 1, max, value);

        if (value > min) {
            return min;
        }
        if (value > max) {
            max = value;
        }
    }

    return max;
}

function findBestMoveMini(node, depth, max, min) {
    if (depth === 0) return node.whiteScore - node.blackScore;
    createChildren(node);
    if (!node.children) return node.whiteScore - node.blackScore;

    for (let child of node.children) {
        var value = findBestMoveMaxi(child, depth - 1, value, min);
        
        if (value < max) {
            return max;
        }
        if (value < min) {
            min = value;
        }
    }

    return min;
}
