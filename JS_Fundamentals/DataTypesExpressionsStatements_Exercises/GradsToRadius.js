function gradToDegree(num) {
    let result = (0.9 * (num % 400))

    if (result < 0) {
        result = 360 + result
    }
    console.log(result)


}

gradToDegree(850)