function attachEvents () {
  let baseUrl = 'https://baas.kinvey.com/appdata/kid_rkrjv_c9z/players';
  let authHeader = {'Authorization': 'Basic ' + btoa('Admin:admin')};
  listPlayers();

  $('#addPlayer').click(addPlayer);

  function addPlayer () {
    let name = $('#addName').val();
    console.log(name);
    let money = 500;
    let bullets = 6;
    $.ajax({
      method: 'POST',
      url: baseUrl,
      headers: authHeader,
      data: {name, money: +money, bullets: +bullets},
    }).then(renderPlayer).catch(errorHandler);
  }

  function renderPlayer (data) {
    let elem = $(`<div class="player" data-id="${data._id}">
            <div class="row">
                <label>Name:</label>
                <label class="name">${data.name}</label>
            </div>
            <div class="row">
                <label>Money:</label>
                <label class="money">${data.money}</label>
            </div>
            <div class="row">
                <label>Bullets:</label>
                <label class="bullets">${data.bullets}</label>
            </div>
            <button class="play" onclick="${playPlayer()}">Play</button>
            <button class="delete" onclick="${deletePlayer()}">Delete</button>
        </div>`);

    $('#players').append(elem);
  }

  function listPlayers () {
    $.ajax({
      url: baseUrl,
      headers: authHeader,
    }).then(function (res) {
      for (let elem of res) {
        renderPlayer(elem)
      }
    }).catch(errorHandler)
  }

  function errorHandler (err) {
    console.log(err);
  }

  function playPlayer(){
    console.log('Play')
  }

  function deletePlayer () {
    let elem = $(this).parent()
    elem.remove();

  }
}