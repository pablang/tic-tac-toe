

var ROWS = 3;
var COLS = 3;



var board = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
];

var allBoxes = document.querySelectorAll("section div")
var promptBox = document.querySelector(".alerts")
var resetBtn = document.querySelector(".reset")
var icon = "X";
var gameOver = false;


var checkWinner = function(row, column){
    // Check the row
    var winner = true;
    r = row; 
    c = 0;
    // debugger
    while(c<COLS) {
        if(board[r][c] != icon) {
            winner = false;
            break;
        }
        c++;
    }
    if(winner) {
        return true;
    }
    // Check the column
    winner = true;
    r = 0; 
    c = column;
    while(r<ROWS) {
        if(board[r][c] != icon) {
            winner = false;
            break;
        }
        r++;
    }
    if(winner) {
        return true;
    } 
    // check diagonals
    if (row == column) {
        winner = true;
        r = 0;
        c = 0;
        while(r<ROWS) {
            if(board[r][c] != icon) {
                winner = false;
                break;
            }
            r++
            c++
        }
    }
    if(winner) {
        return true;
    }
    
    if(row == 2 && column == 0 || row == 1 && column == 1 || row == 0 && column == 2) {
        winner = true;
        r = 2;
        c = 0;
        while(c<COLS) {
            if(board[r][c] != icon) {
                winner = false;
                break;
            }
            r--
            c++
        }
    }
    // debugger
    return winner;
}

var addIcon = function (event) {
    var row = event.target.id.split('-')[1]
    var column = event.target.id.split('-')[2]

    if (event.target.classList.contains("O")===false && event.target.classList.contains("X")===false && !gameOver) {
        if (icon === "X") {
            icon = "O";
            event.target.textContent = icon;
            event.target.classList.add('O')
            board[row][column] =  'O';
        }
        else if (icon === "O"){
            icon = "X";
            event.target.textContent = icon;
            event.target.classList.add('X')
            board[row][column] =  'X';
        }
        result = checkWinner(row, column);
        if(result){
            gameOver = true;
            promptBox.textContent = "Winner winner chicken dinner!"
        } 
    }
}

var resetGame = function () {
    allBoxes.forEach(function (box){
        box.classList.remove("X");
        box.classList.remove("O");
        box.textContent = ""
    })
    promptBox.textContent = "";
}


allBoxes.forEach(function (box){
    box.addEventListener('click', addIcon)
}) 

resetBtn.addEventListener('click', resetGame)