(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  var Asteroids = window.Asteroids;
  var GameView = Asteroids.GameView = function (height, width) {
    this.height = height;
    this.width = width;
    this.game = new Asteroids.Game(this.height, this.width);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var impulse = 5;
    var that = this;
    window.key('up', function() { that.game.ship.power([0,-impulse]); });
    window.key('down', function() { that.game.ship.power([0, impulse]); });
    window.key('left', function() { that.game.ship.power([-impulse, 0]); });
    window.key('right', function() { that.game.ship.power([impulse,0]); });
    window.key('space', function() { that.game.ship.fireBullet(); });
  };

  GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");
    var that = this;
    this.game.addAsteroids();
    this.bindKeyHandlers();
    window.setInterval(function() {
      that.game.draw(ctx);
      that.game.step();
    }, 20);
  };

})();
