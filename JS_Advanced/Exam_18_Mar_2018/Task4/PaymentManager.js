class PaymentManager {
  constructor (title) {
    this.title = title;
  }

  render (id) {

    let table = $('<table>');
    table.append($('<caption>').text(`${this.title} Payment Manager`));

    let head = $('<thead>\n' +
      '        <tr>\n' +
      '            <th class="name">Name</th>\n' +
      '            <th class="category">Category</th>\n' +
      '            <th class="price">Price</th>\n' +
      '            <th>Actions</th></tr>\n' +
      '   </thead>');
    let payments = $('<tbody class="payments">');

    let footer = $('<tfoot class="input-data">')
      .append($('<td><input name="name" type="text"></td>'))
      .append($('<td><input name="category" type="text"></td>'))
      .append($('<td><input name="price" type="number"></td>'));

    let addBtn = $('<td>').append($('<button>Add</button>').click(function () {
      let name = $(table.find('input')[0]);
      let category = $(table.find('input')[1]);
      let price = $(table.find('input')[2]);

      let row = $(`<tr>`)
        .append(`<td>${name.val()}</td>`)
        .append(`<td>${category.val()}</td>`)
        .append(`<td>${price.val()}</td>`)
        .append($(`<td><button>Delete</button></td>`).click(function () {
        row.remove();
      }))

      $('#' + id + ' .payments').append(row);
      name.val('');
      category.val('');
      price.val('');

    }));

    footer.append(addBtn);
    table.append(head).append(payments).append(footer);

    $('#' + id).append(table);

  }
}

