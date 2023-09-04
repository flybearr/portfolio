let Plane = function (opts) {
  this.opts = opts;
  this.speed = opts.planeSpeed;
  this.width = opts.planeSize.width;
  this.height = opts.planeSize.height;
  this.padding = opts.canvasPadding;
  this.x = (canvas.width - this.width) / 2;
  this.y = canvas.height - this.height - this.padding;
  this.bullets = [];
};

Plane.prototype.draw = function () {
  //邊界
  if (this.x < 30) {
    this.x = 30;
  } else if (this.x + this.width > canvas.width - this.padding) {
    this.x = canvas.width - this.width - this.padding;
  }
  if (this.y < 30) {
    this.y = 30;
  } else if (this.y + this.height > canvas.height - this.padding) {
    this.y = canvas.height - this.height - this.padding;
  }
  context.drawImage(planeImg, this.x, this.y, this.width, this.height);
};

Plane.prototype.move = function () {
  //向左
  if (key_record[37]) {
    this.x -= this.speed;
  }
  //向右
  if (key_record[39]) {
    this.x += this.speed;
  }
};

Plane.prototype.fire = function () {
  let bullet = new Bullet(this.opts);
  this.bullets.push(bullet);
};
