(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Asteroid = Asteroids.Asteroid = function (attrs, game) {
    Asteroids.MovingObject.call(this, attrs, game);
    this.color = Asteroid.COLOR;
    this.radius = Asteroid.RADIUS;
  };

  Asteroids.Util.inherits(Asteroid,Asteroids.MovingObject);

  Asteroid.COLOR = "#FFFFFF";
  Asteroid.RADIUS = 10;

  Asteroid.prototype.isCollidedWith = function (otherObject) {
    var dist = function (pos1, pos2) {
      var x1 = pos1[0];
      var y1 = pos1[1];
      var x2 = pos2[0];
      var y2 = pos2[1];
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

    if (otherObject.constructor === Asteroids.Ship) {
      return dist(this.pos, otherObject.pos) <= (this.radius + otherObject.radius);
    } else {
      return false;
    }
  };
})();
