(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Asteroids = root.Asteroids;
  // var Game = Asteroids.Game;

  var MovingObject = Asteroids.MovingObject = function(attrs, game) {
    this.pos = attrs.pos;
    // this.centerX = attrs.pos[0];
    // this.centerY = attrs.pos[1];
    this.vel = attrs.vel;
    this.radius = attrs.radius;
    this.color = attrs.color;
    this.game = game;
    this.isWrappable = true;
  };

  MovingObject.prototype.draw = function(ctx) {
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
  };

  MovingObject.prototype.move = function () {
    this.pos = this.game.wrap(
      [this.pos[0] + this.vel[0],
      this.pos[1] + this.vel[1]]
    );
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    // TODO: remove func declaration
    var dist = function (pos1, pos2) {
      // TODO: remove local vars to lower memory usage
      var x1 = pos1[0];
      var y1 = pos1[1];
      var x2 = pos2[0];
      var y2 = pos2[1];
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

    if (otherObject !== this) {
      return dist(this.pos, otherObject.pos) <= (this.radius + otherObject.radius);
    } else {
      return false;
    }
  };

})(this);
