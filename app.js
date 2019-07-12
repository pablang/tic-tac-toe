

var ROWS = 3
var COLS = 3

var board = [];

for (var i = 0; i<COLS; i++) {
    board.push([])
    for (var j=0; j<ROWS; j++) {
        board[i].push(false)
    }
}


var allBoxes = document.querySelectorAll('div div')
var promptBox = document.querySelector(".alerts")
var resetBtn = document.querySelector(".reset")
var startBtn = document.querySelector(".start")
var okBtn = document.querySelector(".ok")
var playerOneInputBox = document.querySelector(".player1")
var playerTwoInputBox = document.querySelector(".player2")
var roundDisplay = document.querySelector('#number')
var playerOneAvatar = document.querySelector("img#avatar-1")
var playerOneName = ""
var playerTwoName = ""
var icon = "O";
var gameOver = false;
var gamesPlayed = 1;
var playsFirst = playerOneName //plays an X
var currentPlayer;
var playerOneWins = 0;
var playerTwoWins = 0;


// if a player went first that means they are "X". if P1 went first that means P2 is "O"
// 




var checkTurn = function () {
    if (icon == "O") {
        currentPlayer = playerTwoName;
    } else {
        currentPlayer = playerOneName;
    }
}

var checkWinner = function(row, column){

    // Check the row
    var isWinner = true;
    r = row; 
    c = 0;
    // debugger
    while(c<COLS) {
        if(board[r][c] != icon) {
            isWinner = false;
            break;
        }
        c++;
    }
    if(isWinner) {
        return true;
    }
    // Check the column
    isWinner = true;
    r = 0; 
    c = column;
    while(r<ROWS) {
        if(board[r][c] != icon) {
            isWinner = false;
            break;
        }
        r++;
    }
    if(isWinner) {
        return true;
    } 
    // check diagonals
    if (row == column) {
        isWinner = true;
        r = 0;
        c = 0;
        while(r<ROWS) {
            if(board[r][c] != icon) {
                isWinner = false;
                break;
            }
            r++
            c++
        }
    }
    if(isWinner) {
        return true;
    }

    // if (row == ROWS-column && column == COLS-row) {
    if(row == 2 && column == 0 || row == 1 && column == 1 || row == 0 && column == 2) {
        // debugger
        isWinner = true;
        r = ROWS-1;
        c = 0;
        while(c<COLS) {
            if(board[r][c] != icon) {
                isWinner = false;
                break;
            }
            r--
            c++
        }
    }
    
    // debugger
    return isWinner;
    
}

var checkDraw = function () {
    var drawGame = true
    while (drawGame ) {
        board.forEach(function(box){
            if (box == false)
            drawGame  = false;
    })
    }
    return drawGame
}

var addIcon = function (event) {
    // debugger
    var row = event.target.id.split('-')[1]
    var column = event.target.id.split('-')[2]

    if (event.target.classList.contains("O")===false && event.target.classList.contains("X")===false && !gameOver && playerTwoName !== "") {
        if (icon === "X") {
            // debugger
            icon = "O"; //currentPlayer
            event.target.textContent = icon;
            event.target.classList.add('slide-in-right')
            event.target.classList.add('O')
            board[row][column] =  'O';

        }
        else if (icon === "O"){
            icon = "X";
            // debugger
            event.target.textContent = icon;
            event.target.classList.add('slide-in-left')
            event.target.classList.add('X')
            board[row][column] =  'X';
        }
        var hasWon = checkWinner(row, column);
        // if (!hasWon) {
        //     checkDraw()
        // }
        // var drawGame = checkDraw()
        checkTurn(icon)
        promptBox.textContent = "It's " + currentPlayer + "'s turn"
        // if(hasWon || drawGame) {
        if(hasWon) {
            gameOver = true;
            promptBox.classList.add('win');
            promptBox.classList.add('pulsate-fwd');
            promptBox.textContent = "Player " + currentPlayer + " wins!!"
            updateStats()
        }
    } 
}

var updateStats = function () {
    gamesPlayed++
    if (currentPlayer == playerTwoName) {
        playerOneWins++
    } else {
        playerTwoWins++
    }
}

var startGame = function () {
    startBtn.classList.add('hide')
    playerOneInputBox.classList.remove('hide')
    okBtn.classList.remove('hide')
}

var resetGame = function () {
    allBoxes.forEach(function (box){
        box.classList.remove("X");
        box.classList.remove("O");
        box.textContent = ""
    })
    board = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ];
    promptBox.textContent = "";
    gameOver= false;
    whoPlaysFirst()
}

var savePlayerOneName = function (){

    if (playerOneName ===""){
        if (playerOneInputBox.value === "Frankie") {
            playerOneAvatar.src = "Frankie.png"
        }
        playerOneName = playerOneInputBox.value;
        playerOneInputBox.classList.add('hide');
        playerTwoInputBox.classList.remove("hide");
    } else {
        playerTwoName = playerTwoInputBox.value;
        playerTwoInputBox.classList.add("hide");
        okBtn.classList.add('hide');
        promptBox.classList.remove('hide');
    }
    whoPlaysFirst()
}


var whoPlaysFirst = function () {
    if (gamesPlayed % 2 == 1 ) {
        playsFirst = playerOneName;
    } else {
        playsFirst = playerTwoName;
    }
    promptBox.textContent = "It's " + playsFirst + "'s turn"
}
        

allBoxes.forEach(function (box){
    // debugger
    box.addEventListener('click', addIcon)
}) 

startBtn.addEventListener('click', startGame)

resetBtn.addEventListener('click', resetGame)

okBtn.addEventListener('click', savePlayerOneName)