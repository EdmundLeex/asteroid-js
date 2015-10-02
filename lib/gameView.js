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
    window.key('down', function() { that.game.ship.brake([0, impulse]); });
    window.key('left', function() { that.game.ship.leftRotate(); });
    window.key('right', function() { that.game.ship.rightRotate(); });
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



b.prototype.rotate=function(a){
  if(2!=this.length)return!1;
  var c=new b;
  return c.push(Math.cos(a)*this[0]+Math.sin(a)*this[1]),c.push(Math.cos(a)*this[1]-Math.sin(a)*this[0]),c
}