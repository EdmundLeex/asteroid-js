{
	var a=this;
	document.onkeyup=function(b) {
		switch(b.keyCode){
			case 37:
			case 65:
				clearInterval(a.timers.left),delete a.timers.left;
				break;
			case 39:
			case 68:
				clearInterval(a.timers.right),delete a.timers.right;
				break;
			case 38:
			case 87:
				clearInterval(a.timers.move),delete a.timers.move;
				break;
			case 40:
			case 83:
				clearInterval(a.timers.dampen),delete a.timers.dampen;
				break;
			case 32:
				clearInterval(a.timers.fire),delete a.timers.fire
		}
	}
}

listenDown=function(){
	var a=this;
	document.onkeydown=function(b){
		switch(b.keyCode){
			case 37:
				a.setTurnTimer("left");
				break;
			case 68:
				a.setTurnTimer("right");
				break;
			case 87:
				a.setMoveTimer();
				break;
			case 83:
				a.setDampenTimer();
				break;
			case 32:
				a.fire();
				break;
			case 80:
				a.game.pause()
		}
	}
}

setTurnTimer=function(a){
	var b=this;
	if(!this.timers[a]){
		var c=0;
		this.timers[a]=setInterval(function(){
			c+=.2,c>1&&(c=1), 
			b.game.turnShip(b.game.ships[0],a,c)
		},b.game.FPS)
	}
}

setMoveTimer=function(){
	var a=this;
	this.timers.move||(this.timers.move=setInterval(function(){
		a.game.powerShip(a.game.ships[0])
	},a.game.FPS))
}









