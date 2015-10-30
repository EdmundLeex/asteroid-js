(function(root){
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }

  var Timer = Asteroids.Timer = function () {
    this.startTime = null;
    this.endTime = null;
  }

  Timer.prototype = {
    start: function () {
      this.endTime = null;
      return this.startTime = (new Date()).getTime();
    },

    timeElapsed: function () {
      return (new Date()).getTime() - this.startTime;
    },

    timeElapsedInMMSS: function () {
      var timeP = this.timeElapsed();
      var mm = Math.round(timeP / 1000 / 60);
      var ss = Math.round(timeP / 1000 % 60);
      var ms = Math.round((timeP % 1000) / 10);
      if (mm < 10) { mm = '0' + mm; }
      if (ss < 10) { ss = '0' + ss; }
      if (ms < 10) { ms = '0' + ms; }
      return mm + ":" + ss + ":" + ms;
    },

    stop: function () {
      return this.endTime = (new Date()).getTime();
    },

    draw: function(ctx, time) {
      ctx.fillStyle = 'red';

      // ctx.strokeStyle = this.color;
      // ctx.fillStyle = Ship.COLOR;

      // ctx.lineWidth = 1;
      ctx.font = "28px arial";
      ctx.textBaseline = "hanging";

      ctx.fillText(this.timeElapsedInMMSS(), 10, 10);
    }
  }
})(this);

