function result() {
  let id = 0;
  let allReports = new Map;
  let element = null;

  let module = {
    report: (author, description, isReproducible, severity) => {
      allReports.set(id++,
        {author, description, isReproducible, severity, status: 'Open'});
      module.output(element);
    },
    setStatus: (id, newStatus) => {
      allReports.get(id).status = newStatus;
      module.output(element);
    },
    remove: (id) => {
      allReports.delete(id);
      module.output(element);
    },
    sort: (criteria) => {
      allReports.entries().sort((a, b) => {
        if (criteria === 'ID' || !criteria) {
          return a[0] - b[0];
        } else if (criteria === 'severity') {
          return a[1].severity - b[1].severity;
        } else {
          return a[1].author.localeCompare(b[1].author);
        }
      });
    },
    output: (selector) => {
      element = $(selector);
      $(selector).empty();
      for (let [id, report] of [...allReports]) {
        let div = $('<div>')
          .attr('id', `report_${id}`)
          .addClass('report')
          .append($('<div>')
            .addClass('body')
            .append($('<p>').text(report.description))
            .append($('<div>')
              .addClass('title')
              .append($('<span>')
                .addClass('author')
                .text(`Submitted by: ${report.author}`))
              .append($('<span>')
                .addClass('status')
                .text(`${report.status} | ${report.severity}`))));
        $(selector).append(div);
      }
    }
  };

  return module;
}

let tracker = result();

tracker.output('#content');
tracker.report('guy', 'report content', true, 5);
tracker.report('guy2', 'report content2', true, 3);
tracker.report('abv', 'report content3', true, 4);
tracker.sort('author')