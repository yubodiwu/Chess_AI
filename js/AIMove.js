'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true
var hash = {};

function AImove() {
    var t0 = performance.now()
    var AIColor = 'black';
    var startBoard = tree.root;
    var min = Infinity;
    var max = -Infinity;
    createChildren(startBoard);

    var futureBoardValues = startBoard.children.map(function(ele) {
        // console.log('happens')
        return findBestMoveMaxi(ele, 1, max, min)
    });

    var bestBoards = startBoard.children.reduce(function(accum, cur) {
        if (accum[accum.length - 1].score > cur.score) {
            accum = [cur]
        } else if (accum[accum.length - 1].score === cur.score) {
            accum.push(cur)
        }

        return accum
    }, [startBoard.children[0]])

    var minVal = Math.min(...futureBoardValues);
    var minInds = futureBoardValues.reduce(function(accum, cur, i) {
        if (cur === minVal) {
            accum.push(i);
        }

        return accum;
    }, [])
    var minInd = minInds[Math.floor(Math.random() * minInds.length)];
    game.move(startBoard.children[minInd].prevMove)
    board.position(game.fen());
    console.log(`time to move is ${performance.now() - t0}`);
}

function createChildren(node) {
    //create fen

    var fen = node.board.fen();
    var trimmedFen = fen.slice(0, fen.indexOf(' '));
    // console.log(trimmedFen)
    //check if fen already created;
    let cachedNode = hash[trimmedFen];
    if (cachedNode && cachedNode.children) {
        // console.log('cachedNode', cachedNode);
        console.log('Cache Hit', trimmedFen);
        node.children = cachedNode.children;
        return;
    }
    // console.log("Cache Miss", trimmedFen);

    var possibleMoves = node.board.moves();
    if (possibleMoves.length === 0) return;
    node.children = [];

    // value of each moves
    for (var i = 0; i < possibleMoves.length; i++) {
        var possibleBoard = new Chess(node.board.fen());
        possibleBoard.move(possibleMoves[i]);
        let score = evalute(possibleBoard) + getBoardValues(possibleBoard)

        let newNode = new Node(possibleMoves[i], possibleBoard, null, null, score)

        node.children.push(newNode);
        possibleBoard.undo();
    }

    node.children.sort(function(a, b) {
        return b.totalScore - a.totalScore;
    });

    //store new node in the hashtbale;
    hash[trimmedFen] = node;
}
