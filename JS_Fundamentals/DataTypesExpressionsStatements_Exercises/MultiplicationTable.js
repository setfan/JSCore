function tableOfMultiply(n) {
    let result = ''
    if (n < 0 || n > 100) {

        return 'error'
    }

    result += '<table border="1">\n'

    for (let i = 0; i <= n; i++) {

        result += '  <tr>'
        for (let j = 1; j <= n; j++) {

            if (i === 0) {
                if (j==1){
                    result += `<th>x</th><th>${j}</th>`
                } else {
                    result+=`<th>${j}</th>`
                }

            } else {
                if(j === 1){
                    result += `<th>${i}</th><td>${i}</td>`
                } else {
                    result+= `<td>${j * i}</td>`
                }

            }
        }
        result += '</tr>\n'
    }

    result += '</table>'


    return result
}

console.log(tableOfMultiply(3))