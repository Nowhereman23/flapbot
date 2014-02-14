var drawBars = true;
var jumpOffset = 28;
var poleX = 115;
var poleWidth = 180;
var poleHeight = 512;
var polePixelWidth = poleWidth * 4;
var birdX = 90;
var birdWidth = 12;
var birdHeight = 512;
var birdBar;
var poleBar;
var birdInterval;
var poleInterval;
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
    row = birdFound ? Math.floor(bird) - 6 : 0;
    if (jump) {
      row -= 9;
    }
    birdFound = false;

    for (; row < birdHeight; row++) {
      for (col = 0; col < birdWidth; col++) {
        i = (row * birdWidth * 4) + (col * 4);
        if (data[i] === 252 && data[i + 1] === 56 &&
            data[i + 2] === 0 && data[i + 3] === 255) {
          bird = row;
          birdFound = true;
          break;
        }
      }
    }

    if (drawBars) {
      birdBar.style.top = (50 + Math.floor(bird)) + 'px';
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
    var row;
    var col;
    var data = ctx.getImageData(poleX, 0, poleWidth, poleHeight).data;

    for (row = 100; row < poleHeight; row++) {
      for (col = 0; col < poleWidth; col++) {
        i = (row * poleWidth * 4) + (col * 4);
        if (data[i] === 84 && data[i + 1] === 56 &&
          data[i + 2] === 71 && data[i + 3] === 255 &&
          data[i + polePixelWidth] === 192 &&
          data[i + polePixelWidth + 1] === 221 &&
          data[i + polePixelWidth + 2] === 113 &&
          data[i + polePixelWidth + 3] === 255) {
          pole = row;
          break;
        }
      }
    }
    if (drawBars) {
      poleBar.style.top = (50 +  Math.floor(pole)) + 'px';
    }
  }, 500);
};

var stopBot = function() {
  clearInterval(birdInterval);
  clearInterval(poleInterval);
};

document.body.onkeyup = function(evt) {
  if (evt.which === 83) {
    startBot();
  }
  else if (evt.which === 88) {
    stopBot();
  }
};
