/*----- constants -----*/


/*----- app's state (variables) -----*/
let board; // 2D array, nested arrays represent columns
let turn; // 1 or -1; 0 for no user


/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
    board = [
        [1,0,0,0,0,-1], //col 0
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [1,0,0,0,0,-1], //col 6
    ];

    turn = 1;

    render();
}


function render () {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
            console.log(cellEl, cellVal);
        });
    });
}