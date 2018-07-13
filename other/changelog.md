# Changelog
All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]


## [1.0.1] - 13.7.18

### Changes
- Cleaned the file structure to be a little more logical.
- Changed text files to .MD instead of .TXT and formatted these accordingly.
- Updated the ReadMe.txt to include additional need for WebServer pointed at Space.Snake root.
- Refactored code in board.js to be a little nicer.

### Additions
- Added Death sound for snake.

### Bug Fixes
- Floating messages such as "Press Any Key" to play are not displayed upon resizing window.
- Subsiquently floating messages are preserved in state upon resizing the window.

### Known Bugs


## [1.0.0] - 1.7.18

### Changes
- Swapped the draw order for Snake and Food, such that the food disappears immediately as snake passes over this.
- Upon death, game now requires a mouse click to restart and not a key press.
- Game now requires a web-server to run as it is pulling sound assets.

### Additions
- Included some movement control details in the ReadMe file.
- Food randomiseCoOrds function to check if it collides with part of the snake body to stop it from spawning where the snake already is.
- Added a bumping border animation when food is eaten to give a little more eye candy.
- Added some music and game sounds in.

### Bug Fixes
- Snake can now only update in one direction per draw call, can't die by moving back onto itself.
- Board correctly resizes to initial size when restarting game.

### Known Bugs
- When screen is resized the Press any key to play button comes back.
- Snakehead leaves screen by 1 iteration when dead.
- Some issues with drawing the border when resizing the board.