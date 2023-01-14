//(function(){
//canvas things
document.body.onmousedown = function() { return false; } //so page is unselectable
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var w = 600;
var h = 600;
var mx,my;

//nav things
var menuSwitch = 0;
var level =1;

//player things
var pr = 15;
var pc = 'blue';
var pcx = w/2;
var pcy = (h/8)-45;
var psp = 10;
var player = player();

//enemy things
var esp = 14;
var er = 18;
var ec = 'red';

//level one

var elono = elono();
var elono_cx = 40;
var elono_cy = 100;
var elono_movebool = true;

var elont = elont();
var elont_cx = w/2
var elont_cy = 300;
var elont_movebool = true;

var elonth = elonth();
var elonth_cx = 560;
var elonth_cy = 500;
var elonth_movebool = false;

var elonf = elonf();
var elonf_cx = 120;
var elonf_cy = 200;
var elonf_movebool = true;

var elonfi = elonfi();
var elonfi_cx = 200
var elonfi_cy = 400;
var elonfi_movebool = true;

//level two

var eltno = eltno();
var eltno_cx = 40;
var eltno_cy = 100;
var eltno_movebool = true;

var eltnt = eltnt();
var eltnt_cx = w/2-40
var eltnt_cy = 300;
var eltnt_movebool = true;

var eltnth = eltnth();
var eltnth_cx = 560;
var eltnth_cy = 500;
var eltnth_movebool = false;

var eltnf = eltnf();
var eltnf_cx = 120;
var eltnf_cy = 200;
var eltnf_movebool = true;

var eltnfi = eltnfi();
var eltnfi_cx = 200
var eltnfi_cy = 400;
var eltnfi_movebool = true;

function player(){
	return{
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = pc;
			ctx.arc(pcx,pcy,pr,0,2*Math.PI);
			ctx.clearRect(0,0,w,h);
			ctx.fill();
		},
		move: function(ps){
			if(ps == 1){
				pcx-=psp;
			}else if(ps == 2){
				pcy-=psp;
			}else if(ps == 3){
				pcx+=psp;
			}else if(ps == 4){
				pcy+=psp;
			}else if(ps == 0){
				pcx = w/2;
				pcy = (h/8)-45;
			}
			if(pcx - pr < 5){
				pcx = pr + 5;
			}
			if(pcy - pr < 5){
				pcy = pr + 5;
			}
			if(pcx + pr > w - 5){
				pcx = (w - 5) - pr;
			}
			if(pcy + pr > h - 5){
				pcy = (h - 5) - pr;
			}
		}
	}
}

function e_detect(){
	if(pcx > elono_cx - 18 && pcx < elono_cx + 18){
		if(pcy + 15 > elono_cy - 18 && pcy - 15 < elono_cy + 18){
			menuSwitch = 3;
		}
	}
	if(pcx > elont_cx - 18 && pcx < elont_cx + 18){
		if(pcy + 15 > elont_cy - 18 && pcy - 15 < elont_cy + 18){
			menuSwitch = 3;
		}
	}
	if(pcx > elonth_cx - 18 && pcx < elonth_cx + 18){
		if(pcy + 15 > elonth_cy - 18 && pcy - 15 < elonth_cy + 18){
			menuSwitch = 3;
		}
	}
	if(pcx > elonf_cx - 18 && pcx < elonf_cx + 18){
		if(pcy + 15 > elonf_cy - 18 && pcy - 15 < elonf_cy + 18){
			menuSwitch = 3;
		}
	}
	if(pcx > elonfi_cx - 18 && pcx < elonfi_cx + 18){
		if(pcy + 15 > elonfi_cy - 18 && pcy - 15 < elonfi_cy + 18){
			menuSwitch = 3;
		}
	}
}

CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius, fill, stroke, color) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  if(typeof color == "undefined"){
	  color = 'black';
  }
  this.beginPath();
  this.fillStyle = color;
  this.moveTo(x + radius, y);
  this.lineTo(x + width - radius, y);
  this.quadraticCurveTo(x + width, y, x + width, y + radius);
  this.lineTo(x + width, y + height - radius);
  this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  this.lineTo(x + radius, y + height);
  this.quadraticCurveTo(x, y + height, x, y + height - radius);
  this.lineTo(x, y + radius);
  this.quadraticCurveTo(x, y, x + radius, y);
  this.closePath();
  if (stroke == true) {
    this.stroke();
  }
  if (fill == true) {
    this.fill();
  }        
}

function elono(){
	return{
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = ec;
			ctx.arc(elono_cx,elono_cy,er,0,2*Math.PI);
			ctx.fill();
		},
		move: function(){
			if(elono_movebool == true){
				elono_cx+=esp;
			}else if(elono_movebool == false){
				elono_cx-=esp;
			}
			if(elono_cx > 550){
				elono_movebool = false;
			}else if(elono_cx < 30){
				elono_movebool = true;
			}
		}
	}
}

