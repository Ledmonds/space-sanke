# Introduction:
Modern implementation of the classic Snake game written in the p5js library.
![Alt text](./assets/cover_image.jpg?raw=true "Space Snake.js")

## Game Outline
Snake is a game where the player manoeuvres a Snake which grows in length, with the Snake tail itself being a primary obstacle. Players must avoid their own Snake tail, while attempting to navigate to, and eat randomly spawning food items. The game is finished when a player either collides with the game border or their own Snakes tail.

## Movement Controls
- WSAD Letter Keys: Players can use teh WSAD keys for directional movement.
- Shift: Players can use the Shift key to slow and speed up in game movement speed. Useful when dealing with difficult food spawns, or navigating tricky tail paths.

# Running
In order to start, simply run `npm ci` and `npx http-server`. The App listens by default on port 8080. Alternatively use the [Docker Image](https://hub.docker.com/r/ledmonds/space-snake/).