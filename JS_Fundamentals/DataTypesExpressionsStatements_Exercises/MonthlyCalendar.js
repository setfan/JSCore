function calender([day, month, year]) {
    let html = '<table>\n'

    html += '  <tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>\n'

    let defaultDate = new Date(year, month-1, day)
    let currentDate = new Date(year, month-1, 1)

    if (currentDate.getDay() !== 0){
        currentDate = new Date(year, month-2, new Date(year, month-1, 0).getDate() - currentDate.getDay() +1)
    }


    let nextMonth = new Date(year, month, 1).getMonth()
    let previousMonth = new Date(year, month-2, 1).getMonth()

    while (currentDate.getMonth() !== nextMonth || currentDate.getDay() !== 0){
        if(currentDate.getDay() === 0){
            html+= '  <tr>'
        }
        if(currentDate.getMonth() === previousMonth){
            html += `<td class="prev-month">${currentDate.getDate()}</td>`
        } else if (currentDate.getMonth() === nextMonth){
            html += `<td class="next-month">${currentDate.getDate()}</td>`
        } else if (currentDate.getDate() === defaultDate.getDate() && currentDate.getMonth() === month-1 ){
            html += `<td class="today">${currentDate.getDate()}</td>`
        } else {
            html += `<td>${currentDate.getDate()}</td>`
        }

        if(currentDate.getDay() === 6){
            html += '</tr>\n'
        }
        currentDate.setDate(currentDate.getDate()+1)
    }

    html += '</table>'

    return html
}

console.log(calender(['4', '9', '2016']))

