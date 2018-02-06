function rounding(arr) {
    let num = arr[0]

    let precision = arr[1] > 15 ? 15 : arr[1]

    let result = parseFloat(num.toFixed(precision))


    return result

}

rounding([3.1415926535897932384626433832795, 2])