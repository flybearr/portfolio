let Monster = class {
  constructor(opts) {
    this.width = opts.enemySize;
    this.height = opts.enemySize;
    this.speed = opts.enemySpeed;
    this.direction = opts.enemyDirection;
    this.gap = opts.enemyGap;
    this.column = opts.numPerLine;
    this.row = opts.level;
    this.canvasPadding = opts.canvasPadding;

    this.x = [];
    this.y = [];
    this.invincibleTime = 3000;
    this.invincibleStartTime = 0;

    for (let i = 0; i < this.row; i++) {
      this.y[i] = i * this.height + this.canvasPadding;
      for (let j = 0; j < this.column; j++) {
        this.x[j] = j * this.width + this.gap;
      }
    }

    this.life = [];

    for (let i = 0; i < this.row; i++) {
      this.life[i] = [];
      for (let j = 0; j < this.column; j++) {
        this.life[i][j] = 1;
      }
    }
  }
  draw() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        if (this.life[i][j] >= 1) {
          context.drawImage(
            monsterImg,
            this.x[j],
            this.y[i],
            this.width,
            this.height
          );
        } else if (this.life[i][j] !== 0) {
          context.drawImage(
            boomImg,
            this.x[j],
            this.y[i],
            this.width,
            this.height
          );
          this.life[i][j]++;
        }
      }
    }
  }

  move() {
    let first;
    let last;
    if (CONFIG.level === 1) this.y[0] += 1;
    if (CONFIG.level > 1) {
      selectFirst: for (let i = 0; i < this.column; i++) {
        for (let j = 0; j < this.row; j++) {
          if (this.life[j][i]) {
            first = i;
            break selectFirst;
          }
        }
      }

      selectLate: for (let i = this.column - 1; i >= 0; i--) {
        for (let j = this.row - 1; j >= 0; j--) {
          if (this.life[j][i]) {
            last = i;
            break selectLate;
          }
        }
      }

      if (this.direction === "right") {
        for (let i = 0; i < this.column; i++) {
          this.x[i] += this.speed;
        }
        if (this.x[last] > canvas.width - this.canvasPadding - this.width) {
          this.direction = "left";
          for (let j = 0; j < this.column; j++) {
            this.y[j] += this.height;
          }
        }
      } else if (this.direction === "left") {
        for (let i = 0; i < this.column; i++) {
          this.x[i] -= this.speed;
        }
        if (this.x[first] < this.canvasPadding) {
          this.direction = "right";
        }
      }
    }
  }
  activateInvincible() {
    this.isInvincible = true;
    this.invincibleStartTime = Date.now();
  }
  update() {
    if (
      this.isInvincible &&
      Date.now() - this.invincibleStartTime >= this.invincibleTime
    ) {
      this.isInvincible = false;
    }
  }
};

// Monster.prototype.draw = function () {
//   for (let i = 0; i < this.row; i++) {
//     for (let j = 0; j < this.column; j++) {
//       if (this.life[i][j] >= 1) {
//         context.drawImage(
//           monsterImg,
//           this.x[j],
//           this.y[i],
//           this.width,
//           this.height
//         );
//       } else if (this.life[i][j] !== 0) {
//         context.drawImage(
//           boomImg,
//           this.x[j],
//           this.y[i],
//           this.width,
//           this.height
//         );
//         this.life[i][j]++;
//       }
//     }
//   }
// };

// Monster.prototype.move = function () {
//   let first;
//   let last;
//   if (CONFIG.level === 1) this.y[0] += 1;
//   if (CONFIG.level > 1) {
//     selectFirst: for (let i = 0; i < this.column; i++) {
//       for (let j = 0; j < this.row; j++) {
//         if (this.life[j][i]) {
//           first = i;
//           break selectFirst;
//         }
//       }
//     }

//     selectLate: for (let i = this.column - 1; i >= 0; i--) {
//       for (let j = this.row - 1; j >= 0; j--) {
//         if (this.life[j][i]) {
//           last = i;
//           break selectLate;
//         }
//       }
//     }

//     if (this.direction === "right") {
//       for (let i = 0; i < this.column; i++) {
//         this.x[i] += this.speed;
//       }
//       if (this.x[last] > canvas.width - this.canvasPadding - this.width) {
//         this.direction = "left";
//         for (let j = 0; j < this.column; j++) {
//           this.y[j] += this.height;
//         }
//       }
//     } else if (this.direction === "left") {
//       for (let i = 0; i < this.column; i++) {
//         this.x[i] -= this.speed;
//       }
//       if (this.x[first] < this.canvasPadding) {
//         this.direction = "right";
//       }
//     }
//   }

//   // if (CONFIG.level > 2) {
//   //   const columnId = Math.floor(Math.random() * this.column);
//   //   const rowId = Math.floor(Math.random() * this.row);
//   //   console.log(columnId, rowId);
//   //   this.def[columnId][rowId] = true;
//   // }
// };

// Monster.prototype.activateInvincible = function () {
//   this.isInvincible = true;
//   this.invincibleStartTime = Date.now();
// };

// Monster.prototype.update = function (timestamp) {
//   if (
//     this.isInvincible &&
//     Date.now() - this.invincibleStartTime >= this.invincibleTime
//   ) {
//     this.isInvincible = false;
//   }
// };
