function filterEvenIndexes(arr) {
    console.log(arr.filter((elem, i) => {
        return i % 2 === 0
    }).join(' '))
}

filterEvenIndexes([20, 5, 30])