function magicMatrix(arr) {
    let len = arr.length
    let targetSum = arr[0].reduce((a, b) => a+b)

    function isMagical() {
        for (let row = 1; row < len; row++) {
            let sum1 = Number.MIN_VALUE
            let sum2 = Number.MIN_VALUE

            for (let col = 0; col < len; col++) {
                sum1+= arr[row][col]
                sum2 += arr[col][row]
            }

            if (targetSum !== sum1 || targetSum !== sum2){
                return false

            }
        }
        return true
    }

    console.log(isMagical())
}

magicMatrix([[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]])