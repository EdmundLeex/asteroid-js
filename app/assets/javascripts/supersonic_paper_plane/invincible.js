(function(root) {
  if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var SupersonicPaperPlane = root.SupersonicPaperPlane;

  var Invincibility = SupersonicPaperPlane.Invincibility = function (game) {
    SupersonicPaperPlane.Weaponary.call(this, game);
    this.color2 = "#ff0017";
  };

  SupersonicPaperPlane.Util.inherits(Invincibility, SupersonicPaperPlane.Weaponary);

  Invincibility.prototype.fire = function () {
    // no gun
  };
})(this);
