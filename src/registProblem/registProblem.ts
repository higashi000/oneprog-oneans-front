import {ORIGIN_URL} from '../origin';

const AXIOS = require('axios')
let problemNum: number = 0;

interface ProblemData {
  title: string;
  problems: Problem[];
}

interface Problem {
  problemtext: string;
  correctanswer: string;
}

function Regist() : void {
  let titleEle: HTMLInputElement = <HTMLInputElement>document.getElementById('title');
  let problems: Problem[] = new Array(0);

  for (let i = 0; i < problemNum; ++i) {
    let problemtextEle: HTMLInputElement = <HTMLInputElement>document.getElementById('problemtext' + String(i));
    let correctansewrEle: HTMLInputElement = <HTMLInputElement>document.getElementById('problemans' + String(i));

    const problem: Problem = {
      problemtext: problemtextEle.value,
      correctanswer: correctansewrEle.value,
    }

    problems.push(problem);
  }

  let registProblem: ProblemData = {
    title: titleEle.value,
    problems: problems,
  }

  AXIOS.post(ORIGIN_URL + '/oneprog-oneans/registproblem', registProblem);
}

function AddForm(): void {
  let problemForm = '<div id="problem"' + String(problemNum) + '">'
  + '<h4>問題' + String(problemNum + 1) + '</h4>'
  + '<p>問題文</p><input type="text" id="problemtext' + String(problemNum) + '" />'
  + '<p>正答例</p><input type="text" id="problemans' + String(problemNum) + '" />'
  + '</div>';

  let ELEM: HTMLInputElement = <HTMLInputElement>document.getElementById('problems');

  ELEM.insertAdjacentHTML('beforeend', problemForm);
  problemNum += 1;
  console.log(problemNum);
}

let addformElement: HTMLInputElement = <HTMLInputElement>document.getElementById('addform');
addformElement.onclick = function() {
  AddForm();
};

let registElement: HTMLInputElement = <HTMLInputElement>document.getElementById('regist');
registElement.onclick = function() {
  Regist();
};
