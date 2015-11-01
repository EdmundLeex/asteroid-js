(function(root){
  if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var Timer = SupersonicPaperPlane.Timer = function () {
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
      var mm = Math.floor(timeP / 1000 / 60);
      var ss = Math.floor(timeP / 1000 % 60);
      var ms = Math.floor((timeP % 1000) / 10);
      if (mm < 10) { mm = '0' + mm; }
      if (ss < 10) { ss = '0' + ss; }
      if (ms < 10) { ms = '0' + ms; }
      return mm + ":" + ss + ":" + ms;
    },

    stop: function () {
      return this.endTime = (new Date()).getTime();
    },

    draw: function(ctx, time) {
      ctx.fillStyle = 'white';

      // ctx.strokeStyle = this.color;
      // ctx.fillStyle = Ship.COLOR;

      // ctx.lineWidth = 1;
      ctx.shadowColor = "black";
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.font = "28px arial";
      ctx.textBaseline = "hanging";

      ctx.textAlign = "start";
      ctx.fillText(this.timeElapsedInMMSS(), 20, 10);
    }
  }
})(this);

