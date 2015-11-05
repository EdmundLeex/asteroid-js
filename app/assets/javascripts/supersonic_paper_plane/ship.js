(function(root) {
  if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var SupersonicPaperPlane = root.SupersonicPaperPlane;
  var Bullet = SupersonicPaperPlane.Bullet;
  var Util = SupersonicPaperPlane.Util;

  var Ship = SupersonicPaperPlane.Ship = function (attrs, game) {
    SupersonicPaperPlane.MovingObject.call(this, attrs, game);
    this.shootSound = new Howl({urls: ["audios/shoot.wav"], sprite: {shooting: [0, 122]}});
    this.reset();
  };

  Util.inherits(Ship, SupersonicPaperPlane.MovingObject);

  Ship.COLOR = "#ffffff";
  Ship.RADIUS = 15;
  // Ship.TOP_SPEED = 10;
  Ship.ACCELERATOR = 0.5;
  Ship.ROTATE_ANGLE = Util.translateRadian(5); // 5 degree
  Ship.HEIGHT = Ship.RADIUS + 15;
  Ship.WIDTH = Ship.HEIGHT / 2.5;
  Ship.FIRE_RATE = 150; // interval
  Ship.RECOIL = Math.pow(1, 2) / 100;

  Ship.prototype.reset = function () {
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.theta = 0;
    this.invincible = false;
    this.resetWeapon();
    this.fireBullet = this.fireDefaultWeapon;
    this.relocate();
  };

  Ship.prototype.relocate = function () {
    this.pos = [this.game.width/2, this.game.height/2];
    this.vel = [0,0];
    this.theta = 0;
  };

  Ship.prototype.speed = function () {
    return Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
  };

  Ship.prototype.power = function () {
    // if (this.speed() <= Ship.TOP_SPEED) {
    this.vel[0] += Math.sin(this.theta) * (Math.pow(Ship.ACCELERATOR, 2) / 2);
    this.vel[1] += -Math.cos(this.theta) * (Math.pow(Ship.ACCELERATOR, 2) / 2);
    // }
  };

  Ship.prototype.rotate = function (dir) {
    if (dir === 'left') {
      this.theta -= Ship.ROTATE_ANGLE;
    } else {
      this.theta += Ship.ROTATE_ANGLE;
    }
  };

  Ship.prototype.leftRotate = function () {
    this.theta -= Ship.ROTATE_ANGLE;
  };

  Ship.prototype.rightRotate = function () {
    this.theta += Ship.ROTATE_ANGLE;
  };

  // maybe decrease braking power, now stopping is too easy.
  Ship.prototype.brake = function () {
    var vX = this.vel[0],
        vY = this.vel[1];

    if (this.speed() > 0) {
      (this.vel[0] -= (this.vel[0] / this.speed()) * Math.pow(Ship.ACCELERATOR, 2));
      (this.vel[1] -= (this.vel[1] / this.speed()) * Math.pow(Ship.ACCELERATOR, 2));
    }

    if (Math.sign(Math.sin(this.theta) * vX !== Math.sign(Math.sin(this.theta) * this.vel[0]) &&
        Math.sign(Math.cos(this.theta) * vY) !== Math.sign(Math.cos(this.theta) * this.vel[1]))) {
      this.vel[0] = 0;
      this.vel[1] = 0;
    }
  };

  Ship.prototype.move = function () {
    if (((this.pos[0] + this.vel[0] - Ship.RADIUS <= 0) &&
          (this.pos[1] + this.vel[1] - Ship.RADIUS <= 0)) ||
            ((this.pos[0] + this.vel[0] - Ship.RADIUS <= 0) &&
              (this.pos[1] + this.vel[1] + Ship.RADIUS >= this.game.height)) ||
                ((this.pos[0] + this.vel[0] + Ship.RADIUS >= this.game.width) &&
                  (this.pos[1] + this.vel[1] - Ship.RADIUS <= 0)) ||
                    ((this.pos[0] + this.vel[0] + Ship.RADIUS >= this.game.width) &&
                      (this.pos[1] + this.vel[1] + Ship.RADIUS >= this.game.height))) {
      this.vel[0] = 0;
      this.vel[1] = 0;
    } else if ((this.pos[0] + this.vel[0] - Ship.RADIUS <= 0) ||
        (this.pos[0] + this.vel[0] + Ship.RADIUS >= this.game.width)) {
      this.vel[0] = 0;
      this.pos[1] += this.vel[1];
    } else if ((this.pos[1] + this.vel[1] - Ship.RADIUS <= 0) ||
        (this.pos[1] + this.vel[1] + Ship.RADIUS >= this.game.height)) {
      this.vel[1] = 0;
      this.pos[0] += this.vel[0];
    } else {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    }
  };

  Ship.prototype.fireDefaultWeapon = function () {
    var bullet = this.game.bullets.pop();
    this.game.bulletsInUse.push(bullet);
    this.shootSound.play("shooting");
    // console.log(this.game.bullets.length);

    // bullet vel calculate not right.
    bullet.pos = [this.pos[0] + Math.sin(this.theta) * Ship.HEIGHT, this.pos[1] - Math.cos(this.theta) * Ship.HEIGHT];
    bullet.vel = [(Bullet.VELOCITY) * Math.cos(this.theta - Util.translateRadian(90)),
                  (Bullet.VELOCITY) * Math.sin(this.theta - Util.translateRadian(90))];
    // bullet.vel = [(Bullet.VELOCITY + this.speed()) * Math.cos(this.theta - Util.translateRadian(90)),
    //               (Bullet.VELOCITY + this.speed()) * Math.sin(this.theta - Util.translateRadian(90))];

    // refactor and combine power function
    this.vel[0] -=  Math.sin(this.theta) * Ship.RECOIL;
    this.vel[1] -= -Math.cos(this.theta) * Ship.RECOIL;
  };

  Ship.prototype.fireBullet = Ship.prototype.fireDefaultWeapon;

  Ship.prototype.toggleInvincibility = function (bool) {
    this.invincible = bool;
  };

  Ship.prototype.mountWeapon = function (weapon) {
    this.resetWeapon();
    this.weaponTimeLimitTM = setTimeout(this.resetWeapon.bind(this), 20000);
    this.weaponCountdownTM = setTimeout(this.weaponReminder.bind(this, weapon), 15000);
    this.fireBullet = weapon.fire;
    this.color = weapon.color2;
    if (weapon.constructor === SupersonicPaperPlane.Invincibility) {
      this.toggleInvincibility(true);
    }
  };

  Ship.prototype.resetWeapon = function () {
    this.fireBullet = this.fireDefaultWeapon;
    this.color = Ship.COLOR;
    this.toggleInvincibility(false);
    clearTimeout(this.weaponCountdownTM);
    clearTimeout(this.weaponTimeLimitTM);
    this.weaponCountdownTM = null;
    this.weaponTimeLimitTM = null;
  };

  Ship.prototype.weaponReminder = function (weapon) {
    if (this.color !== Ship.COLOR) {
      this.color = Ship.COLOR;
    } else {
      this.color = weapon.color2;
    }

    this.weaponCountdownTM = setTimeout(this.weaponReminder.bind(this, weapon), 300);
  };

  Ship.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    var x = this.pos[0];
    var y = this.pos[1];

    var width = Ship.WIDTH;
    var height = Ship.HEIGHT;

    // ctx.beginPath();
    // ctx.strokeStyle = 'red';
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   Ship.RADIUS,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.lineWidth = 3;
    // ctx.stroke();
    // ctx.fill();
    // ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    // ctx.fillStyle = Ship.COLOR;
    ctx.moveTo(x, y);
    ctx.moveTo(x + Math.sin(this.theta) * (height / 3), y + Math.cos(this.theta) * (height / 3));
    ctx.lineTo(x + Math.sin(this.theta) * height, y - Math.cos(this.theta) * height);
    ctx.lineTo(x + Math.cos(this.theta) * width, y + Math.sin(this.theta) * width);
    ctx.lineTo(x + Math.sin(this.theta) * (height / 3), y + Math.cos(this.theta) * (height / 3));
    ctx.lineTo(x - Math.cos(this.theta) * width, y - Math.sin(this.theta) * width);
    ctx.lineTo(x + Math.sin(this.theta) * height, y - Math.cos(this.theta) * height);


    // ctx.lineTo(x + Math.sin(this.theta) * height, y - Math.cos(this.theta) * height);
    // ctx.lineTo(x + Math.cos(this.theta) * width, y + Math.sin(this.theta) * width);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();

    // ctx.beginPath();
    // ctx.strokeStyle = '#000000';
    // ctx.arc(
    //   this.pos[0] - Math.sin(this.theta) * (height / 20),
    //   this.pos[1] + Math.cos(this.theta) * (height / 20),
    //   5,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.lineWidth = 3;
    // ctx.stroke();
    // ctx.fill();
    // ctx.closePath();

  };

})(this);
