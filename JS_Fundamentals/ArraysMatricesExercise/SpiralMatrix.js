function spiralMatrix(row, col) {

    let matrix = []
    let item = 0
    for (let i = 0; i < row; i++) {
        matrix[i] = [];
        for (let j = 0; j < col; j++) {
            matrix[i][j] = 0
        }
    }
    let edge = row

    let x = 0, y = edge,
        total = edge * edge--,
        dx = 1, dy = 0,
        i = 1, j = 0;
    while (y) matrix[--y] = []
    while (i <= total) {
        matrix[y][x] = i++

        x += dx; y += dy

        if (++j === edge) {
            if (dy < 0) {
                x++; y++; edge -= 2}
            j = dx; dx = -dy; dy = j; j = 0
        }
    }
    console.log(matrix.map(e => e.join(' ')).join('\n'))

}

spiralMatrix(5, 5)