function aggregateElements(arr) {
    aggregate(0, (a, b) => {return a+b})
    aggregate(0, (a, b) => {return a+ 1/b})
    aggregate('', (a, b) => {return a+b})

    function aggregate(initialValue, func) {
        for (let i = 0; i < arr.length; i++) {
            initialValue = func(initialValue, arr[i])
        }
        console.log(initialValue)
    }
}

aggregateElements([1, 2, 3])