function elont(){
	return{
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = ec;
			ctx.arc(elont_cx,elont_cy,er,0,2*Math.PI);
			ctx.fill();
		},
		move: function(){
			if(elont_movebool == true){
				elont_cx+=esp;
			}else if(elont_movebool == false){
				elont_cx-=esp;
			}
			if(elont_cx > 550){
				elont_movebool = false;
			}else if(elont_cx < 30){
				elont_movebool = true;
			}
		}
	}
}

function elonth(){
	return{
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = ec;
			ctx.arc(elonth_cx,elonth_cy,er,0,2*Math.PI);
			ctx.fill();
		},
		move: function(){
			if(elonth_movebool == true){
				elonth_cx+=esp;
			}else if(elonth_movebool == false){
				elonth_cx-=esp;
			}
			if(elonth_cx > 550){
				elonth_movebool = false;
			}else if(elonth_cx < 30){
				elonth_movebool = true;
			}
		}
	}
}

function elonf(){
	return{
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = ec;
			ctx.arc(elonf_cx,elonf_cy,er,0,2*Math.PI);
			ctx.fill();
		},
		move: function(){
			if(elonf_movebool == true){
				elonf_cx+=esp;
			}else if(elonf_movebool == false){
				elonf_cx-=esp;
			}
			if(elonf_cx > 550){
				elonf_movebool = false;
			}else if(elonf_cx < 30){
				elonf_movebool = true;
			}
		}
	}
}

function elonfi(){
	return{
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = ec;
			ctx.arc(elonfi_cx,elonfi_cy,er,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
		},
		move: function(){
			if(elonfi_movebool == true){
				elonfi_cx+=esp;
			}else if(elonfi_movebool == false){
				elonfi_cx-=esp;
			}
			if(elonfi_cx > 550){
				elonfi_movebool = false;
			}else if(elonfi_cx < 30){
				elonfi_movebool = true;
			}
		}
	}
}

function eltno(){
	return{
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = ec;
			ctx.arc(eltno_cx,eltno_cy,er,0,2*Math.PI);
			ctx.fill();
		},
		move: function(){
			if(eltno_movebool == true){
				eltno_cx+=esp;
			}else if(eltno_movebool == false){
				eltno_cx-=esp;
			}
			if(eltno_cx > 550){
				eltno_movebool = false;
			}else if(eltno_cx < 30){
				eltno_movebool = true;
			}
		}
	}
}

function eltnt(){
	return{
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = ec;
			ctx.arc(eltnt_cx,eltnt_cy,er,0,2*Math.PI);
			ctx.fill();
		},
		move: function(){
			if(eltnt_movebool == true){
				eltnt_cx+=esp;
			}else if(eltnt_movebool == false){
				eltnt_cx-=esp;
			}
			if(eltnt_cx > 550){
				eltnt_movebool = false;
			}else if(eltnt_cx < 30){
				eltnt_movebool = true;
			}
		}
	}
}

function eltnth(){
	return{
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = ec;
			ctx.arc(eltnth_cx,eltnth_cy,er,0,2*Math.PI);
			ctx.fill();
		},
		move: function(){
			if(eltnth_movebool == true){
				eltnth_cx+=esp;
			}else if(eltnth_movebool == false){
				eltnth_cx-=esp;
			}
			if(eltnth_cx > 550){
				eltnth_movebool = false;
			}else if(eltnth_cx < 30){
				eltnth_movebool = true;
			}
		}
	}
}

function eltnf(){
	return{
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = ec;
			ctx.arc(eltnf_cx,eltnf_cy,er,0,2*Math.PI);
			ctx.fill();
		},
		move: function(){
			if(eltnf_movebool == true){
				eltnf_cx+=esp;
			}else if(eltnf_movebool == false){
				eltnf_cx-=esp;
			}
			if(eltnf_cx > 550){
				eltnf_movebool = false;
			}else if(eltnf_cx < 30){
				eltnf_movebool = true;
			}
		}
	}
}

function eltnfi(){
	return{
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = ec;
			ctx.arc(eltnfi_cx,eltnfi_cy,er,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
		},
		move: function(){
			if(eltnfi_movebool == true){
				eltnfi_cx+=esp;
			}else if(eltnfi_movebool == false){
				eltnfi_cx-=esp;
			}
			if(eltnfi_cx > 550){
				eltnfi_movebool = false;
			}else if(eltnfi_cx < 30){
				eltnfi_movebool = true;
			}
		}
	}
}
/////////////////////////////////////////////////////////
/////////////////BEGIN PAINT/////////////////////////////
/////////////////////////////////////////////////////////

