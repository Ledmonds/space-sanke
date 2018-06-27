this.DeltaTime = function() {
	//Variables
	this.new_time = (new Date).getTime();
	this.old_time = 0;
	this.delta_time = 0;
	this.delta_time_reset = 0;
	this.timer = 0;

	//Gettors
	this.getDeltaTime = function() {return this.delta_time/1000;} //Miliseconds
	this.getDeltaTimeReset = function() {return this.delta_time_reset;}
	this.getTimer = function() {return this.timer;}

	//Modifiers
	this.updateDeltaTime = function() {
		this.old_time = this.new_time;
		this.new_time = (new Date).getTime();
		this.delta_time = this.new_time-this.old_time;
		this.delta_time_reset += this.delta_time/1000;
		this.timer += this.delta_time/1000;
	}
	this.resetDeltaTimeReset = function() {this.delta_time_reset = 0;}
	this.resetTimer = function() {this.timer = 0;}


}