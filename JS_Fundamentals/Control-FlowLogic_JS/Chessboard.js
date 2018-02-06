function cessBoard(n) {
   let html = '<div class="chessboard">\n'

    let color = 'black'
    for (let i = 0; i < n; i++) {

       html += '    <div>\n'
        let color = (i % 2 == 0)? 'black' : 'white'
        for (let j = 1; j <= n; j++) {

            html+= `    <span class="${color}"></span>\n`
            color = (color === 'white')? 'black' : 'white'
        }

        html += '   </div>\n'
    }

    html += '</div>'

    return html
}

console.log(cessBoard(3))