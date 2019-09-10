var fgImage = null;
var bgImage = null;
var fgCanvas = document.getElementById("fgdcan");
var bgCanvas = document.getElementById("bgcan");

function loadForegroundImage() {
  var file = document.getElementById("fgfile");
  fgImage = new SimpleImage(file);
  fgImage.drawTo(fgCanvas);
}

function loadBackgroundImage() {
  var file = document.getElementById("bgfile");
  bgImage = new SimpleImage(file);
  bgImage.drawTo(bgCanvas);
}

function highPixel(pixel, hPixel) {
  var red, green, blue;
  red = pixel.getRed();
  green = pixel.getGreen();
  blue = pixel.getBlue();
  red = Math.floor(red / 16);
  green = Math.floor(green / 16);
  blue = Math.floor(blue / 16);
  hPixel.setRed(red * 16);
  hPixel.setGreen(green * 16);
  hPixel.setBlue(blue * 16);
}

function lowPixel(pixel, lPixel) {
  var red, green, blue;
  red = pixel.getRed() % 16;
  green = pixel.getGreen() % 16;
  blue = pixel.getBlue() % 16;
  lPixel.setRed(red * 16);
  lPixel.setGreen(green * 16);
  lPixel.setBlue(blue * 16);
}

function stenoPixel(fgPixel, bgPixel, sPixel) {
  var red, green, blue;
  red = Math.floor(bgPixel.getRed() / 16);
  green = Math.floor(bgPixel.getGreen() / 16);
  blue = Math.floor(bgPixel.getBlue() / 16);
  red = red + Math.floor(fgPixel.getRed() / 16) * 16;
  green = green + Math.floor(fgPixel.getGreen() / 16) * 16;
  blue = blue + Math.floor(fgPixel.getBlue() / 16) * 16;
  sPixel.setRed(red);
  sPixel.setGreen(green);
  sPixel.setBlue(blue);
}

function steno() {
  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  for (var fgPixel of fgImage.values()) {
    var x = fgPixel.getX();
    var y = fgPixel.getY();
    var bgPixel = bgImage.getPixel(x, y);
    var outPixel = output.getPixel(x, y);
    stenoPixel(fgPixel, bgPixel, outPixel);
  }
  fgImage.drawTo(fgCanvas);
  output.drawTo(bgCanvas);
  fgImage = output;
}

function reverseSteno() {
  var fgoutput = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  var bgoutput = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());

  for (var fgPixel of fgImage.values()) {
    var x = fgPixel.getX();
    var y = fgPixel.getY();
    var fgOutPixel = fgoutput.getPixel(x, y);
    var bgOutPixel = bgoutput.getPixel(x, y);
    highPixel(fgPixel, fgOutPixel);
    lowPixel(fgPixel, bgOutPixel);
  }
  fgoutput.drawTo(fgCanvas);
  bgoutput.drawTo(bgCanvas);
}

function doSteganography() {
  if (fgImage == null || !fgImage.complete()) {
    alert("Load image in file1");
  }
  if (bgImage == null || !bgImage.complete()) {
    alert("Load image in file2");
  }
  clearCanvas();
  steno();
}

function doReverseSteganography() {
  if (fgImage == null || !fgImage.complete()) {
    alert("Load image in file1");
  }
  clearCanvas();
  reverseSteno();
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}