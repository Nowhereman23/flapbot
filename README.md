# FlapBot - [FlapMMO](http://flapmmo.com/) Bot

Automatically jumps bird, to use copy+paste code below into javascript console:

```javascript
var drawBars = true;
var jumpOffset = 26;
var poleWidth = 300;
var poleHeight = 512;
var polePixelWidth = poleWidth * 4;
var birdWidth = 115;
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
    var data = ctx.getImageData(0, 0, birdWidth, birdHeight).data;
    row = birdFound ? bird - 5 : 10;
    birdFound = false;

    for (; row < birdHeight; row++) {
      for (col = 85; col < birdWidth; col++) {
        i = (row * birdWidth * 4) + (col * 4);
        if (data[i] === 211 && data[i + 1] === 47 &&
            data[i + 2] === 0 && data[i + 3] === 255) {
          bird = Math.floor((i / 4) / birdWidth);
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
      }, 300);
      document.body.onkeydown();
    }
  }, 5);

  poleInterval = setInterval(function() {
    var i;
    var row;
    var col;
    var data = ctx.getImageData(0, 0, poleWidth, poleHeight).data;

    for (row = 10; row < poleHeight; row++) {
      for (col = 115; col < poleWidth; col++) {
        i = (row * poleWidth * 4) + (col * 4);
        if (data[i] === 84 && data[i + 1] === 56 &&
          data[i + 2] === 71 && data[i + 3] === 255 &&
          data[i + polePixelWidth] === 192 &&
          data[i + polePixelWidth + 1] === 221 &&
          data[i + polePixelWidth + 2] === 113 &&
          data[i + polePixelWidth + 3] === 255) {
          pole = Math.floor((i / 4) / poleWidth);
          break;
        }
      }
    }
    if (drawBars) {
      poleBar.style.top = (50 + pole) + 'px';
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
```
