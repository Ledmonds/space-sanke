this.Environment = function(_max_window_vector) {
	//Variables
	this.border_vector = [];
	this.background_color = [0];
	this.text_color = [255];
	this.text_font = "Georgia";
	this.text_size = window.innerWidth/100;
	this.floating_text_array = [];

	//Modifiers
	this.setupEnvironment = function(_board_vector,_node_size) {
		this.border_vector = [-Math.abs((_board_vector[0]*_node_size/2)+5),-Math.abs((_board_vector[1]*_node_size/2)+5),(_board_vector[0]*_node_size/2)+5,(_board_vector[1]*_node_size/2)+5]; //x1,y1,x2,y2

		this.floating_text_array = [];
		this.floating_text_array.push(new FloatingText("Score: 0",[this.border_vector[0],this.border_vector[3]+_node_size],_node_size,"Persistant",LEFT));
		this.floating_text_array.push(new FloatingText("GitHub Repo: https://github.com/Ledmonds/Snake",[this.border_vector[2],this.border_vector[1]-_node_size/2],_node_size,"Persistant",RIGHT));
		this.floating_text_array.push(new FloatingText("Snake Implementation Created Within the p5js Library - Jaymz Edmonds",[this.border_vector[0],this.border_vector[1]-_node_size/2],_node_size,"Persistant",LEFT));
		this.floating_text_array.push(new FloatingText("Press Any Key To Start",[0,0],_node_size,"Sin",CENTER)); //Start Message
	}

	this.setupEnvironmentScene = function(_score) {
		clear();
		background(this.background_color);
		translate(window.innerWidth/2,window.innerHeight/2);
		this.drawBorder();
		this.floating_text_array[0].setTextValue("Score: "+_score);
		if(this.floating_text_array.length != 0) this.iterateFloatingText();
	}

	this.disableStartText = function() {this.floating_text_array[3].setTextType("Fading");}

	this.iterateFloatingText = function() {
		for(var i = 0; i < this.floating_text_array.length; ++i) {
			if (this.floating_text_array[i].isTextDead()) 
				{
					this.floating_text_array.splice(i,1);
					--i;
				}
			else this.floating_text_array[i].drawText();
		}
	}

	this.addFloatingText = function(_text,_text_vector,_node_size) {this.floating_text_array.push(new FloatingText(_text,_text_vector,_node_size,"Fading",CENTER));}

	this.drawBorder = function() {
		stroke([255,120,54,255]).strokeWeight(1);
		line(this.border_vector[0],this.border_vector[1],this.border_vector[2],this.border_vector[1]);
		line(this.border_vector[2],this.border_vector[1],this.border_vector[2],this.border_vector[3]);
		line(this.border_vector[0],this.border_vector[3],this.border_vector[2],this.border_vector[3]);
		line(this.border_vector[0],this.border_vector[1],this.border_vector[0],this.border_vector[3]);
	}
}