(function(root) {
  if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var SupersonicPaperPlane = root.SupersonicPaperPlane;

  // spawn at random pos
  // show up for 10 secs
  // couple different logic
  // - invincible
  // - all dir firing
  // - freeze time

  var Weaponary = SupersonicPaperPlane.Weaponary = function (game) {
    SupersonicPaperPlane.LinkedListNode.call(this);
    this.color = "#ff7f00";
    this.radius = 10;
    this.game = game;
    this.pos = SupersonicPaperPlane.Util.ensureDistanceFromShip(game);
  };

  Weaponary.prototype.draw = function(ctx) {
    // var x = ;
    // var y = ;
    ctx.drawImage(this.image, this.pos[0], this.pos[1], 25, 25);
  };

  // random move
  Weaponary.prototype.move = function () {
    var maxX = this.game.width - 7;
    var maxY = this.game.height;
    var dx = (Math.random() * 3) - 1;
    var dy = (Math.random() * 3) - 1;

    this.pos[0] = Math.abs((this.pos[0] + (dx * this.radius * 0.1 / 2)) % maxX);
    this.pos[1] = Math.abs((this.pos[1] + (dy * this.radius) * 0.1 / 2) % maxY);
  };

})(this);
