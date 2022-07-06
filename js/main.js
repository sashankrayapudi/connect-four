/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1':  'red',
    '-1': 'yellow'
};

const BOARD_HEIGHT = 7;
const BOARD_WIDTH = 6;

/*----- app's state (variables) -----*/
let board; // 2D array, nested arrays represent columns
let turn; // 1 or -1; 0 for no user
let gameStatus; // null -> game in play; 1/-1 player win; 'T'


/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];
const msgEl = document.querySelector('h2');
const replayBtn = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);
replayBtn.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
    board = [
        [0,0,0,0,0,0], //col 0
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
    renderMessage();
    replayBtn.style.visibility = gameStatus ? 'visible' : 'hidden';
};


function renderMarkers() {
    markerEls.forEach(function(markerEl, colIdx) {
        markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
    })
};

function renderMessage() {
    if (gameStatus === null) {
        msgEl.innerHTML = `Player <span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    } else if (gameStatus === 'T') {
        msgEl.textContent = 'Tie Game'
    } else {
        msgEl.innerHTML = `Player <span style="color: ${COLORS[gameStatus]}">${COLORS[gameStatus].toUpperCase()}</span>'s Wins!`;
    }
};

// update all impacted state, then call render
function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);

    //guards
    if (
        colIdx === -1 ||
        gameStatus
    ) return;
    const colArr = board[colIdx];
    //if (!colArr.includes(0)) return;
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    gameStatus = getGameStatus();
    turn *= -1;
    render();
};

function getGameStatus() {

    // check horizontal (vertical on 2D array board variable)
    for (let c = 0; c < BOARD_WIDTH; c++) {
        for (let r = 0; r < BOARD_HEIGHT - 3; r++) {
            if (board[r][c] === turn && board[r+1][c] === turn && board[r+2][c] === turn && board[r+3][c] === turn) return turn;
        }
    }

    // check vertical (horizontal on 2D array board variable)
    for (let r = 0; r < BOARD_WIDTH; r++) {
        for (let c = 0; c < BOARD_HEIGHT - 3; c++) {
            if (board[r][c] === turn && board[r][c+1] === turn && board[r][c+2] === turn && board[r][c+3] === turn) return turn;
        }
    }


    return null;
};