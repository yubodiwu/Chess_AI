'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true

function AImove() {
    var AIColor = 'black';
    var startBoard = tree.root;
    createChildren(startBoard);

    var futureBoardValues = startBoard.children.map(function(ele) {
        return findBestMoveMaxi(ele, 1)
    });

    var bestBoards = startBoard.children.reduce(function(accum, cur) {
        if (accum[accum.length - 1].whiteScore > cur.whiteScore) {
            accum = [cur]
        } else if (accum[accum.length - 1].whiteScore === cur.whiteScore) {
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
}
