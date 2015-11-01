(function(root) {
  if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var SupersonicPaperPlane = root.SupersonicPaperPlane;

  var Bullet = SupersonicPaperPlane.Bullet = function (attrs, game) {
    SupersonicPaperPlane.MovingObject.call(this, attrs, game);
    this.color = Bullet.COLOR;
    this.radius = Bullet.RADIUS;
    this.isWrappable = false;
  };

  SupersonicPaperPlane.Util.inherits(Bullet,SupersonicPaperPlane.MovingObject);

  Bullet.RADIUS = 2;
  Bullet.COLOR = "#FFFFFF";
  Bullet.VELOCITY = 4;

  Bullet.prototype.isCollidedWith = function (otherObject) {
    return (
      (otherObject.constructor === SupersonicPaperPlane.Asteroid || otherObject.constructor === SupersonicPaperPlane.Boid) &&
      SupersonicPaperPlane.MovingObject.prototype.isCollidedWith.call(this, otherObject)
    );
  };

  Bullet.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  // Bullet.prototype.draw = function (ctx) {
  //   var shipHeight = SupersonicPaperPlane.Ship.HEIGHT;

  //   ctx.fillStyle = Bullet.COLOR;
  //   var x = (this.pos[0] + shipHeight),
  //       y = this.pos[1],
  //       path = new Path2D();

  //   path.moveTo(x, y);
  //   path.lineTo(x + Math.cos(this.theta) * 1, y + Math.sin(this.theta) * 1);

  // }

})(this);
