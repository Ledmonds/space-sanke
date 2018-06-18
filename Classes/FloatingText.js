this.FloatingText = function(_text_value,_text_value_vector,_node_size,_text_type,_text_align) {
	//Variables
	this.text_value = _text_value;
	this.text_value_vector = _text_value_vector;
	this.node_size = _node_size;
	this.text_size = window.innerWidth/100;
	this.fade_value = 1;
	this.sin_value = 0;
	this.text_color = [255];
	this.text_font = "Georgia";
	this.text_type = _text_type; //"Fading", "Sin", "Persistant"
	this.text_align = _text_align;

	//Settors
	this.setTextValue = function(_text_value) {this.text_value = _text_value;}
	this.setTextType = function(_text_type) {this.text_type = _text_type;}

	//Drawers
	this.drawText = function() {
		textFont(this.text_font);

		if (this.text_type == "Fading") this.drawFadingText();
		else if (this.text_type == "Sin") this.drawSinText();
		else if (this.text_type == "Persistant") this.drawPersistantText();
	}

	this.drawFadingText = function() {
		this.fade_value *= 0.75;
		fill([255,map(this.fade_value,1,0,255,0)])
			.textSize(this.text_size)
			.textAlign(this.text_align)
			.strokeWeight(0);
		text(this.text_value,this.text_value_vector[0]*this.node_size,this.text_value_vector[1]*this.node_size);
	}

	this.drawSinText = function() {
		textAlign(this.text_align);
		this.sin_value+=0.3;
		textSize(map(window.innerWidth/100,-4,sin(this.sin_value),this.text_size/4,this.text_size/2));
		text(this.text_value,0,0+window.innerWidth/100);
	}

	this.drawPersistantText = function() {
		textAlign(this.text_align);
		textSize(this.text_size);
		text(this.text_value,this.text_value_vector[0],this.text_value_vector[1]);
	}

	//Checkers
	this.isTextDead = function() {
		return (this.fade_value <= 0.1) ? true : false;
	}




}