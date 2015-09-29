(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;
  var Bullet = Asteroids.Bullet;

  var Ship = Asteroids.Ship = function (attrs, game) {
    Asteroids.MovingObject.call(this, attrs, game);
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
  };

  Asteroids.Util.inherits(Ship,Asteroids.MovingObject);

  Ship.COLOR = "#FF0000";
  Ship.RADIUS = 40;

  Ship.prototype.relocate = function () {
    this.pos = [this.game.width/2, this.game.height/2];
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {
    var vel = this.vel.slice();

    var bullet = new Bullet({
      pos: this.pos.slice(),
      vel: [vel[0] * 5, vel[1] * 5]
    }, this.game);

    this.game.bullets.push(bullet);
  };

  
})();
