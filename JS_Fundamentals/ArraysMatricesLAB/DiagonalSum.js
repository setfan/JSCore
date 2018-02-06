function diagonalSum(matrix) {
    let frontDiagonal = 0, backDiagonal = 0

    for (let i = 0; i < matrix.length; i++) {
        frontDiagonal += matrix[i][i]
        backDiagonal += matrix[i][matrix.length - i - 1]
    }

    console.log(frontDiagonal + ' ' + backDiagonal)

}