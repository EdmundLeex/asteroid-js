(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Asteroids = root.Asteroids;

  var AllDirectionFire = Asteroids.AllDirectionFire = function (game) {
    Asteroids.Weaponary.call(this, game);
    this.color2 = "#0068ff";
  };

  Asteroids.Util.inherits(AllDirectionFire, Asteroids.Weaponary);

  AllDirectionFire.prototype.fire = function () {
    var bulletLoad = [];
    var bullet;

    for (var i = 0; i < 8; i++) {
      bullet = this.game.bullets.pop();
      bulletLoad.push(bullet);
      this.game.bulletsInUse.push(bullet);
    }
    console.log(this.game.bullets.length);

    bulletLoad.forEach(function (bul, idx) {
      bul.pos = [this.pos[0] + Math.sin(this.theta) * Asteroids.Ship.HEIGHT,
                 this.pos[1] - Math.cos(this.theta) * Asteroids.Ship.HEIGHT];
      bul.vel = [(Asteroids.Bullet.VELOCITY) * Math.cos(this.theta - Asteroids.Util.translateRadian(90 + (45 * idx))),
                    (Asteroids.Bullet.VELOCITY) * Math.sin(this.theta - Asteroids.Util.translateRadian(90 + (45 * idx)))];
    }, this);
  };
})(this);
