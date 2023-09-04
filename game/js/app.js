let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let planeImg = new Image();
let monsterImg = new Image();
let boomImg = new Image();
planeImg.src = CONFIG.planeIcon;
monsterImg.src = CONFIG.enemyIcon;
boomImg.src = CONFIG.enemyBoomIcon;
let monster;
let plane;
let key_record = [];
let animate;

const container = document.getElementById("game");
const playBtn = document.querySelector(".js-play");
const replayBtn = document.querySelectorAll(".js-replay");
const nextBtn = document.querySelector(".js-next");
const score = document.querySelector(".score");
const nextLevel = document.querySelector(".game-next-level");

// // requestAnimFrame
// window.requestAnimFrame =
//   window.requestAnimationFrame ||
//   window.webkitRequestAnimationFrame ||
//   window.mozRequestAnimationFrame ||
//   window.oRequestAnimationFrame ||
//   window.msRequestAnimationFrame;

let GAME = {
  status: CONFIG.status,
  score: 0,

  init: function (opts) {
    monster = new Monster(opts);
    plane = new Plane(opts);
    key_record = [];
  },

  bindEvent: function () {
    let self = this;

    playBtn.addEventListener("click", function () {
      self.play();
    });

    replayBtn.forEach(function (value) {
      value.addEventListener("click", function () {
        self.score = 0;
        CONFIG.level = 1;
        self.init(CONFIG);
        self.play();
      });
    });

    nextBtn.addEventListener("click", function () {
      CONFIG.level++;
      self.init(CONFIG);
      self.play();
    });

    document.addEventListener("keyup", function (e) {
      if (self.status === "playing") {
        key_record[e.keyCode] = false;
        if (e.keyCode === 32) {
          console.log(CONFIG.skill);
          // 空格發射飛彈
          plane.fire();
        }
      }
    });
    document.addEventListener("keydown", function (e) {
      if (self.status === "playing") {
        key_record[e.keyCode] = true;
      }
    });
    document.addEventListener("keydown", function (e) {
      if (self.status === "playing" && CONFIG.level > 2) {
        if (e.keyCode === 81) {
          CONFIG.skill = true;
          setTimeout(() => {
            CONFIG.skill = false;
          }, 3000);
        }
      }
    });
  },

  setStatus: function (status) {
    this.status = status;
    container.setAttribute("data-status", status);
  },
  play: function () {
    this.setStatus("playing");
    this.init(CONFIG);
    monster.draw();
    plane.draw();
    this.refresh();
  },
  failed: function () {
    this.clean();
    this.setStatus("failed");
  },
  success: function () {
    this.clean();
    this.setStatus("success");
  },
  allSuccess: function () {
    this.clean();
    this.setStatus("all-success");
  },
  stop: function () {
    this.setStatus("stop");
  },

  refresh: function () {
    let self = this;

    animate = requestAnimationFrame(() => {
      self.refresh();
    });
    // animate = requestAnimationFrame(GAME.refresh());
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < plane.bullets.length; i++) {
      plane.bullets[i].move();
      plane.bullets[i].draw();
    }
    this.bulletOut();
    this.crash();
    monster.move();
    monster.draw();

    plane.move();
    plane.draw();
    this.control();
    this.showScore();
  },
  // 分數

  showScore: function () {
    context.font = "18px arial";
    context.fillStyle = "white";
    context.fillText("分数：" + this.score, 20, 20);
  },
  //撞擊
  crash: function () {
    for (let i = 0; i < monster.row; i++) {
      for (let j = 0; j < monster.column; j++) {
        if (monster.life[i][j] >= 1) {
          for (let k = 0; k < plane.bullets.length; k++) {
            if (
              !(monster.x[j] + monster.width < plane.bullets[k].x) &&
              !(plane.bullets[k].x < monster.x[j]) &&
              !(monster.y[i] + monster.height < plane.bullets[k].y) &&
              !(plane.bullets[k].y < monster.y[i])
            ) {
              monster.life[i][j] = -1;
              if (CONFIG.length < 3 || !CONFIG.skill) {
                plane.bullets.shift();
              }

              this.score += 100;
            }
          }
        }
      }
    }
  },
  //子彈出去，移除
  bulletOut: function () {
    for (let i = 0; i < plane.bullets.length; i++) {
      if (plane.bullets[i].y < 0) {
        plane.bullets.shift();
      }
    }
  },

  clean: function () {
    cancelAnimationFrame(animate);
    plane = null;
    monster = null;
    key_record = null;
    context.clearRect(0, 0, canvas.width, canvas.height);
  },

  monitor: function () {
    let killed = 0; //
    let padding =
      canvas.height - CONFIG.canvasPadding - plane.height - monster.height;
    for (let i = 0; i < monster.row; i++) {
      for (let j = 0; j < monster.column; j++) {
        if (monster.life[i][j] === 0) {
          killed++;
        }
        if (monster.life[i][j] >= 1 && monster.y[i] > padding) {
          return -1;
        }
      }
    }
    if (killed === monster.row * monster.column) {
      return 1;
    }
  },
  //目前狀態
  control: function () {
    let result = this.monitor();
    if (result === 1) {
      if (CONFIG.level < CONFIG.totalLevel) {
        this.success();
        nextLevel.innerHTML = "下一關Level：" + (CONFIG.level + 1);
        if (CONFIG.level >= 2) {
          nextLevel.innerHTML =
            "下一關Level：" + (CONFIG.level + 1) + "，並且按Q有技能";
        }
      } else if (CONFIG.level === CONFIG.totalLevel) {
        this.allSuccess();
      }
    } else if (result === -1) {
      score.innerHTML = this.score;
      this.failed();
    }
  },
};

// 初始化
window.onload = function () {
  GAME.bindEvent();
};
