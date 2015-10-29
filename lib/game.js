(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Asteroids = root.Asteroids;
  var Ship = Asteroids.Ship;
  var Bullet = Asteroids.Bullet;
  var Asteroid = Asteroids.Asteroid;
  var Boid = Asteroids.Boid;
  var Invincibility = Asteroids.Invincibility;

  var Game = Asteroids.Game = function (height, width) {
    this.asteroids = [];
    this.asteroidsInUse = [];
    this.bullets = [];
    this.bulletsInUse = [];
    this.collidedObjs = [];
    this.boids = [];
    this.boidsInUse = [];
    this.weapons = [];
    this.weaponsInUse = [];
    this.ship = new Ship({pos:[width/2, height/2], vel: [0,0]}, this);
    this.height = height;
    this.width = width;
    this.init();
    this.spawn();
    this.weaponTimeLimit = null;
    this.weaponCountdown = null;
  };

  Game.prototype.FormGroup = Asteroids.FormGroup;

  Game.NUM_ASTEROIDS = 500;
  Game.NUM_BOIDS = 100;
  // Game.ACTIVE_ASTEROIDS_COUNT = 300;
  // Game.RESPAWN_THRESHOLD = [250, 300];
  Game.NUM_BULLETS = 200;
  Game.OFF_SCREEN_BUFFER = 200;

  Game.prototype.init = function () {
    this.addAsteroids(Game.NUM_ASTEROIDS);
    this.addBullets(Game.NUM_BULLETS);
    this.addBoids(Game.NUM_BOIDS);

    this.weaponsInUse.push(new Invincibility(this));
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
    var game = this;
    var attr = {
      pos: [0, 0],
      vel: [0, 0]
    };

    for (var i = 0; i < num; i++) {
      this.asteroids.push(
        new Asteroid(attr, game)
      );
    }
  };

  Game.prototype.addBoids = function (num) {
    var game = this;
    for (var i = 0; i < (num || 1); i++) {
      this.boids.push(new Boid(game));
    }
  };

  Game.prototype.allObjects = function() {
    return this.asteroidsInUse.concat(this.ship, this.bulletsInUse, this.boidsInUse, this.weaponsInUse);
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
      if (obj.pos[0] < -Game.OFF_SCREEN_BUFFER ||
          obj.pos[0] > game.width + Game.OFF_SCREEN_BUFFER) {
        if (obj.constructor === Bullet) {
          game.recycleBullet(obj);
        } else if (obj.constructor === Asteroid) {
          // obj.pos[0] %= game.width;
          // if (obj.pos[0] < 0) { obj.pos[0] += game.width; }
          game.recycleAsteroid(obj);
        }
      } else if (obj.pos[1] < 0 || obj.pos[1] > game.height) {
        if (obj.constructor === Bullet) {
          game.recycleBullet(obj);
        } else if (obj.constructor === Asteroid) {
          // obj.pos[1] %= game.height;
          // if (obj.pos[1] < 1) { obj.pos[1] += game.height; }
          game.recycleAsteroid(obj);
        }
      }
    });
  };

  Game.prototype.removeBulletFromUse = function (bullet) {
    var idx = this.bulletsInUse.indexOf(bullet);
    this.bulletsInUse.splice(idx, 1);
  };

  Game.prototype.recycleBullet = function (bullet) {
    var idx = this.bulletsInUse.indexOf(bullet);
    this.bulletsInUse.splice(idx, 1);

    // reset bullet
    bullet.vel[0] = 0;
    bullet.vel[1] = 0;
    bullet.pos[0] = 0;
    bullet.pos[1] = 0;
    this.bullets.unshift(bullet);
  };

  Game.prototype.recycleAsteroid = function (asteroid) {
    var idx = this.asteroidsInUse.indexOf(asteroid);
    this.asteroidsInUse.splice(idx, 1);
    // reset asteroid

    this.asteroids.push(asteroid);
  };

  Game.prototype.checkCollisions = function() {
    // console.log(this.ship);
    // debugger
    var i, j;
    for (i = 0; i < this.asteroidsInUse.length; i++) {
      if (this.asteroidsInUse[i].isCollidedWith(this.ship)) {
        var ast = this.asteroidsInUse.splice(i, 1)[0];
        this.asteroids.unshift(ast);
        // this.collidedObjs.push(this.asteroidsInUse[i]);

        if (!this.ship.invincible) {
          this.ship.relocate();
        }
      }
    }

    for (i = 0; i < this.boidsInUse.length; i++) {
      if (this.ship.isCollidedWith(this.boidsInUse[i])) {
        var boid = this.boidsInUse.splice(i, 1)[0];
        this.boids.unshift(boid);
        if (!this.ship.invincible) {
          this.ship.relocate();
        }
      }
    }

    for (i = 0; i < this.weaponsInUse.length; i++) {
      if (this.ship.isCollidedWith(this.weaponsInUse[i])) {
        var weapon = this.weaponsInUse.splice(i, 1)[0];
        this.weaponTimeLimit = setTimeout(this.resetWeapon.bind(this), 20000)
        this.weaponCountdown = setTimeout(this.weaponReminder.bind(this, weapon), 15000);
        this.weapons.push(weapon);
        this.ship.fireBullet = weapon.fire;
        this.ship.color = weapon.color2;
        if (weapon.constructor === Invincibility) {
          this.ship.toggleInvincibility(true);
        }
      }
    }

    for (i = 0; i < this.bulletsInUse.length; i++) {
      for (j = 0; j < this.asteroidsInUse.length; j++) {
        if (this.bulletsInUse[i].isCollidedWith(this.asteroidsInUse[j])) {
          var ast = this.asteroidsInUse.splice(j, 1)[0];
          this.asteroids.unshift(ast);

          var bul = this.bulletsInUse.splice(i, 1)[0];
          this.bullets.unshift(bul);
          // this.collidedObjs.push(this.bulletsInUse[i]);
          // this.collidedObjs.push(this.asteroidsInUse[j]);
          // this.recycleCollidedObjs();
          break;
        }
      }
    }

    for (i = 0; i < this.bulletsInUse.length; i++) {
      for (j = 0; j < this.boidsInUse.length; j++) {
        if (this.bulletsInUse[i].isCollidedWith(this.boidsInUse[j])) {
          var boid = this.boidsInUse.splice(j, 1)[0];
          this.boids.unshift(boid);

          var bul = this.bulletsInUse.splice(i, 1)[0];
          this.bullets.unshift(bul);

          break;
        }
      }
    }
  };

  Game.prototype.resetWeapon = function () {
    this.ship.fireBullet = this.ship.defaultWeapon;
    this.ship.color = Ship.COLOR;
    this.ship.toggleInvincibility(false);
    clearTimeout(this.weaponCountdown);
    clearTimeout(this.weaponReminder);
    this.weaponCountdown = null;
    this.weaponReminder = null;
  };

  Game.prototype.weaponReminder = function (weapon) {
    if (this.ship.color !== Ship.COLOR) {
      this.ship.color = Ship.COLOR;
    } else {
      this.ship.color = weapon.color2;
    }

    this.weaponCountdown = setTimeout(this.weaponReminder.bind(this, weapon), 300);
  };

  // Game.prototype.recycleCollidedObjs = function () {
  //   var game = this;
  //   while (game.collidedObjs.length) {
  //     var obj = game.collidedObjs[0];
  //     if (obj.constructor === Bullet) {
  //       game.recycleBullet(obj);
  //     } else if (obj.constructor === Asteroid) {
  //       // debugger
  //       game.recycleAsteroid(obj);
  //     }

  //     game.collidedObjs.splice(0, 1);
  //   }
  // };

  Game.prototype.spawn = function () {
    // concat create new arr, use push in loop better?
    // spawn outside of screen
    while (this.asteroidsInUse.length < this.asteroids.length) {
      this.groupObjs();
    }

    // this.FormGroup('boids');

    // this.asteroids.forEach(function (ast) {
    //   this.asteroidsInUse.push(ast);
    // }, this);
    // this.asteroidsInUse = this.asteroidsInUse.concat(this.asteroids.splice(0, this.asteroids.length));
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    // var respawnThreshold =
    //   Math.floor(Math.random() *
    //     (Game.RESPAWN_THRESHOLD[1] - Game.RESPAWN_THRESHOLD[0]) +
    //       Game.RESPAWN_THRESHOLD[0]);
    if (this.asteroidsInUse.length < this.asteroids.length) { this.spawn(); }
  };

  Game.prototype.groupObjs = function () {
    // form random group?
    var forms = this.FormGroup('forms');
    var idx = Math.floor(Math.random() * 10);
    if (idx === 0 || idx === 1) {
      idx = 0;
    } else if (idx === 2 || idx === 3) {
      idx = 1
    } else {
      idx = 2;
    }
    var form = forms[idx];
    this.FormGroup(form);
  };

})(this);
