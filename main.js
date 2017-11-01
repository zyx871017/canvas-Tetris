var CANVAS_WIDTH = document.body.clientWidth - 100;
var CANVAS_HEIGHT = document.body.clientHeight - 100;
var KEY_DIRECTION = 'up';
var KEY_DOWN = false;
var LAST_MOVE_TIME = newDate().getTime();
var DOWN_TIME = 800;
var NEXT_TETRIS = Math.floor(Math.random() * tetris.length);


var canvas = document.getElementById('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
var context = canvas.getContext('2d');

function drawMatrix(cxt, x, y) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            drawBackRect(cxt, x + j * 33, y + i * 33, matrix[i][j]);
        }
    }
}

function drawBackRect(cxt, x, y, isFill) {
    cxt.beginPath();
    cxt.fillStyle = isFill ? '#333' : '#eee';
    cxt.fillRect(x, y, 30, 30);
}

function drawTetris(cxt, x, y, index) {
    for (var i = 0; i < tetris[index].length; i++) {
        for (var j = 0; j < tetris[index][i].length; j++) {
            drawBackRect(cxt, x + j * 33, y + i * 33, tetris[index][i][j]);
        }
    }
}

window.addEventListener('keydown', function (e) {
    // 上
    switch (e.keyCode) {
        // 上
        case 38:
            KEY_DIRECTION = 'up';
            KEY_DOWN = true;
            break;
        case 40:
            KEY_DIRECTION = 'down';
            KEY_DOWN = true;
            break;
        case 37:
            KEY_DIRECTION = 'left';
            KEY_DOWN = true;
            break;
        case 39:
            KEY_DIRECTION = 'right';
            KEY_DOWN = true;
            break;
        default:
            KEY_DOWN = false;
            break;
    }
});

window.addEventListener('keyup', function () {
    KEY_DOWN = false;
});

setInterval(function () {
    drawMatrix(context, 300, 20);
    var nextTetrisIndex = Math.floor(Math.random() * tetris.length)
    drawTetris(context, 800, 400, nextTetrisIndex);

    update();
}, 100);

function update() {
    var timeInterval = getInterval();
    if (timeInterval >= DOWN_TIME) {
        if (tetrisToGround()) {

        } else {
            LAST_MOVE_TIME = new Date().getTime();
            tetrisDown();
        }
    }
}

function tetrisToGround() {

}

function tetrisDown() {

}

function tetrisLeft() {

}

function tetrisRight() {

}

function getInterval() {
    var timeNow = new Date().getTime();
    return timeNow - LAST_MOVE_TIME;
}