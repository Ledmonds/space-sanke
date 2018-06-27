class Bearing {
	//Constructor
	constructor(_bearing) {
		this.bearing = _bearing;
	}
	

	//Gettors
	getBearing() {return this.bearing;}


	//Settors
	setBearing(_bearing) {
		if (this.isValidBearingChange(_bearing)) this.bearing = _bearing;
	}


	//Modifiers
	randomiseBearing() {
		this.setBearing(floor(random(0,4)));
	}


	//Checkers
	isValidBearingChange(_bearing) {
		if (this.bearing == 0 && (_bearing == 0 || _bearing == 2)) return false;
		else if (this.bearing == 1 && (_bearing == 1 || _bearing == 3)) return false;
		else if (this.bearing == 2 && (_bearing == 2 || _bearing == 0)) return false;
		else if (this.bearing == 3 && (_bearing == 3 || _bearing == 1)) return false;
		return true;
	}
};