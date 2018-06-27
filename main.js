/*==========
Setup
==========*/
function setup() {
		createCanvas(window.innerWidth, window.innerHeight);
	
		//Declaration
		delta_time = new DeltaTime();
		board = new Board([60,30],[window.innerWidth,window.innerHeight]);
}

function windowResized() {
	resizeCanvas(window.innerWidth,window.innerHeight);
	board.boardResize([window.innerWidth,window.innerHeight]);
}

function mouseClicked() {
	if (!board.isSnakeLiving()) {
		//Declaration
		board = new Board([60,30],[window.innerWidth,window.innerHeight]);
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW || keyCode === 87) {board.getSnake().setBearing(0);} 
	else if (keyCode === RIGHT_ARROW || keyCode === 68) {board.getSnake().setBearing(1);}
	else if (keyCode === DOWN_ARROW || keyCode === 83) {board.getSnake().setBearing(2);} 
	else if (keyCode === LEFT_ARROW || keyCode === 65) {board.getSnake().setBearing(3);}
	
	if (keyCode === SHIFT && !board.getSlowerState()) {board.slowGameDown()}
	else if (keyCode === SHIFT && board.getSlowerState()) {board.speedGameUp()}

	if (board.getSnake().getSnakeLooping()) {
		board.disableSnakeLooping();
	}
}


/*==========
Main
==========*/
function draw() { 
	clear();
	translate(window.innerWidth/2,window.innerHeight/2);


	if (delta_time.getDeltaTimeReset() * board.getGameSpeed() >= 1) {
		board.iterateBoard();
		delta_time.resetDeltaTimeReset();
	}

	board.iterateBackground();
	board.drawBoard();
	
	
	delta_time.updateDeltaTime();
}