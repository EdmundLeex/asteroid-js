(function(root) {
  if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var SupersonicPaperPlane = root.SupersonicPaperPlane;

  var AllDirectionFire = SupersonicPaperPlane.AllDirectionFire = function (game) {
    SupersonicPaperPlane.Weaponary.call(this, game);
    this.shootSound = new Howl({urls: ["audios/shoot.wav"], sprite: {shooting: [0, 122]}});
    this.color2 = "#0068ff";
  };

  SupersonicPaperPlane.Util.inherits(AllDirectionFire, SupersonicPaperPlane.Weaponary);

  AllDirectionFire.prototype.fire = function () {
    var bulletLoad = [];
    var bullet;

    for (var i = 0; i < 8; i++) {
      bullet = this.game.bullets.pop();
      bulletLoad.push(bullet);
      this.game.bulletsInUse.push(bullet);
    }
    // console.log(this.game.bullets.length);
    this.shootSound.play("shooting");

    bulletLoad.forEach(function (bul, idx) {
      bul.pos = [this.pos[0] + Math.sin(this.theta) * SupersonicPaperPlane.Ship.HEIGHT,
                 this.pos[1] - Math.cos(this.theta) * SupersonicPaperPlane.Ship.HEIGHT];
      bul.vel = [(SupersonicPaperPlane.Bullet.VELOCITY) * Math.cos(this.theta - SupersonicPaperPlane.Util.translateRadian(90 + (45 * idx))),
                    (SupersonicPaperPlane.Bullet.VELOCITY) * Math.sin(this.theta - SupersonicPaperPlane.Util.translateRadian(90 + (45 * idx)))];
    }, this);
  };
})(this);
