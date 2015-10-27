(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;
  var Bullet = Asteroids.Bullet;
  var Util = Asteroids.Util;

  var Ship = Asteroids.Ship = function (attrs, game) {
    Asteroids.MovingObject.call(this, attrs, game);
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.theta = 0;
  };

  Util.inherits(Ship, Asteroids.MovingObject);

  Ship.COLOR = "#FF0000";
  Ship.RADIUS = 10;
  // Ship.TOP_SPEED = 10;
  Ship.ACCELERATOR = 0.5;
  Ship.ROTATE_ANGLE = Util.translateRadian(5); // 5 degree
  Ship.WIDTH = 15;
  Ship.HEIGHT = 25;
  Ship.FIRE_RATE = 150; // interval
  Ship.RECOIL = Math.pow(1, 2) / 4;

  Ship.prototype.speed = function () {
    return Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
  };

  Ship.prototype.relocate = function () {
    this.pos = [this.game.width/2, this.game.height/2];
    this.vel = [0,0];
    this.theta = 0;
  };

  Ship.prototype.power = function () {
    // if (this.speed() <= Ship.TOP_SPEED) {
    this.vel[0] += Math.sin(this.theta) * (Math.pow(Ship.ACCELERATOR, 2) / 2);
    this.vel[1] += -Math.cos(this.theta) * (Math.pow(Ship.ACCELERATOR, 2) / 2);
    // }
  };

  Ship.prototype.rotate = function (dir) {
    if (dir === 'left') {
      this.theta -= Ship.ROTATE_ANGLE;
    } else {
      this.theta += Ship.ROTATE_ANGLE;
    }
  };

  Ship.prototype.leftRotate = function () {
    this.theta -= Ship.ROTATE_ANGLE;
  };

  Ship.prototype.rightRotate = function () {
    this.theta += Ship.ROTATE_ANGLE;
  };

  // maybe decrease braking power, now stopping is too easy.
  Ship.prototype.brake = function () {
    var vX = this.vel[0],
        vY = this.vel[1];

    if (this.speed() > 0) {
      (this.vel[0] -= (this.vel[0] / this.speed()) * Math.pow(Ship.ACCELERATOR, 2));
      (this.vel[1] -= (this.vel[1] / this.speed()) * Math.pow(Ship.ACCELERATOR, 2));
    }

    if (Math.sign(Math.sin(this.theta) * vX !== Math.sign(Math.sin(this.theta) * this.vel[0]) &&
        Math.sign(Math.cos(this.theta) * vY) !== Math.sign(Math.cos(this.theta) * this.vel[1]))) {
      this.vel[0] = 0;
      this.vel[1] = 0;
    }
  };

  Ship.prototype.fireBullet = function () {
    var bullet = this.game.bullets.pop();
    this.game.bulletsInUse.push(bullet);
    console.log(this.game.bullets.length);

    // bullet vel calculate not right.
    bullet.pos = [this.pos[0] + Math.sin(this.theta) * Ship.HEIGHT, this.pos[1] - Math.cos(this.theta) * Ship.HEIGHT];
    bullet.vel = [(Bullet.VELOCITY) * Math.cos(this.theta - Util.translateRadian(90)),
                  (Bullet.VELOCITY) * Math.sin(this.theta - Util.translateRadian(90))];
    // bullet.vel = [(Bullet.VELOCITY + this.speed()) * Math.cos(this.theta - Util.translateRadian(90)),
    //               (Bullet.VELOCITY + this.speed()) * Math.sin(this.theta - Util.translateRadian(90))];

    // refactor and combine power function
    this.vel[0] -=  Math.sin(this.theta) * Ship.RECOIL;
    this.vel[1] -= -Math.cos(this.theta) * Ship.RECOIL;
  };

  Ship.prototype.draw = function(ctx) {
    ctx.fillStyle = Ship.COLOR;
    var x = this.pos[0];
    var y = this.pos[1];

    var width = Ship.WIDTH / 2;
    var height = Ship.HEIGHT;

    ctx.beginPath();
    ctx.strokeStyle = "orange";
    ctx.fillStyle = Ship.COLOR;
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(this.theta) * width, y + Math.sin(this.theta) * width);
    ctx.lineTo(x + Math.sin(this.theta) * height, y - Math.cos(this.theta) * height);
    ctx.lineTo(x - Math.cos(this.theta) * width, y - Math.sin(this.theta) * width);
    ctx.lineWidth = 5;
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

})();
