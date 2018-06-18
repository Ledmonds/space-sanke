function Food(_food_vector, _food_color) {
	//Variables
	this.food_vector = _food_vector
	this.food_color = _food_color;

	//Gettors
	this.getFoodVector = function() {return this.food_vector}
	this.getColor = function() {return this.food_color}

	//Settors
	this.setFoodVector = function(_food_vector) {this.food_vector = _food_vector;}	

	//Drawers
	this.drawFood = function(_node_size) {
		fill(this.food_color).noStroke();
		rect(_node_size*this.food_vector[0],_node_size*this.food_vector[1],_node_size,_node_size,3);
	}
}