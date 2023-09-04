const Bullet = class {
  constructor(opts) {
    this.length = opts.bulletSize;
    this.speed = opts.bulletSpeed;
    this.x = plane.x + plane.width / 2;
    this.y = plane.y;
  }
  draw() {
    context.beginPath();
    context.strokeStyle = "white";
    context.lineWidth = 1;
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y - this.length);
    if (CONFIG.skill) {
      context.strokeStyle = "red";
      context.lineWidth = 3;
    }
    context.stroke();
  }
  move() {
    this.y -= this.speed;
  }
};
// const Bullets = function (opt) {
//   this.length = opts.bulletSize;
//   this.speed = opts.bulletSpeed;
//   this.x = plane.x + plane.width / 2;
//   this.y = plane.y;
// };
// Bullet.prototype.draw = function () {
//   context.beginPath();
//     context.strokeStyle = "white";
//     context.lineWidth = 1;
//     context.moveTo(this.x, this.y);
//     context.lineTo(this.x, this.y - this.length);
//     if (CONFIG.skill) {
//       context.strokeStyle = "red";
//       context.lineWidth = 3;
//     }
//     context.stroke();
// };

// Bullet.prototype.move = function () {
// this.y -= this.speed;
// };
