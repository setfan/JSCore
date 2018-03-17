function calendar([day, month, year]){
  let date = new Date(year,month,0)

  let caption = $('<caption>').text(`${date.toLocaleString("en-us", { month:'long'})} ${date.getFullYear()}`)

  let tableBody = $('<tbody>')
  .append($('<tr>')
  .append($('<th>').text('Mon'))
  .append($('<th>').text('Tue'))
  .append($('<th>').text('Wed'))
  .append($('<th>').text('Thu'))
  .append($('<th>').text('Fri'))
  .append($('<th>').text('Sat'))
  .append($('<th>').text('Sun')));

  let table = $('<table>').append(caption).append(tableBody);

  let firstDay = new Date(year, month -1, 1).getDay() - 1;
  firstDay = firstDay < 0 ? 6 : firstDay;
  let firstWeek = $('<tr>');
  let dayOfMonth = 1;
  for (let d = 0; d < 7; d++) {
    if (d < firstDay) {
      firstWeek.append($('<td>'));
    } else {
      if (dayOfMonth === day) {
        firstWeek.append($('<td>').addClass('today').text(dayOfMonth++));
      }else {
        firstWeek.append($('<td>').text(dayOfMonth++));
      }
    }
  }

  tableBody.append(firstWeek);

  let lastDay = new Date(year, month, 0).getDate();
  let numOfRemainingRows = (lastDay - (dayOfMonth - 1)) / 7;
  for (let i = 0; i < numOfRemainingRows; i++) {
    let currentWeek = $('<tr>');
    for (let d = 0; d < 7; d++) {
      if (dayOfMonth > lastDay) {
        currentWeek.append($('<td>'));
      } else {
        dayOfMonth === day ? currentWeek.append($('<td>').addClass('today').text(dayOfMonth++)) :
          currentWeek.append($('<td>').text(dayOfMonth++));
      }
    }
    tableBody.append(currentWeek);
  }

  $('#content').append(table)
}