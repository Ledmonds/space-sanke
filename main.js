function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	board = new Board([60,30],[window.innerWidth,window.innerHeight]);
}

function windowResized() {
	resizeCanvas(window.innerWidth,window.innerHeight);
	board.boardResize([window.innerWidth,window.innerHeight]);
}

function keyPressed() {
	//Checking for directional key presses.
	if (keyCode === UP_ARROW || keyCode === 87) {board.getSnake().setBearing(0);} 
	else if (keyCode === RIGHT_ARROW || keyCode === 68) {board.getSnake().setBearing(1);}
	else if (keyCode === DOWN_ARROW || keyCode === 83) {board.getSnake().setBearing(2);} 
	else if (keyCode === LEFT_ARROW || keyCode === 65) {board.getSnake().setBearing(3);}
	
	//Checking for speed change key presses.
	if (keyCode === SHIFT && !board.getSlowerState()) {board.slowGameDown();}
	else if (keyCode === SHIFT && board.getSlowerState()) {board.speedGameUp();}

	//Checking for initial key press.
	if (board.getSnake().getSnakeLooping()) {board.disableSnakeLooping();}

	//Reset Board is snake is dead.
	if (!board.isSnakeLiving()) {board = new Board([60,30],[window.innerWidth,window.innerHeight]);}
}


/*==========
Main
==========*/
function draw() { 
	clear();
	translate(window.innerWidth/2,window.innerHeight/2);

	if (board.isBoardIterable()) {board.iterateBoard();}

	board.iterateBackground();
	board.drawBoard();
}