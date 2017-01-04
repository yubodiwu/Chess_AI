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

function findBestMoveMaxi(node, depth, max, min) {
    if (depth === 0) return node.whiteScore - node.blackScore;
    createChildren(node);



    console.log("count");
    for (let child of node.children) {
        var score = findBestMoveMini(child, depth - 1, max, min);
        if(score >= min){

            return min

    var value = -Infinity;
    for (let child of node.children) {
        value = findBestMoveMini(child, depth - 1, max, value);
        if(value > min){
            return value

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
    var value = Infinity;
    for (let child of node.children) {
        var value = findBestMoveMaxi(child, depth - 1, value, min);
        if(value < max){
            return value;
        }
        if (value < min) {
            min = value;
        }
    }

    return min;
}
