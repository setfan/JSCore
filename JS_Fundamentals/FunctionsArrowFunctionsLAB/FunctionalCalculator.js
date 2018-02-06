function calculator(a, b, operand) {
    let add = function (a, b) {return a + b}
    let substract = function (a, b) {return a - b}
    let multipluy = function (a, b) {return a * b}
    let devide = function (a, b) {return a / b}

    switch (operand){
        case '+':
            return add(a, b)
        break
        case '-':
            return substract(a, b)
        break
        case '*':
            return multipluy(a, b)
        break
        case '/':
            return devide(a, b)
        break
    }

}