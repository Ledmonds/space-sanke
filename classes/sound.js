class Sound {
	//Constructor
	constructor() {
		this.game_music = loadSound('./assets/sounds/game_music - 808055_Stardew-Planet.mp3');
		this.game_start = loadSound('./assets/sounds/game_start.wav');
		this.food_eaten_sound = loadSound('./assets/sounds/snake_food_eaten.wav');
		this.snake_death = loadSound('./assets/sounds/snake_death.wav');
	}


	//Modifiers
	playSnakeDeath() {
		this.snake_death.rate(0.5);
		this.snake_death.play();
	}
	playGameMusic() {this.game_music.loop();}
	stopGameMusic() {this.game_music.stop();}
	playGameStart() {this.game_start.play();}
	playFoodEaten() {
		this.food_eaten_sound.rate(random(0.5,1.5));
		this.food_eaten_sound.play();
	}
	playGameSlowDown() {
		this.game_start.rate(0.5);
		this.game_start.play();
	}
	playGameSpeedUp() {
		this.game_start.rate(2);
		this.game_start.play();
	}


}