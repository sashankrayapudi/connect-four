/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1':  'red',
    '-1': 'yellow'
};

const NUM_COLS = 7;
const NUM_ROWS = 6;

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
    for (let valIdx = 0; valIdx < NUM_ROWS; valIdx++) {
        for (let colIdx = 0; colIdx < NUM_COLS - 3; colIdx++) {
            if (board[colIdx][valIdx] === turn && board[colIdx+1][valIdx] === turn && board[colIdx+2][valIdx] === turn && board[colIdx+3][valIdx] === turn) return turn;
        }
    }

    // check vertical (horizontal on 2D array board variable)
    for (let colIdx = 0; colIdx < NUM_ROWS; colIdx++) {
        for (let valIdx = 0; valIdx < NUM_COLS - 3; valIdx++) {
            if (board[colIdx][valIdx] === turn && board[colIdx][valIdx+1] === turn && board[colIdx][valIdx+2] === turn && board[colIdx][valIdx+3] === turn) return turn;
        }
    }

    

    // check tie
    for (let colIdx = 0; colIdx < NUM_COLS; colIdx++) {
        for (let valIdx = 0; valIdx < NUM_ROWS; valIdx++) {
            if (board[colIdx][valIdx] === 0) {
                return null;
            } else {
                continue;
            }
        }
    }

    return 'T';
};

