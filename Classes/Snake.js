this.Snake = function(_snakehead_vector,_snake_color) {
	//Variables
	this.snakehead_vector = _snakehead_vector;
	this.snake_color = _snake_color;
	this.snakehead_bearing = new Bearing(0);
	this.snake_body = [this.snakehead_vector];
	this.snake_looping = true;
	this.snake_start_length = 5;
	this.snake_living = true;
	this.snake_update_phase = false;

	//Gettors
	this.getSnakeheadVector = function() {return this.snakehead_vector;}
	this.getSnakeColor = function() {return this.snake_color;}
	this.getSnakeLoopingState = function() {return this.snake_looping_state;}
	this.getSnakeBody = function() {return this.snake_body;}
	this.getSnakeBodyLength = function() {return this.snake_body.length;}
	this.getSnakeLooping = function() {return this.snake_looping;}
	this.getSnakeScore = function() {return this.snake_body.length-this.snake_start_length}
	this.getSnakeheadBearing = function() {return this.snakehead_bearing.getBearing();}
	this.getSnakeLiving = function() {return this.snake_living;}
	this.getSnakeUpdatePhase = function() {return this.snake_update_phase;}

	//Settors
	this.setBearing = function(_bearing) {
		this.snakehead_bearing.setBearing(_bearing);
		this.snake_update_phase = true;
	}
	this.setSnakeLooping = function(_snake_looping) {this.snake_looping = _snake_looping;}
	this.setSnakeLiving = function(_snake_living) {this.snake_living = _snake_living;}
	this.setSnakeUpdatePhase = function() {this.snake_update_phase = !snake_update_phase;}

	//Modifiers
	this.setupSnake = function() {
		for(var i = 1; i < this.snake_start_length; ++i) this.snake_body.push([this.snakehead_vector[0],this.snakehead_vector[1]+1]);
	}
	this.iterateSnake = function() {
		if (this.snake_looping) this.loopSnake()
		if (this.snakehead_bearing.getBearing() == 0) this.snake_body.unshift([this.snakehead_vector[0],this.snakehead_vector[1]-1]);
		else if (this.snakehead_bearing.getBearing() == 1) this.snake_body.unshift([this.snakehead_vector[0]+1,this.snakehead_vector[1]]);
		else if (this.snakehead_bearing.getBearing() == 2) this.snake_body.unshift([this.snakehead_vector[0],this.snakehead_vector[1]+1]);
		else this.snake_body.unshift([this.snakehead_vector[0]-1,this.snakehead_vector[1]]);

		this.snakehead_vector = this.snake_body[0];
		this.snake_body.pop();
		this.snake_update_phase = false;
	}
	this.addToSnake = function() {this.snake_body.push(_snakehead_vector);}
	this.loopSnake = function() {
		if (this.snakehead_vector[1] <= -this.snake_body.length/2 && this.snakehead_bearing.getBearing() == 0) this.snakehead_bearing.setBearing(3);
		if (this.snakehead_vector[0] <= -this.snake_body.length/2 && this.snakehead_bearing.getBearing() == 3) this.snakehead_bearing.setBearing(2);
		if (this.snakehead_vector[1] >= this.snake_body.length/2 && this.snakehead_bearing.getBearing() == 2) this.snakehead_bearing.setBearing(1);
		if (this.snakehead_vector[0] >= this.snake_body.length/2 && this.snakehead_bearing.getBearing() == 1) this.snakehead_bearing.setBearing(0);
	}

	//Checkers
	this.hasSnakeBodyCollided = function() {
		for(var i = 1; i < this.snake_body.length; ++i) {
			if (this.snakehead_vector[0] == this.snake_body[i][0] && this.snakehead_vector[1] == this.snake_body[i][1]) return true;
		}
		return false;
	}

	//Drawers
	this.drawSnake = function(_node_size) {//Draw Snakebody and Eyes
		for(var i = 0; i < this.snake_body.length; ++i) {
			fill(this.snake_color[0],this.snake_color[1],this.snake_color[2],map(this.snake_body.length-i,0,this.snake_body.length,80,255))
				.noStroke();
			rect(_node_size*this.snake_body[i][0],_node_size*this.snake_body[i][1],_node_size,_node_size,3);
		}
		this.drawSnakeheadFace(_node_size);
	}
	this.drawSnakeheadFace = function(_node_size) {
		fill(0);
		ellipse(_node_size*this.snake_body[0][0]+_node_size/3,_node_size*this.snake_body[0][1]+_node_size/3,_node_size/3.5);
		ellipse(_node_size*this.snake_body[0][0]+(_node_size - _node_size/3),_node_size*this.snake_body[0][1]+_node_size/3,_node_size/3.5);
	}
	
}