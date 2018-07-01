Star = function(_star_vector) {
	//Variables
	this.star_vector = [_star_vector[0],_star_vector[1],random(window.innerWidth*0.5)];
	this.star_color = [255,255,255,255];
	this.max_star_size = 5;
	this.star_speed = 3;
	this.fadein_value = 0;
	this.pz = 0;
	this.star_streak_length = random(5,15);


	//Gettors
	this.getSX = function() {return map(this.star_vector[0]/this.star_vector[2],0,1,0,window.innerWidth*0.5);}
	this.getSY = function() {return map(this.star_vector[1]/this.star_vector[2],0,1,0,window.innerHeight*0.5);}
	this.getPX = function() {return map(this.star_vector[0]/this.pz,0,1,0,window.innerWidth*0.5);}
	this.getPY = function() {return map(this.star_vector[1]/this.pz,0,1,0,window.innerHeight*0.5);}
	this.getFadeinMap = function() {return map(this.fadein_value,0,1,0,255)}
	this.getStarSpeed = function() {return this.star_speed;}
	this.getStarStreakLength = function() {return this.star_streak_length;}


	//Settors
	this.setStarSpeed = function(_star_speed) {this.star_speed = _star_speed;}
	this.resetStar = function(_star_vector) {
		this.star_vector = [_star_vector[0],_star_vector[1],window.innerWidth*0.5];
		this.fadein_value = 0;
	}
	this.setStarStreakLength = function(_star_streak_length) {
		this.star_streak_length = _star_streak_length;
	}


	//Checkers
	this.isStarOutsideBounds = function(_border_vector) {
		return (this.getSX() <= _border_vector[0]+10 || this.getSX() >= _border_vector[2]-10 || this.getSY() <= _border_vector[1]+10 || this.getSY() >= _border_vector[3]-10 || this.star_vector[2] < 1) ? true : false;
	}


	//Iterators
	this.iterateStar = function() {
		this.pz = this.star_vector[2]+this.star_streak_length;
		this.star_vector[2]-=this.star_speed;
		if (this.fadein_value < 1) this.fadein_value+=0.01;
	}


	//Drawers
	this.drawStar = function() {
		fill([this.star_color[0],this.star_color[1],this.star_color[2],this.getFadeinMap()]);
		scaling_max_star_size = map(this.star_vector[2],0,window.innerWidth*0.5,this.max_star_size,0);
		ellipse(this.getSX(),this.getSY(),scaling_max_star_size,scaling_max_star_size);

		stroke([this.star_color[0],this.star_color[1],this.star_color[2],this.getFadeinMap()]);
		line(this.getPX(),this.getPY(),this.getSX(),this.getSY());
	}
};