/*----- constants -----*/
const NUM_COLS = 7;
const NUM_ROWS = 6;

/*----- app's state (variables) -----*/
let board; // 2D array, nested arrays represent columns
let turn; // 1 or -1; 0 for no user
let gameStatus; // null -> game in play; 1/-1 player win; 'T'
let colors; // object with three properties, 1,-1 key value will change by user input


/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];
const msgEl = document.querySelector('h2');
const replayBtn = document.querySelector('button');
const submitBtn = document.getElementById('submit-color');

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);
submitBtn.addEventListener('click', changePlayerColor);
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

    colors = {
        '0': 'white',
        '1':  'red',
        '-1': 'yellow'
    };

    turn = 1;

    gameStatus = null;

    render();
};


function render () {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
            cellEl.style.backgroundColor = colors[cellVal];
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
    if (gameStatus) {
        markerEls.forEach(function(markerEl) {
            markerEl.style.visibility = 'hidden';
        })
    };
};

function renderMessage() {
    let turnName = (turn === 1) ? 'One' : 'Two';
    let gameName = (gameStatus === 1) ? 'One' : 'Two';
    if (gameStatus === null) {
        msgEl.innerHTML = `Player <span style="color: ${colors[turn]}">${turnName}'s</span> Turn`;
    } else if (gameStatus === 'T') {
        msgEl.textContent = 'Tie Game'
    } else {
        msgEl.innerHTML = `Player <span style="color: ${colors[gameStatus]}">${gameName}</span> Wins!`;
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
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    gameStatus = getGameStatus();
    turn *= -1;
    render();
};

// update all impacted state, then call render
// extract color value from input, update colors state variable. Colors will update automatically through render function.
function changePlayerColor() {
    let pOneColor = document.getElementById("p-one-color").value;
    let pTwoColor = document.getElementById("p-two-color").value;
    colors['1'] = pOneColor;
    colors['-1'] = pTwoColor;
    render();
};

function getGameStatus() {

    // check horizontal (vertical on 2D array board variable)
    for (let rowIdx = 0; rowIdx < NUM_ROWS; rowIdx++) {
        for (let colIdx = 0; colIdx < NUM_COLS - 3; colIdx++) {
            if (board[colIdx][rowIdx] === turn && board[colIdx+1][rowIdx] === turn && board[colIdx+2][rowIdx] === turn && board[colIdx+3][rowIdx] === turn) return turn;
        }
    }

    // check vertical (horizontal on 2D array board variable)
    for (let colIdx = 0; colIdx < NUM_ROWS; colIdx++) {
        for (let rowIdx = 0; rowIdx < NUM_COLS - 3; rowIdx++) {
            if (board[colIdx][rowIdx] === turn && board[colIdx][rowIdx+1] === turn && board[colIdx][rowIdx+2] === turn && board[colIdx][rowIdx+3] === turn) return turn;
        }
    }

    // check diagonal / (\ on 2D array board variable)
    for (let rowIdx = 0; rowIdx < NUM_ROWS - 3; rowIdx++) {
        for (let colIdx = 0; colIdx < NUM_COLS - 3; colIdx++) {
            if (board[colIdx][rowIdx] === turn && board[colIdx+1][rowIdx+1] === turn && board[colIdx+2][rowIdx+2] === turn && board[colIdx+3][rowIdx+3] === turn) return turn;
        }
    }

    // check diagonal \ (/ on 2D array board variable)
    for (let rowIdx = NUM_ROWS - 1; rowIdx > NUM_ROWS - 4; rowIdx--) {
        for (let colIdx = 0; colIdx < NUM_COLS - 3; colIdx++) {
            if (board[colIdx][rowIdx] === turn && board[colIdx+1][rowIdx-1] === turn && board[colIdx+2][rowIdx-2] === turn && board[colIdx + 3][rowIdx - 3] === turn) return turn;
        }
    }

    // check tie
    for (let colIdx = 0; colIdx < NUM_COLS; colIdx++) {
        for (let rowIdx = 0; rowIdx < NUM_ROWS; rowIdx++) {
            if (board[colIdx][rowIdx] === 0) {
                return null;
            } else {
                continue;
            }
        }
    }

    return 'T';
};

