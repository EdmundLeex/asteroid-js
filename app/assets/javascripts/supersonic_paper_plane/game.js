(function(root) {
  if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var SupersonicPaperPlane = root.SupersonicPaperPlane;
  var Ship = SupersonicPaperPlane.Ship;
  var Bullet = SupersonicPaperPlane.Bullet;
  var Asteroid = SupersonicPaperPlane.Asteroid;
  var Boid = SupersonicPaperPlane.Boid;
  var Invincibility = SupersonicPaperPlane.Invincibility;
  var AllDirectionFire = SupersonicPaperPlane.AllDirectionFire;
  var LinkedList = SupersonicPaperPlane.LinkedList;
  var PopSound = SupersonicPaperPlane.PopSound;

  var Game = SupersonicPaperPlane.Game = function (height, width) {
    this.isOver = false;
    this.asteroids       = new LinkedList();
    this.asteroidsInUse  = new LinkedList();
    this.bullets         = new LinkedList();
    this.bulletsInUse    = new LinkedList();
    this.boids           = new LinkedList();
    this.boidsInUse      = new LinkedList();
    this.weapons         = new LinkedList();
    this.weaponsInUse    = new LinkedList();
    this.explosions      = new LinkedList();
    this.explosionsInUse = new LinkedList();
    this.popSound        = new Howl({urls: ["audios/pop.wav"], sprite: {popping: [0, 128]}});
    this.whistle         = new Howl({urls: ["audios/whistle.wav"], sprite: {whistle: [0, 214]}});
    // this.gunDownSound    = new Howl({urls: ["audios/gun_down.wav"], sprite: {gunDown: [0, 980]}});
    this.ship            = new Ship({pos:[width/2, height/2], vel: [0,0]}, this);
    this.comboTM = null;
    this.combo = 0;
    this.points = 0;
    this.currentPoints = 0;
    this.height = height;
    this.width = width;
    this.progression = 0;
    this.maxEnemyNum = 300;
    this.init();
    this.spawnEnemy();
  };

  Game.prototype.FormGroup = SupersonicPaperPlane.FormGroup;

  Game.NUM_ASTEROIDS = 1000;
  Game.NUM_BOIDS = 50;
  Game.NUM_BULLETS = 200;
  Game.OFF_SCREEN_BUFFER = 200;

  Game.prototype.init = function () {
    this.addAsteroids(Game.NUM_ASTEROIDS);
    this.addBullets(Game.NUM_BULLETS);
    this.addBoids(Game.NUM_BOIDS);
    this.addExplosions(Game.NUM_BULLETS * 2);

    this.weapons.push(new Invincibility(this));
    this.weapons.push(new AllDirectionFire(this));
  };

  Game.prototype.reset = function () {
    var game = this;

    game.points = 0;

    game.ship.reset();

    game.asteroidsInUse.each(function (ast) {
      game.recycleAsteroid(ast);
    });

    game.boidsInUse.each(function (boid) {
      game.recycleBoid(boid);
    });

    game.bulletsInUse.each(function (bul) {
      game.recycleBullet(bul);
    });

    game.weaponsInUse.each(function (weapon) {
      game.recycleWeapon(weapon);
    });
  };

  Game.prototype.addBullets = function (num) {
    for (var i = 0; i < num; i++) {
      var bullet = new Bullet({
        pos: [0, 0],
        vel: [0, 0]
      }, this);

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

  Game.prototype.addExplosions = function (num) {
    for (var i = 0; i < num; i++) {
      this.explosions.push(new SupersonicPaperPlane.Explosion([0, 0]));
    }
  };

  Game.prototype.addBoids = function (num) {
    var game = this;
    for (var i = 0; i < (num || 1); i++) {
      this.boids.push(new Boid(game));
    }
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.width;//Game.DIM_X;
    var y = Math.random() * this.height; //Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.draw = function (ctx, timer) {
    var game = this;
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.fillStyle = "rgba(0,0,0,0)";

    // ctx.beginPath();
    ctx.rect(0,0,game.width, game.height);
    ctx.fill();

    game.ship.draw(ctx);
    game.asteroidsInUse.each(function (ast) {
      ast.draw(ctx);
    });

    game.boidsInUse.each(function (boid) {
      boid.draw(ctx);
    });

    game.bulletsInUse.each(function (bul) {
      bul.draw(ctx);
    });

    game.weaponsInUse.each(function (weapon) {
      weapon.draw(ctx);
    });

    game.explosionsInUse.each(function (exp) {
      exp.draw(ctx, game.recycleExplosion.bind(game));
    });

    // timer.draw(ctx);
  };

  Game.prototype.moveObjects = function () {
    this.ship.move();
    this.asteroidsInUse.each(function (ast) {
      ast.move();
    });

    this.boidsInUse.each(function (boid) {
      boid.move();
    });

    this.bulletsInUse.each(function (bul) {
      bul.move();
    });

    this.weaponsInUse.each(function (weapon) {
      weapon.move();
    });

    this.wrap();
  };

  Game.prototype.isOutOfBounds = function(pos) {
    return (pos[0] > this.width || pos[0] < 0 ||
      pos[1] > this.height || pos[1] < 0);
  };

  Game.prototype.wrap = function () {
    var game = this;

    this.asteroidsInUse.each(function (ast) {
      if (game.isOutOfBounds(ast.pos)) {
        game.recycleAsteroid(ast);
      }
    });

    this.bulletsInUse.each(function (bul) {
      if (game.isOutOfBounds(bul.pos)) {
        game.recycleBullet(bul);
      }
    });
  };

  Game.prototype.recycleBullet = function (bullet) {
    // not reset pos
    this.bulletsInUse.remove(bullet);
    this.bullets.push(bullet);

    bullet.vel[0] = 0;
    bullet.vel[1] = 0;
    bullet.pos[0] = 0;
    bullet.pos[1] = 0;
  };

  Game.prototype.recycleAsteroid = function (asteroid) {
    this.asteroidsInUse.remove(asteroid);
    this.asteroids.push(asteroid);
  };

  Game.prototype.recycleWeapon = function (weapon) {
    this.weaponsInUse.remove(weapon);
    this.weapons.push(weapon);
  };

  Game.prototype.recycleBoid = function (boid) {
    this.boidsInUse.remove(boid);
    this.boids.push(boid);
  };

  Game.prototype.recycleExplosion = function (explosion) {
    this.explosionsInUse.remove(explosion);
    this.explosions.push(explosion);
  };

  Game.prototype.checkCollisions = function() {
    var game = this;
    game.asteroidsInUse.each(function (ast) {
      if (ast.isCollidedWith(game.ship)) {
        game.recycleAsteroid(ast);

        if (!game.ship.invincible) {
          game.whistle.play("whistle");
          game.gameOver();
          game.ship.relocate();
        } else {
          game.popSound.play('popping');

          if (game.comboTM) { clearTimeout(game.comboTM); }
          game.combo += 1;
          game.currentPoints += 6;
          game.comboTM = setTimeout(game.cancelCombo.bind(game), 2000);
        }
      }
    });

    game.boidsInUse.each(function (boid) {
      if (game.ship.isCollidedWith(boid)) {
        game.recycleBoid(boid);
        if (!game.ship.invincible) {
          game.whistle.play("whistle");
          game.gameOver();
          game.ship.relocate();
        }
      }
    });

    game.weaponsInUse.each(function (weapon) {
      if (game.ship.isCollidedWith(weapon)) {
        game.recycleWeapon(weapon);
        game.ship.mountWeapon(weapon);
      }
    });

    game.bulletsInUse.each(function (bul) {
      game.asteroidsInUse.each(function (ast) {
        if (bul.isCollidedWith(ast)) {
          game.popSound.play("popping");

          game.explodeAt(ast.pos);
          game.recycleBullet(bul);
          game.recycleAsteroid(ast);

          if (game.comboTM) { clearTimeout(game.comboTM); }
          game.combo += 1;
          game.currentPoints += 6;
          game.comboTM = setTimeout(game.cancelCombo.bind(game), 2000);
        }
      });
    });

    game.bulletsInUse.each(function (bul) {
      game.boidsInUse.each(function (boid) {
        if (bul.isCollidedWith(boid)) {
          game.popSound.play("popping");

          game.explodeAt(boid.pos);
          game.recycleBullet(bul);
          game.recycleBoid(boid);

          if (game.comboTM) { clearTimeout(game.comboTM); }
          game.combo += 1;
          game.currentPoints += 6;
          game.comboTM = setTimeout(game.cancelCombo.bind(game), 2000);
        }
      });
    });
  };

  Game.prototype.explodeAt = function (pos) {
    var exp = this.explosions.pop();
    exp.pos = pos;
    this.explosionsInUse.push(exp);
  };

  Game.prototype.cancelCombo = function() {
    this.points += (this.currentPoints * this.combo);
    this.combo = 0;
    this.currentPoints = 0;
    this.comboTM = null;
  };

  Game.prototype.spawnEnemy = function () {
    // while (this.asteroidsInUse.length < this.asteroids.length) {
    if (this.asteroidsInUse.length < this.maxEnemyNum) {
      this.spawnGroup();
    }
    // }
  };

  Game.prototype.spawnWeapon = function () {
    if (this.weapons.length) {
      var idx = Math.floor(Math.random() * this.weapons.length);
      var weapon = this.weapons.first;

      for (var i = 0; i < idx; i++) {
        weapon = weapon.nextNode;
      }

      this.weapons.remove(weapon);
      this.weaponsInUse.push(weapon);
    }
  };

  Game.prototype.gameOver = function () {
    this.cancelCombo();
    this.isOver = true;
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();

    if (this.progression === 0 || this.progression % 300 === 0) {
      this.spawnEnemy();
      if (this.progression % 4000 === 0) {
        this.maxEnemyNum += 300;
      }
    }
    this.progression += 1;

    var odd = Math.floor(Math.random() * 500);
    if (odd === 1) { this.spawnWeapon(); }

    if (this.asteroids.length + this.asteroidsInUse.length !== Game.NUM_ASTEROIDS) {console.log('something wrong');}
  };

  Game.prototype.spawnGroup = function () {
    var forms = this.FormGroup('forms');
    var idx = Math.floor(Math.random() * 10);
    if (idx === 0 || idx === 1) {
      idx = 0;
    } else if (idx === 2 || idx === 3) {
      idx = 1;
    } else {
      idx = 2;
    }
    var form = forms[idx];
    this.FormGroup(form);
  };

})(this);
