(function(root) {
  if (typeof root.Asteroids === 'undefined') {
    root.Asteroids = {};
  }
  var Asteroids = root.Asteroids;
  var GameView = Asteroids.GameView = function (height, width) {
    this.height = height;
    this.width = width;
    this.game = new Asteroids.Game(this.height, this.width);
    this.intervals = {};
  };

  GameView.FPS = 60;

  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ship,
        gameView = this,
        impulse = 5;

    root.addEventListener('keydown', function (e) {
      // debugger;
      switch(e.keyCode){
        case 37:
          // left
          gameView.setTurnTimer('left');
          break;
        case 38:
          // up
          gameView.setPowerTimer();
          break;
        case 39:
          // right
          gameView.setTurnTimer('right');
          break;
        case 40:
          // down
          gameView.setBrakeTimer();
          break;
        case 32:
          // space
          gameView.setBulletTimer();
          break;
        case 27:
          cancelAnimationFrame(root.reqAFId);
          break;
        default:
          break;
      }
    })

    root.addEventListener('keyup', function (e) {
      switch(e.keyCode){
        case 37:
          // left
          clearInterval(gameView.intervals.left);
          delete gameView.intervals.left;
          break;
        case 38:
          // up
          clearInterval(gameView.intervals.up);
          delete gameView.intervals.up;
          break;
        case 39:
          // right
          clearInterval(gameView.intervals.right);
          delete gameView.intervals.right;
          break;
        case 40:
          // down
          clearInterval(gameView.intervals.down);
          delete gameView.intervals.down;
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
        ship = this.game.ship,
        fireRate = this.game.ship.constructor.FIRE_RATE;
    if (!gameView.intervals.space) {
      gameView.intervals.space = root.setInterval(ship.fireBullet.bind(ship), fireRate);
    }
  }

  GameView.prototype.setTurnTimer = function (dir) {
    var gameView = this,
        ship = this.game.ship;
    // debugger
    if (!gameView.intervals[dir]) {
      gameView.intervals[dir] = root.setInterval(ship.rotate.bind(ship, dir), 1000 / GameView.FPS);
    }
  }

  GameView.prototype.setPowerTimer = function () {
    var gameView = this,
        ship = this.game.ship;
    // if (!gameView.intervals.up) {
      gameView.intervals.up = gameView.intervals.up ||
        root.setInterval(ship.power.bind(ship), 1000 / GameView.FPS);
    // }
  }

  GameView.prototype.setBrakeTimer = function () {
    var gameView = this,
        ship = this.game.ship;

    if (!gameView.intervals.down) {
      gameView.intervals.down = root.setInterval(ship.brake.bind(ship), 1000 / GameView.FPS);
    }
  }

  GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");
    var that = this;
    this.game.addAsteroids();
    this.bindKeyHandlers();
    // debugger

    // root.requestAnimationFrame(that.game.animate);

    function animate () {
      that.game.draw(ctx);
      that.game.step();

      root.reqAFId = root.requestAnimationFrame(animate);
      if (that.game.isOver) {
        cancelAnimationFrame(root.reqAFId);
        that.showEnding(canvasEl);
      }
    };
    animate();
    // root.setInterval(function() {
    //   that.game.draw(ctx);
    //   that.game.step();
    // }, 1000 / GameView.FPS);
  };

  GameView.prototype.showEnding = function (canvasEl) {
    var gameoverDiv = document.getElementById('gameover');
    gameoverDiv.classList.remove("hide");
    gameoverDiv.classList.add("show");
  };

})(this);