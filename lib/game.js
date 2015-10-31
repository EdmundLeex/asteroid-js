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
  var AllDirectionFire = Asteroids.AllDirectionFire;
  var LinkedList = Asteroids.LinkedList;

  var Game = Asteroids.Game = function (height, width) {
    this.isOver = false;
    // this.asteroids = [];
    this.asteroids = new LinkedList();
    // this.asteroidsInUse = [];
    this.asteroidsInUse = new LinkedList();
    // this.bullets = [];
    // this.bulletsInUse = [];
    this.bullets = new LinkedList();
    this.bulletsInUse = new LinkedList();
    // this.collidedObjs = [];
    // this.boids = [];
    // this.boidsInUse = [];
    this.boids = new LinkedList();
    this.boidsInUse = new LinkedList();
    // this.weapons = [];
    // this.weaponsInUse = [];
    this.weapons = new LinkedList();
    this.weaponsInUse = new LinkedList();
    this.ship = new Ship({pos:[width/2, height/2], vel: [0,0]}, this);
    this.height = height;
    this.width = width;
    this.init();
    this.spawnEnemy();
  };

  Game.prototype.FormGroup = Asteroids.FormGroup;

  Game.NUM_ASTEROIDS = 50;
  Game.NUM_BOIDS = 10;
  // Game.ACTIVE_ASTEROIDS_COUNT = 300;
  // Game.RESPAWN_THRESHOLD = [250, 300];
  Game.NUM_BULLETS = 200;
  Game.OFF_SCREEN_BUFFER = 200;

  Game.prototype.init = function () {
    this.addAsteroids(Game.NUM_ASTEROIDS);
    this.addBullets(Game.NUM_BULLETS);
    this.addBoids(Game.NUM_BOIDS);

    this.weapons.push(new Invincibility(this));
    this.weapons.push(new AllDirectionFire(this));
  };

  Game.prototype.reset = function () {
    var game = this;

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

  // Game.prototype.allObjects = function() {
  //   return this.asteroidsInUse.concat(this.ship, this.bulletsInUse, this.boidsInUse, this.weaponsInUse);
  // };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.width;//Game.DIM_X;
    var y = Math.random() * this.height; //Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.draw = function (ctx, timer) {
    // var background = new Image();
    // background.src = 'background.jpg';
    ctx.clearRect(0,0,this.width, this.height);
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    // background.onload = function () {
    //   ctx.drawImage(background, 0, 0);
    // }

    ctx.beginPath();
    ctx.rect(0,0,this.width, this.height);
    ctx.fill();

    this.ship.draw(ctx);
    this.asteroidsInUse.each(function (ast) {
      ast.draw(ctx);
    });

    this.boidsInUse.each(function (boid) {
      boid.draw(ctx);
    });

    this.bulletsInUse.each(function (bul) {
      bul.draw(ctx);
    });

    this.weaponsInUse.each(function (weapon) {
      weapon.draw(ctx);
    });

    // this.allObjects().forEach(function (obj) {
    //   obj.draw(ctx);
    // });

    timer.draw(ctx);
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

    // this.allObjects().forEach(function(object) {
    //   object.move();
    // });
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

    // this.allObjects().forEach(function (obj) {
    //   if (obj.pos[0] < -Game.OFF_SCREEN_BUFFER ||
    //       obj.pos[0] > game.width + Game.OFF_SCREEN_BUFFER) {
    //     if (obj.constructor === Bullet) {
    //       game.recycleBullet(obj);
    //     } else if (obj.constructor === Asteroid) {
    //       // obj.pos[0] %= game.width;
    //       // if (obj.pos[0] < 0) { obj.pos[0] += game.width; }
    //       game.recycleAsteroid(obj);
    //     }
    //   } else if (obj.pos[1] < 0 || obj.pos[1] > game.height) {
    //     if (obj.constructor === Bullet) {
    //       game.recycleBullet(obj);
    //     } else if (obj.constructor === Asteroid) {
    //       // obj.pos[1] %= game.height;
    //       // if (obj.pos[1] < 1) { obj.pos[1] += game.height; }
    //       game.recycleAsteroid(obj);
    //     }
    //   }
    // });
  };

  // Game.prototype.removeBulletFromUse = function (bullet) {
  //   var idx = this.bulletsInUse.indexOf(bullet);
  //   this.bulletsInUse.splice(idx, 1);
  // };

  Game.prototype.recycleBullet = function (bullet) {
    this.bulletsInUse.remove(bullet);
    this.bullets.push(bullet);

    // var idx = this.bulletsInUse.indexOf(bullet);
    // this.bulletsInUse.splice(idx, 1);

    // reset bullet
    bullet.vel[0] = 0;
    bullet.vel[1] = 0;
    bullet.pos[0] = 0;
    bullet.pos[1] = 0;
    // this.bullets.unshift(bullet);
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

  Game.prototype.checkCollisions = function() {
    // console.log(this.ship);
    // debugger
    var game = this;
    this.asteroidsInUse.each(function (ast) {
      if (ast.isCollidedWith(game.ship)) {
        game.recycleAsteroid(ast);

        if (!game.ship.invincible) {
          game.gameOver();
          game.ship.relocate();
        }
      }
    });

    this.boidsInUse.each(function (boid) {
      if (game.ship.isCollidedWith(boid)) {
        game.recycleBoid(boid);
        if (!game.ship.invincible) {
          game.gameOver();
          game.ship.relocate();
        }
      }
    });

    this.weaponsInUse.each(function (weapon) {
      if (game.ship.isCollidedWith(weapon)) {
        game.recycleWeapon(weapon);
        game.ship.mountWeapon(weapon);
      }
    });

    this.bulletsInUse.each(function (bul) {
      game.asteroidsInUse.each(function (ast) {
        if (bul.isCollidedWith(ast)) {
          game.recycleBullet(bul);
          game.recycleAsteroid(ast);
          // break;
        }
      });
    });

    this.bulletsInUse.each(function (bul) {
      game.boidsInUse.each(function (boid) {
        if (bul.isCollidedWith(boid)) {
          game.recycleBullet(bul);
          game.recycleBoid(boid);
        }
      });
    });

    var i, j, ast, boid, bul;
    // for (i = 0; i < this.asteroidsInUse.length; i++) {
    //   if (this.asteroidsInUse[i].isCollidedWith(this.ship)) {
    //     ast = this.asteroidsInUse.splice(i, 1)[0];
    //     this.asteroids.push(ast);
    //     // this.collidedObjs.push(this.asteroidsInUse[i]);

    //     if (!this.ship.invincible) {
    //       this.gameOver();
    //       this.ship.relocate();
    //     }
    //   }
    // }

    // for (i = 0; i < this.boidsInUse.length; i++) {
    //   if (this.ship.isCollidedWith(this.boidsInUse[i])) {
    //     boid = this.boidsInUse.splice(i, 1)[0];
    //     this.boids.push(boid);
    //     if (!this.ship.invincible) {
    //       this.gameOver();
    //       this.ship.relocate();
    //     }
    //   }
    // }

    // for (i = 0; i < this.weaponsInUse.length; i++) {
    //   if (this.ship.isCollidedWith(this.weaponsInUse[i])) {
    //     var weapon = this.weaponsInUse.splice(i, 1)[0];
    //     this.ship.mountWeapon(weapon);
    //     this.weapons.push(weapon);
    //   }
    // }

    // for (i = 0; i < this.bulletsInUse.length; i++) {
    //   for (j = 0; j < this.asteroidsInUse.length; j++) {
    //     if (this.bulletsInUse[i].isCollidedWith(this.asteroidsInUse[j])) {
    //       ast = this.asteroidsInUse.splice(j, 1)[0];
    //       this.asteroids.push(ast);

    //       bul = this.bulletsInUse.splice(i, 1)[0];
    //       this.bullets.push(bul);
    //       // this.collidedObjs.push(this.bulletsInUse[i]);
    //       // this.collidedObjs.push(this.asteroidsInUse[j]);
    //       // this.recycleCollidedObjs();
    //       break;
    //     }
    //   }
    // }

    // for (i = 0; i < this.bulletsInUse.length; i++) {
    //   for (j = 0; j < this.boidsInUse.length; j++) {
    //     if (this.bulletsInUse[i].isCollidedWith(this.boidsInUse[j])) {
    //       boid = this.boidsInUse.splice(j, 1)[0];
    //       this.boids.push(boid);

    //       bul = this.bulletsInUse.splice(i, 1)[0];
    //       this.bullets.push(bul);

    //       break;
    //     }
    //   }
    // }
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

  Game.prototype.spawnEnemy = function () {
    // concat create new arr, use push in loop better?
    // spawn outside of screen
    while (this.asteroidsInUse.length < this.asteroids.length) {
      this.groupObjs();
    }
  };

  Game.prototype.spawnWeapon = function () {
    if (this.weapons.length) {
      var idx = Math.floor(Math.random() * this.weapons.length);
      var weapon = this.weapons.first;
      // var weapon = this.weapons.splice(idx, 1)[0];
      for (var i = 0; i < idx; i++) {
        weapon = weapon.nextNode;
      }

      this.weapons.remove(weapon);
      this.weaponsInUse.push(weapon);
    }
  };

  Game.prototype.gameOver = function () {
    this.isOver = true;
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    // var respawnThreshold =
    //   Math.floor(Math.random() *
    //     (Game.RESPAWN_THRESHOLD[1] - Game.RESPAWN_THRESHOLD[0]) +
    //       Game.RESPAWN_THRESHOLD[0]);
    if (this.asteroidsInUse.length < this.asteroids.length) { this.spawnEnemy(); }
    var odd = Math.floor(Math.random() * 500);
    if (odd === 1) { this.spawnWeapon(); }

    if (this.asteroids.length + this.asteroidsInUse.length !== Game.NUM_ASTEROIDS) {console.log('something wrong');}
  };

  Game.prototype.groupObjs = function () {
    // form random group?
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
