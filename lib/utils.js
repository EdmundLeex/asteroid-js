(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

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
})();
