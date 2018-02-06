function colorNums(n) {
    let html = '<ul>\n'
    for (let i = 1; i <= n; i++) {

        let colour = 'blue'

        if(i % 2 != 0){
            colour = 'green'
        }

        html+= `    <li><span style=\'color:${colour}\'>${i}</span></li>\n`

    }

    html += '</ul>';
    return html;

}

console.log(colorNums(10))