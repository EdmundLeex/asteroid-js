(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Asteroids = root.Asteroids;

  var GameBackground = Asteroids.GameBackground = function (height, width) {
  	this.height = height;
  	this.width = width;
  };

  GameBackground.prototype.draw = function (ctx, timer, points) {
  	ctx.clearRect(0,0,this.width, this.height);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.rect(0,0,this.width, this.height);
  	timer.draw(ctx);

  	ctx.fillStyle = 'white';

    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.font = "28px arial";
    ctx.textBaseline = "hanging";

    ctx.textAlign = "center";
    ctx.fillText(points, this.width / 2, 10);
  };

})(this);