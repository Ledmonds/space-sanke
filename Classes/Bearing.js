this.Bearing = function(_bearing) {
	//Variables
	this.bearing = _bearing;

	//Gettors
	this.getBearing = function() {return this.bearing;}
	this.getCardinalBearing = function() {
		if (this.bearing == 0) return "North";
		else if (this.bearing == 1) return "East";
		else if (this.bearing == 2) return "South";
		return "West";
	}

	//Settors
	this.setBearing = function(_bearing) {
		if (this.isValidBearingChange(_bearing)) this.bearing = _bearing;
	}

	//Checkers
	this.isValidBearingChange = function(_bearing) {
		if(this.bearing == 0 && (_bearing == 0 || _bearing == 2)) return false;
		else if(this.bearing == 1 && (_bearing == 1 || _bearing == 3)) return false;
		else if(this.bearing == 2 && (_bearing == 2 || _bearing == 0)) return false;
		else if(this.bearing == 3 && (_bearing == 3 || _bearing == 1)) return false;
		return true;
	}

	//Modifiers
	this.randomiseBearing = function() {
		this.setBearing(floor(random(0,4)));
	}
}