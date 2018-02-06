function interest(arr) {
    let p = arr[0]
    let i = arr[1]/ 100
    let n = 12 / arr[2]
    let t = arr[3]

    let result = p * (Math.pow((1 + (i/n)), (n*t)))

    console.log(result.toFixed(2))
}

interest([1500, 4.3, 3, 6])