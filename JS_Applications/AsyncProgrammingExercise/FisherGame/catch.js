function attachEvents () {
  let baseUrl = 'https://baas.kinvey.com/appdata/kid_r1QTtDYcG/biggestCatches';
  let authHeader = {'Authorization': 'Basic ' + btoa('Admin:admin'), 'Content-type': 'application/json'};
  $('.load').on('click', loadAllCatches);
  $('.add').on('click', addCatch);

  function request (method, target, data) {
    return $.ajax({
      method: method,
      url: baseUrl + target,
      headers: authHeader,
      data: JSON.stringify(data),
    });
  }

  function loadAllCatches () {
    let catches = $('#catches');
    catches.empty();
    request('GET', '').then(function (res) {
      for (let elem of res) {
        catches.append(renderCatch(elem))
      }
    }).catch(handleError)

  }

  function renderCatch (data) {
    let divElem = $(`<div class="catch" data-id="${data._id}">`);

    divElem.append(`<label>Angler</label>
            <input type="text" class="angler" value="${data.angler}"/>
            <label>Weight</label>
            <input type="number" class="weight" value="${data.weight}"/>
            <label>Species</label>
            <input type="text" class="species" value="${data.species}"/>
            <label>Location</label>
            <input type="text" class="location" value="${data.location}"/>
            <label>Bait</label>
            <input type="text" class="bait" value="${data.bait}"/>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${data.captureTime}"/>`);

    let updateBtn = $(`<button class="update">Update</button>`).click(updateCatch);
    let delBtn = $(`<button class="delete">Delete</button>`).click(deleteCatch);
    divElem.append(updateBtn).append(delBtn);

    return divElem;
  }

  function addCatch () {
    let addForm = $('#addForm');

    let data = createDataElem(addForm);
    request('POST', '', data).then(loadAllCatches).catch(handleError)
  }

  function updateCatch () {
    let elem = $(this).parent();
    let elemId = elem.attr('data-id');

    let data = createDataElem(elem)

    request('PUT', `/${elemId}`, data).then(loadAllCatches).catch(handleError)
  }

  function deleteCatch () {
    let elem = $(this).parent();
    let elemId = elem.attr('data-id');
    request('DELETE', `/${elemId}`).then(function () {
      elem.remove();
    }).catch(handleError)
  }

  function createDataElem (elem) {
    let angler = elem.find('.angler').val();
    let weight = elem.find('.weight').val();
    let species = elem.find('.species').val();
    let location = elem.find('.location').val();
    let bait = elem.find('.bait').val();
    let captureTime = elem.find('.captureTime').val();

    return {angler, weight: +weight, species, location, bait, captureTime: +captureTime};
  }

  function handleError (err) {
    console.log('Error: ' + err.statusMessage);
  }

}