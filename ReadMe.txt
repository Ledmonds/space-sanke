Itroduction:
==========
Modern implementation of the classic Snake game written in the p5js library, created by Jaymz Edmonds: https://p5js.org/

Custom Classes.
==========
Food.js 			//Contains code relevant to the food source for the Snake.
Snake.js 			//Contains code relevant to the Snake itself.
Bearing.js 			//Contains code relevant to bearing (direction) information that the Snake can / is moving in.
Board.js 			//Contains code relevant to the playing area for the Snake game, such as board game size, size of game nodes. Snake and Food classes are also present in Board.js as this is the environment where they are interacted with.
Environment.js 		//Contains code relevant to the general screen environment, such as background, information text, etc.
FloatingText.js 	//Contains code relevant to creating text based effects used within game.
Particles.js:		//Contains code relevant to creating custom particle effects in game, such as particles when the Snake eats some good.

ToDo:
==========
Easy:
=====
Play again button.
Eaten food colour block within snake; shows which posistion food was in when it was eaten by the snake.
Draw a tounge that randomly comes out from the snake, maybe as it traverses towards the food.
Upload to Github and use to manage code.
Rethink naming convention for border as this is to similar to board.

Medium:
=====
Food randomiseCoOrds function to check if it collides with part of the snake body to stop it from spawning where the snake already is.
Some background effects outside of the border: maybe a few snakes randomly traversing the terrain in the background while the user plays.
Fix the Border drawing function, use Board class to push border CoOrds back to environment class [x1,y1,x2,y2,node_size];

Hard:
=====
Implement delta time for movement, over using the frame rate as speed can not be as yet correctly calculated.
Port settings to external settings file.

Bugs:
=====
Snakehead leaves screen by 1 iteration when dead.
When screen is resized the Press any key to play button comes back.
