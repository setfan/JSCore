function diagonalAttack(arr) {
    let matrix = []
    let frontDiagonal = 0, backDiagonal = 0

    for (let i = 0; i < arr.length; i++) {
        let row = arr[i].split(' ')
        matrix[i] = []
        for (let j = 0; j < row.length; j++) {
            matrix[i][j] = Number(row[j])
        }

    }

    for (let i = 0; i < matrix.length; i++) {
        frontDiagonal += matrix[i][i]
        backDiagonal += matrix[i][matrix.length - i - 1]
    }

    if (frontDiagonal === backDiagonal) {

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {

                if (i !== j && j !== matrix.length - i - 1) {
                    matrix[i][j] = frontDiagonal
                }
            }
        }
    }

    console.log(matrix.map(e => e.join(' ')).join('\n'))

}

diagonalAttack(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']
)