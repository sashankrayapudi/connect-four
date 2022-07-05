1) Define required constants
- Colors object: null: white, 1: color choice, -1: color choice

2) Define required variables used to track the state of the game
- 2D board array (nested arrays represent columns since player chooses columns)
- Turn variable (1/-1/0: player/player/no user)
- gameStatus Variable

3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
- Player color choice for token
- 2d board array consisting of 42 elements

4) Upon loading the app should:
	4.1) Initialize the state variables
	4.2) Render those values to the page
	4.3) Wait for the user to click a square

5) Handle a player clicking a square

6) Handle a player clicking the replay button