(function(root) {
  if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var SupersonicPaperPlane = root.SupersonicPaperPlane;

  SupersonicPaperPlane.Util = function () {};

  SupersonicPaperPlane.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  SupersonicPaperPlane.Util.randomVec = function (length) {
    var xVel = Math.random() * (length * 2) - length;
    var yVel = Math.random() * (length * 2) - length;
    return [xVel, yVel];
  };

  SupersonicPaperPlane.Util.translateRadian = function (degree) {
    return ((degree * Math.PI) / 180);
  };

  SupersonicPaperPlane.Util.calcDist = function (pos1, pos2) {
    var x1 = pos1[0];
    var y1 = pos1[1];
    var x2 = pos2[0];
    var y2 = pos2[1];

    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };

  SupersonicPaperPlane.Util.randomPos = function (game, maxSize) {
    var randX = Math.floor(Math.random() * (game.width - maxSize));
    var randY = Math.floor(Math.random() * (game.height - maxSize));

    return [randX, randY];
  };

  SupersonicPaperPlane.Util.ensureDistanceFromShip = function (game) {
    var pos = SupersonicPaperPlane.Util.randomPos(game, 0);
    while (SupersonicPaperPlane.Util.calcDist(pos, game.ship.pos) < 50) {
      pos = SupersonicPaperPlane.Util.randomPos(game, 0);
    }
    return pos;
  }
})(this);
