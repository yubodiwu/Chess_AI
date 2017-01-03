'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true

class Node (){
    constructor(val){
        this.val = val;
        this.children = [];
    }
}

class Tree (){
    constructor(){
        this.root = null;
    }
}

module.exports = {
    Node,
    Tree
};
