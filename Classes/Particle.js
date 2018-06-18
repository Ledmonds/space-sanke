function Particle(_particle_vector) {
	//Variables
	this.particle_vector = _particle_vector;
	this.particle_color = [random(50,255),random(50,255),random(50,255),255];
	this.size = random(2, 6);
	this.initialangle = random(0, 2 * PI);
	this.upOrDown = random(0,2);
	this.leftOrRight = random(0,2);
	this.fade_value = random(3,6);

	//Modifiers
	this.iterateParticle = function(_time) {
    	angle = _time + this.initialangle;
    	this.particle_vector[0] += sin(angle);
		
    	this.leftOrRight >= 1 ? this.particle_vector[0] += sin(angle) : this.particle_vector[0] -= sin(angle);
		this.upOrDown >= 1 ? this.particle_vector[1] += sin(angle) : this.particle_vector[1] -= sin(angle);

		this.drawParticle();
	}

	//Drawers
	this.drawParticle = function() {
		this.fade_value*=0.8;
		fill([this.particle_color[0],this.particle_color[3],this.particle_color[2],map(this.fade_value,1,0,255,0)])
		ellipse(this.particle_vector[0], this.particle_vector[1], this.size);
	}

	//Checkers
	this.isParticleDead = function() {return (this.fade_value <= 0.1) ? true : false;}

}