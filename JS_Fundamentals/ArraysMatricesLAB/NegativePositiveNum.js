function negativePositiveNumbers(array) {
    let result = []

    for (let n of array) {
        let num = Number(n)
        if (n < 0) {
            result.unshift(n)
        } else {
            result.push(n)
        }
    }

    console.log(result.join('\n'))

}

negativePositiveNumbers([7, -2, 8, 9])