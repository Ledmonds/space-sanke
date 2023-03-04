class Food {
	//Constructor
	constructor(_food_vector, _food_color) {
		this.food_vector = _food_vector;
		this.food_color = _food_color;
	}
	

	//Gettors
	getFoodVector() {return this.food_vector;}
	getColor() {return this.food_color;}


	//Settors
	setFoodVector(_food_vector) {this.food_vector = _food_vector;}	


	//Drawers
	drawFood(_node_size) {
		fill(this.food_color);
		rect(_node_size*this.food_vector[0],_node_size*this.food_vector[1],_node_size,_node_size,3);
	}
};