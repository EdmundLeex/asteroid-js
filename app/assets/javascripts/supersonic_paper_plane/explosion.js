(function() {
  if(typeof SupersonicPaperPlane === 'undefined') {
    window.SupersonicPaperPlane = {};
  }

  var Explosion = SupersonicPaperPlane.Explosion = function(pos) {
    SupersonicPaperPlane.LinkedListNode.call(this);
    // this.frames = options.frames;
    this.frameIndex = 0;
    this.tick = 0;
    this.pos = pos;
    // this.asteroid = options.asteroid;
  };

  Explosion.IMG_WIDTH = 128;
  Explosion.IMG_HEIGHT = 128;
  Explosion.TICKS_PER = 2;

  Explosion.prototype.image = new Image();
  Explosion.prototype.image.src = "images/explosion.png";

  Explosion.prototype.draw = function(ctx, callback) {
    if(this.tick >= Explosion.TICKS_PER) {
      this.tick = 0;
      this.frameIndex += 1;
    }else {
      this.tick += 1;
    }
    ctx.drawImage(
      this.image,
      this.frameIndex * Explosion.IMG_WIDTH, // src x
      0, // src y
      Explosion.IMG_WIDTH, // src width
      Explosion.IMG_HEIGHT, // src height

      this.pos[0] - (Explosion.IMG_WIDTH / 2), // destination x
      this.pos[1] - (Explosion.IMG_HEIGHT / 2), // destination y
      Explosion.IMG_WIDTH, // destination width
      Explosion.IMG_HEIGHT // destination height
    );

    if (this.frameIndex >= 9) {
      this.frameIndex = 0;
      callback(this);
    }
  };
}());