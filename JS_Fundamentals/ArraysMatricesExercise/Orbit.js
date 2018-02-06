function orbit1(arr) {
    let [rows, cols, targetRow, targetCol] = arr
    let matrix = fillZeros(rows, cols)

    let steps = 1
    matrix[targetRow][targetCol] = steps

    while (!isFilled(matrix)) {

        let topX = Math.max(0, targetRow - steps)
        let topY = Math.max(0, targetCol - steps)
        let bottomX = Math.min(matrix.length - 1, targetRow + steps)
        let bottomY = Math.min(matrix[0].length - 1, targetCol + steps)

        steps++

        for (let row = topX; row <= bottomX; row++) {
            for (let col = topY; col <= bottomY; col++) {
                if (matrix[row][col] === 0) {
                    matrix[row][col] = steps
                }
            }
        }
    }

    console.log(matrix.map(el => el.join(" ")).join('\n'))

    function isFilled(matrix) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] === 0) {
                    return false
                }
            }
        }

        return true
    }

    function fillZeros(rows, cols) {
        let res = []
        for (let i = 0; i < rows; i++) {
            res.push('0'.repeat(cols).split('').map(Number))
        }
        return res
    }
}

function orbit(input) {
    let orbit = []
    let [row, col, x, y] = input
    let queue = []

    for (let i = 0; i < row; i++) {
        orbit[i] = []
        for (let j = 0; j < col; j++) {

            if (i === x && j === y) {
                orbit[i][j] = 1
            } else {
                orbit[i][j] = 0
            }
        }
    }
    let cell = {row: x, col: y}

    queue.push(cell)


    while (queue.length > 0) {
       let current = queue.shift()


        if (current.row + 1 < row && (orbit[current.row + 1][current.col] === 0)) {
            cell.row = current.row + 1
            cell.col = current.col
            queue.push(cell);
            orbit[current.row + 1][current.col] = orbit[current.row][current.col] + 1
        }
        if (current.row - 1 >= 0 && (orbit[current.row - 1][current.col] === 0)) {
            cell.row = current.row - 1
            cell.col = current.col
            queue.push(cell);
            orbit[current.row - 1][current.col] = orbit[current.row][current.col] + 1
        }
        if (current.col + 1 < col && (orbit[current.row][current.col + 1] === 0)) {
            cell.row = current.row
            cell.col = current.col + 1
            queue.push(cell);
            orbit[current.row][current.col + 1] = orbit[current.row][current.col] + 1
        }
        if (current.col - 1 >= 0 && orbit[current.row][current.col - 1] === 0) {
            cell.row = current.row
            cell.col = current.col - 1
            queue.push(cell);
            orbit[current.row][current.col - 1] = orbit[current.row][current.col] + 1
        }

        console.log(orbit.map(e => e.join(' ')).join('\n'))
        console.log()


    }


}

orbit1([5, 5, 2, 2])