import {ORIGIN_URL} from '../origin';

const AXIOS = require('axios')

AXIOS.get(ORIGIN_URL + '/oneprog-oneans/getsetlist')
  .then(function (response) {
    let elem: HTMLInputElement = <HTMLInputElement>document.getElementById('setlist');

    response.data.forEach(function(value) {
      let form = '<a value="' + value._id + '" href="../challenge/index.html?id=' + value._id + '&num=0">' + value.title + '</a><br>';
      elem.insertAdjacentHTML('beforeend', form);
    })
  })
  .catch(function (error) {
    alert('問題の取得に失敗しました');
  });
