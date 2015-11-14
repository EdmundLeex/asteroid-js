(function(root){
	if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

	var _offScreen = function (game, maxSize) {
		var randPos = SupersonicPaperPlane.Util.randomPos(game, maxSize);
		var randIdx= Math.floor(Math.random() * 4);
		switch(randIdx){
			case 0:
				randPos = [randPos[0], SupersonicPaperPlane.Asteroid.RADIUS];
				break;
			case 1:
				randPos = [randPos[0], game.height - SupersonicPaperPlane.Asteroid.RADIUS];
				break;
			case 2:
				randPos = [SupersonicPaperPlane.Asteroid.RADIUS, randPos[1]];
				break;
			case 3:
				randPos = [game.width - SupersonicPaperPlane.Asteroid.RADIUS, randPos[1]];
				break;
			default:
				// no op
				break;
		}
		return randPos;
	};

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

	root.SupersonicPaperPlane.FormGroup = function (form) {
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
			var asteroid;
			// debugger
			if (groupSize > game.asteroids.length) { groupSize = game.asteroids.length; }

			if (groupVel[0]) {
				modifier = [0, SupersonicPaperPlane.Asteroid.RADIUS - 1];
			} else {
				modifier = [SupersonicPaperPlane.Asteroid.RADIUS - 1, 0];
			}

			for (var i  = 0; i < groupSize / 2 - 1; i++) {
				asteroid = game.asteroids.pop();
				asteroid.pos = [groupPos[0] + modifier[0] * i, groupPos[1] + modifier[1] * i];
				asteroid.vel = groupVel;
				// debugger
				game.asteroidsInUse.push(asteroid);
			}


			for (var j  = 0; j < groupSize / 2 - 1; j++) {
				asteroid = game.asteroids.pop();
				asteroid.pos = [groupPos[0] + modifier[0] * j, groupPos[1] + modifier[1] * j];
				asteroid.pos[modifier.indexOf(0)] += SupersonicPaperPlane.Asteroid.RADIUS;
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
			var nums = (MAX_SIZE < game.maxEnemyNum) ? MAX_SIZE : game.maxEnemyNum;
			for (var i = 0; i < nums / 2; i++) {
				asteroid = game.asteroids.pop();
				// asteroid.pos = _randomPos(game, 0);
				asteroid.pos = _offScreen(game, 0);
				asteroid.vel = [_vel(asteroid.pos, game)[0] / 2, _vel(asteroid.pos, game)[1] / 2];
				game.asteroidsInUse.push(asteroid);
			}
		};

		// var scared = function () {
		// 	var asteroid;
		// 	for (var i = 0; i < MAX_SIZE; i++) {
		// 		asteroid = game.asteroids.pop();

		// 		asteroid.pos = SupersonicPaperPlane.Util.ensureDistanceFromShip(game);
		// 	}
		// };

		var spawnBoids = function () {
			var boid;
			// var numBoids = (game.boids.length < game.maxBoids) ? game.boids.length : game.maxBoids;
			// console.log(numBoids);
			if (game.boids.length === SupersonicPaperPlane.Game.NUM_BOIDS) {
				for (var i = 0; i < game.maxBoids; i++) {
					boid = game.boids.pop();

					boid.pos = _offScreen(game, 0);
					game.boidsInUse.push(boid);
				}
			}
		};

		var forms = function () {
			return ["random", "regtangle", "boids"];
		};

		switch (form) {
			case "forms":
				return forms();
			case "regtangle":
				formRegGroup();
				break;
			case "random":
				randomSpawn();
				break;
			case "boids":
				spawnBoids();
				break;
			default:
				//no op
				break;
		}
	};
})(this);