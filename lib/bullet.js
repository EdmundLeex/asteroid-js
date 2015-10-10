(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Bullet = Asteroids.Bullet = function (attrs, game) {
    Asteroids.MovingObject.call(this, attrs, game);
    this.color = Bullet.COLOR;
    this.radius = Bullet.RADIUS;
    this.isWrappable = false;
  };

  Asteroids.Util.inherits(Bullet,Asteroids.MovingObject);

  Bullet.RADIUS = 2;
  Bullet.COLOR = "#00FF00";
  Bullet.vel = 3;

  Bullet.prototype.isCollidedWith = function (otherObject) {
    return (
      otherObject.constructor === Asteroids.Asteroid &&
      Asteroids.MovingObject.prototype.isCollidedWith.call(this, otherObject)
    );
  };

  Bullet.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  // Bullet.prototype.draw = function (ctx) {
  //   var shipHeight = Asteroids.Ship.HEIGHT;

  //   ctx.fillStyle = Bullet.COLOR;
  //   var x = (this.pos[0] + shipHeight),
  //       y = this.pos[1],
  //       path = new Path2D();

  //   path.moveTo(x, y);
  //   path.lineTo(x + Math.cos(this.theta) * 1, y + Math.sin(this.theta) * 1);

  // }

})();
