class Particle {
	//Constructor
	constructor(_particle_vector) {
		this.particle_vector = _particle_vector;
		this.particle_color = [246,106,53,255];
		this.size = random(2, 4);
		this.initialangle = random(0, 2 * PI);
		this.upOrDown = random(0,2);
		this.leftOrRight = random(0,2);
		this.fade_value = random(3,6);
	}


	//Checkers
	isParticleDead() {return (this.fade_value <= 0.1) ? true : false;}


	//Modifiers
	iterateParticle(_time) {
    	var angle = _time + this.initialangle;
    	this.particle_vector[0] += sin(angle);
		
    	this.leftOrRight >= 1 ? this.particle_vector[0] += sin(angle) : this.particle_vector[0] -= sin(angle);
		this.upOrDown >= 1 ? this.particle_vector[1] += sin(angle) : this.particle_vector[1] -= sin(angle);
	}


	//Drawers
	drawParticle() {
		this.fade_value*=0.8;
		fill([this.particle_color[0],this.particle_color[3],this.particle_color[2],map(this.fade_value,1,0,255,0)])
		ellipse(this.particle_vector[0], this.particle_vector[1], this.size);
	}
};