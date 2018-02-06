function equasion(a, b, c) {
    let result = ''
    let d = (b * b) - (4 * a * c)

    if (d < 0) {
        result = 'No'
    } else if (d === 0) {
        result = -b / (2*a)
    } else {
        let x1 = (-b - Math.sqrt(d)) / (2 * a)
        let x2 = (-b + Math.sqrt(d)) / (2 * a)
        x1 = parseFloat(x1.toFixed(5))
        x2 = parseFloat(x2.toFixed(5))

        result = x1 + '\n' + x2
    }

    console.log(result)
}

equasion(1, -12, 36)