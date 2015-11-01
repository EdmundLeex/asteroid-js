(function(root) {
  if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var SupersonicPaperPlane = root.SupersonicPaperPlane;

  var LivingObj = SupersonicPaperPlane.LivingObj = function (attrs, game) {
    SupersonicPaperPlane.MovingObject.call(this, attrs, game);
    this.color = LivingObj.COLOR;
    this.radius = LivingObj.RADIUS;
  };

  SupersonicPaperPlane.Util.inherits(LivingObj,SupersonicPaperPlane.MovingObject);

  LivingObj.COLOR = "#FFFFFF";
  LivingObj.RADIUS = 5;
})(this);
