# Tic-Tac-Toe

Tic-Tac-Toe is a classic game of taking alternating turn to place noughts and crosses onto a board. 

Play the game here 

https://pablang.github.io/tic-tac-toe/

I have also re-created the game using React.
See it here: https://pablang.github.io/React-tic-tac-toe/


## Technologies Used

CSS library animista 


## Approach

I created a few simples wireframes, listed the must-have features of the game and the nice-to-haves.
Must-have features included a working logic(!), a display that tells you which player is up, a display to say who won and a decent user-interface. Some nice-to-haves we a games counter to track how many games played and how many wins each player has. Other nice-to-haves included an avatar display the player can choose and a level up feature to let you play a 4x4 or 5x5 grid.

I tried to use the approach of checking for wins by using while loops and only running the while loops if the row or column is one of the eight states. 

I managed to get the logic for checking the rows, columns and one of the diagonals but the second diagonal wouldn't work. I think know how to fix it so when I upgrade the game to be able to play a 4 x 4 box it the checkWinner() should still work.

See my thinking/ folder for my planning and wireframes.


## Unresolved Problems

Create a default player name if no input typed in the input box. 

Fix the second diagonal check to make it dynamic.

Separate the checkWinner function into smaller more readable functions.

Fix media queries.




## Features to be added

Let players choose and avatar. 

Create an AI player for one player game.

