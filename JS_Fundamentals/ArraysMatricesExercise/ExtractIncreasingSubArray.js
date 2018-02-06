function extractSubArr(arr) {
    let biggestItem = Number.MIN_VALUE

    console.log(arr.filter((item, i) => {
        if (i === 0) {
            biggestItem = item
        }
        if (item > biggestItem) {
            biggestItem = item
        }
        return item >= biggestItem
    }).join('\n'));

}


extractSubArr([1, 3, 8, 4, 10, 12, 3, 2, 24])

