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

  Asteroid.COLOR = "#d00007";
  Asteroid.RADIUS = 5;

  Asteroid.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();

    ctx.lineWidth = 5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.closePath();
  };

})(this);
