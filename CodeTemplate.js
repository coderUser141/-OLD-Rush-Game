$(document).ready(function(){
	
document.body.onmousedown = function() { return false; } //so page is unselectable

	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var mx, my;
	
	var dtr = Math.PI/180;
	var theta = 0;
	var thetaInc = 4*dtr;
	
	var switch1 = 0;
	var switch2 = 0;
	//used for player movement later on
	var bulletWidth = 3;
	var bulletHeight = 3;
	var bulletColour = 'yellow';
	var bulletSpeed = 15;
	var bullets = [];
	var counter = 0;
	var change1;
	//used for highscores
	var namesHighScoresArr = [];
	var sortedArray = [];
	//enemy arrays
	var enemyArrLeft = [];
	var enemyArrRight = [];
	var enemyArrUp = [];
	var enemyArrDown = [];
	//number per array
	var numEnemiesLeft = 5;	
	var numEnemiesRight = 5
	var numEnemiesUp = 5;
	var numEnemiesDown = 5;
	
	var tCounter = 5;
	
	var playerScore = 0;
	
	for (var i = 0; i < numEnemiesLeft; i++){
		enemyArrLeft.push( new makeEnemies( -20, Math.round( Math.random()*700 ), 15, 'white', 0 ) );
	}
	for (var i = 0; i < numEnemiesRight; i++){
		enemyArrRight.push( new makeEnemies( w+20 , Math.round( Math.random()*700 ), 15, 'white', 0 ) );
	}
	for (var i = 0; i < numEnemiesUp; i++){
		enemyArrUp.push( new makeEnemies(  Math.round( Math.random()*700 ) , -20 , 15, 'white', 0 ) );		
	}
	for (var i = 0; i < numEnemiesDown; i++){
		enemyArrDown.push( new makeEnemies(  Math.round( Math.random()*700 ) , h+20 , 15, 'white', 0 ) );
	}
	//background
	//var image1 = new Image();
	//image1.src = "background.png";

	var menuSwitch = -1;
	//-1 --> menu page
	var tCounterMenuPage = 0;
	//0 --> engagement
	var tCounterEngagement = 5;
	//1 --> paused engagement
	var tCounterPaused = 5;
	//1.5 --> game over
	var tCounterGameOver
	//2 --> highscores
	var tCounterHighScores =5;
	//3 --> settings
	var tCounterSettings = 5;
	//4 --> controls
	var tCounterControls = 5;
	
	var pointsArray = [];
	
	//player is made
	var player = new makePlayer(w/2, h/2, 10, 'white', 0, pointsArray);
	
	var enemy1 = makeEnemies(100,100, 15, 'white', 0);
	

	//thanks :)
	function dist( p1x, p1y, p2x, p2y )
	{
  		var xs = 0;
  		var ys = 0;
 
 	 	xs = p2x - p1x;
 	 	xs = xs * xs;
 
 	 	ys = p2y - p1y;
 	 	ys = ys * ys;
 
 	 	return Math.sqrt( xs + ys );
	}
	
	
		
	//player object
	function makePlayer(icentreX, icentreY, iradius, icolour, istartingAngle, iarray, iswitch){
		var thetaInc = 5;
		var playerSpeedx = 0;
		var playerSpeedy = 0;
		var counterX = 0;//used to keep track of the paths
		var counterY = 0;
		var localAngle;//makes him turn
		var incrementX;
		var incrementY;
		var pathX = [];
		var pathY = [];//paths are used for decceleration
		return{
			centreX: icentreX,
			centreY: icentreY,
			radius: iradius,
			colour: icolour,
			angle: istartingAngle,
			array: iarray,
			playerSpeed: 10,
			acceleration: .5,
			decceleration: .5,
			health: 1,
			rotateLeft: function(){
				this.angle += thetaInc;
			},
			rotateRight: function(){
				this.angle -= thetaInc;
			},
			draw: function(){//draws
				this.array[0] = (this.centreX - this.radius*Math.sin((36+ this.angle)*dtr));
				this.array[1] = (this.centreY - this.radius*Math.cos((36+ this.angle)*dtr));
					
				this.array[2] = (this.centreX - this.radius*Math.sin((36+ 72+this.angle)*dtr));
				this.array[3] = (this.centreY - this.radius*Math.cos((36+72+this.angle)*dtr));
		
				this.array[4] = (this.centreX - this.radius*Math.sin((180+this.angle)*dtr));
				this.array[5] = (this.centreY - this.radius*Math.cos((180+this.angle)*dtr));

				this.array[6] = (this.centreX - this.radius*Math.sin((252+ this.angle)*dtr));
				this.array[7] = (this.centreY - this.radius*Math.cos((252+ this.angle)*dtr));
		
				this.array[8] = (this.centreX - this.radius*Math.sin((252+72 + this.angle)*dtr));
				this.array[9] = (this.centreY - this.radius*Math.cos((252+72 + this.angle)*dtr));
		
				this.array[10] = (this.centreX - this.radius/2*Math.sin((270 + 3 + this.angle)*dtr));
				this.array[11] = (this.centreY - this.radius/2*Math.cos((270 + 3 + this.angle)*dtr));
		
				this.array[12] = (this.centreX - this.radius/2.5*Math.sin((180+this.angle)*dtr));
				this.array[13] = (this.centreY - this.radius/2.5*Math.cos((180+this.angle)*dtr));
		
				this.array[14] = (this.centreX - this.radius/2*Math.sin((87+this.angle)*dtr));
				this.array[15] = (this.centreY - this.radius/2*Math.cos((87+this.angle)*dtr));
				
				ctx.lineWidth = 3;
				ctx.beginPath();
				ctx.moveTo(this.array[0], this.array[1]);
				ctx.lineTo(this.array[2], this.array[3]);
				ctx.lineTo(this.array[4], this.array[5]);
				ctx.lineTo(this.array[6], this.array[7]);
				ctx.lineTo(this.array[8], this.array[9]);
				ctx.lineTo(this.array[10], this.array[11]);
				ctx.lineTo(this.array[12], this.array[13]);
				ctx.lineTo(this.array[14], this.array[15]);
				ctx.strokeStyle = 'black';
				ctx.closePath();
				ctx.stroke();
				
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(this.array[0], this.array[1]);
				ctx.lineTo(this.array[2], this.array[3]);
				ctx.lineTo(this.array[4], this.array[5]);
				ctx.lineTo(this.array[6], this.array[7]);
				ctx.lineTo(this.array[8], this.array[9]);
				ctx.lineTo(this.array[10], this.array[11]);
				ctx.lineTo(this.array[12], this.array[13]);
				ctx.lineTo(this.array[14], this.array[15]);
				ctx.strokeStyle = this.colour;
				ctx.closePath();
				ctx.stroke();
				
				ctx.globaAlpha = 1;
				ctx.fillStyle = 'red';
				ctx.fillRect(this.centreX-50, this.centreY - 50, 70, 5);
				
				ctx.fillStyle = 'green';
				ctx.fillRect(this.centreX - 50, this.centreY - 50, 70* this.health, 5);
				
			},
			move: function(){
					if (switch1 == 1 && Math.abs(playerSpeedx) < 5){
						if (switch1 == 1 && Math.abs(playerSpeedy) < 5){
						localAngle = this.angle;
							incrementX = this.acceleration*Math.sin(localAngle*dtr);
							playerSpeedx += incrementX;
							pathX.push(this.acceleration*Math.sin(localAngle*dtr));
							counterX += 1;//switch activated due to key-press, his path in the x direction is being saved to decelerate later on
						}	
					}
					if ( switch2 == 1 && Math.abs(playerSpeedx) < 5  ){
						if (switch1 == 1 && Math.abs(playerSpeedy) < 5){
							localAngle = this.angle;
							incrementY = this.acceleration*Math.cos(localAngle*dtr);
							playerSpeedy += incrementY;
							pathY.push(this.acceleration*Math.cos(localAngle*dtr));
							counterY += 1;
						}
					}
					
					if (switch1 == 2 && counterX > 0){//this decelerates the player by undoing what the acceleration did
							playerSpeedx -= pathX[counterX-1];
							pathX.splice(counterX-1, 1);
							counterX -= 1;
					}
					if (switch2 == 2 && counterY > 0){//diddo
							playerSpeedy -= pathY[counterY-1];
							pathY.splice(counterY-1, 1);
							counterY -= 1;
					}
					if (this.centreY <= 30 && Math.sin(this.angle*dtr) >= 0 && Math.cos(this.angle*dtr) >= 0 || this.centreY <= 30 && Math.sin(this.angle*dtr) < 0 && (Math.cos(this.angle*dtr) > 0) ){//this makes sure he stays on the canvas
						playerSpeedy -= playerSpeedy;
						for (var i = 0; i < pathY.length; i++){
							pathY.splice(i, 1);
						}
						counterY = 0;
					}
					if ( (h-this.centreY) <= 30 && ((Math.sin(this.angle*dtr) >= 0 && Math.cos(this.angle*dtr) <=0) || ( (h-this.centreY) <= 30 && Math.sin(this.angle*dtr) < 0 && Math.cos(this.angle*dtr) < 0 )) ){
						playerSpeedy -= playerSpeedy;
						for (var i = 0; i < pathY.length; i++){
							pathY.splice(i, 1);
						}
						counterY = 0;
					}
					if  ( (w-this.centreX) <= 30 && ((Math.sin(this.angle*dtr) <= 0 && Math.cos(this.angle*dtr) <=0) || ( (w-this.centreX) <= 30 && Math.sin(this.angle*dtr) < 0 && Math.cos(this.angle*dtr) > 0 )) ){
						playerSpeedx -= playerSpeedx;
						for (var i = 0; i < pathX.length; i++){
							pathX.splice(i, 1);
						}
						counterX = 0;
					}
					
					if  ( (this.centreX) <= 30 && ((Math.sin(this.angle*dtr) >= 0 && Math.cos(this.angle*dtr) <=0) || ( (this.centreX) <= 30 && Math.sin(this.angle*dtr) > 0 && Math.cos(this.angle*dtr) > 0 )) ){
						playerSpeedx -= playerSpeedx;
						for (var i = 0; i < pathX.length; i++){
							pathX.splice(i, 1);
						}
						counterX = 0;
					}
					//adjusting his center is how he moves
					this.centreY -= playerSpeedy;
					this.centreX -= playerSpeedx;
				},
				manageHealth: function(){//checks if you die
					if (this.health <= 0){
						var temp = prompt("What is your name?", "Maximum of 8 characters");
						if (temp.length > 8)temp.splice(temp.length-1, 1);
						menuSwitch = 1.5;
						localStorage.names += temp + "@";
						localStorage.hs += playerScore + "%";//directly saves values into localStorage, no need for saveGame, and loading becomes easier as well
						
						playerSpeedx = 0;
						playerSpeedy = 0;
						counterX = 0;
						counterY = 0;
						incrementX = 0;
						incrementY = 0;
						pathX = [];
						pathY = [];
						switch1 = 0;
						switch2 = 0;
						//resets variables
					}
				}
		}
		
	}
	

	
	//diamond cross enemy function
	function makeEnemies(icentreX, icentreY, iradius, icolour, istartingAngle, iarray){
		var result = false;
		var thetaInc = 2;
		var temp = Math.round(Math.random());
		var tempArr = []
		return{
			centreX: icentreX,
			centreY: icentreY,
			radius: iradius,
			colour: icolour,
			angle: istartingAngle,
			array: tempArr,
			speed: 2,
			manageSpeed: function(){//speeds up after  5000 points
				if(playerScore < 5000)this.speed =2;
				if (playerScore > 5000){
					this.speed = 3;
				}
			},
			draw: function(){
				this.array[0] = (this.centreX - this.radius*Math.sin((90+ this.angle)*dtr));
				this.array[1] = (this.centreY - this.radius*Math.cos((90+ this.angle)*dtr));
					
				this.array[2] = (this.centreX - this.radius*Math.sin((180 +this.angle)*dtr));
				this.array[3] = (this.centreY - this.radius*Math.cos((180+this.angle)*dtr));
		
				this.array[4] = (this.centreX - this.radius*Math.sin((270+this.angle)*dtr));
				this.array[5] = (this.centreY - this.radius*Math.cos((270+this.angle)*dtr));

				this.array[6] = (this.centreX - this.radius*Math.sin((360+ this.angle)*dtr));
				this.array[7] = (this.centreY - this.radius*Math.cos((360+ this.angle)*dtr));
				
				ctx.lineWidth = 5;
				ctx.beginPath();
				ctx.moveTo(this.array[0], this.array[1]);
				ctx.lineTo(this.array[2], this.array[3]);
				ctx.lineTo(this.array[4], this.array[5]);
				ctx.lineTo(this.array[6], this.array[7]);
				ctx.strokeStyle = 'red';
				ctx.closePath();
				ctx.moveTo(this.array[0], this.array[1]);
				ctx.lineTo(this.array[4], this.array[5]);
				ctx.closePath();
				ctx.moveTo(this.array[6], this.array[7]);
				ctx.lineTo(this.array[2], this.array[3]);
				ctx.closePath();
				ctx.stroke();
			},
			move: function(){//makes the zombies chase the player
					if (this.centreX > player.centreX){//checks if the character is to the right of the player
							if(this.centreX-player.centreX >= 9){//only moves the player right if the difference between their x-coordinates is greater than or equal to 9, to prevent jaggedness
							this.centreX -= this.speed;
						}
						if(this.centreY >= player.centreY && this.centreY-player.centreY >= 9){/*checks if the character is underneath the player and moves it
up until the difference between the two coordinates is less than or equal to 9 so that way it doesn't move jaggedly when it gets near the player y-value*/
							this.centreY -= this.speed;
							}
							else if(this.centreY <= player.centreY && this.centreY-player.centreY <= 9){//same structure, just checks if the character is above the player
							this.centreY += this.speed;
							}
					}	
					else if (this.centreX <= player.centreX){//checks if the character is to the left of the player
						if(this.centreX-player.centreX <= -9){//same structure as the code before it, but now checks if the difference between the two is negative 9, still to prevent jaggedness
						this.centreX +=this.speed;
						}
						if(this.centreY > player.centreY && this.centreY-player.centreY >= 9){//same structure as before, but it moves to the left instead
						this.centreY -= this.speed;
						}
						else if(this.centreY <= player.centreY && this.centreY-player.centreY <= 9){
						this.centreY += this.speed;
					}
				}
				
				if(dist( player.centreX, player.centreY, this.centreX, this.centreY) < this.radius){// this checks if the character has hit the player, puts the character somewhere else, and adds to the score
					player.health -= 0.01;
					this.centreX = w+20;
					this.centreY = h+ 20;
				}
				else if (dist( player.centreX, player.centreY, this.centreX, this.centreY) >= this.radius){
				}
			},
			rotate: function(){
				this.angle += thetaInc;
			}
		}
	}
	var testEArray = [];
//	var testEnemy = new makeEnemies2(0,0, 8, 'purple', 0, testEArray )
	
	//triangle enemies
	function makeEnemies2(icentreX, icentreY, iradius, icolour, istartingAngle, iarray){
		var result = false;
		var thetaInc = 2;
		var temp = Math.round(Math.random());
		var tempArr = []
		return{
			centreX: icentreX,
			centreY: icentreY,
			radius: iradius,
			colour: icolour,
			angle: istartingAngle,
			array: tempArr,
			speed: 2,
			manageSpeed: function(){//speeds up after  5000 points
				if(playerScore < 5000)this.speed =2;
				if (playerScore > 5000){
					this.speed = 3;
				}
			},
			draw: function(){
				this.array[0] = (this.centreX - this.radius*Math.sin((this.angle)*dtr));
				this.array[1] = (this.centreY - this.radius*Math.cos((this.angle)*dtr));
					
				this.array[2] = (this.centreX - this.radius*Math.sin((120 +this.angle)*dtr));
				this.array[3] = (this.centreY - this.radius*Math.cos((120+this.angle)*dtr));
				
				this.array[4] = (this.centreX - this.radius*Math.sin((240 +this.angle)*dtr));
				this.array[5] = (this.centreY - this.radius*Math.cos((2+this.angle)*dtr));
				
				ctx.lineWidth = 5;
				ctx.beginPath();
				ctx.moveTo(this.array[0], this.array[1]);
				ctx.lineTo(this.array[2], this.array[3]);
				ctx.closePath();
				ctx.strokeStyle = 'purple';
				ctx.stroke();
			},
			move: function(){//makes the zombies chase the player
					if (this.centreX > player.centreX){//checks if the character is to the right of the player
							if(this.centreX-player.centreX >= 9){//only moves the player right if the difference between their x-coordinates is greater than or equal to 9, to prevent jaggedness
							this.centreX -= ( this.speed += 2*Math.round(Math.cos(theta)) );
						}
						if(this.centreY >= player.centreY && this.centreY-player.centreY >= 9){/*checks if the character is underneath the player and moves it
up until the difference between the two coordinates is less than or equal to 9 so that way it doesn't move jaggedly when it gets near the player y-value*/
							this.centreY -= (this.speed += 2*Math.round(Math.sin(theta)) );
							}
							else if(this.centreY <= player.centreY && this.centreY-player.centreY <= 9){//same structure, just checks if the character is above the player
							this.centreY += ( this.speed += 2*Math.round(Math.sin(theta)) );
							}
					}	
					else if (this.centreX <= player.centreX){//checks if the character is to the left of the player
						if(this.centreX-player.centreX <= -9){//same structure as the code before it, but now checks if the difference between the two is negative 9, still to prevent jaggedness
						this.centreX +=( this.speed += 2*Math.round(Math.cos(theta)) );
						}
						if(this.centreY > player.centreY && this.centreY-player.centreY >= 9){//same structure as before, but it moves to the left instead
						this.centreY -= (this.speed += 2*Math.round(Math.sin(theta)) );
						}
						else if(this.centreY <= player.centreY && this.centreY-player.centreY <= 9){
						this.centreY += ( this.speed += 2*Math.round(Math.sin(theta)) );
					}
				}
				
				if(dist( player.centreX, player.centreY, this.centreX, this.centreY) < this.radius){// this checks if the character has hit the player, puts the character somewhere else, and adds to the score
					player.health -= 1;
					this.centreX = w+20;
					this.centreY = h+ 20;
				}
				else if (dist( player.centreX, player.centreY, this.centreX, this.centreY) >= this.radius){
				}
			},
			rotate: function(){
				this.angle += thetaInc;
			}
		}
	}
	
	//bullets
	function makeBullets(bx,by,bw,bh,bcol,bspeed, mouseX, mouseY){
		return{
				x:bx,
				y:by,
				w:bw,
				h:bh,
				colour: bcol,
				//bullet properties
				speed:bspeed,
				destinationx: mouseX,
				destinationy: mouseY,
				draw: function(){//draws the character
					ctx.fillStyle = this.colour;
					ctx.fillRect(this.x, this.y, this.w, this.h);
				},
				shoot: function(){//shoots the bullets
					if(this.destinationx >= player.centreX && this.x <=(w+500) && this.x >= -500){//this makes sure that if the bullets are out of the screen, that they don't start moving back if the mouse is moved in the opposite direction
						if(this.destinationy >= player.centreY && this.y <=(h+50) && this.y >= -20){/*bottom right-hand corner, adds 15 pixels at an angle of the mouse*/
							this.y += this.speed*(Math.sin(Math.atan((this.destinationy-  player.centreY)/(this.destinationx- player.centreX))));
							this.x += this.speed*(Math.cos(Math.atan((this.destinationy- player.centreY)/(this.destinationx- player.centreX))));
						}
						else if (this.destinationy <=  player.centreY && this.y >= -500 && this.y <= (h+500)){//top right-hand corner, adds 15 pixels at the angle of the mouse*/
							this.x += this.speed*(Math.cos(Math.atan(( player.centreY-this.destinationy)/(this.destinationx- player.centreX))));
							this.y -= this.speed*(Math.sin(Math.atan(( player.centreY-this.destinationy)/(this.destinationx- player.centreX))));
						}
					}
					else if (this.destinationx <= player.centreX && this.x >= -500 && this.x <= (w+500)){
							if(this.destinationy >= player.centreY && this.y <(h+500) && this.y > -500){//bottom left-hand corner
							//this.y +=this.speed;
								this.y += this.speed*(Math.sin(Math.atan((this.destinationy- player.centreY)/( player.centreX-this.destinationx))));
								this.x -= this.speed*(Math.cos(Math.atan((this.destinationy- player.centreY)/( player.centreX-this.destinationx))));
							}
							else if (this.destinationy <=  player.centreY && this.y >= -500 && this.y <= (h+500)){//top left-hand corner
								this.y -= this.speed*(Math.sin(Math.atan(( player.centreY-this.destinationy)/( player.centreX-this.destinationx))));
								this.x -= this.speed*(Math.cos(Math.atan(( player.centreY-this.destinationy)/( player.centreX-this.destinationx))));
							}
						}
				},
				hit: function (){
				for (var i = 0; i < numEnemiesDown; i++){
						if ( dist( enemyArrDown[i].centreX, enemyArrDown[i].centreY, this.x, this.y) < enemyArrDown[i].radius){
							 enemyArrDown[i].centreX = Math.round(Math.random()*700);
							 enemyArrDown[i].centreY = h+20;
							// enemyArrDown.push( new makeEnemies(  Math.round( Math.random()*700 ) , h+20 , 15, 'white', 0 ) );
							 //numEnemiesDown += 1;
							 playerScore += 100;//points are added for hits
						}
				}
				for (var i = 0; i < numEnemiesLeft; i++){
						if ( dist( enemyArrLeft[i].centreX, enemyArrLeft[i].centreY, this.x, this.y) < enemyArrLeft[i].radius){
							 enemyArrLeft[i].centreX = -200;
							 enemyArrLeft[i].centreY = Math.round( Math.random()*700 );
							// enemyArrLeft.push( new makeEnemies( -20, Math.round( Math.random()*700 ), 15, 'white', 0 ) );
							 //numEnemiesLeft += 1;
							 playerScore += 100;
						}
				}
				for (var i = 0; i < numEnemiesRight; i++){
						if ( dist( enemyArrRight[i].centreX, enemyArrRight[i].centreY, this.x, this.y) < enemyArrRight[i].radius){
							 enemyArrRight[i].centreX = w + 200;
							 enemyArrRight[i].centreY = Math.round( Math.random()*700);
							// enemyArrRight.push( new makeEnemies( w+20 , Math.round( Math.random()*700 ), 15, 'white', 0 ) );
							
							
							 playerScore += 100;
						}
				}
				for (var i = 0; i < numEnemiesUp; i++){
						if ( dist( enemyArrUp[i].centreX, enemyArrUp[i].centreY, this.x, this.y) < enemyArrUp[i].radius){
							 enemyArrUp[i].centreX = Math.round( Math.random() *700);
							 enemyArrUp[i].centreY = -200;
							// enemyArrUp.push( new makeEnemies(  Math.round( Math.random()*700 ) , -20 , 15, 'white', 0 ) );
							 //numEnemiesUp += 1;
							 playerScore += 100;
						}
				}
				
			
				
			}
		}
	}
	
	function manageBullets(){
	
		for (var i = 0; i < bullets.length; i++){
			 
			 if(bullets[i].x > (w+500) || bullets[i].x < -500 || bullets[i].y > (h+50) || bullets[i].y < -20){
					bullets.splice(i,1);
			}
			
		}
		
	}
	
	
	function selectionSort(input){//sorts the compound array
	
		for (var i = 0; i < input.length; i++){
				
				var temp;
				var temp2;
			for (var j = 0; j < input.length-i; j++){	
				if(input[i+j].h > input[i].h && i+j < input.length){
					temp = input[i];
					input[i] = input[i+j];
					input[i+j] = temp;
				}
			}
			
		}
		
		return input;
	}
	/*function recursiveSearch(beginningNum, endingNum, value, array){
		middleNum = Math.floor((endingNum+beginningNum)/2);
		if (value == array[middleNum]){
			alert("found it");
			return middleNum;
		}		
		else if (value < array[middleNum]){
			alert("searching bottom half " + "beginningNum " + beginningNum + " middleNum " + middleNum);
			recursiveSearch(beginningNum, middleNum-1, value, array);
		}
		else if (value > array[middleNum]){
			alert("searching top half " + middleNum + " " + endingNum+ " middleNum, endingNum");
			recursiveSearch(middleNum+1, endingNum, value, array);
		}
	}*/

	function search(array, value){
		temp = [];
		for (var i = 0; i < array.length; i++){
			if (array[i] == value){
				return i;
			}
		}
	}
	
	/*function recursiveSearch(beginningNum, endingNum, value, array){
		middleNum = Math.floor((endingNum+beginningNum)/2);
		if (beginningNum > endingNum){
		 return -1;	
		 alert("was not found");
		 
		}
		if (value == array[middleNum]){
			alert("found it");
			return middleNum;
		}	
			
		else if (value > array[middleNum] && value != array[middleNum]){
			alert("searching bottom half " + "beginningNum " + beginningNum + " middleNum " + middleNum);
			recursiveSearch(beginningNum, middleNum-1, value, array);
		}
		else if (value < array[middleNum] && value != array[middleNum]){
			alert("searching top half " + middleNum + " " + endingNum+ " middleNum, endingNum");
			recursiveSearch(middleNum+1, endingNum, value, array);
		}
		
	}*/
	function load(){//takes the localStorage values, and puts them back into a compound array, with a names and highscores arguments, which is then returned
		var temp = "";
		var tempArr = [];
		for (var i = 0; i < localStorage.names.length; i++){
			if (localStorage.names[i] != "@"){
				temp += localStorage.names.charAt(i);
			}
			else{
				tempArr.push(temp);
				temp = "";
			}
		}
		var temp2 = "";
		var tempArr2 = [];
		for (var i = 0; i < localStorage.hs.length; i++){
			if (localStorage.hs[i] != "%"){
				//alert("adding names");
				temp2 += localStorage.hs.charAt(i);
			}
			else{
				tempArr2.push(Number(temp2));
				temp2 = "";
			}
		}
		
		var tempArr3 = [];
		for (var i = 0; i < tempArr.length; i++){
			tempArr3.push({n:tempArr[i], h:tempArr2[i]});
		}
		
		return tempArr3;
	}
	
	/////////////////////////////////
	////////////////////////////////
	////////	GAME INIT
	///////	Runs this code right away, as soon as the page loads.
	//////	Use this code to get everything in order before your game starts 
	//////////////////////////////
	/////////////////////////////
	function init()
	{

	//////////
	///STATE VARIABLES
	
	
	//////////////////////
	///GAME ENGINE START
	//	This starts your game/program
	//	"paint is the piece of code that runs over and over again, so put all the stuff you want to draw in here
	//	"60" sets how fast things should go
	//	Once you choose a good speed for your program, you will never need to update this file ever again.

	if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}

	init();	
	
	

	
	
	///////////////////////////////////////////////////////
	//////////////////////////////////////////////////////
	////////	Main Game Engine
	////////////////////////////////////////////////////
	///////////////////////////////////////////////////
	function paint()
	{
	
		//menu page
		if (menuSwitch == -1){
			ctx.clearRect(0,0,w,h);
			//delays the clicking between page transitions
			
			if (tCounterHighScores > 0)tCounterHighScores -= 1;
			if (tCounterControls > 0)tCounterControls -= 1;
			if (tCounterEngagement > 0)tCounterEngagement -= 1;
			
			ctx.fillStyle = 'black';
			ctx.fillRect(0,0, w,h);	
			
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			ctx.moveTo(50,50);
			ctx.lineTo(50, h-10);
			ctx.lineTo(w-50, h-10);
			ctx.lineTo(w-50, 50);
			ctx.closePath();
			ctx.stroke();
			
			
			ctx.fillStyle = 'green';
			ctx.globalAlpha = .5;
			ctx.fillRect(51, 100, w-100, 100);
			
			ctx.fillStyle = 'white';
			ctx.font = 'normal 30pt Arial';
			ctx.fillText("Rip - Off Geo Wars", w/3, h/4);
			
			ctx.fillStyle = 'green';
			ctx.globalAlpha = .5;
			
			theta += thetaInc;
			
			
			ctx.fillStyle = 'white';
			ctx.font = 'normal 20pt Arial';
			
			ctx.fillStyle = 'green';
			ctx.fillRect(w/2 - 75 -2*Math.sin(theta), 250-2*Math.sin(theta), 200+4*Math.sin(theta), 70+4*Math.sin(theta) );
			ctx.fillStyle = 'white';
			ctx.fillText("Play", w/2 -25 , 290);
			
			ctx.fillStyle = 'green';
			ctx.fillRect(w/2- 75 - 2*Math.sin(theta) , 370-2*Math.sin(theta), 200+4*Math.sin(theta), 70 + 4*Math.sin(theta));
			ctx.fillStyle = 'white';		
			ctx.fillText("Highscores", w/2 - 50 , 410);
			
			ctx.fillStyle = 'green';
			ctx.fillRect(w/2- 75 - 2*Math.sin(theta) , 370-2*Math.sin(theta)+120, 200+4*Math.sin(theta), 70 + 4*Math.sin(theta));
			ctx.fillStyle = 'white';			
			ctx.fillText("Controls", w/2 - 50, 530);
			
			//ctx.fillText(tCounterHighScores + " tCounterHighScores", 100, 450);
			
		}
		
		//game page
		if (menuSwitch == 0){
			ctx.clearRect(0,0,w,h);
			if (tCounterEngagement > 0)tCounterEngagement -= 1;
			if (tCounterHighScores > 0)tCounterHighScores -= 1;
			if (tCounterPaused > 0)tCounterPaused -= 1;
			
			ctx.fillText(tCounterEngagement, 500,100);
			
			ctx.globalAlpha = 1;
			
			theta += thetaInc;
			//ctx.drawImage(image1, 0, 0, w, h);
			
			ctx.beginPath();
			//ctx.moveTo( 100 + 20*Math.cos(theta), 100 + 20*Math.sin(theta));
			//ctx.lineTo( 100 - 20*Math.cos(theta), 100 - 20*Math.sin(theta));
			ctx.strokeStyle = 'green';
			ctx.lineWidth = 5
			ctx.stroke();
			
				ctx.fillStyle = 'white';
				ctx.font = '20px Arial';
				ctx.fillText( playerScore, 200, 100);
				ctx.fillText( "Score:", 10, 100)
			
			player.draw();
			player.move();
			player.manageHealth();
			
			/*
			testEnemy.draw();
			testEnemy.move();
			testEnemy.rotate();
			testEnemy.manageSpeed();*/
			
			if(change1 == true){
				//bullets.push(makeCharacter(player.playerX,player.playerY,bulletWidth,bulletHeight,'yellow',bulletSpeed));
				for (var j = 0; j< bullets.length; j++){
					bullets[j].draw();
					bullets[j].shoot();
					bullets[j].hit();
				}
			}
			//activates enemies
			for (var i = 0; i < numEnemiesDown; i++){
				enemyArrDown[i].draw();
				enemyArrDown[i].move();
				enemyArrDown[i].rotate();
				enemyArrDown[i].manageSpeed();
			}
			for (var i = 0; i < numEnemiesLeft; i++){
				enemyArrLeft[i].draw();
				enemyArrLeft[i].move();
				enemyArrLeft[i].rotate();
				enemyArrLeft[i].manageSpeed();
			}
			for (var i = 0; i < numEnemiesRight; i++){
				enemyArrRight[i].draw();
				enemyArrRight[i].move();
				enemyArrRight[i].rotate();
				enemyArrRight[i].manageSpeed();
			}
			for (var i = 0; i < numEnemiesUp; i++){
				enemyArrUp[i].draw();
				enemyArrUp[i].move();
				enemyArrUp[i].rotate();
				enemyArrUp[i].manageSpeed();
			}
			
			manageBullets();//removes bullets off of canvas
			
		}
		//paused game page
		if (menuSwitch == 1){
			if (tCounterEngagement > 0)tCounterEngagement -= 1;
			//ctx.drawImage(image1, 0,0,w,h);
			
			ctx.globalAlpha = 1;
			
			player.draw();
			
			for (var i = 0; i < numEnemiesDown; i++){
				enemyArrDown[i].draw();
			}
			for (var i = 0; i < numEnemiesLeft; i++){
				enemyArrLeft[i].draw();
			}
			for (var i = 0; i < numEnemiesRight; i++){
				enemyArrRight[i].draw();
			}
			for (var i = 0; i < numEnemiesUp; i++){
				enemyArrUp[i].draw();
			}
			
			ctx.globalAlpha = .5;
			ctx.fillStyle = 'green';
			ctx.fillRect(300, 200, 300, 300);
			
			ctx.fillStyle = 'black';
			ctx.fillRect( 310, 210, 280, 280);
			
			ctx.globalAlpha = 1;
			ctx.fillStyle = 'green';
			ctx.fillRect(370, 250, 150, 30);
	
			ctx.fillRect(370, 330, 150, 30);
			
			ctx.fillStyle = 'white';
			ctx.fillText("Quit" ,410, 250+25);
			ctx.fillText("Resume", 410, 352);
			
			
			
			//ctx.fillText(numEnemiesDown+numEnemiesLeft+numEnemiesRight+numEnemiesUp, 300,500);
			
		}
		
		//game over
		if (menuSwitch == 1.5){
			if (tCounterGameOver > 0)tCounterGameOver -= 1;
			if (tCounterEngagement > 0)tCounterEngagement -= 1;
			//ctx.drawImage(image1, 0,0,w,h);
			
			ctx.globalAlpha = 1;
			
			player.draw();
			
			for (var i = 0; i < numEnemiesDown; i++){
				enemyArrDown[i].draw();
			}
			for (var i = 0; i < numEnemiesLeft; i++){
				enemyArrLeft[i].draw();
			}
			for (var i = 0; i < numEnemiesRight; i++){
				enemyArrRight[i].draw();
			}
			for (var i = 0; i < numEnemiesUp; i++){
				enemyArrUp[i].draw();
			}
			
			
			ctx.globalAlpha = 1;
			ctx.fillStyle = 'green';
			ctx.fillRect(  370, 250, 150, 30);
			
			ctx.fillStyle = 'red';
			ctx.font = '60pt Arial';
			ctx.fillText("Game Over", w/2-200, h/2-100);
			
			ctx.font = '20pt Arial';
			ctx.fillStyle = 'white';
			ctx.fillText("Quit", 410, 250+25);
	
		}
		
		//highscores
		if (menuSwitch == 2){
			if (tCounterMenuPage > 0)tCounterMenuPage -= 1;
			ctx.globaAlpha = .2;
			ctx.fillStyle = 'blue';
			ctx.fillRect(0,0, w,h);
			
			ctx.fillStyle = 'black';
			ctx.fillRect(50, 50, w-100, h-100);
			
			ctx.lineWidth = 3;
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			ctx.moveTo(49, 49);
			ctx.lineTo(w-50, 49);
			ctx.lineTo(w-50, h-50);
			ctx.lineTo(49, h-50);
			ctx.closePath();
			ctx.stroke();
			
			ctx.fillStyle = 'white';
			ctx.font = 'bold 20pt Arial';
			ctx.fillText( "Top Scores", w/2 -100, 100);
			
			ctx.font = 'bold 15pt Arial';
			ctx.fillText("Player Name", 150, 130);
			
			ctx.fillText("Score", 650, 130);
			
			for (var i =0; i< sortedArray; i++){
				ctx.fillText(sortedArray[i].n, 150, 130 + 70*i);
				ctx.fillText(sortedArray[i].h, 450, 130 + 70*i);
			}
			
			ctx.fillStyle = 'white';
			ctx.fillRect(80, 5, 240, 40);
			ctx.fillRect(340, 5, 340, 40);
			
			ctx.fillStyle = 'black';
			ctx.fillText("Back to Main Menu", 100, 30);
			ctx.fillText("Search for Your Score", 360, 30);
			
			ctx.fillStyle = 'white';
			ctx.font = '15pt Arial';
			for (var i = 0; i < 8; i++){
				ctx.fillText(i+1, 100, 180 + 50*i);		
				
				ctx.globalAlpha = .5
				ctx.strokeStyle = 'white';
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(95, 150 + 50*i);
				ctx.lineTo(850, 150 + 50*i);
				ctx.stroke()
			}
			ctx.beginPath();
			ctx.moveTo(95, 150);
			ctx.lineTo(95, 550);
			ctx.moveTo(95, 550);
			ctx.lineTo(850, 550);
			ctx.moveTo(450, 150);
			ctx.lineTo(450, 550);
			ctx.moveTo(850, 150);
			ctx.lineTo(850, 550);
			ctx.stroke();
			
			
			for (var i = 0; i < 8; i++){
			
				ctx.globalAlpha = .5
				ctx.strokeStyle = 'white';
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(95, 150 + 50*i);
				ctx.lineTo(850, 150 + 50*i);
				ctx.stroke()
			}
			for (var i = 0; i < sortedArray.length; i++){
				if (i < 8){
					ctx.fillText(sortedArray[i].n, 200, 180 + 50*i);		
					ctx.fillText(sortedArray[i].h, 650, 180 + 50*i);	
				}
			}
			
		}
		//controls
		if (menuSwitch == 3){
			if (tCounterMenuPage > 0)tCounterMenuPage -= 1;
			ctx.globalAlpha = .4;
			ctx.fillStyle = 'black';
			ctx.fillRect(0,0, w,h);
			ctx.fillStyle = 'purple';
			ctx.font = "15pt Arial";
			ctx.fillText("w ------> accelerate" , 400, 100);
			ctx.fillText("a ------> rotate left", 250, 150);
			ctx.fillText("d ------> rotate right", 650, 150);
			ctx.fillText("p------> pause game", 400, 250);
			ctx.fillText("r ------> resume game", 400, 360);
			ctx.fillText("left mouse click -----> shoot", 400, 470);
			
			ctx.fillRect(300, 570, 200, 50);
			ctx.fillStyle = 'white';
			ctx.fillText("Back to Main Menu",320, 600);
		}
		
	}////////////////////////////////////////////////////////////////////////////////END PAINT/ GAME ENGINE
	

	
	
	////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////
	/////	MOUSE LISTENER 
	//////////////////////////////////////////////////////
	/////////////////////////////////////////////////////
	





	/////////////////
	// Mouse Click
	///////////////
	canvas.addEventListener('click', function (evt){
		/*
		var menuSwitch = -1;
	//-1 --> menu page
	var tCounterMenuPage = 5;
	//0 --> engagement a.k.a. game
	var tCounterEngagement = 5;
	//1 --> paused engagement
	var tCoutnerPaused = 5;
	//1.5 --> game over
	var tCounterGameOver = 5;
	//2 --> highscores
	var tCounterHighScores =5;
	//3 --> controls
	var tCounterSettings = 5;
	*/
			//ctx.fillRect(w/2 - 75 -2*Math.sin(theta), 250-2*Math.sin(theta), 200+4*Math.sin(theta), 70+4*Math.sin(theta) );
			//ctx.fillText("Play", w/2 -25 , 290);
		
		//menupage to engagement
		if (mx < (w/2 - 75 -2*Math.sin(theta) + 200+4*Math.sin(theta) ) && mx > w/2 - 75 -2*Math.sin(theta) && my < (250-2*Math.sin(theta) + 70+4*Math.sin(theta) ) && my > 250-2*Math.sin(theta) && menuSwitch == -1 && tCounterMenuPage <= 0){
			menuSwitch = 0;
			tCounterHighScores = 5;
			tCounterPaused = 5;
			tCounterGameOver = 5;
			tCounterEngagement = 5;
		}
	    // alert(menuSwitch + " " + tCounterEngagement);
		 //enables shooting
		if (menuSwitch == 0 && tCounterEngagement <= 0){
			tCounterPaused = 5;
			tCounterHighScores = 5;
			tCounterMenuPage = 5;
			tCounterGameOver = 5;
			
			
			change1 = true;//invokes the shoot function when the mouse is pressed
			bullets.push(makeBullets(player.centreX,player.centreY, bulletWidth,bulletHeight,'yellow', bulletSpeed, mx, my));
			
		}
			//ctx.fillStyle = 'green';
		//	ctx.fillRect(  370, 250, 150, 30);
	
			//ctx.fillRect( 370, 330, 150, 30);
			//paused to engagement
			if (menuSwitch == 1 && tCounterPaused <= 0 && mx < 370+150 && mx > 370 && my > 300 && my < 380){
				tCounterGameOver = 5;
				tCounterMenuPage = 5;
				tCounterHighScores = 5;
				menuSwitch = 0;
			}
			
			//paused to menupage
			if (mx < 370 + 150 && mx > 370 && my > 250 && my < 250 + 30 && menuSwitch == 1 && tCounterPaused <= 0){
				tCounterHighScores = 5;
				tCounterMenuPage = 5;
				tCounterEngagement = 5;
				tCounterGameOver = 5;
				
				menuSwitch = -1;
				player.centreX = w/2;
				player.centreY = h/2;
				playerScore = 0;
			
			for (var i = 0; i < numEnemiesLeft; i++){
				enemyArrLeft[i].centreX = -200;
				enemyArrLeft[i].centreY = Math.round(Math.random()*700); 
			}
			for (var i = 0; i < numEnemiesRight; i++){
				enemyArrRight[i].centreX = -200;
				enemyArrRight[i].centreY = Math.round(Math.random()*700);
			}
			for (var i = 0; i < numEnemiesUp; i++){
				enemyArrUp[i].centreX = Math.round(Math.random()*700);
				enemyArrUp[i].centreY =  -200;
			}
			for (var i = 0; i < numEnemiesDown; i++){
				enemyArrDown[i].centreX = Math.round(Math.random()*700); 
				enemyArrDown[i].centreY = h+200;
			}
			
			for (var i = 0;i < bullets.length; i++){
				bullets.splice(0,i);
			}
			
		 }
		 
		 
		
		 
		//Game Over to menu page
		 if (mx < 370 + 150 && mx > 370 && my > 250 && my < 250 + 30 && menuSwitch == 1.5 && tCounterGameOver <= 0){
				tCounterHighScores = 5;
				tCounterMenuPage = 5;
				tCounterEngagement = 5;
				tCounterPaused = 5;
				
				menuSwitch = -1;
				player.centreX = w/2;
				player.centreY = h/2;
				playerScore = 0;
			
			for (var i = 0; i < numEnemiesLeft; i++){
				enemyArrLeft[i].centreX = -200;
				enemyArrLeft[i].centreY = Math.round(Math.random()*700); 
			}
			for (var i = 0; i < numEnemiesRight; i++){
				enemyArrRight[i].centreX = w+200;
				enemyArrRight[i].centreY = Math.round(Math.random()*700);
			}
			for (var i = 0; i < numEnemiesUp; i++){
				enemyArrUp[i].centreX = Math.round(Math.random()*700);
				enemyArrUp[i].centreY =  -200;
			}
			for (var i = 0; i < numEnemiesDown; i++){
				enemyArrDown[i].centreX = Math.round(Math.random()*700); 
				enemyArrDown[i].centreY = h+200;
			}
			for (var i = 0;i < bullets.length; i++){
				bullets.splice(0,i);
			}
			player.health = 1;
			//saveGame();
			sortedArray = selectionSort(load());
		 }
		 

			//ctx.fillRect(w/2- 75 - 2*Math.sin(theta) , 370-2*Math.sin(theta), 200+4*Math.sin(theta), 70 + 4*Math.sin(theta));
			
			//menu page to highscores page 
		if (mx < (w/2 - 75 -2*Math.sin(theta) + 200+4*Math.sin(theta) ) && mx > w/2 - 75 -2*Math.sin(theta) && my < (370-2*Math.sin(theta) + 70+4*Math.sin(theta) ) && my > 250-2*Math.sin(theta) && menuSwitch == -1 && tCounterHighScores <= 0){
			menuSwitch = 2;
			tCounterPaused = 5;
			tCounterMenuPage = 5;
			tCounterGameOver = 5;
			tCounterEngagement = 5;
			
			player.centreX = w/2;
			player.centreY = h/2;
			playerScore = 0;
			
			sortedArray = selectionSort(load());
			for (var i = 0; i < numEnemiesLeft; i++){
				enemyArrLeft[i].centreX = -200;
				enemyArrLeft[i].centreY = Math.round(Math.random()*700); 
			}
			for (var i = 0; i < numEnemiesRight; i++){
				enemyArrRight[i].centreX = w+200;
				enemyArrRight[i].centreY = Math.round(Math.random()*700);
			}
			for (var i = 0; i < numEnemiesUp; i++){
				enemyArrUp[i].centreX = Math.round(Math.random()*700);
				enemyArrUp[i].centreY =  -200;
			}
			for (var i = 0; i < numEnemiesDown; i++){
				enemyArrDown[i].centreX = Math.round(Math.random()*700); 
				enemyArrDown[i].centreY = h+200;
			}
			for (var i = 0;i<bullets.length; i++){
				bullets.splice(0,i);
			}
			player.health = 1;
		}
		
		//ctx.fillRect(w-190, 5, 140, 40);
		//highscores to menupage 
		if (mx < 320 && mx > 80 && my > 5 && my < 5 + 40 && menuSwitch == 2 && tCounterMenuPage <= 0){
			menuSwitch = -1;
			tCounterHighScores = 5;
			tCounterPaused = 5;
			tCounterGameOver = 5;
			tCounterEngagement = 5;
		}
		
		//ctx.fillRect(340, 5, 340, 40);
		//find rank on score board
		if (mx < 680 && mx > 340 && my > 5 && my < 45 && menuSwitch == 2){
			alert("Search");
			var beginningNum = parseInt(prompt("What is the highest place you wish to search?","Must be a positive integer, or zero ex: 0"));
			var endingNum = parseInt(prompt("What is the lowest place you would like to search?", "Ex:2"));
			var value = parseInt(prompt("What is your score?", "Write it here"));
			var tempArray = [];
			for (var i = 0; i < sortedArray.length; i++){
				tempArray.push(sortedArray[i].h);
			}
			//var temp = recursiveSearch((beginningNum), (endingNum), (value), tempArray);
			var temp = search(tempArray, value);
			alert("You are number " + (parseInt(temp)+1) + " on the highscores list");
			
		}
		
		 //menupage to controls page
		 if (mx < (w/2 - 75 -2*Math.sin(theta) + 200+4*Math.sin(theta) ) && mx >  ( w/2 -75 -  2*Math.sin(theta) ) && my < ( 370-2*Math.sin(theta)+120 + 70 + 4*Math.sin(theta) ) && my > (370-2*Math.sin(theta)+120) && menuSwitch == -1 && tCounterControls <= 0){
			menuSwitch = 3;
			tCounterHighScores = 5;
			tCounterPaused = 5;
			tCounterGameOver = 5;
			tCounterEngagement = 5;
			tCounterMenuPage = 5;
		 }
		// ctx.fillRect(300, 570, 200, 50);
		//controls to menu page
		if (mx < 500 && mx > 300 && my > 570 && my < 620 && menuSwitch == 3){
			menuSwitch = -1;
			tCounterControls = 5;
		
		}
		 
	}, false);

	
	

	canvas.addEventListener ('mouseout', function(){pause = true;}, false);
	canvas.addEventListener ('mouseover', function(){pause = false;}, false);

      	canvas.addEventListener('mousemove', function(evt) {
        	var mousePos = getMousePos(canvas, evt);

		mx = mousePos.x;
		my = mousePos.y;

      	}, false);


	function getMousePos(canvas, evt)
	{
	        var rect = canvas.getBoundingClientRect();
        	return {
          		x: evt.clientX - rect.left,
          		y: evt.clientY - rect.top
        		};
    }
      

	///////////////////////////////////
	//////////////////////////////////
	////////	KEY BOARD INPUT
	////////////////////////////////


	

	window.addEventListener('keydown', function(evt){
		var key = evt.keyCode;
		if (menuSwitch == 0 && key == 80){
			menuSwitch = 1;
		}
		if (menuSwitch == 1 && key == 82){
			menuSwitch = 0;
		}
		
		if (key === 87){
			switch1 = 1;
			switch2 = 1;
		}
		if (key == 65 && menuSwitch == 0)player.rotateLeft();//a
		if (key == 68 && menuSwitch == 0)player.rotateRight();//d
		
		
	//p 80
	//r 82
	//1 49
	//2 50
	//3 51
		
	}, false);

	window.addEventListener('keyup', function(evt){
		var keyUp = evt.keyCode;
		if (keyUp === 87){//w
			switch1 = 2;
			switch2 = 2;
		}
	}, false);

	
	
	
	
	
	
});