import {ORIGIN_URL} from '../origin';

const AXIOS = require('axios')

let url = window.location.search;

let hash = url.slice(1).split('&');

let array = hash[0].split('=');
let problemID = array[1];
array = hash[1].split('=');
let answers = array[1].split('=');

console.log(answers);

let answer = answers[0].split(',');

interface ResultData {
  id: string,
  youranswer: string[]
}

let result: ResultData = {
  id: problemID,
  youranswer: answer
}

AXIOS.put(ORIGIN_URL + '/oneprog-oneans/checkanswer', result)
  .then(function(response) {
    let ele: HTMLInputElement = <HTMLInputElement>document.getElementById('result');

    response.data.forEach(function(value) {
      let form =
          '<div class="result">'
        + '<h2>問題文</h2>'
        + '<p>' + value.text + '</p>'
        + '<h2>あなたの答え</h2>'
        + '<p>' + value.youranswer + '</p>'
        + '<h2>正答例</h2>'
        + '<p>' + value.correctanswer + '</p>'
        + '<h2>結果</h2>'
        + '<p>' + value.Status + '</p>';
        + '</div>';

      ele.insertAdjacentHTML('beforeend', form);
    })
  });
