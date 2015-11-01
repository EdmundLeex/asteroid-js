(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Asteroids = root.Asteroids;

  var Invincibility = Asteroids.Invincibility = function (game) {
    Asteroids.Weaponary.call(this, game);
    this.color2 = "#ff0017";
  };

  Asteroids.Util.inherits(Invincibility, Asteroids.Weaponary);

  Invincibility.prototype.fire = function () {
    // no gun
  };
})(this);
