function attachEvents () {
  const url = 'https://messenger-887ef.firebaseio.com/messenger';
  const author = $('#author');
  const content = $('#content');

  $('#refresh').on('click', loadData);
  $('#submit').on('click', postData);


  function loadData () {
    let sorted = [];

    $.ajax({
      method: 'GET',
      url: url + '.json',
      success: successHandler,
      error: errorHandler,
    });

    function successHandler (res) {
      for (let id in res) {
        sorted.push(res[id]);
      }

      sorted = sorted.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });

      for (let obj of sorted) {
        $('#messages').append(`${obj.author}: ${obj.content}\n`);
      }
    }
  }
  
  function postData () {
    let authorName = author.val();
    let contentMgs = content.val();

    let msg = {
      author: authorName,
      content: contentMgs,
      timestamp: Date.now()
    }

    $.ajax({
      method: 'POST',
      url: url + '.json',
      data: JSON.stringify(msg),
      success: displayMsg,
      error: errorHandler,
    })

    function displayMsg () {
      $('#messages').append(`${authorName}: ${contentMgs}\n`);
    }

    author.val('');
    content.val('');

  }

  function errorHandler (err) {
    console.log(err);
  }

}