function extractText () {
  let items = $('#items').
    find('li').
    toArray().
    map(elem => elem.textContent).
    join(', ');

  $('#result').text(items);
}
