Snake - Jaymz Edmonds

Itroduction:
==========
Modern implementation of the classic snake game written in the p5js javascript libary.

Consists of the following class libraries.
==========
Bearing.js //Holds bearing information about the direction snake is moving / can move.
Board.js //Holds all data relevant to the playing area within the snake game.
Environment.js //Holds data relevant to the general screen environment.
FloatingText.js //Custom class that implements text effects used within game.
Food.js //Holds class data about snake good source.
Snake.js //Holds snake class data.

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

Bugs
====
Snakehead leaves screen by 1 iteration when dead.
When screen is resized the Press any key to play button comes back.
