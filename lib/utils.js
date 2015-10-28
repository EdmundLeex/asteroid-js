(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Asteroids = root.Asteroids;

  Asteroids.Util = function () {};

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Asteroids.Util.randomVec = function (length) {
    var xVel = Math.random() * (length * 2) - length;
    var yVel = Math.random() * (length * 2) - length;
    return [xVel, yVel];
  };

  Asteroids.Util.translateRadian = function (degree) {
    return ((degree * Math.PI) / 180);
  };

  Asteroids.Util.calcDist = function (pos1, pos2) {
    var x1 = pos1[0];
    var y1 = pos1[1];
    var x2 = pos2[0];
    var y2 = pos2[1];

    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };
})(this);
