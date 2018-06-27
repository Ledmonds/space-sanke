this.Board = function(board_size_vector,_max_window_vector) {
	//Game Variables
	this.board_size_vector = board_size_vector;
	this.node_size = _max_window_vector[0]*0.8/this.board_size_vector[0];
	this.snake = new Snake([0,0],[246,106,53,255],true,0);
	this.food = new Food([floor(random(-this.board_size_vector[0]/2,this.board_size_vector[0]/2)),floor(random(-this.board_size_vector[1]/2,this.board_size_vector[1]/2))],[24,202,230,255]);
	this.game_speed = 20;
	this.game_over = false;
	this.slower_state = false;

	//Environmental Variables
	this.border_vector = [-Math.abs((this.board_size_vector[0]*this.node_size/2)+5),-Math.abs((this.board_size_vector[1]*this.node_size/2)+5),(this.board_size_vector[0]*this.node_size/2)+5,(this.board_size_vector[1]*this.node_size/2)+5]; //x1,y1,x2,y2;
	this.border_color = [24,202,230,255];
	this.background_color = [0,0,0,255];

	//Effect Variables
	this.floating_text_array = [];
	this.particle_array = [];
	this.starfield_array = [];


	//Gettors
	this.getBoardSizeVector = function() {return this.board_size_vector;}
	this.getSnake = function() {return this.snake;}
	this.getScore = function() {return this.snake.getSnakeScore();}
	this.getNodeSize = function() {return this.node_size;}
	this.getPartices = function() {return this.particle_array;}
	this.getGameSpeed = function() {return	this.game_speed;}
	this.getSlowerState = function() {return this.slower_state;}



	//Setup Functions
	this.setupBoard = function() {
		this.game_over = false;
		this.snake.setupSnake();
		this.setupFloatingText();
	}
	this.setupFloatingText = function() {
		this.floating_text_array = [];
		this.floating_text_array.push(new FloatingText("Score: 0",[this.border_vector[0],this.border_vector[3]+this.node_size],"Persistant",LEFT));
		this.floating_text_array.push(new FloatingText("GitHub Repo: https://github.com/Ledmonds/Snake",[this.border_vector[2],this.border_vector[1]-this.node_size/2],"Persistant",RIGHT));
		this.floating_text_array.push(new FloatingText("Snake Implementation Created Within the p5js Library - Jaymz Edmonds",[this.border_vector[0],this.border_vector[1]-this.node_size/2],"Persistant",LEFT));
		this.floating_text_array.push(new FloatingText("Press Any Key To Start",[0,0],"Sin",CENTER));
	}
	this.boardResize = function(_max_window_vector) {
		this.node_size = _max_window_vector[0]*0.8/this.board_size_vector[0];
		this.border_vector = [-Math.abs((this.board_size_vector[0]*this.node_size/2)+5),-Math.abs((this.board_size_vector[1]*this.node_size/2)+5),(this.board_size_vector[0]*this.node_size/2)+5,(this.board_size_vector[1]*this.node_size/2)+5]; //x1,y1,x2,y2;
		this.setupFloatingText();
	}


	//Iterators
	this.iterateBackground = function() {
		this.floating_text_array[0].setTextValue("Score: "+this.snake.getSnakeScore());
		this.iterateFloatingTextArray();
		this.iterateParticlesArray();
		this.iterateStarfieldArray();
	}
	this.iterateBoard = function() {
		if (this.isSnakeLiving()) {
			this.snake.iterateSnake();
			if (this.isFoodCollided()) this.snakeHasEatenFood();
		} else if (!this.game_over) {
			this.game_over = true;
			this.floating_text_array.push(new FloatingText("Score: "+this.snake.getSnakeScore()+"\nPress Any Key To Play Again",[0,0],"SinFadein",CENTER));
		} else {
			this.createParticles([random(-this.board_size_vector[0]/2,this.board_size_vector[0]/2),random(-this.board_size_vector[1]/2,this.board_size_vector[1]/2)]);
		}
	}
	this.iterateFloatingTextArray = function() {
		for(i = 0; i < this.floating_text_array.length; ++i) {
			if (this.floating_text_array[i].isTextDead()) {
				this.floating_text_array.splice(i,1);
				--i;
			}
		}
	}
	this.iterateParticlesArray = function() {
		for(i = 0; i < this.particle_array.length; ++i) {
			if (this.particle_array[i].isParticleDead()) {
				this.particle_array.splice(i,1);
				--i;
			} else {
				this.particle_array[i].iterateParticle(frameCount/60);
			}
		}
	}
	this.iterateStarfieldArray = function() {
		for (i = 0; i < this.starfield_array.length; ++i) {
			if (this.starfield_array[i].isStarOutsideBounds(this.border_vector)) this.starfield_array[i].resetStar(this.generateRandomBoardCoOrds());
			this.starfield_array[i].iterateStar();

		}
	}
	

	//Modifiers
	this.generateRandomBoardCoOrds = function() {
		return [floor(random(-this.board_size_vector[0]/2,this.board_size_vector[0]/2))*this.node_size,floor(random(-this.board_size_vector[1]/2,this.board_size_vector[1]/2))*this.node_size];
	}
	this.generateRandomFoodCoOrds = function() {
		temp_coords = [floor(random(-this.board_size_vector[0]/2,this.board_size_vector[0]/2)),floor(random(-this.board_size_vector[1]/2,this.board_size_vector[1]/2))];

		while(this.snake.isVectorInSnake(temp_coords)) {
			temp_coords = [floor(random(-this.board_size_vector[0]/2,this.board_size_vector[0]/2)),floor(random(-this.board_size_vector[1]/2,this.board_size_vector[1]/2))];
		}
		return temp_coords;
	}
	this.disableSnakeLooping = function() {
		this.snake.setSnakeLooping(false);
		this.floating_text_array[this.floating_text_array.length-1].setTextType("SinFadeout");
	}
	this.snakeHasEatenFood = function() {
		this.snake.addToSnake();
		this.food.setFoodVector(this.generateRandomFoodCoOrds());
		this.createParticles(this.snake.getSnakeheadVector());
	}


	//Checkers
	this.isSnakeBorderCollided = function() {return (this.snake.getSnakeheadVector()[0] <= -this.board_size_vector[0]/2-1 || this.snake.getSnakeheadVector()[1] <= -this.board_size_vector[1]/2-1 || this.snake.getSnakeheadVector()[0] >= (this.board_size_vector[0]/2) || this.snake.getSnakeheadVector()[1] >= (this.board_size_vector[1]/2)) ? true : false;}
	this.isFoodCollided = function() {return (this.snake.getSnakeheadVector()[0] == this.food.getFoodVector()[0] && this.snake.getSnakeheadVector()[1] == this.food.getFoodVector()[1]) ? true : false;}
	this.isSnakeLiving = function() {return (!this.isSnakeBorderCollided() && !this.snake.hasSnakeBodyCollided()) ? true : false}


	//Effects
	this.createParticles = function(_particle_vector) {
		for (i = 0; i < 20; ++i) {
			this.particle_array.push(new Particle([_particle_vector[0]*this.node_size,_particle_vector[1]*this.node_size]));
		}
	}
	this.createStarField = function() {
		for (i = 0; i < 100; ++i) {
			this.starfield_array[i] = new Star(this.generateRandomBoardCoOrds());
		}
	}
	this.slowGameDown = function() {
		this.game_speed = this.game_speed/2;
		this.slower_state = true;
		this.slowStarField();
	}
	this.speedGameUp = function() {
		this.game_speed = this.game_speed*2;
		this.slower_state = false;
		this.speedUpStarField();
	}
	this.slowStarField = function() {
		for (i = 0; i < this.starfield_array.length; ++i) {
			this.starfield_array[i].setStarSpeed(this.starfield_array[i].getStarSpeed()/2);
			this.starfield_array[i].setStarStreakLength(this.starfield_array[i].getStarStreakLength()/2);
		}
	}
	this.speedUpStarField = function() {
		for (i = 0; i < this.starfield_array.length; ++i) {
			this.starfield_array[i].setStarSpeed(this.starfield_array[i].getStarSpeed()*2);
			this.starfield_array[i].setStarStreakLength(this.starfield_array[i].getStarStreakLength()*2);
		}
	}
	

	//Drawers
	this.drawBoard = function() {
		background(this.background_color);
		this.drawStarfieldArray();
		this.food.drawFood(this.node_size);
		this.snake.drawSnake(this.node_size);	
		this.drawBorder();
		this.drawFloatingTextArray();
		this.drawParticlesArray();
		
	}
	this.drawBorder = function() {
		stroke(this.border_color).strokeWeight(1);
		line(this.border_vector[0],this.border_vector[1],this.border_vector[2],this.border_vector[1]);
		line(this.border_vector[2],this.border_vector[1],this.border_vector[2],this.border_vector[3]);
		line(this.border_vector[0],this.border_vector[3],this.border_vector[2],this.border_vector[3]);
		line(this.border_vector[0],this.border_vector[1],this.border_vector[0],this.border_vector[3]);
	}
	this.drawFloatingTextArray = function() {
		for(var i = 0; i < this.floating_text_array.length; ++i) {
			this.floating_text_array[i].drawText();
		}
	}
	this.drawParticlesArray = function() {
		for(var i = 0; i < this.particle_array.length; ++i) {
			this.particle_array[i].drawParticle();
		}
	}
	this.drawStarfieldArray = function() {
		for (i = 0; i < this.starfield_array.length; ++i) {
			this.starfield_array[i].drawStar();
		}
	}


	//Effects

}