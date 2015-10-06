(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;
  var Ship = Asteroids.Ship;

  var Game = Asteroids.Game = function (height, width) {
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Ship({pos:[width/2, height/2], vel: [0,0]}, this);
    this.height = height;
    this.width = width;
  };

  // Game.DIM_X = 1000;//window.innerHeight;
  // Game.DIM_Y = 1000; //window.innerWidth;
  Game.NUM_ASTEROIDS = 0;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      var attr = {
        pos: this.randomPosition(),
        // this is a magic number...
        vel: Asteroids.Util.randomVec(1)
      };
      var game = this;

      this.asteroids.push(
        new Asteroids.Asteroid(attr, game)
      );
    }
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.ship, this.bullets);
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.width;//Game.DIM_X;
    var y = Math.random() * this.height; //Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.draw = function (ctx) {
    // var background = new Image();
    // background.src = 'background.jpg';

    ctx.clearRect(0,0,this.width, this.height);
    ctx.fillStyle = "#000000";
    // background.onload = function () {
    //   ctx.drawImage(background, 0, 0);
    // }

    ctx.beginPath();
    ctx.rect(0,0,this.width, this.height);
    ctx.fill();

    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach( function(object) {
      object.move();
    });
  };

  Game.prototype.isOutOfBounds = function(pos) {
    return (pos[0] > this.width || pos[0] < 0 ||
      pos[1] > this.height || pos[1] < 0);
   };

  Game.prototype.wrap = function(pos) {
    var wrapX, wrapY;
    if (pos[0] < 0) {
      wrapX = this.width ;
    } else {
      wrapX = pos[0] % this.width;
    }

    if (pos[1] < 0) {
      wrapY = this.height ;
    } else {
      wrapY = pos[1] % this.height;
    }

    return [wrapX, wrapY];
  };

  Game.prototype.remove = function (i, arr) {
    arr.splice(i, 1);
  };

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        this.ship.relocate();
      }
    }

    for (var k = 0; k < this.bullets.length; k++) {
      for (var j = 0; j < this.asteroids.length; j++) {
        if (this.bullets[k].isCollidedWith(this.asteroids[j])) {
          this.remove(j, this.asteroids);
          this.remove(k, this.bullets);
          this.checkCollisions();
        }
      }
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };
})();
