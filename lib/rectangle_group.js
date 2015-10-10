(function(){
	var FormGroup = {
		formRegGroup: function (Klass) {
			// generate random starting pos
			// define vel according to pos
			// generate random size of group
			// form group
			var group = [];

			for (var i = 0; i < 2; i++) {
				for (var j  = 0; j < _size(); j++) {
					var attr = {
		        pos: this._randomPos(),
		        vel: this._vel(pos)
		      };

					var asteroid = new Asteroids.Asteroid(attr, game);
					
					group.push(asteroid);
				}
			}

			function _randomPos () {
				var randIdx= Math.floor(Math.random() * 1);
				var randX = Math.floor(Math.random() * this.width);
				var randY = Math.floor(Math.random() * this.height);
				var randPos = [randX, randY];
				randPos[randIdx] = -10;

				return randPos;
			}
			
			function _vel(pos) {
				// TODO: extract to constant
				var groupVel = Math.random() * 5 + 3;

				if (pos[0] < 0) {
					return [groupVel, 0];
				} else if (pos[0] > this.width) {
					return [-groupVel, 0];
				} else if (pos[1] < 0) {
					return [0, groupVel];
				} else if (pos[1] > this.height) {
					return [0, -groupVel];
				}
			}

			function _size() {
				return Math.random() * 10 + 5;
			}

			return group;
		},

		formCircleGroup: function (arguments) {
			// body...
		},

		randomSpawn: function (arguments) {
			// body...
		}
	};
})();