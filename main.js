var CANVAS_WIDTH = document.body.clientWidth - 100;
var CANVAS_HEIGHT = document.body.clientHeight - 100;
var KEY_DIRECTION = 'up';
var KEY_DOWN = false;
var LAST_MOVE_TIME = new Date().getTime();
var DOWN_TIME = 800;
var nextTetrisIndex = Math.floor(Math.random() * tetris.length);
var newTetris = tetris[Math.floor(Math.random() * tetris.length)];
var CUR_TETRIS = {
    tetris: newTetris,
    top: 1 - newTetris.length,
    left: 3,
    direct: 'up'
};
var CUR_MATRIX = JSON.parse(JSON.stringify(matrix));


var canvas = document.getElementById('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
var context = canvas.getContext('2d');

function drawMatrix(cxt, x, y, nowMatrix) {
    for (var i = 0; i < nowMatrix.length; i++) {
        for (var j = 0; j < nowMatrix[i].length; j++) {
            drawBackRect(cxt, x + j * 23, y + i * 23, nowMatrix[i][j]);
        }
    }
}

function drawBackRect(cxt, x, y, isFill) {
    cxt.beginPath();
    cxt.fillStyle = isFill ? '#333' : '#eee';
    cxt.fillRect(x, y, 20, 20);
}

function drawTetris(cxt, x, y, index) {
    cxt.clearRect(x, y, 23 * 4, 23 * 2);
    for (var i = 0; i < tetris[index].length; i++) {
        for (var j = 0; j < tetris[index][i].length; j++) {
            drawBackRect(cxt, x + j * 23, y + i * 23, tetris[index][i][j]);
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
    drawMatrix(context, 300, 20, mixCurMatrix());
    drawTetris(context, 800, 400, nextTetrisIndex);

    update();
}, 100);

function update() {
    var timeInterval = getInterval();
    if (timeInterval >= DOWN_TIME) {
        if (tetrisToGround()) {
            CUR_MATRIX = mixCurMatrix();
            CUR_TETRIS = {
                tetris: tetris[nextTetrisIndex],
                top: 1 - tetris[nextTetrisIndex].length,
                left: 3,
                direct: 'up'
            };
            nextTetrisIndex = Math.floor(Math.random() * tetris.length);
        } else {
            LAST_MOVE_TIME = new Date().getTime();
            tetrisDown();
        }
    }
}

function mixCurMatrix() {
    var newMatrix = JSON.parse(JSON.stringify(CUR_MATRIX));
    for (var i = 0; i < CUR_TETRIS.tetris.length; i++) {
        for (var j = 0; j < CUR_TETRIS.tetris[i].length; j++) {
            if (i + CUR_TETRIS.top >= 0 && j + CUR_TETRIS.left >= 0) {
                newMatrix[i + CUR_TETRIS.top][j + CUR_TETRIS.left] = CUR_TETRIS.tetris[i][j] || newMatrix[i + CUR_TETRIS.top][j + CUR_TETRIS.left];
            }
        }
    }
    return newMatrix;
}

function tetrisUp() {
    var curTetris = [];
    var lastTetris = CUR_TETRIS.tetris;
    for (var i = 0; i < lastTetris.length; i++) {
        for (var j = 0; j < lastTetris[i].length; j++) {
            if (!curTetris[lastTetris[i].length - 1 - j]) {
                curTetris[lastTetris[i].length - 1 - j] = [];
            }
            curTetris[lastTetris[i].length - 1 - j][i] = lastTetris[i][j];
        }
    }
    CUR_TETRIS.tetris = curTetris;
}

function tetrisToGround() {
    if (CUR_TETRIS.top + CUR_TETRIS.tetris.length - 1 >= 19) {
        return true;
    }
    for (var i = CUR_TETRIS.top; i < CUR_TETRIS.top + CUR_TETRIS.tetris.length; i++) {
        var ti = i - CUR_TETRIS.top;
        for (var j = CUR_TETRIS.left; j < CUR_TETRIS.left + CUR_TETRIS.tetris[ti].length; j++) {
            var tj = j - CUR_TETRIS.left;
            if (CUR_TETRIS.tetris[ti][tj] === 1 && CUR_MATRIX[i + 1][j] === 1) {
                return true;
            }
        }
    }
    return false;
}

function tetrisDown() {
    CUR_TETRIS.top += 1;
}

function tetrisLeft() {
    if (CUR_TETRIS.left > 0) {
        CUR_TETRIS.left--;
    }
}

function tetrisRight() {
    if (CUR_TETRIS.right < 9) {
        CUR_TETRIS.left++;
    }
}

function getInterval() {
    var timeNow = new Date().getTime();
    return timeNow - LAST_MOVE_TIME;
}