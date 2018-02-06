function lastMonth(arr) {
    let day = arr[0]
    let month = arr[1]
    let year = arr[2]

    let pastDays = day * 24 * 60 * 60 * 1000
    let date = new Date(year, month-1, day)
    let lastPastMonthDay = new Date(date.getTime() - pastDays)

    console.log(lastPastMonthDay.getDate())

}

lastMonth([13, 12, 2004])