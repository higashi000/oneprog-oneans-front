let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let flg = false;
let X, Y;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let brushSize = 7;
let brushColor = "#000";

canvas.addEventListener('mousedown', startPoint, false);
canvas.addEventListener('mousemove', movePoint, false);
canvas.addEventListener('mouseup', endPoint, false);

function startPoint(e) {
  e.preventDefault();
  ctx.beginPath();

  X = e.layerX;
  Y = e.layerY;

  ctx.moveTo(X, Y);
}

function movePoint(e) {
  if (e.buttons === 1 || e.witch === 1 || e.type === 'touchmove') {
    X = e.layerX;
    Y = e.layerY;

    flg = false;

    ctx.lineTo(X, Y);
    ctx.lineCap = "round";
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
    ctx.stroke();
  }
}

function endPoint(e) {
  if (!flg) {
    ctx.lineTo(X - 1, Y - 1);
    ctx.lineCap = "round";
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
    ctx.stroke();
  }

  flg = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  document.getElementById('result').innerText = '';
}

function ocr() {
  let img = document.getElementById('canvas').toDataURL("image/jpeg");

  Tesseract.recognize(img).then(function (result) {
    console.log(result.data.text);
    document.getElementById('result').innerText = result.data.text;
  });
}
