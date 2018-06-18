this.Board = function(_board_vector,_max_window_vector) {
	//Variables
	this.board_vector = _board_vector;
	this.node_size = _max_window_vector[0]*0.8/this.board_vector[0];
	this.snake = new Snake([0,0],[255,120,54,255]);
	this.food = new Food([floor(random(-this.board_vector[0]/2,this.board_vector[0]/2)),floor(random(-this.board_vector[1]/2,this.board_vector[1]/2))],[10,235,255,255]);
	this.particles = [];

	//Gettors
	this.getBoardVector = function() {return this.board_vector;}
	this.getSnake = function() {return this.snake;}
	this.getScore = function() {return this.snake.getSnakeScore();}
	this.getNodeSize = function() {return this.node_size;}

	//Settors
	this.setNodeSize = function(_node_size) {this.node_size = _node_size;}

	//Modifiers
	this.iterateBoard = function() {
		console.log(this.snake.getSnakeLiving());
		if (!this.isSnakeBorderCollided() && !this.snake.hasSnakeBodyCollided() && this.snake.getSnakeLiving()) {
			if (this.isFoodCollided()) {
				this.snake.addToSnake();
				this.food.setFoodVector([floor(random(-this.board_vector[0]/2,this.board_vector[0]/2)),floor(random(-this.board_vector[1]/2,this.board_vector[1]/2))]);
				environment.addFloatingText("+1",this.snake.getSnakeheadVector(),this.node_size);
				this.createParticles(this.snake.getSnakeheadVector());
			}
			this.snake.iterateSnake(); 
		} else {
			this.snake.setSnakeLiving(false);
		}

		if (!this.snake.getSnakeLiving()) this.createParticles([random(-this.board_vector[0]/2,this.board_vector[0]/2),random(-this.board_vector[1]/2,this.board_vector[1]/2)]);
		this.snake.drawSnake(this.node_size);	
		this.iterateParticles();
		this.food.drawFood(this.node_size);
	}
	this.boardResize = function(_max_window_vector) {
		this.node_size = _max_window_vector[0]*0.8/this.board_vector[0];
	}

	//Checkers
	this.isSnakeBorderCollided = function() {return (this.snake.getSnakeheadVector()[0] <= -this.board_vector[0]/2-1 || this.snake.getSnakeheadVector()[1] <= -this.board_vector[1]/2-1 || this.snake.getSnakeheadVector()[0] >= (this.board_vector[0]/2) || this.snake.getSnakeheadVector()[1] >= (this.board_vector[1]/2)) ? true : false;}
	this.isFoodCollided = function() {return (this.snake.getSnakeheadVector()[0] == this.food.getFoodVector()[0] && this.snake.getSnakeheadVector()[1] == this.food.getFoodVector()[1]) ? true : false;}

	//Particles
	this.createParticles = function(_particle_vector) {for (i = 0; i < 20; ++i) this.particles.push(new Particle([_particle_vector[0]*this.node_size,_particle_vector[1]*this.node_size]));}
	this.iterateParticles = function() {
		for(var i = 0; i < this.particles.length; ++i) {
			if (this.particles[i].isParticleDead()) {
				this.particles.splice(i,1);
				--i;
			} else this.particles[i].iterateParticle(frameCount/60);
		}
	}

}