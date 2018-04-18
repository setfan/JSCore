let kinveyAuthHeader = {
  'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
  'Content-type': 'application/json',
};

function listAllAdverts () {
  request('GET', `appdata/${appKey}/adverts?sort={"viewCount": -1}`, kinveyAuthHeader)
    .then(renderAd)
    .catch(handleAjaxError);
}

function creteAdvert () {
  let title = $('#formCreateAd input[name=title]').val();
  let description = $('#formCreateAd textarea[name=description]').val();
  let publisher = sessionStorage.getItem('username');
  let dateOfPublishing = $('#formCreateAd input[name=datePublished]').val();
  let price = $('#formCreateAd input[name=price]').val();
  let imageURL = $('#formCreateAd input[name=imageURL]').val();
  let viewCount = 0;

  let userId = sessionStorage.getItem('userID');
  let entity = {
    title,
    description,
    publisher,
    dateOfPublishing,
    price,
    imageURL,
    viewCount: +viewCount,
  };

  request('POST', `appdata/${appKey}/adverts`, kinveyAuthHeader, entity)
    .then(function (res) {
      showInfo('Advert created.');
      listAllAdverts();
    })
    .catch(handleAjaxError);

}

function renderAd (res) {
  let adSection = $('#ads');
  adSection.empty();

  if (res.length === 0) {
    adSection.append($('<p id="noAds">').text('No adverts to show'));
    showView('viewAds');
    return;
  }

  adSection.append($('<table>')
    .append($('<tr>')
      .append('<th>Title</th>')
      .append('<th>Publisher</th>')
      .append('<th>Description</th>')
      .append('<th>Price</th>')
      .append('<th>Date Published</th>'),
    ),
  );

  let table = $('#ads > table');

  for (let ad of res) {
    let elem = $($('<tr>')
      .append($('<td>').text(ad.title))
      .append($('<td>').text(ad.publisher))
      .append($('<td>').text(ad.description))
      .append($('<td>').text(ad.price))
      .append($('<td>').text(ad.dateOfPublishing)));
    let td = $('<td>');
    td.append(
      $('<a href="#">[Details]</a>').on('click', () => showDetails(ad)));

    if (ad._acl.creator === sessionStorage.getItem('userId')) {
      td.append(
        $('<a href="#">[Delete]</a>').on('click', () => deleteAd(ad._id)))
        .append(
          $('<a href="#">[Edit]</a>').on('click', () => loadAdForEdit(ad)));
    }

    elem.append(td);
    table.append(elem);
  }

  showView('viewAds');
}

async function showDetails (ad) {
  $('#viewDetails').empty();

  let detailedElem = $('<div class="details">').append(
    $(`<img src="${ad.imageURL}" alt="Product image">`),
    $('<br>'),
    $('<label>').text('Title:'),
    $('<h1>').text(ad.title),
    $('<label>').text('Description:'),
    $('<p>').text(ad.description),
    $('<label>').text('Publisher:'),
    $('<p>').text(ad.publisher),
    $('<label>').text('Published on:'),
    $('<p>').text(ad.dateOfPublishing),
    $('<label>').text(`Views: ${ad.viewCount}`), $('<br />'),
    $('<br />'),
    $('<label>').text('Price:'),
    $('<h1>').text(ad.price + ' lv.'),
  );
  let backBtn = $('<button id="backDetails">');
  backBtn.text('Back to list');
  backBtn.on('click', () => showView('viewAds'));

  backBtn.appendTo(detailedElem);
  $('#viewDetails').append(detailedElem);

  showView('viewDetails');
  await incrementViews(ad);
}

async function incrementViews (ad) {
  ad.viewCount = ad.viewCount + 1;
  request('GET', `appdata/${appKey}/adverts/${ad._id}`,  kinveyAuthHeader).then().catch(handleAjaxError)
}



function loadAdForEdit (ad) {
  $('#formEditAd input[name=id]').val(ad._id);
  $('#formEditAd input[name=publisher]').val(ad.publisher);
  $('#formEditAd input[name=title]').val(ad.title);
  $('#formEditAd textarea[name=description]').val(ad.description);
  $('#formEditAd input[name=datePublished]').val(ad.dateOfPublishing);
  $('#formEditAd input[name=price]').val(ad.price);
  $('#formEditAd input[name=imageURL]').val(ad.imageURL);

  showView('viewEditAd');
}

function deleteAd (id) {
  request('DELETE',
`appdata/${appKey}/adverts/${id}`
, kinveyAuthHeader,
  ).then(function () {
    showInfo('Advert removed.');
    listAllAdverts();
  }).catch(handleAjaxError);
}

function editAd () {
  let title = $('#formEditAd input[name=title]').val();
  let description = $('#formEditAd textarea[name=description]').val();
  let publisher = $('#formEditAd input[name=publisher]').val();
  let dateOfPublishing = $('#formEditAd input[name=datePublished]').val();
  let price = $('#formEditAd input[name=price]').val();
  let imageURL = $('#formCreateAd input[name=imageURL]').val();

  let id = $('#formEditAd input[name=id]').val();
  let entity = {
    title,
    description,
    publisher,
    dateOfPublishing,
    price,
    imageURL,
  };

  request('PUT',

`appdata/${appKey}/adverts/${id}`

    , kinveyAuthHeader, entity)
    .then(function (res) {
      showInfo('Advert created.');
      listAllAdverts();
    })
    .catch(handleAjaxError);

}
