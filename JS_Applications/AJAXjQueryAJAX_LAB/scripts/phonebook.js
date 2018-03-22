const url = 'https://phonebookapp-a09c7.firebaseio.com/phonebook';
const person = $('#person');
const phone = $('#phone');

function loadData () {
  $('#phonebook').empty();

  $.ajax({url: url + '.json'})
    .then(handleSuccess).catch(errorHandler);

  function handleSuccess (res) {
    for (let key in res) {
      createLi(res[key].name, res[key].phone, key);
    }
  }
}

function postData () {
  let personName = person.val();
  let personPhone = phone.val();

  $.ajax({
    method: 'POST',
    url: url + '.json',
    data: JSON.stringify({name: personName, phone: personPhone}),
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
    .append($('<a href="#">[Delete]</a>').click(function () {
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