(function(root) {
  if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var SupersonicPaperPlane = root.SupersonicPaperPlane;
  // var Game = SupersonicPaperPlane.Game;

  var MovingObject = SupersonicPaperPlane.MovingObject = function(attrs, game) {
    SupersonicPaperPlane.LinkedListNode.call(this);
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
    ctx.closePath();
  };

  MovingObject.prototype.move = function () {
    // if (this.pos[0] <= 0 || this.pos[0] >= this.game.width) {
    //   this.pos[0]
    // }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    // );
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var dist = SupersonicPaperPlane.Util.calcDist(this.pos, otherObject.pos);

    if (otherObject !== this) {
      return dist <= (this.radius + otherObject.radius);
    } else {
      return false;
    }
  };

})(this);
