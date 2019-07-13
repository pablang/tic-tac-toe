

var maxRows = 3
var maxColumns = 3

var board = [];

for (var i = 0; i<maxColumns; i++) {
    board.push([])
    for (var j=0; j<maxRows; j++) {
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
var roundDisplay = document.querySelector('span.number')
var playerOneAvatar = document.querySelector("img#avatar-1")
var playerOneScoreDisplay = document.querySelector(".player1 .wins")
var playerTwoScoreDisplay = document.querySelector(".player2 .wins")
var playerOneName = ""
var playerTwoName = ""
var icon = "O";
var gameOver = false;
var hasWon;
var isDraw = false;
var playsFirst = playerOneName;
var currentPlayer;
var gamesPlayed = 1;
var playerOneWins = 0;
var playerTwoWins = 0;
var boxPlayed = [];


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
    
    rowIndex = row; 
    columnIndex = 0;
    while(columnIndex < maxColumns) {
        if(board[rowIndex][columnIndex] != icon) {
            isWinner = false;
            break;
        }
        columnIndex++;
    }
    if(isWinner) {
        return true;
    }
    // Check the column
    isWinner = true;
    rowIndex = 0; 
    columnIndex = column;
    while(rowIndex < maxRows) {
        if(board[rowIndex][columnIndex] != icon) {
            isWinner = false;
            break;
        }
        rowIndex++;
    }
    if(isWinner) {
        return true;
    } 
    // check diagonals
    if (row == column) {
        isWinner = true;
        rowIndex = 0;
        columnIndex = 0;
        while(rowIndex < maxRows) {
            if(board[rowIndex][columnIndex] != icon) {
                isWinner = false;
                break;
            }
            rowIndex++
            columnIndex++
        }
    }
    if(isWinner) {
        return true;
    }
    // if (row == maxRows-column && column == maxColumns-row) {
    if(row == 2 && column == 0 || row == 1 && column == 1 || row == 0 && column == 2) {
        isWinner = true;
        rowIndex = maxRows-1;
        columnIndex = 0;
        while(columnIndex<maxColumns) {
            if(board[rowIndex][columnIndex] != icon) {
                isWinner = false;
                break;
            }
            rowIndex--
            columnIndex++
        }
    }
    return isWinner
}

var checkDraw = function () {
    if (boxPlayed.length === (maxColumns*maxRows)) {
        return true
    }
}

var addIcon = function (event) {
    var row = event.target.id.split('-')[1]
    var column = event.target.id.split('-')[2]
    boxPlayed.push([row,column].join(","))

    if (event.target.classList.contains("O")===false && event.target.classList.contains("X")===false && !gameOver && playerTwoName !== "") {
        if (icon === "X") {
            icon = "O"; 
            event.target.textContent = icon;
            event.target.classList.add('slide-in-right')
            event.target.classList.add('O')
            board[row][column] =  'O';

        }
        else if (icon === "O"){
            icon = "X";
            event.target.textContent = icon;
            event.target.classList.add('slide-in-left')
            event.target.classList.add('X')
            board[row][column] =  'X';
        }
        hasWon = checkWinner(row, column);
        isDraw = checkDraw()

        checkTurn(icon)
        promptBox.textContent = "It's " + currentPlayer + "'s turn"

        if (hasWon) {
            gameOver = true;
            promptBox.textContent = currentPlayer + "wins!!"
            promptBox.classList.add('win')
            updateStats()
        } else if (hasWon == false && isDraw){
            gameOver = true;
            promptBox.textContent = "Game is a draw"
            updateStats()
        }

    } 
}

var updateStats = function () {
    gamesPlayed++
    roundDisplay.textContent = gamesPlayed;
    if (isDraw) {

    }
    else if (currentPlayer == playerOneName) {
        playerOneWins++
        playerOneScoreDisplay.textContent = playerOneWins;
    } else if (currentPlayer == playerTwoName){
        playerTwoWins++
        playerTwoScoreDisplay.textContent = playerOneWins;
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

    for (var i = 0; i<maxColumns; i++) {
        board[i]
        for (var j=0; j<maxRows; j++) {
            board[i][j] = false;
        }
    }

    promptBox.textContent = "";
    gameOver= false;
    boxPlayed = []
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
    box.addEventListener('click', addIcon)
}) 

startBtn.addEventListener('click', startGame)

resetBtn.addEventListener('click', resetGame)

okBtn.addEventListener('click', savePlayerOneName)