function modifyAverage(input) {
    let sum = 0
    let len = input.toString().length
    let numStr = input.toString()


    let avg = average(input)
    function average(num) {
        for (let i = 0; i < len; i++) {

            sum += parseInt(numStr[i])
        }

        return sum / len
    }
    let result = ''

    if (avg > 5) {
        printResult()
    } else {
        while (avg <= 5) {
            numStr+= '9'
            sum+= 9
            avg = sum/numStr.length
        }
        printResult()
    }

    function printResult() {
        console.log(numStr)
    }
}

modifyAverage('101')
