(function(root){
	if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

	var _offScreen = function (game, maxSize) {
		var randPos = Asteroids.Util.randomPos(game, maxSize);
		var randIdx= Math.floor(Math.random() * 4);
		switch(randIdx){
			case 0:
				randPos = [randPos[0], Asteroids.Asteroid.RADIUS];
				break;
			case 1:
				randPos = [randPos[0], game.height - Asteroids.Asteroid.RADIUS];
				break;
			case 2:
				randPos = [Asteroids.Asteroid.RADIUS, randPos[1]];
				break;
			case 3:
				randPos = [game.width - Asteroids.Asteroid.RADIUS, randPos[1]];
				break;
			default:
				// no op
				break;
		}
		return randPos;
	}

	var _size = function (maxSize) {
		return Math.random() * maxSize + 20;
	};

	var _randomVel = function () {
		return ([
			(Math.random() * 1 + 0.3) * (Math.floor(Math.random() * 2) === 1 ? 1 : -1),
			(Math.random() * 1 + 0.3) * (Math.floor(Math.random() * 2) === 1 ? 1 : -1)
		]);
	};

	var _vel = function (pos, game) {
		var vel = Math.random() * 1 + 0.3;

		if (pos[0] - 5 === 0) {
			return [vel, 0];
		} else if (pos[0] + 5 === game.width) {
			return [-vel, 0];
		} else if (pos[1] - 5 === 0) {
			return [0, vel];
		} else if (pos[1] + 5 === game.height) {
			return [0, -vel];
		} else {
			return _randomVel();
		}
	};

	root.Asteroids.FormGroup = function (form) {
		var game = this;
		var MAX_SIZE = 50;

		var formRegGroup = function () {
			// take an array of asteroids
			// generate random starting pos
			// define vel according to pos
			// generate random size of group
			// form group
			// var group = [];

			var groupSize = _size(MAX_SIZE);
			var groupPos = _offScreen(game, MAX_SIZE);
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

		// var formCircleGroup = function () {
		// 	var game = this;
		// 	var MAX_SIZE = 30;
		// 	var randomPos = _randomPos(game, MAX_SIZE);
		// };

		var randomSpawn = function () {
			var asteroid;
			for (var i = 0; i < MAX_SIZE / 2; i++) {
				asteroid = game.asteroids.pop();
				// asteroid.pos = _randomPos(game, 0);
				asteroid.pos = Asteroids.Util.ensureDistanceFromShip(game);
				asteroid.vel = [_vel(asteroid.pos, game)[0] / 2, _vel(asteroid.pos, game)[1] / 2];
				game.asteroidsInUse.push(asteroid);
			}
		};

		var scared = function () {
			var asteroid;
			for (var i = 0; i < MAX_SIZE; i++) {
				asteroid = game.asteroids.pop();

				asteroid.pos = Asteroids.Util.ensureDistanceFromShip(game);
			}
		};

		var forms = function () {
			return ["random", "regtangle"];
		};

		switch (form) {
			case "forms":
				return forms();
				break;
			case "regtangle":
				formRegGroup();
				break;
			case "circle":
				break;
			case "random":
				randomSpawn();
				break;
			default:
				//no op
				break;
		}
	};
})(this);