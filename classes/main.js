function preload() {
	sound = new Sound();
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	board = new Board([50,25],[window.innerWidth,window.innerHeight]);
	sound.playGameMusic();
}

function windowResized() {
	resizeCanvas(window.innerWidth,window.innerHeight);
	board.boardResize([window.innerWidth,window.innerHeight]);
}

function keyPressed() {
	//Checking for directional key presses.
	if (keyCode === UP_ARROW || keyCode === 87) {board.getSnake().changeDirection(0);} 
	else if (keyCode === RIGHT_ARROW || keyCode === 68) {board.getSnake().changeDirection(1);}
	else if (keyCode === DOWN_ARROW || keyCode === 83) {board.getSnake().changeDirection(2);} 
	else if (keyCode === LEFT_ARROW || keyCode === 65) {board.getSnake().changeDirection(3);}
	
	//Checking for speed change key presses.
	if (keyCode === SHIFT) {board.swapGameSpeed();}

	//Checking for initial key press.
	if (board.getSnake().getSnakeLooping()) {board.disableSnakeLooping();}
}

function mouseClicked() {
	//Reset Board is snake is dead.
	if (!board.isSnakeLiving()) {board = new Board([50,25],[window.innerWidth,window.innerHeight]);}
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