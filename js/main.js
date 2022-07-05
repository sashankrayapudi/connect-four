/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1':  'red',
    '-1': 'yellow'
};

const BOARD_HEIGHT = 6;
const BOARD_WIDTH = 7;

/*----- app's state (variables) -----*/
let board; // 2D array, nested arrays represent columns
let turn; // 1 or -1; 0 for no user
let gameStatus; // null -> game in play; 1/-1 player win; 'T'


/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);


/*----- functions -----*/
init();

function init() {
    board = [
        [1,0,0,0,0,0], //col 0
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0], //col 6
    ];

    turn = 1;

    gameStatus = null;

    render();
};


function render () {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
            cellEl.style.backgroundColor = COLORS[cellVal];
        });
    });
    renderMarkers();
};


function renderMarkers() {
    markerEls.forEach(function(markerEl, colIdx) {
        markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
    })
};

// update all impacted state, then call render
function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    if (colIdx === -1) return;
    const colArr = board[colIdx];
    //if (!colArr.includes(0)) return;
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    gameStatus = getGameStatus();
    turn *= -1;
    render()
};

function getGameStatus() {

    // check horizontal
    for (let c = 0; c < BOARD_HEIGHT; c++) {
        for (let r = 0; r < BOARD_WIDTH - 3; r++) {
            if (board[r][c] === turn && board[r+1][c] === turn && board[r+2][c] === turn && board[r+3][c] === turn) return turn;
        }
    }

    // check vertical
    for (let r = 0; r < BOARD_HEIGHT; r++) {
        for (let c = 0; c < BOARD_WIDTH - 3; c++) {
            if (board[r][c] === turn && board[r][c+1] === turn && board[r][c+2] === turn && board[r][c+3] === turn) return turn;
        }
    }

    return null;
};