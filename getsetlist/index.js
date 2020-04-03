let setlists = [];

fetch("http://localhost:8080/oneprog-oneans/getsetlist")
  .then(function(response) {
    return response.json();
  })
  .then(function(resJSON) {
    console.log(resJSON);
    resJSON.forEach(function(value) {
      let form = '<a value="' + value._id + '" href="../challenge/index.html?id=' + value._id + '&num=0">' + value.title + '</a><br>';
      document.getElementById('setlist').insertAdjacentHTML('beforeend', form);
    });
  });
