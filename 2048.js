
var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    //    board = [
    //    [2, 2, 2, 2],
    //    [2, 2, 2, 2],
    //    [4, 4, 8, 8],
    //    [4, 4, 8, 8]
    //]


    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById('board').append(tile);
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = '';
    tile.classList.value = ''; //clear the class list
    tile.classList.add('tile');
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add('x'+num.toString()); //this will add the class x2, x4, x8, etc.
        } else {
            tile.classList.add('x8192');
        }
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
    } 
    else if (e.code == "ArrowRight") {
        slideRight();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
    }
    else if (e.code == 'ArrowDown') {
        slideDown();
    }
})

function filerZero(row) {
    return row.filter(num => num != 0); // creates a new array with all elements that pass the test implemented by the provided function.
}

function slide(row) {
    row = filerZero(row); // get rid of zeros

    // slide
    for (let i = 0; i < row.length-1; i++) {
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }


row = filerZero(row); // get rid of zeros

    while (row.length < columns) {
    row.push(0);
    }

return row;
}


function slideLeft() {
    for (let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row; 

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row; 

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]; // get the column
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) { // loop through columns
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]; // get the column 
        row.reverse();
        row = slide(row);
        row.reverse();
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        
        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());  // get the tile
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}