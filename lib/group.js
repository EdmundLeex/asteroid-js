(function(root){
	if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var _randomPos = function (game, maxSize) {
  	var randPos;
		var randX = Math.floor(Math.random() * (game.width - maxSize));
		var randY = Math.floor(Math.random() * (game.height - maxSize));

		var randIdx= Math.floor(Math.random() * 4);
		switch(randIdx){
			case 0:
				randPos = [randX, 5];
				break;
			case 1:
				randPos = [randX, game.height - 5];
				break;
			case 2:
				randPos = [5, randY];
				break;
			case 3:
				randPos = [game.width - 5, randY];
				break;
			default:
				// no op
				break;
		}

		// var randPos = [randX, randY];

		// debugger
		// randPos[randIdx] = 0;
		return randPos;
	};

	root.Asteroids.FormGroup = function (form) {
		var game = this;
		var MAX_SIZE = 30;

		var formRegGroup = function () {
			// take an array of asteroids
			// generate random starting pos
			// define vel according to pos
			// generate random size of group
			// form group
			// var group = [];

			var groupSize = _size();
			var groupPos = _randomPos(game, MAX_SIZE);
			var groupVel = _vel(groupPos, game);
			var modifier = [0, 0];
			// debugger
			if (groupSize > game.asteroids.length) { groupSize = game.asteroids.length }

			if (groupVel[0]) {
				modifier = [0, Asteroids.Asteroid.RADIUS - 1];
			} else {
				modifier = [Asteroids.Asteroid.RADIUS - 1, 0];
			}

			for (var i  = 0; i < groupSize / 2 - 1; i++) {
				var asteroid = game.asteroids.pop();
				asteroid.pos = [groupPos[0] + modifier[0] * i, groupPos[1] + modifier[1] * i];
				asteroid.vel = groupVel;
				// debugger
				game.asteroidsInUse.push(asteroid);
			}


			for (var j  = 0; j < groupSize / 2 - 1; j++) {
				var asteroid = game.asteroids.pop();
				asteroid.pos = [groupPos[0] + modifier[0] * j, groupPos[1] + modifier[1] * j];
				asteroid.pos[modifier.indexOf(0)] += Asteroids.Asteroid.RADIUS;
				asteroid.vel = groupVel;
				// debugger
				game.asteroidsInUse.push(asteroid);
			}
			// return asteroids;
		};

		var formCircleGroup = function (arguments) {
			// body...
		};

		var randomSpawn = function (arguments) {
			// body...
		};

		var _vel = function (pos, game) {
			// TODO: extract to constant
			var groupVel = Math.random() * (2 - 1)

			if (pos[0] - 5 === 0) {
				return [groupVel, 0];
			} else if (pos[0] + 5 === game.width) {
				return [-groupVel, 0];
			} else if (pos[1] - 5 === 0) {
				return [0, groupVel];
			} else if (pos[1] + 5 === game.height) {
				return [0, -groupVel];
			}
		};

		var _size = function () {
			return Math.random() * MAX_SIZE + 20;
		};

		switch (form) {
			case "regtangle":
				formRegGroup();
				break;
			case "circle":
				break;
			case "random":
				break;
			default:
				//no op
				break;
		}
	};
})(this);