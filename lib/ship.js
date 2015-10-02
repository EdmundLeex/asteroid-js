(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;
  var Bullet = Asteroids.Bullet;

  var Ship = Asteroids.Ship = function (attrs, game) {
    Asteroids.MovingObject.call(this, attrs, game);
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.theta = 0;
  };

  Asteroids.Util.inherits(Ship,Asteroids.MovingObject);

  Ship.COLOR = "#FF0000";
  Ship.RADIUS = 40;
  Ship.TOP_SPEED = 100;
  Ship.ACCELERATOR = 2;
  Ship.ROTATE_ANGLE = (10 * Math.PI) / 180; // 5 degree
  Ship.WIDTH = 20;
  Ship.HEIGHT = 40;

  Ship.prototype.relocate = function () {
    this.pos = [this.game.width/2, this.game.height/2];
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    if (Math.abs(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2) <= Ship.TOP_SPEED)) {
      this.vel[0] += Ship.ACCELERATOR * (this.theta);
      this.vel[1] += ;
    }
  };

  Ship.prototype.leftRotate = function () {
    var theta = Ship.ROTATE_ANGLE;
    this.theta -= Ship.ROTATE_ANGLE;
  }

  Ship.prototype.rightRotate = function () {
    var theta = Ship.ROTATE_ANGLE;
    this.theta += Ship.ROTATE_ANGLE;
    // x = this.vel[0];
    // y = this.vel[1];
    // this.vel[0] = (x * Math.cos(theta) - y * Math.sin(theta));
    // this.vel[1] = (x * Math.sin(theta) + y * Math.cos(theta));
  }

  Ship.prototype.brake = function () {
    if (Math.abs(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2) > 0)) {
      this.vel[0] -= this.vel[0];
      this.vel[1] -= this.vel[1];
    }
  }

  Ship.prototype.fireBullet = function () {
    var vel = this.vel.slice();

    var bullet = new Bullet({
      pos: this.pos.slice(),
      vel: [vel[0] * 5, vel[1] * 5]
    }, this.game);

    this.game.bullets.push(bullet);
  };

  Ship.prototype.draw = function(ctx) {
    ctx.fillStyle = "#FF0000";
    var x = this.pos[0];
    var y = this.pos[1];

    var width = Ship.WIDTH / 2;
    var height = Ship.HEIGHT;

    var path = new Path2D();
    path.moveTo(x, y);

    path.lineTo(x + Math.cos(this.theta) * width, y + Math.sin(this.theta) * width);
    path.lineTo(x + Math.sin(this.theta) * height, y - Math.cos(this.theta) * height);
    // path.lineTo(x + 0, y - 20);
    path.lineTo(x - Math.cos(this.theta) * width, y - Math.sin(this.theta) * width);
    ctx.fill(path);
  };
  
})();
