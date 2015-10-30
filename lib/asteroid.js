(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Asteroids = root.Asteroids;

  var Asteroid = Asteroids.Asteroid = function (attrs, game) {
    Asteroids.MovingObject.call(this, attrs, game);
    this.color = Asteroid.COLOR;
    this.radius = Asteroid.RADIUS;

    // this.img = new Image();
    // this.img.src = './assets/ast.png';
    // this.frames = [[192, 0], [224, 0], [256, 0]];
    // this.currentFrame = 0;
    // this.frameCount = 0;
  };

  Asteroids.Util.inherits(Asteroid,Asteroids.MovingObject);

  Asteroid.COLOR = "#ff8300";
  Asteroid.RADIUS = 5;

  // Asteroid.prototype.draw = function (ctx) {
  //   ctx.drawImage(
  //     this.img,
  //     this.frames[this.currentFrame][0], this.frames[this.currentFrame][1],
  //     32, 32,
  //     this.pos[0], this.pos[1],
  //     24, 24
  //   );
  // };

  // Asteroid.prototype.move = function () {
  //   this.frameCount += 1;
  //   this.currentFrame = Math.floor(this.frameCount / 10) % 3;
  //   this.pos[0] += this.vel[0];
  //   this.pos[1] += this.vel[1];
  // };
})(this);
