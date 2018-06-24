this.FloatingText = function(_text_value,_text_vector,_text_type,_text_align) {
	//Variables
	this.text_value = _text_value;
	this.text_vector = _text_vector;
	this.text_size = window.innerWidth/100;
	this.fade_value = 1;
	this.fade_decay_rate = 0.9;
	this.sin_value = 0;
	this.sin_variable_rate = 0.1;
	this.text_color = [255,255,255,255];
	this.text_font = "Georgia";
	this.text_type = _text_type; //"Fadeout", "Sin", "Persistant", SinFadeout.
	this.text_align = _text_align;

	//Gettors
	this.getTextType = function() {return this.text_type;}

	//Settors
	this.setTextValue = function(_text_value) {this.text_value = _text_value;}
	this.setTextType = function(_text_type) {this.text_type = _text_type;}

	//Modifiers
	this.resizeTextVector = function(_text_vector) {
		if (this.text_type == "Persistant") this.text_vector = _text_vector;
	}

	//Drawers
	this.drawText = function() {
		textFont(this.text_font)
			.noStroke()
			.textAlign(this.text_align)
			.fill(this.text_color);

		if (this.text_type == "Fadeout") this.drawFadeoutText();
		else if (this.text_type == "Sin") this.drawSinText();
		else if (this.text_type == "Persistant") this.drawPersistantText();
		else if (this.text_type == "SinFadeout") this.drawSinFadeoutText();
	}

	this.drawFadeoutText = function() {
		this.fade_value *= this.fade_decay_rate;
		fill([255,map(this.fade_value,1,0,255,0)])
			.textSize(this.text_size)
		text(this.text_value,this.text_vector[0],this.text_vector[1]);
	}

	this.drawSinText = function() {
		this.sin_value+=this.sin_variable_rate;
		textSize(map(window.innerWidth/100,-4,sin(this.sin_value),this.text_size/4,this.text_size/2));
		text(this.text_value,this.text_vector[0],this.text_vector[1]+this.text_size/2);
	}

	this.drawSinFadeoutText = function() {
		this.fade_value*=this.fade_decay_rate;
		this.sin_value+=this.sin_variable_rate;
		fill([255,map(this.fade_value,1,0,255,0)])
			.textSize(map(window.innerWidth/100,-4,sin(this.sin_value),this.text_size/4,this.text_size/2))
		text(this.text_value,this.text_vector[0],this.text_vector[1]+this.text_size/2);
	}

	this.drawPersistantText = function() {
		textSize(this.text_size);
		text(this.text_value,this.text_vector[0],this.text_vector[1]);
	}

	//Checkers
	this.isTextDead = function() {
		return (this.fade_value <= 0.1) ? true : false;
	}
}