(function(root) {
  if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var SupersonicPaperPlane = root.SupersonicPaperPlane;

  var Invincibility = SupersonicPaperPlane.Invincibility = function (game) {
    SupersonicPaperPlane.Weaponary.call(this, game);
    this.color2 = "#273bbf";
  };

  SupersonicPaperPlane.Util.inherits(Invincibility, SupersonicPaperPlane.Weaponary);

  Invincibility.prototype.image = new Image();
  Invincibility.prototype.image.src = "images/invincible.png";

})(this);
