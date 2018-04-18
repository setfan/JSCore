function attachEvents () {
  const url = 'https://baas.kinvey.com/appdata/kid_HJZjFOUqf/';
  let user = ''; // username
  let pass = ''; // password
  let base64 = btoa(user + ':' + pass);
  let authorization = {"Authorization": 'Basic ' + base64};
  let list = $('#posts');

  $('#btnLoadPosts').on('click', loadPosts);
  $('#btnViewPost').on('click', viewPosts);

  function loadPosts () {
    $.ajax({
      url: url + 'posts',
      headers: authorization,
    }).then(fillOptions).catch(handleError);

    function fillOptions (res) {
      list.empty();
      for (let post of res) {
        list.append($('<option>').val(post._id).text(post.title));
      }
    }
  }

  function viewPosts () {
    let postId = list.find('option:selected').val();

    $.ajax({
      url: url + 'posts/' + postId,
      headers: authorization,
    }).then(fillComments).catch(handleError);

    function fillComments (res) {
      $('#post-title').text(res.title)
      $('#post-body').text(res.body)

      $.ajax({
        url: url + `/comments/?query={"post_id":"${postId}"}`,
        headers: authorization
      }).then(function (res) {
        $('#post-comments').empty();
        for (let elem of res) {
          $('#post-comments').append($(`<li>${elem.text}</li>`))
        }
      }).catch(handleError)
    }
  }

  function handleError (err) {
    //console.log(err);
    let errorDiv = $("<div>").text("Error: " +
      err.status + ' (' + err.statusText + ')');
    $(document.body).prepend(errorDiv);
    setTimeout(function() {
      $(errorDiv).fadeOut(function() {
        $(errorDiv).remove();
      });
    }, 3000);
  }

}