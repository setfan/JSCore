function domSearch(selector, isCaseInsencitive) {
  let addControls = $('<div>')
  .addClass('add-controls')
  .append($('<label>').text('Enter text:').append($('<input>')))
  .append($('<a>').addClass('button').css('display', 'inline-block')
  .text('Add').click(function () {
    let elementText = $('input');
    let newElement = $('<li>')
    .addClass('list-item')
    .append($('<a>').addClass('button').text('X').click(function () {
      $(this).parent().remove();
    }))
    .append($('<strong>').text(elementText.val().trim()));

    $('ul.items-list').append(newElement);
    elementText.val('');
  }));

  let searchControls = $('<div>')
  .addClass('search-controls')
  .append($('<label>').text('Search:').append($('<input>')
  .on('input', function () {
    let searched = $(this).val();
    let items = $('.list-item strong').each((index, item) => {
      let current = $(item);
      if (isCaseInsencitive) {
        current.text().indexOf(searched) < 0 ? current.parent().
          css('display', 'none') : current.parent().css('display', '')
      } else {
        current.text().toLowerCase().indexOf(searched.toLowerCase()) < 0
          ? current.parent().css('display', 'none')
          : current.parent().css('display', '');
      }
    })
    })));

  let resultControls = $('<div>').addClass('result-controls')
  .append($('<ul>').addClass('items-list'));

  $(selector)
  .append(addControls)
  .append(searchControls)
  .append(resultControls);
}