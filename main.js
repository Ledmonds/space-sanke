/*==========
Variables
==========*/
speed = 40;


/*==========
Setup
==========*/
function setup() {
		createCanvas(window.innerWidth, window.innerHeight);
	
		//Declaration
		delta_time = new DeltaTime();
		environment = new Environment();
		board = new Board([60,30],[window.innerWidth,window.innerHeight]);

		//Setup
		environment.setupEnvironment(board.getBoardSizeVector(),board.getNodeSize());
		board.getSnake().setupSnake();
}

function windowResized() {
	resizeCanvas(window.innerWidth,window.innerHeight);
	board.boardResize([window.innerWidth,window.innerHeight]);
	environment.setupEnvironment(board.getBoardSizeVector(),board.getNodeSize()); 
}

function mouseClicked() {

		if (!board.getSnake().getSnakeLiving()) {
			//Declaration
			environment = new Environment();
			board = new Board([60,30],[window.innerWidth,window.innerHeight]);

			//Setup
			environment.setupEnvironment(board.getBoardSizeVector(),board.getNodeSize());
			board.getSnake().setupSnake();
		}
}

function keyPressed() {
	if ((keyCode === UP_ARROW || keyCode === 87) && !board.getSnake().getSnakeUpdatePhase()) {board.getSnake().setBearing(0);} 
	else if ((keyCode === RIGHT_ARROW || keyCode === 68) && !board.getSnake().getSnakeUpdatePhase()) {board.getSnake().setBearing(1);}
	else if ((keyCode === DOWN_ARROW || keyCode === 83) && !board.getSnake().getSnakeUpdatePhase()) {board.getSnake().setBearing(2);} 
	else if ((keyCode === LEFT_ARROW || keyCode === 65) && !board.getSnake().getSnakeUpdatePhase()) {board.getSnake().setBearing(3);}
	if (board.getSnake().getSnakeLooping()) {
		board.getSnake().setSnakeLooping(false);
		environment.disableStartText();
	}
}

/*==========
Main
==========*/
function draw() {
  //board.boardResize([window.innerWidth+(random(-50,20)),window.innerHeight+(random(-50,20))]);
  //environment.setupEnvironment(board.getBoardSizeVector(),board.getNodeSize()); 


	if (delta_time.getDeltaTimeReset() * board.getGameSpeed() >= 1) {
		board.iterateBoard();
		delta_time.setDeltaTimeReset();
	}

	environment.iterateEnvironment(board.getScore());
	board.drawBoard();
	delta_time.setDeltaTime();
}