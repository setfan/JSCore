function datesMatch(arr) {
    let datePattern = /\b([0-9]{1,2})-([A-Z][a-z]{2})-([0-9]{4})\b/g

    let result = [], match

    for (let sentence of arr) {
        while (match = datePattern.exec(sentence)){
            result.push(`${match[0]} (Day: ${match[1]}, Month: ${match[2]}, Year: ${match[3]})`)
        }
    }

    console.log(result.join('\n'));

}

datesMatch(['I am born on 30-Dec-1994.', 'This is not date: 512-Jan-1996.', 'My father is born on the 29-Jul-1955.'])