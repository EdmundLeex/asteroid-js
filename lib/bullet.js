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

  Bullet.RADIUS = 5;
  Bullet.COLOR = "#00FF00";

  Bullet.prototype.isCollidedWith = function (otherObject) {
    var dist = function (pos1, pos2) {
      var x1 = pos1[0];
      var y1 = pos1[1];
      var x2 = pos2[0];
      var y2 = pos2[1];
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

    if (otherObject.constructor === Asteroids.Asteroid) {
      return dist(this.pos, otherObject.pos) <= (this.radius + otherObject.radius);
    } else {
      return false;
    }
  };


})();
