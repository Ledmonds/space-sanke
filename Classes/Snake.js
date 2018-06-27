this.Snake = function(_snakehead_vector,_snake_color,_looping,_bearing) {
	//Variables
	this.snakehead_vector = _snakehead_vector;
	this.snake_color = _snake_color;
	this.snakehead_bearing = new Bearing(_bearing);
	this.snake_body = [this.snakehead_vector];
	this.snake_looping = _looping;
	this.snake_start_length = 5;

	//Gettors
	this.getSnakeheadVector = function() {return this.snakehead_vector;}
	this.getSnakeColor = function() {return this.snake_color;}
	this.getSnakeLoopingState = function() {return this.snake_looping_state;}
	this.getSnakeBody = function() {return this.snake_body;}
	this.getSnakeLength = function() {return this.snake_body.length;}
	this.getSnakeLooping = function() {return this.snake_looping;}
	this.getSnakeScore = function() {return this.snake_body.length-this.snake_start_length}
	this.getSnakeheadBearing = function() {return this.snakehead_bearing.getBearing();}

	//Settors
	this.setBearing = function(_bearing) {
		this.snakehead_bearing.setBearing(_bearing);
	}
	this.setSnakeLooping = function(_snake_looping) {this.snake_looping = _snake_looping;}

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
	}
	this.addToSnake = function() {this.snake_body.push(this.snake_body.slice(1));}
	this.loopSnake = function() {
		if (this.snakehead_vector[1] <= -this.snake_body.length/2 && this.snakehead_bearing.getBearing() == 0) this.snakehead_bearing.setBearing(3);
		if (this.snakehead_vector[0] <= -this.snake_body.length/2 && this.snakehead_bearing.getBearing() == 3) this.snakehead_bearing.setBearing(2);
		if (this.snakehead_vector[1] >= this.snake_body.length/2 && this.snakehead_bearing.getBearing() == 2) this.snakehead_bearing.setBearing(1);
		if (this.snakehead_vector[0] >= this.snake_body.length/2 && this.snakehead_bearing.getBearing() == 1) this.snakehead_bearing.setBearing(0);
	}
	this.randomiseDirection = function() {
		this.setBearing(floor(random(0,4)));
	}

	//Checkers
	this.hasSnakeBodyCollided = function() {
		for(var i = 1; i < this.snake_body.length; ++i) {
			if (this.snakehead_vector[0] == this.snake_body[i][0] && this.snakehead_vector[1] == this.snake_body[i][1]) return true;
		}
		return false;
	}
	this.isVectorInSnake = function(_vector) {
		for(var i = 0; i < this.snake_body.length; ++i) {
			if (_vector[0] == this.snake_body[i][0] && _vector[1] == this.snake_body[i][1]) return true;
		}
		return false;
	}

	//Drawers
	this.drawSnake = function(_node_size) {//Draw Snakebody and Eyes
		for(var i = 0; i < this.snake_body.length; ++i) {
			fill(this.snake_color[0],this.snake_color[1],this.snake_color[2],map(this.snake_body.length-i,0,this.snake_body.length,80,this.snake_color[3]))
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