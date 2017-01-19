'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true

var tree = new Tree();
tree.root = new Node(null, game, getBoardValues(game).whiteScore, getBoardValues(game).blackScore);

var children = []



function findBestMoveMaxi(node, depth, max, min) {
    if (depth === 0) {
        counter++
        return node.totalScore;
        // return node.whiteScore - node.blackScore;
    }
    createChildren(node);
    if (!node.children) return node.totalScore;//return node.whiteScore - node.blackScore;

    var value = -Infinity;
    for (let child of node.children) {
        var value = Math.max(value, findBestMoveMini(child, depth - 1, max, min));
        max = Math.max(value, max);

        if (min <= max) {
            console.log('Prune during maxi');
            break;
        }
    }

    return max;
}

function findBestMoveMini(node, depth, max, min) {
    if (depth === 0) {
        counter++;
        return node.totalScore;
        //return node.whiteScore - node.blackScore;
    }
    createChildren(node);
    if (!node.children) return node.totalScore;//return node.whiteScore - node.blackScore;
    var value = Infinity;

    for (let child of node.children) {
        value = Math.min(value, findBestMoveMaxi(child, depth - 1, value, min));
        min = Math.min(value, min);

        if (min <= max) {
            console.log('Prune during mini');
            break;
        }
    }

    return min;
}
