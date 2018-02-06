function drawFigure(n) {
    let result = ''
    let innerDash = ''
    let whiteSpace = ''

    for (let i = 0; i < n - 2; i++) {
        innerDash += '-'
    }
    let plusLine = `+${innerDash}+${innerDash}+`

    for (let i = 0; i < n - 2; i++) {
        whiteSpace += ' '
    }
    let pipeLine = `|${whiteSpace}|${whiteSpace}|`

    if (n === 2){
        for (let i = 0; i < 3; i++) {

            result+= '+-+-+\n'

        }
    }
    else if (n < 5) {
        for (let i = 0; i < 3; i++) {
            result += plusLine + '\n'
        }
    } else {
        if (n % 2 === 0) {
            for (let i = 1; i < n - 1; i++) {
                if (i === 1) {
                    result += plusLine + '\n'
                } else if (i === (n / 2)) {
                    result += plusLine + '\n'
                } else {
                    result += pipeLine + '\n'
                }
            }
            result += plusLine + '\n'
        } else {
            let middle = parseInt(n/2) + 1
            for (let i = 1; i <= n - 1; i++) {
                if (i === 1) {
                    result += plusLine + '\n'
                } else if (i === middle) {
                    result += plusLine + '\n'
                } else {
                    result += pipeLine + '\n'
                }
            }
            result += plusLine + '\n'
        }
    }

    console.log(result)
}

drawFigure(3)