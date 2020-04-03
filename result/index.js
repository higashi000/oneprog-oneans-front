let url = window.location.search;

let hash = url.slice(1).split('&');

let array = hash[0].split('=');
let problemID = array[1];
array = hash[1].split('=');
let answers = array[1].split('=');

console.log(answers);

let answer = answers[0].split(',');

let data = {
  id: problemID,
  youranswer: answer,
};

fetch("http://localhost:8080/oneprog-oneans/checkanswer", {
  method: 'PUT',
  body: JSON.stringify(data),
})
  .then(function(response) {
    return response.json();
  })
  .then(function(resJSON) {
    console.log(resJSON);

    resJSON.forEach(function(value) {
      let form =
          '<h2>問題文</h2>'
        + '<p>' + value.text + '</p>'
        + '<h2>あなたの答え</h2>'
        + '<p>' + value.youranswer + '</p>'
        + '<h2>正答例</h2>'
        + '<p>' + value.correctanswer + '</p>'
        + '<h2>結果</h2>'
        + '<p>' + value.Status + '</p>';
      document.getElementById('result').insertAdjacentHTML('beforeend', form);
    });
  })
