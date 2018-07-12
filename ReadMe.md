# Introduction:
Modern implementation of the classic Snake game written in the p5js library, created by Jaymz Edmonds: https:p5js.org/. Please clone / unpack repo, then launch index.html to begin game.

![Alt text](./assets/cover_image.jpg?raw=true "Space Snake.js")

## Game Outline
Snake is a game where the player manoeuvres a Snake which grows in length, with the Snake tail itself being a primary obstacle. Players must avoid their own Snake tail, while attempting to navigate to and eat randomly spawning food items. The game is finished when a player either collides with the game border or the Snakes tail.


## Movement Controls
- WSAD Letter Keys: Players can use WSAD keys for direction movement.
- UDLR Arrow Keys: Players can also use the UDLR (Up, Down, Left, Right) directional arrow keys for direction movement.
- Shift: Players can use Shift key to slow and speed up in game movement speed.


## Classes:
- bearing.js: Contains code relevant to bearing (directional) information that the Snake can / is moving in.
- board.js: Contains code relevant to the playing area for the Snake game, such as board game size, size of game nodes. Snake and Food classes are also present in Board.js as this is the environment where they are interacted with.
- deltaTime.js: Contains code relevant to the timing of update cycles for the game.
- floatingText.js: Contains code relevant to creating text based effects used within game.
- food.js: Contains code relevant to the food source for the Snake.
- particles.js: Contains code relevant to creating custom particle effects in game, such as particles when the snake eats some good.
- snake.js: Contains code relevant to the Snake itself.
- sound.js: Contains code relevant to ingame sound effects.
- star: Contains code relevant to the Star field effect generation in game.
- main.js: Just main where code is iterated and run.


## Other Files:
- bugs.txt: Contains current known bugs in game that need to be resolved.
- readMe.txt: ReadMe file for game.
- toDo.txt: Contains a list of new features to be added into game.
- changelog.txt: Tracks changes made through various versions.
- credits.txt: Crediting file for Creative Commons content used within game.