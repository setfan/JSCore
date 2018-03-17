function search() {
  let searchText = $('#searchText').val();
  let matches = 0;
  $('#towns li').each((index, elem) => {
    if (elem.textContent.includes(searchText)) {
      $(elem).css('font-weight', 'bold');
      matches++;
    } else {
      $(elem).css('font-weight', '');
    }
  });

  $('#result').text(matches + ' matches found.')
}