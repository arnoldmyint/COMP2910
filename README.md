# COMP2910
COMP 2910 Project for CST.

a)TEAM INFO 

GROUP: 01
Team members:
Matt Rosenlund
Arnold Aung
Tom Nam
Arvin Rolos
Wayne Wang


b)PROJECT OVERVIEW

This application was developed as part of BCIT's COMP 2910 Project Term in the span of 4 weeks with a team of 5 individuals. It was written in JavaScript, HTML, CSS and a bit of php.

Game Title: Brain Roll

Short Description: The game consist of a grid that randomly generates a starting point and ending point. The goal is to create a path for the brain from the starting point to the ending point without destroying the brain. (i.e, you cannot make the brain drop for more than a level, if you want to move one level down, you should use a slope).

c)Description of code structure

index.html		game menu also the game itself is here
form.html		to submit the name for highscores (user won’t be able to go 				here directly)
scoreboard.php		to view the highscores (online)

styles\style.css	Styling the whole game

js\brain.js 		Brain control
js\Control.js		event handling
js\device.js		library for device detection
js\GameFrame.js		Actual game frame initialization
js\jquery.js		jQuery for testing loading bar
js\Navigation.js	Navigation through pages
js\Main.js		Holds all globals and start of game
js\Points.js		Calculations for points, shapes, polygons specifically.

images			all images for the whole game
d)Technologies used

Most of game was coded in JS without 3rd party library.
Device.js is used to detect different devices.
Google Spreadsheet (with php) to submit and retrieve highscore.


e)Issues/problems encountered
	1) We made most of the game on our own which took a lot of time. We should have used some 3rd party libraries.
	2) Really hard to make the game playable on both desktop and laptop across all OS using different browsers. 




USER GUIDE

To test our game,
open index.html
select Play
select Challenge.

Currently, the first game level will be available to play with limited blocks. The first one, cube and second one, SW Slope works. 

Note: Upon testing the game, loss or win, you will be redirected to our live website
so you will no longer be on the local version. To play again, open the local index.html again.
