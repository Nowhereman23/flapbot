# FlapBot - [FlapMMO](http://flapmmo.com/) Bot

![flapbot](http://zachhuff386.github.io/flapbot/video.gif)

Automatically jumps bird, to use copy+paste code below into javascript console:

```javascript
var drawBars = true;
var poleX = 115;
var poleWidth = 180;
var poleHeight = 512;
var birdX;
var birdWidth;
var birdHeight = 512;
var modeWidth = 300;
var modeHeight = 512;
var birdBar;
var poleBar;
var birdInterval;
var poleInterval;
var jumpOffset;
var birdRedS;
var birdRedE;
var birdGrnS;
var birdGrnE;
var birdBluS;
var birdBluE;
var poleTopRed;
var poleTopGrn;
var poleTopBlu;
var poleBotRed;
var poleBotGrn;
var poleBotBlu;
var ctx = document.getElementById('canvas').getContext('2d');
var center = document.getElementsByTagName('center')[0];

var msg = document.createElement('div');
msg.innerText = 'Press "s" to start, "x" to stop';
msg.setAttribute('style', 'padding: 5px; top: 10px; ' +
  'left: 10px; background-color: red; position: absolute;');
document.body.appendChild(msg);

if (drawBars) {
  birdBar = document.createElement('span');
  birdBar.setAttribute('style', 'width: 50px; height: 2px; top: 449px; ' +
    'margin-left: -366px; background-color: red; position: absolute;');
  center.appendChild(birdBar);

  poleBar = document.createElement('span');
  poleBar.setAttribute('style', 'width: 50px; height: 2px; top: 449px; ' +
    'margin-left: -311px; background-color: blue; position: absolute;');
  center.appendChild(poleBar);
}

var getMode = function() {
  var i;
  var row;
  var col;
  var mode = 'yellow';
  var data = ctx.getImageData(0, 0, modeWidth, modeHeight).data;

  for (row = 0; row < modeHeight; row++) {
    for (col = 0; col < modeWidth; col++) {
      i = (row * modeWidth * 4) + (col * 4);
      if (data[i] === 122 && data[i + 1] === 198 &&
          data[i + 2] === 53 && data[i + 3] === 255) {
        mode = 'green';
        break;
      }
    }
  }

  return mode;
};

if (getMode() === 'green') {
  birdX = 94;
  birdWidth = 12;
  jumpOffset = 26;
  birdRedS = 166;
  birdRedE = 204;
  birdGrnS = 38;
  birdGrnE = 49;
  birdBluS = 4;
  birdBluE = 23;
  poleTopRed = 3;
  poleTopGrn = 3;
  poleTopBlu = 3;
  poleBotRed = 0;
  poleBotGrn = 117;
  poleBotBlu = 0;
}
else {
  birdX = 96;
  birdWidth = 8;
  jumpOffset = 26;
  birdRedS = 219;
  birdRedE = 247;
  birdGrnS = 61;
  birdGrnE = 85;
  birdBluS = 0;
  birdBluE = 0;
  poleTopRed = 0;
  poleTopGrn = 0;
  poleTopBlu = 0;
  poleBotRed = 173;
  poleBotGrn = 81;
  poleBotBlu = 0;
}

var stopBot = function() {
  clearInterval(birdInterval);
  clearInterval(poleInterval);
};

var startBot = function() {
  stopBot();
  var pole;
  var jump;
  var bird;
  var birdFound;

  birdInterval = setInterval(function() {
    var i;
    var row;
    var col;
    var data = ctx.getImageData(birdX, 0, birdWidth, birdHeight).data;
    row = birdFound ? bird - 6 : 0;
    if (jump) {
      row -= 9;
    }
    birdFound = false;

    for (; row < birdHeight; row++) {
      for (col = 0; col < birdWidth; col++) {
        i = (row * birdWidth * 4) + (col * 4);
        if ((data[i] >= birdRedS && data[i] <= birdRedE) &&
            (data[i + 1] >= birdGrnS && data[i + 1] <= birdGrnE) &&
            (data[i + 2] >= birdBluS && data[i + 2] <= birdBluE) &&
            data[i + 3] === 255) {
          bird = row;
          birdFound = true;
          break;
        }
      }
    }

    if (drawBars) {
      birdBar.style.top = (50 + bird) + 'px';
    }
    if (!jump && bird + jumpOffset > (pole || 256)) {
      jump = true;
      setTimeout(function() {
        jump = false;
      }, 250);
      document.body.onkeydown();
    }
  }, 4);

  poleInterval = setInterval(function() {
    var i;
    var j;
    var row;
    var col;
    var data = ctx.getImageData(poleX, 0, poleWidth, poleHeight).data;

    for (row = 100; row < poleHeight; row++) {
      for (col = 0; col < poleWidth; col++) {
        i = (row * poleWidth * 4) + (col * 4);
        j = ((row + 1) * poleWidth * 4) + (col * 4);
        if (data[i] === poleTopRed && data[i + 1] === poleTopGrn &&
            data[i + 2] === poleTopBlu && data[i + 3] === 255 &&
            data[j] === poleBotRed && data[j + 1] === poleBotGrn &&
            data[j + 2] === poleBotBlu && data[j + 3] === 255) {
          pole = row;
          break;
        }
      }
    }
    if (drawBars) {
      poleBar.style.top = (50 + pole) + 'px';
    }
  }, 500);
};

document.body.onkeyup = function(evt) {
  if (evt.which === 83) {
    startBot();
  }
  else if (evt.which === 88) {
    stopBot();
  }
};
```
