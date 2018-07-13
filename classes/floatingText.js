class FloatingText {
	//Constructor
	constructor(_text_value,_text_vector,_text_type,_text_align) {
		this.text_value = _text_value;
		this.text_vector = _text_vector;
		this.text_size = window.innerWidth/100;
		this.fadeout_value = 1;
		this.fadein_value = 0;
		this.fade_decay_rate = 0.9;
		this.sin_value = 0;
		this.sin_variable_rate = 0.1;
		this.text_color = [255];
		this.text_font = "Georgia";
		this.text_type = _text_type; //"Fadeout", "Sin", "Persistant", SinFadeout, SinFadeIn.
		this.text_align = _text_align;
	}


	//Gettors
	getTextType() {return this.text_type;}


	//Settors
	setTextVector(_text_vector) {this.text_vector = _text_vector;}
	setTextValue(_text_value) {this.text_value = _text_value;}
	setTextType(_text_type) {this.text_type = _text_type;}


	//Checkers
	isTextDead() {return (this.fadeout_value <= 0.1) ? true : false;}


	//Modifiers
	resizeTextVector(_text_vector) {if (this.text_type == "Persistant") this.text_vector = _text_vector;}


	//Drawers
	drawText() {
		textFont(this.text_font)
			.noStroke()
			.textAlign(this.text_align)
			.fill(this.text_color);

		if (this.text_type == "Fadeout") this.drawFadeoutText();
		else if (this.text_type == "Sin") this.drawSinText();
		else if (this.text_type == "Persistant") this.drawPersistantText();
		else if (this.text_type == "SinFadeout") this.drawSinFadeoutText();
		else if (this.text_type == "SinFadein") this.drawSinFadeinText();
	}
	drawFadeoutText() {
		this.fadeout_value *= this.fade_decay_rate;
		fill([this.text_color[0],map(this.fadeout_value,1,0,255,0)])
			.textSize(this.text_size)
		text(this.text_value,this.text_vector[0],this.text_vector[1]);
	}
	drawSinText() {
		this.sin_value+=this.sin_variable_rate;
		fill(this.text_color)
			.textSize(map(window.innerWidth/100,-4,sin(this.sin_value),this.text_size/4,this.text_size/2));
		text(this.text_value,this.text_vector[0],this.text_vector[1]+this.text_size/2);
	}
	drawSinFadeoutText() {
		this.fadeout_value*=this.fade_decay_rate;
		this.sin_value+=this.sin_variable_rate;
		fill([this.text_color[0],map(this.fadeout_value,1,0,255,0)])
			.textSize(map(window.innerWidth/100,-4,sin(this.sin_value),this.text_size/4,this.text_size/2))
		text(this.text_value,this.text_vector[0],this.text_vector[1]+this.text_size/2);
	}
	drawPersistantText() {
		fill(this.text_color)
			.textSize(this.text_size);
		text(this.text_value,this.text_vector[0],this.text_vector[1]);
	}
	drawSinFadeinText() {
		if (this.fadein_value < 1) this.fadein_value+=0.05;
		this.sin_value+=this.sin_variable_rate;
		fill([this.text_color[0],map(this.fadein_value,0,1,0,255)])
			.textSize(map(window.innerWidth/100,-4,sin(this.sin_value),this.text_size/4,this.text_size/2))
		text(this.text_value,this.text_vector[0],this.text_vector[1]+this.text_size/2);
	}
};