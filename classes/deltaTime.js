class DeltaTime {
	//Constructor
	constructor() {
		this.new_time = (new Date).getTime();
		this.old_time = 0;
		this.delta_time = 0;
		this.delta_time_reset = 0;
		this.timer = 0;
	}
	

	//Gettors
	getDeltaTime() {return this.delta_time/1000;} //Miliseconds
	getDeltaTimeReset() {return this.delta_time_reset;}


	//Resettors
	resetDeltaTimeReset() {this.delta_time_reset = 0;}


	//Modifiers
	updateDeltaTime() {
		this.old_time = this.new_time;
		this.new_time = (new Date).getTime();
		this.delta_time = this.new_time-this.old_time;
		this.delta_time_reset += this.delta_time/1000;
	}
};