"use strict";
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
