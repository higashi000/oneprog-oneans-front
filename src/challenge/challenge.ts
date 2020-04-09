import Tesseract from 'tesseract.js'
import { ORIGIN_URL } from '../origin';
const AXIOS = require('axios')

let url = window.location.search;

let hash = url.slice(1).split('&');

let array = hash[0].split('=');
let problemID = array[1];

array = hash[1].split('=');
let nowNum = array[1];

let answer = '';

if (hash.length === 3 ) {
  array = hash[2].split('=');
  if (array[1] != undefined) {
    answer = array[1];
  }
}

AXIOS.get(ORIGIN_URL + '/oneprog-oneans/challenge/' + problemID + '/' + nowNum)
  .then(function (response) {
    if (response.data.Status === 'finish') {
      window.location.href = '../result.html?id=' + problemID + '&answer=' + answer;
    }

    let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('text')
    ele.innerText = response.data.problemtext;
  })
  .catch(function (error) {
    alert('問題の取得に失敗しました');
  });


let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let flg: Boolean = false;
let X: number;
let Y: number;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let eraserORpen: Boolean = true;

let brushSize = 7;
let brushColor = "#000";

let eraserSize = 12;
let eraserColor = "#FFF";

canvas.addEventListener('mousedown', startPoint, false);
canvas.addEventListener('mousemove', movePoint, false);
canvas.addEventListener('mouseup', endPoint, false);

function startPoint(e) {
  e.preventDefault();

  ctx.beginPath();

  X = e.layerX;
  Y = e.layerY;
}

function movePoint(e) {
  if (e.buttons) {
    X = e.layerX;
    Y = e.layerY;

    flg = false;

    ctx.lineTo(X, Y);
    ctx.lineCap = "round";

    if (eraserORpen) {
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = brushColor;
    } else {
      ctx.lineWidth = eraserSize;
      ctx.strokeStyle = eraserColor;
    }
    ctx.stroke();
  }
}

function endPoint(e) {
  if (!flg) {
    ctx.lineTo(X - 1, Y - 1);
    ctx.lineCap = "round";

    if (eraserORpen) {
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = brushColor;
    } else {
      ctx.lineWidth = eraserSize;
      ctx.strokeStyle = eraserColor;
    }

    ctx.stroke();
  }

  flg = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  document.getElementById('result').innerText = '';
}

function ocr() {
  let img = canvas.toDataURL("image/jpeg");

  Tesseract.recognize(img, 'eng').then(function (result) {
    document.getElementById('result').innerText = result.data.text;
  });
}

function next() {
  let img = canvas.toDataURL("image/jpeg");
  let ans = '';

  Tesseract.recognize(img, 'eng').then(function (result) {
    ans = result.data.text;
    document.getElementById('result').innerText = result.data.text;

    if (answer === '') {
      answer = ans;
    } else {
      answer = answer + ',' + ans;
    }
    window.location.href = './challenge.html?id=' + problemID + '&num=' +String(Number(nowNum) + 1) + '&answer=' + answer;
  });
}

let clearEle: HTMLInputElement = <HTMLInputElement>document.getElementById('clear');
clearEle.onclick = function() {
  clearCanvas();
}

let ocrEle: HTMLInputElement = <HTMLInputElement>document.getElementById('ocr');
ocrEle.onclick = function() {
  ocr();
}

let nextEle: HTMLInputElement = <HTMLInputElement>document.getElementById('next');
nextEle.onclick = function() {
  next();
}

let switchEle: HTMLInputElement = <HTMLInputElement>document.getElementById('switch');
switchEle.onclick = function() {
  eraserORpen = !eraserORpen;
  if (eraserORpen) {
    switchEle.value = '消しゴム'
  } else {
    switchEle.value = 'ペン'
  }
}
