(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Asteroids = root.Asteroids;

  // spawn at random pos
  // show up for 10 secs
  // couple different logic
  // - invincible
  // - all dir firing
  // - freeze time

  var Weaponary = Asteroids.Weaponary = function (game) {
    Asteroids.LinkedListNode.call(this);
    this.color = "#ff7f00";
    this.radius = 6;
    this.game = game;
    this.pos = Asteroids.Util.ensureDistanceFromShip(game);
  };

  Weaponary.prototype.draw = function(ctx) {
    var x = this.pos[0];
    var y = this.pos[1];
    ctx.fillStyle = this.color2;

    ctx.beginPath();
    // ctx.strokeStyle = this.color
    // ctx.lineWidth = 3
    ctx.moveTo(x, y);
    ctx.lineTo(x + 12, y);
    ctx.lineTo(x + 12, y + 12);
    ctx.lineTo(x, y + 12);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 6, y + 6);
    ctx.lineTo(x, y + 12);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(x + 12, y);
    ctx.lineTo(x + 18, y + 6);
    ctx.lineTo(x + 12, y + 12);
    ctx.closePath();
    ctx.fill();
  };

  // random move
  Weaponary.prototype.move = function () {
    var maxX = this.game.width - 7;
    var maxY = this.game.height;
    var dx = (Math.random() * 3) - 1;
    var dy = (Math.random() * 3) - 1;

    this.pos[0] = Math.abs((this.pos[0] + (dx * this.radius * 0.1)) % maxX);
    this.pos[1] = Math.abs((this.pos[1] + (dy * this.radius) * 0.1) % maxY);
  };

})(this);
