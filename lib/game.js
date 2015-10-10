(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Asteroids = root.Asteroids;
  var Ship = Asteroids.Ship;
  var Bullet = Asteroids.Bullet;

  var Game = Asteroids.Game = function (height, width) {
    this.asteroids = [];
    this.asteroidsInUse = [];
    this.bullets = [];
    this.bulletsInUse = [];
    this.ship = new Ship({pos:[width/2, height/2], vel: [0,0]}, this);
    this.height = height;
    this.width = width;
    this.init();
  };

  // Game.NUM_ASTEROIDS = 50;

  Game.prototype.init = function () {
    this.addAsteroids(0);
    this.addBullets(50);
  };

  Game.prototype.addBullets = function (num) {
    for (var i = 0; i < num; i++) {
      var bullet = new Bullet({
        pos: [0, 0],
        vel: [0, 0]
      }, this.game);

      this.bullets.push(bullet);
    }
  };

  Game.prototype.addAsteroids = function (num) {
    for (var i = 0; i < num; i++) {
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
    return this.asteroids.concat(this.ship, this.bulletsInUse);
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
    this.allObjects().forEach(function(object) {
      object.move();
    });
    this.wrap();
  };

  Game.prototype.isOutOfBounds = function(pos) {
    return (pos[0] > this.width || pos[0] < 0 ||
      pos[1] > this.height || pos[1] < 0);
   };

  Game.prototype.wrap = function () {
    var game = this;

    this.allObjects().forEach(function (obj) {
      if (obj.pos[0] < 0 || obj.pos[0] > game.width) {
        if (obj.constructor === Bullet) { 
          game.recycleBullet(obj); 
        } else {
          obj.pos[0] %= game.width;
          if (obj.pos[0] < 0) { obj.pos[0] += game.width; }
        }
      } else if (obj.pos[1] < 0 || obj.pos[1] > game.height) {
        if (obj.constructor === Bullet) { 
          game.recycleBullet(obj); 
        } else {
          obj.pos[1] %= game.height;
          if (obj.pos[1] < 1) { obj.pos[1] += game.height; }
        }
      }
    })
  };

  Game.prototype.recycleBullet = function (bullet) {
    var idx = this.bulletsInUse.indexOf(bullet);
    this.bulletsInUse.splice(idx, 1);
    
    bullet.vel = [0, 0];
    bullet.pos = [0, 0];
    this.bullets.push(bullet);
  };

  // Game.prototype.wrap = function(pos) {
  //   var wrapX, wrapY;
  //   if (pos[0] < 0) {
  //     wrapX = this.width;
  //   } else {
  //     wrapX = pos[0] % this.width;
  //   }

  //   if (pos[1] < 0) {
  //     wrapY = this.height;
  //   } else {
  //     wrapY = pos[1] % this.height;
  //   }

  //   return [wrapX, wrapY];
  // };

  Game.prototype.remove = function (i, arr) {
    arr.splice(i, 1);
  };

  Game.prototype.checkCollisions = function() {
    // console.log(this.ship);
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

  Game.prototype.removeBullets = function () {
    var game = this,
        goneBulletIdx = [];

    for (var i = 0; i < this.bullets.length; i++) {
      if (this.isOutOfBounds(game.bullets[i].pos)) {
        goneBulletIdx.push(i);
      }
    }

    for (var j = 0; j < goneBulletIdx.length; j++) {
      goneBulletIdx.splice(goneBulletIdx[j], 1);
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    this.removeBullets();
  };

  Game.prototype.animate = function (timestamp) {
    ctx.clearRect(0,0,this.width, this.height);
    ctx.fillStyle = "#000000";

    ctx.beginPath();
    ctx.rect(0,0,this.width, this.height);
    ctx.fill();

    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });

    this.moveObjects();
    this.checkCollisions();
    this.removeBullets();

    root.requestAnimationFrame(root.game.animate);
  };
})(this);
