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
    var bullets = [];
    var bullet;

    for (var i = 0; i < 8; i++) {
      bullet = this.game.bullets.pop();
      bullets.push(bullet);
      this.game.bulletsInUse.push(bullet);
    }
    console.log(this.game.bullets.length);

    bullets.forEach(function (bul, idx) {
      bul.pos = [this.pos[0] + Math.sin(this.theta) * Asteroids.Ship.HEIGHT,
                 this.pos[1] - Math.cos(this.theta) * Asteroids.Ship.HEIGHT];
      bul.vel = [(Asteroids.Bullet.VELOCITY) * Math.cos(this.theta - Asteroids.Util.translateRadian(90 + (45 * idx))),
                    (Asteroids.Bullet.VELOCITY) * Math.sin(this.theta - Asteroids.Util.translateRadian(90 + (45 * idx)))];
    }, this);

    // bullet vel calculate not right.
    // bullet.pos = [this.pos[0] + Math.sin(this.theta) * Ship.HEIGHT, this.pos[1] - Math.cos(this.theta) * Ship.HEIGHT];
    // bullet.vel = [(Bullet.VELOCITY) * Math.cos(this.theta - Util.translateRadian(90)),
    //               (Bullet.VELOCITY) * Math.sin(this.theta - Util.translateRadian(90))];
    // bullet.vel = [(Bullet.VELOCITY + this.speed()) * Math.cos(this.theta - Util.translateRadian(90)),
    //               (Bullet.VELOCITY + this.speed()) * Math.sin(this.theta - Util.translateRadian(90))];

    // refactor and combine power function
    // this.vel[0] -=  Math.sin(this.theta) * Ship.RECOIL;
    // this.vel[1] -= -Math.cos(this.theta) * Ship.RECOIL;
  };
})(this);