function paint(){
	
if(menuSwitch == 0){
	
	ctx.clearRect(0,0,w,h);
	
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,w,h);
	
	ctx.roundRect((w/4)+10,50,280,100,15,true,false, 'lime');
	ctx.fill();
	
	ctx.fillStyle = 'white';
	ctx.font = 'normal 70pt Arial';
	ctx.fillText("Rush", 190, 140)
	
	ctx.roundRect(200,200,200,50,10,true,false, 'lime');
	ctx.fill();
	
	ctx.fillStyle = 'white';
	ctx.font = 'normal 30pt Arial';
	ctx.fillText("Start", 245, 240)
	
}else if(menuSwitch == 1){
	
	ctx.clearRect(0,0,w,h);
	
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,w,h);
	
	ctx.fillStyle = 'blue';
	ctx.font = 'normal 15pt Arial';
	ctx.fillText("Make sure to avoid the red circles. Have fun!", 10,100);
	ctx.fillText("Use arrow keys to play!", 10, 125)
	ctx.fillText("Press 'Enter' to continue!", 10, 150);
}else if(menuSwitch == 2){
	switch(level){
		case 1:
		ctx.globalAlpha = 1;

		player.draw();
		e_detect();
		elono.draw();
		elono.move();
		elont.draw();
		elont.move();
		elonth.draw();
		elonth.move();
		elonf.draw();
		elonf.move();
		elonfi.draw();
		elonfi.move();

		ctx.globalAlpha = 0.3;
		ctx.fillStyle = 'rgb(50, 205, 50)';
		ctx.fillRect(0,0,w,65);
		ctx.fillRect(0,535,w,65);
		
		if(pcy > 535 && level == 1){
			ps = 0;
			level = 2;
		}
		break;
		case 2:
		
		
		ctx.globalAlpha = 1;
		
		player.draw();
		e_detect();
		eltno.draw();
		eltno.move();
		eltnt.draw();
		eltnt.move();
		eltnth.draw();
		eltnth.move();
		eltnf.draw();
		eltnf.move();
		eltnfi.draw();
		eltnfi.move();
		
		ctx.globalAlpha = 0.3;
		ctx.fillStyle = 'rgb(50, 205, 50)';
		ctx.fillRect(0,0,w,65);
		ctx.fillRect(0,535,w,65);
		
		
		ctx.globalAlpha = 1;
		ctx.fillStyle = 'blue';
		ctx.fillRect(0,160,200,150);
		ctx.fillRect(400,160,200,150);
		
		if(pcx < 200 && pcy > 160 && ps == 4){
			ps = 2;
		}else if(pcx < 200 && pcy > 160 && ps == 1){
			ps = 3;
		}else if(pcy < 310 && pcx < 200 && ps == 2){
			ps = 4;
		}
		if(pcx > 400 && pcy > 160 && ps == 3){
			ps =1;
		}else if(pcx > 400 && pcy > 160 && ps == 4){
			ps = 2;
		}else if(pcx > 400 && pcy > 160 && ps == 2){
			ps = 4;
		}
		
		break;
	}
}else if(menuSwitch == 3){
	ctx.clearRect(0,0,w,h);
	
	pcx = w/2;
	pcy = (h/8)-45;
	
	ctx.globalAlpha = 1;
	
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,w,h);
	
	ctx.fillStyle = 'white';
	ctx.fillText("Game Over!", 100, 100);
	
	ctx.roundRect(200,200,200,50,10,true,false,'lime');
	ctx.fill();
	
	ctx.fillStyle = 'white';
	ctx.fillText("Back", 210, 240);
	
}else if(menuSwitch == 4){
	alert("You win!!");
}


}

/////////////////////////////////////////////////////////
//////////////////END PAINT//////////////////////////////
/////////////////////////////////////////////////////////


function init(){
	setInterval(function(){
		paint();
	}, 50);
}
init();

////////////////////////////////////////////////////////
//////////////////// MOUSE CONTROL//////////////////////
////////////////////////////////////////////////////////

canvas.addEventListener('click', function (evt){
	//
	if(mx > 200 && mx < 400 && my > 200 && my < 250 && menuSwitch == 0){
		menuSwitch = 1;
	}
	if(mx > 200 && mx < 400 && my > 200 && my < 250 && menuSwitch == 3){
		menuSwitch = 2;
	}
}, false);

canvas.addEventListener('mousemove', function(evt) {var mousePos = getMousePos(canvas, evt);mx = mousePos.x;my = mousePos.y;}, false);
function getMousePos(canvas, evt) {var rect = canvas.getBoundingClientRect();return {x: evt.clientX - rect.left,y: evt.clientY - rect.top};}

////////////////////////////////////////////////////////
///////////////////KEY CONTROL//////////////////////////
////////////////////////////////////////////////////////

window.addEventListener('keydown', function(evt){
var key = evt.keyCode;

if(key == 37){
player.move(1);
}else if(key == 38){
player.move(2);
}else if(key == 39){
player.move(3);
}else if(key == 40){
player.move(4);
}else if(key == 16 || key == 12){
player.move(0);
}

if(key == 13 && menuSwitch == 1){
	menuSwitch = 2;
}

}, false);
//})();