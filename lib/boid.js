(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Asteroids = root.Asteroids;

  var Boid = Asteroids.Boid = function (game) {
    this.pos = Asteroids.Util.ensureDistanceFromShip(game);
    this.game = game;
    this.radius = Boid.RADIUS;
    this.heading = Math.random() * 2 * Math.PI - Math.PI;
  };

  // Boid.prototype.radius = 6;
  Boid.prototype.speed = 1;
  Boid.prototype.radialSpeed = Math.PI / 60;
  Boid.prototype.vision = 50;

  Boid.COLOR = "#d00007";
  Boid.RADIUS = 6;

  Boid.prototype.draw = function(ctx) {
    var pointLen = this.radius * 2.5;
    ctx.fillStyle = Boid.COLOR;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.pos[0] + Math.cos(this.heading + Math.PI / 2) * this.radius,
               this.pos[1] + Math.sin(this.heading + Math.PI / 2) * this.radius);
    ctx.lineTo(this.pos[0] - Math.cos(this.heading + Math.PI) * pointLen,
               this.pos[1] - Math.sin(this.heading + Math.PI) * pointLen);
    ctx.lineTo(this.pos[0] + Math.cos(this.heading - Math.PI / 2) * this.radius,
               this.pos[1] + Math.sin(this.heading - Math.PI / 2) * this.radius);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.closePath();
  };

  Boid.prototype.distance = function(boid, width, height) {
    var x0 = Math.min(this.pos[0], boid.pos[0]), x1 = Math.max(this.pos[0], boid.pos[0]);
    var y0 = Math.min(this.pos[1], boid.pos[1]), y1 = Math.max(this.pos[1], boid.pos[1]);
    var dx = Math.min(x1 - x0, x0 + width - x1);
    var dy = Math.min(y1 - y0, y0 + height - y1);
    return Math.sqrt(dx * dx + dy * dy);
  };

  Boid.prototype.getNeighbors = function(game) {
    var w = game.width, h = game.height;
    var neighbors = [];
    for (var i = 0; i < game.boidsInUse.length; i++) {
      var boid = game.boidsInUse[i];
      if (this !== boid && this.distance(boid, w, h) < this.vision) {
        neighbors.push(boid);
      }
    }
    return neighbors;
  };

  Boid.wrap = function(value) {
    var min, max;
    if (arguments.length === 2) {
      min = 0;
      max = arguments[1];
    } else if (arguments.length === 3) {
      min = arguments[1];
      max = arguments[2];
    } else {
      throw new Error('wrong number of arguments');
    }
    while (value >= max) value -= (max - min);
    while (value < min) value += (max - min);
    return value;
  };

  Boid.clamp = function(value, limit) {
    return Math.min(limit, Math.max(-limit, value));
  };

  Boid.meanAngle = function() {
    var sumx = 0, sumy = 0, len = arguments.length;
    for (var i = 0; i < len; i++) {
      sumx += Math.cos(arguments[i]);
      sumy += Math.sin(arguments[i]);
    }
    return Math.atan2(sumy / len, sumx / len);
  };

  Boid.prototype.move = function() {
    var w = this.game.width, h = this.game.height;
    var neighbors = this.getNeighbors(this.game);
    if (neighbors.length > 0) {
      var meanhx = 0, meanhy = 0;
      var meanx = 0, meany = 0;
      var mindist = this.radius * 2, min = null;
      for (var i = 0; i < neighbors.length; i++) {
        var boid = neighbors[i];
        meanhx += Math.cos(boid.heading);
        meanhy += Math.sin(boid.heading);
        meanx += boid.pos[0];
        meany += boid.pos[1];
        var dist = this.distance(boid, w, h);
        if (dist < mindist) {
          mindist = dist;
          min = boid;
        }
      }
      meanhx /= neighbors.length;
      meanhy /= neighbors.length;
      meanx /= neighbors.length;
      meany /= neighbors.length;

      var target;
      if (min) {
        // Keep away!
        target = Math.atan2(this.pos[1] - min.pos[1], this.pos[0] - min.pos[0]);
      } else {
        // Match heading and move towards center
        var meanh = Math.atan2(meanhy, meanhx);
        var center = Math.atan2(meany - this.pos[1], meanx - this.pos[0]);
        target = Boid.meanAngle(meanh, meanh, meanh, center);
      }

      // Move in this direction
      var delta = Boid.wrap(target - this.heading, -Math.PI, Math.PI);
      delta = Boid.clamp(delta, this.radialSpeed);
      this.heading = Boid.wrap(this.heading + delta, -Math.PI, Math.PI);
    }

    this.step(this.game);
  };

  Boid.prototype.step = function() {
      // var padding = game.padding;
      var width = this.game.width, height = this.game.height;
      this.pos[0] = Boid.wrap(this.pos[0] + Math.cos(this.heading) * this.speed,
                         -1, width + 1 * 2);
      this.pos[1] = Boid.wrap(this.pos[1] + Math.sin(this.heading) * this.speed,
                         -1, height + 1 * 2);
  };

})(this);
