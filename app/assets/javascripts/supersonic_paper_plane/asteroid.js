(function(root) {
  if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var SupersonicPaperPlane = root.SupersonicPaperPlane;

  var Asteroid = SupersonicPaperPlane.Asteroid = function (attrs, game) {
    SupersonicPaperPlane.MovingObject.call(this, attrs, game);
    this.color = Asteroid.COLOR;
    this.radius = Asteroid.RADIUS;
  };

  SupersonicPaperPlane.Util.inherits(Asteroid,SupersonicPaperPlane.MovingObject);

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
