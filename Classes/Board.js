class Board {
	//Constructor
	constructor(board_size_vector,_max_window_vector) {
		//Game Variables
		this.board_size_vector = board_size_vector;
		this.node_size = _max_window_vector[0]*0.8/this.board_size_vector[0];
		this.snake = new Snake([0,0],[246,106,53,255],true,0);
		this.food = new Food([floor(random(-this.board_size_vector[0]/2,this.board_size_vector[0]/2)),floor(random(-this.board_size_vector[1]/2,this.board_size_vector[1]/2))],[24,202,230,255]);
		this.game_speed = 20;
		this.game_over = false;
		this.slower_state = false;
		this.delta_time = new DeltaTime();

		//Environmental Variables
		this.border_vector = [-Math.abs((this.board_size_vector[0]*this.node_size/2)+5),-Math.abs((this.board_size_vector[1]*this.node_size/2)+5),(this.board_size_vector[0]*this.node_size/2)+5,(this.board_size_vector[1]*this.node_size/2)+5]; //x1,y1,x2,y2;
		this.border_color = [24,202,230,255];
		this.background_color = [0,0,0,255];

		//Effect Variables
		this.floating_text_array = [];
		this.particle_array = [];
		this.starfield_array = [];

		this.setupFloatingText();
		this.createStarField();
	}


	//Gettors
	getBoardSizeVector() {return this.board_size_vector;}
	getSnake() {return this.snake;}
	getGameSpeed() {return	this.game_speed;}
	getSlowerState() {return this.slower_state;}


	//Checkers
	isSnakeBorderCollided() {return (this.snake.getSnakeheadVector()[0] <= -this.board_size_vector[0]/2-1 || this.snake.getSnakeheadVector()[1] <= -this.board_size_vector[1]/2-1 || this.snake.getSnakeheadVector()[0] >= (this.board_size_vector[0]/2) || this.snake.getSnakeheadVector()[1] >= (this.board_size_vector[1]/2)) ? true : false;}
	isFoodCollided() {return (this.snake.getSnakeheadVector()[0] == this.food.getFoodVector()[0] && this.snake.getSnakeheadVector()[1] == this.food.getFoodVector()[1]) ? true : false;}
	isSnakeLiving() {return (!this.isSnakeBorderCollided() && !this.snake.hasSnakeBodyCollided()) ? true : false}
	isBoardIterable() {return (this.delta_time.getDeltaTimeReset() * this.getGameSpeed() >= 1) ? true : false;}


	//Setup Functions
	setupFloatingText() {
		this.floating_text_array = [];
		this.floating_text_array.push(new FloatingText("Score: 0",[this.border_vector[0],this.border_vector[3]+this.node_size],"Persistant",LEFT));
		this.floating_text_array.push(new FloatingText("GitHub Repo: https://github.com/Ledmonds/Snake",[this.border_vector[2],this.border_vector[1]-this.node_size/2],"Persistant",RIGHT));
		this.floating_text_array.push(new FloatingText("Snake Implementation Created Within the p5js Library - Jaymz Edmonds",[this.border_vector[0],this.border_vector[1]-this.node_size/2],"Persistant",LEFT));
		this.floating_text_array.push(new FloatingText("Press Any Key To Start",[0,0],"Sin",CENTER));
	}
	boardResize(_max_window_vector) {
		this.node_size = _max_window_vector[0]*0.8/this.board_size_vector[0];
		this.border_vector = [-Math.abs((this.board_size_vector[0]*this.node_size/2)+5),-Math.abs((this.board_size_vector[1]*this.node_size/2)+5),(this.board_size_vector[0]*this.node_size/2)+5,(this.board_size_vector[1]*this.node_size/2)+5]; //x1,y1,x2,y2;
		this.setupFloatingText();
	}


	//Iterators
	iterateBackground() {
		this.floating_text_array[0].setTextValue("Score: "+this.snake.getSnakeScore());
		this.iterateFloatingTextArray();
		this.iterateParticlesArray();
		this.iterateStarfieldArray();
		this.delta_time.updateDeltaTime();
	}
	iterateBoard() {
		//If snake is alive, check if it has eaten food and iterate.
		if (this.isSnakeLiving()) {
			if (this.isFoodCollided()) this.snakeHasEatenFood();
			this.snake.iterateSnake();
			
		//If snake is dead and game is not yet over, set game over variable and game over message.
		} else if (!this.game_over) {
			this.game_over = true;
			this.floating_text_array.push(new FloatingText("Score: "+this.snake.getSnakeScore()+"\nPress Any Key To Play Again",[0,0],"SinFadein",CENTER));
		
		//If game over message is set, then make some fireworks.
		} else {
			this.createParticles([random(-this.board_size_vector[0]/2,this.board_size_vector[0]/2),random(-this.board_size_vector[1]/2,this.board_size_vector[1]/2)]);
		}

		this.delta_time.resetDeltaTimeReset();
	}
	iterateFloatingTextArray() { //Look for dead floating text, bump it form the array and iterate.
		for(var i = 0; i < this.floating_text_array.length; ++i) {
			if (this.floating_text_array[i].isTextDead()) {
				this.floating_text_array.splice(i,1);
				--i;
			}
		}
	}
	iterateParticlesArray() { //Look for dead particles, bump it form the array and iterate.
		for(var i = 0; i < this.particle_array.length; ++i) {
			if (this.particle_array[i].isParticleDead()) {
				this.particle_array.splice(i,1);
				--i;
			} else {
				this.particle_array[i].iterateParticle(frameCount/60);
			}
		}
	}
	iterateStarfieldArray() { //Look for dead stars, reset their posistion and iterate.
		for (var i = 0; i < this.starfield_array.length; ++i) {
			if (this.starfield_array[i].isStarOutsideBounds(this.border_vector)) this.starfield_array[i].resetStar(this.generateRandomBoardCoOrds());
			this.starfield_array[i].iterateStar();
		}
	}
	

	//Modifiers
	generateRandomBoardCoOrds() {
		return [floor(random(-this.board_size_vector[0]/2,this.board_size_vector[0]/2))*this.node_size,floor(random(-this.board_size_vector[1]/2,this.board_size_vector[1]/2))*this.node_size];
	}
	generateRandomFoodCoOrds() {
		var temp_coords = [floor(random(-this.board_size_vector[0]/2,this.board_size_vector[0]/2)),floor(random(-this.board_size_vector[1]/2,this.board_size_vector[1]/2))];

		while(this.snake.isVectorInSnake(temp_coords)) {
			temp_coords = [floor(random(-this.board_size_vector[0]/2,this.board_size_vector[0]/2)),floor(random(-this.board_size_vector[1]/2,this.board_size_vector[1]/2))];
		}
		return temp_coords;
	}
	disableSnakeLooping() {
		this.snake.setSnakeLooping(false);
		this.floating_text_array[this.floating_text_array.length-1].setTextType("SinFadeout");
	}
	snakeHasEatenFood() {
		this.snake.addToSnake();
		this.food.setFoodVector(this.generateRandomFoodCoOrds());
		this.createParticles(this.snake.getSnakeheadVector());
	}


	//Effects
	createParticles(_particle_vector) {
		for (var i = 0; i < 20; ++i) {
			this.particle_array.push(new Particle([_particle_vector[0]*this.node_size,_particle_vector[1]*this.node_size]));
		}
	}
	createStarField() {
		for (var i = 0; i < 100; ++i) {
			this.starfield_array[i] = new Star(this.generateRandomBoardCoOrds());
		}
	}
	slowGameDown() {
		this.game_speed = this.game_speed/2;
		this.slower_state = true;
		this.slowStarField();
	}
	speedGameUp() {
		this.game_speed = this.game_speed*2;
		this.slower_state = false;
		this.speedUpStarField();
	}
	slowStarField() {
		for (var i = 0; i < this.starfield_array.length; ++i) {
			this.starfield_array[i].setStarSpeed(this.starfield_array[i].getStarSpeed()/2);
			this.starfield_array[i].setStarStreakLength(this.starfield_array[i].getStarStreakLength()/2);
		}
	}
	speedUpStarField() {
		for (var i = 0; i < this.starfield_array.length; ++i) {
			this.starfield_array[i].setStarSpeed(this.starfield_array[i].getStarSpeed()*2);
			this.starfield_array[i].setStarStreakLength(this.starfield_array[i].getStarStreakLength()*2);
		}
	}
	

	//Drawers
	drawBoard() {
		background(this.background_color);
		this.drawStarfieldArray();
		this.food.drawFood(this.node_size);
		this.snake.drawSnake(this.node_size);	
		this.drawBorder();
		this.drawFloatingTextArray();
		this.drawParticlesArray();	
	}
	drawBorder() {
		stroke(this.border_color).strokeWeight(1);
		line(this.border_vector[0],this.border_vector[1],this.border_vector[2],this.border_vector[1]);
		line(this.border_vector[2],this.border_vector[1],this.border_vector[2],this.border_vector[3]);
		line(this.border_vector[0],this.border_vector[3],this.border_vector[2],this.border_vector[3]);
		line(this.border_vector[0],this.border_vector[1],this.border_vector[0],this.border_vector[3]);
	}
	drawFloatingTextArray() {
		for(var i = 0; i < this.floating_text_array.length; ++i) {
			this.floating_text_array[i].drawText();
		}
	}
	drawParticlesArray() {
		for(var i = 0; i < this.particle_array.length; ++i) {
			this.particle_array[i].drawParticle();
		}
	}
	drawStarfieldArray() {
		for (var i = 0; i < this.starfield_array.length; ++i) {
			this.starfield_array[i].drawStar();
		}
	}
};