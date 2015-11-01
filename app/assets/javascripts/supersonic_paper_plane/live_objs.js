(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Asteroids = root.Asteroids;

  var LivingObj = Asteroids.LivingObj = function (attrs, game) {
    Asteroids.MovingObject.call(this, attrs, game);
    this.color = LivingObj.COLOR;
    this.radius = LivingObj.RADIUS;
  };

  Asteroids.Util.inherits(LivingObj,Asteroids.MovingObject);

  LivingObj.COLOR = "#FFFFFF";
  LivingObj.RADIUS = 5;
})(this);
