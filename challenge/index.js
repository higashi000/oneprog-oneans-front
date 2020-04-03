let url = window.location.search;

let hash = url.slice(1).split('&');

let array = hash[0].split('=');
let problemID = array[1];
array = hash[1].split('=');
let nowNum = array[1];
console.log(hash)
console.log(array)

let answer = '';

if (hash.length === 3 ) {
  array = hash[2].split('=');
  if (array[1] != undefined) {
    answer = array[1];
  }
}




fetch("http://localhost:8080/oneprog-oneans/challenge/" + problemID + "/" + nowNum)
  .then(function(response) {
    return response.json();
  })
  .then(function(resJSON) {
    console.log(resJSON);

    if (resJSON.Status === "finish") {
      window.location.href = '../result/index.html?id=' + problemID + '&answer=' + answer;
    }

    document.getElementById('text').innerText = resJSON.problemtext;
  });

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
    document.getElementById('result').innerText = result.data.text;
  });
}

function next() {
  let img = document.getElementById('canvas').toDataURL("image/jpeg");
  let ans = '';

  Tesseract.recognize(img).then(function (result) {
    ans = result.data.text;
    document.getElementById('result').innerText = result.data.text;

    if (answer === '') {
      answer = ans;
    } else {
      answer = answer + ',' + ans;
    }
    window.location.href = './index.html/?id=' + problemID + '&num=' +String(Number(nowNum) + 1) + '&answer=' + answer;
  });
}
