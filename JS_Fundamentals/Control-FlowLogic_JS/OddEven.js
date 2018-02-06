function oddEven(num) {
    let result = ""
    if (num % 2 === 0){
        result = "even"
    } else if (Math.abs(num % 2) ===  1){
        result = "odd"
    } else {
        result = "invalid"
    }

    console.log(result)
}

oddEven(1.5)