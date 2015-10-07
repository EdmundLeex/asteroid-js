(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  var Asteroids = window.Asteroids;
  var GameView = Asteroids.GameView = function (height, width) {
    this.height = height;
    this.width = width;
    this.game = new Asteroids.Game(this.height, this.width);
    this.intervals = {};
  };

  GameView.FPS = 30;

  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ship,
        gameView = this,
        impulse = 5;

    window.addEventListener('keydown', function (e) {
      // debugger;
      switch(e.keyCode){
        case 37:
          // left
          gameView.setTurnTimer('left');
          console.log(gameView.intervals);
          break;
        case 38:
          // up
          gameView.setPowerTimer();
          console.log(gameView.intervals);
          break;
        case 39:
          // right
          gameView.setTurnTimer('right');
          console.log(gameView.intervals);
          break;
        case 40:
          // down
          gameView.setBrakeTimer();
          console.log(gameView.intervals);
          break;
        case 32:
          // space
          gameView.setBulletTimer();
          break;
        default:
          break;
      }
    })

    window.addEventListener('keyup', function (e) {
      switch(e.keyCode){
        case 37:
          // left
          clearInterval(gameView.intervals.left);
          delete gameView.intervals.left;
          console.log(gameView.intervals);
          break;
        case 38:
          // up
          clearInterval(gameView.intervals.up);
          delete gameView.intervals.up;
          console.log(gameView.intervals);
          break;
        case 39:
          // right
          clearInterval(gameView.intervals.right);
          delete gameView.intervals.right;
          console.log(gameView.intervals);
          break;
        case 40:
          // down
          clearInterval(gameView.intervals.down);
          delete gameView.intervals.down;
          console.log(gameView.intervals);
          break;
        case 32:
          // space
          clearInterval(gameView.intervals.space);
          delete gameView.intervals.space;
          break;
        default:
          break;
      }
    })
  };

  GameView.prototype.setBulletTimer = function () {
    var gameView = this,
        ship = this.game.ship;
    if (!gameView.intervals.space) {
      gameView.intervals.space = window.setInterval(ship.fireBullet.bind(ship), 500);
    }
  }

  GameView.prototype.setTurnTimer = function (dir) {
    var gameView = this,
        ship = this.game.ship;
    // debugger
    if (!gameView.intervals[dir]) {
      gameView.intervals[dir] = window.setInterval(ship.rotate.bind(ship, dir), 1000 / GameView.FPS);
    }
  }

  GameView.prototype.setPowerTimer = function () {
    var gameView = this,
        ship = this.game.ship;
    // if (!gameView.intervals.up) {
      gameView.intervals.up = gameView.intervals.up || 
        window.setInterval(ship.power.bind(ship), 1000 / GameView.FPS);
    // }
  }

  GameView.prototype.setBrakeTimer = function () {
    var gameView = this,
        ship = this.game.ship;

    if (!gameView.intervals.down) {
      gameView.intervals.down = window.setInterval(ship.brake.bind(ship), 1000 / GameView.FPS);
    }
  }

  GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");
    var that = this;
    this.game.addAsteroids();
    this.bindKeyHandlers();
    window.setInterval(function() {
      that.game.draw(ctx);
      that.game.step();
    }, 1000 / GameView.FPS);
  };

})();