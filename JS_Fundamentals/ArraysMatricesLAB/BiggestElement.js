function biggestElement(matrix) {
    console.log(
        matrix.map(arr => arr.sort((a, b) => b-a)[0]).sort((a, b) => b-a)[0]
    )

}

biggestElement([[3, 5, 7, 12],
    [-1, 4, 33, 2],
    [8, 3, 0, 4]]
)