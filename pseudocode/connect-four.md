1) Define required constants
- number of columns (7)
- number of rows (6)

2) Define required variables used to track the state of the game
- 2D board array (nested arrays represent columns since player chooses columns)
- turn variable (1/-1/0: player/player/no user)
- gameStatus Variable (null, 1/-1, 'T')
- colors object (1,-1,0: p1 color input, p2 colors input, white)

3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
- Player color input choice for tokens
- 2d board array consisting of 42 div elements

4) Upon loading the app should:
	4.1) Initialize the state variables
	- board with 42 0 values
	- colors set to default (red for 1, yellow for -1, white for 0)
	- set turn to 1
	- gameStatus set to null
	4.2) Render those values to the page
	- loop over the 42 divs, set the background color based on colors object
	- render markers based on gameStatus and turn (also if a certain column is full or not)
	- render a message based on the gameStatus and turn
	- render the replay button based on gameStatus
	4.3) Wait for the user to click a marker

5) 
Handle a player clicking a marker
- cache the index of the clicked marker into colIdx (represents columns index)
- return out of the function if there is no marker click or if gameStatus is not null
- set the cellVal value to turn value on a column based on colIdx and make sure it is the first 0 encountered (using indexOf function). This will simulate a player dropping a token and filling up the first available space within that column.
- set the gameStatus variable if there is a winner. Use nested for loops to traverse through the board and find four of the same turn values in a row. 
- if all board values are non-zero and there is no winning combination, set gameStatus to 'T' (tie).
- change the turn by multiplying the turn variable by -1
- all state has been updated, call render

Handle a player changing token color
- cache the 'update token color' button and add an event listener to it
- every time the update color button is clicked, values will be cached from the RGB color input as a hex code. update the colors object state variable with these codes
- all state has been updated, call render

6) Handle a player clicking the replay button
- add an event listener to the replay button, and make a call to init within the listener