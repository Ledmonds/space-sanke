/*==========
Setup
==========*/
function setup() {	
  	createCanvas(window.innerWidth, window.innerHeight);
    frameRate(20);
  	
    //Declaration
    environment = new Environment();
    board = new Board([60,30],[window.innerWidth,window.innerHeight]);

    //Setup
    environment.setupEnvironment(board.getBoardVector(),board.getNodeSize());
  	board.getSnake().setupSnake();
}

function windowResized() {
  resizeCanvas(window.innerWidth,window.innerHeight);
  board.boardResize([window.innerWidth,window.innerHeight]);
  environment.setupEnvironment(board.getBoardVector(),board.getNodeSize()); 
}

function keyPressed() {
	if (keyCode === UP_ARROW && !board.getSnake().getSnakeUpdatePhase()) {board.getSnake().setBearing(0);} 
	else if (keyCode === RIGHT_ARROW && !board.getSnake().getSnakeUpdatePhase()) {board.getSnake().setBearing(1);}
	else if (keyCode === DOWN_ARROW && !board.getSnake().getSnakeUpdatePhase()) {board.getSnake().setBearing(2);} 
	else if (keyCode === LEFT_ARROW && !board.getSnake().getSnakeUpdatePhase()) {board.getSnake().setBearing(3);}
	if (board.getSnake().getSnakeLooping()) {
    board.getSnake().setSnakeLooping(false);
    environment.disableStartText();
  }
}

/*==========
Main
==========*/
function draw() {
	environment.setupEnvironmentScene(board.getScore());
	board.iterateBoard();
}