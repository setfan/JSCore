function attachEvents () {
  $('#btnLoad').on('click', loadData);
  $('#btnCreate').on('click', postData);

  const url = 'https://phonebook-nakov.firebaseio.com/phonebook';
  const person = $('#person');
  const phone = $('#phone');

  function loadData () {
    $('#phonebook').empty();

    $.ajax({
      method: 'GET',
      url: url + '.json',
    }).then(handleSuccess).catch(errorHandler);

    function handleSuccess (res) {
      for (let key in res) {
        console.log(res[key]);
        createLi(res[key].person, res[key].phone, key);
      }
    }
  }

  function postData () {
    let personName = person.val();
    let personPhone = phone.val();

    $.ajax({
      method: 'POST',
      url: url + '.json',
      data: JSON.stringify({person: personName, phone: personPhone}),
      success: appendElem,
      error: errorHandler,
    });

    function appendElem (res) {
      createLi(personName, personPhone, res.name);
    }

    person.val('');
    phone.val('');

  }

  function createLi (name, phone, key) {
    let li = $(`<li>${name}: ${phone} </li>`)
      .append($('<button>[Delete]</button>').click(function () {
        $.ajax({
          method: 'DELETE',
          url: url + '/' + key + '.json',
        }).then(() => li.remove()).catch(errorHandler);
      }));

    $('#phonebook').append(li);
  }

  function errorHandler (err) {
    console.log(err);
  }
}

