let problemNum = 0

function Regist() {
  let data = {
    title: document.getElementById('title').value,
    problems: []
  };

  for (let i = 0; i < problemNum; ++i) {
    data['problems'].push({
      problemtext: document.getElementById('problemtext' + String(i)).value,
      correctanswer: document.getElementById('problemans' + String(i)).value,
    });
  }

  fetch("http://localhost:8080/oneprog-oneans/registproblem", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    },
    mode: 'no-cors'
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(resJSON) {
      console.log(resJSON);
    })
    .catch(error => console.error("Error:", error));
}

function AddForm() {
  let problemForm = '<div id="problem' + String(problemNum) + '">'
  + '<h4>問題' + String(problemNum + 1) + '</h4>'
  + '<p>問題文</p><input type="text" id="problemtext' + String(problemNum) + '" />'
  + '<p>正答例</p><input type="text" id="problemans' + String(problemNum) + '" />'
  + '</div>';

  document.getElementById('problems').insertAdjacentHTML('beforeend', problemForm);
  problemNum += 1;
}
