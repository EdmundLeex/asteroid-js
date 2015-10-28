(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Asteroids = root.Asteroids;

  var Asteroid = Asteroids.Asteroid = function (attrs, game) {
    Asteroids.MovingObject.call(this, attrs, game);
    this.color = Asteroid.COLOR;
    this.radius = Asteroid.RADIUS;
  };

  Asteroids.Util.inherits(Asteroid,Asteroids.MovingObject);

  Asteroid.COLOR = "#FFFFFF";
  Asteroid.RADIUS = 5;
})(this);
