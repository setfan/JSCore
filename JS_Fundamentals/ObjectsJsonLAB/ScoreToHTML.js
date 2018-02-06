function scoreToHTML(str) {
    let tokens = JSON.parse(str)
    let html = '<table>\n'
    html += '   <tr><th>name</th><th>score</th></tr>\n'

    for (let obj of tokens) {
        html += `   <tr><td>${escapeHTML(obj['name'])}</td><td>${escapeHTML(obj['score'].toString())}</td></tr>\n`

    }

    html += '</table>'

    console.log(html);

    function escapeHTML(str) {
        str = str.toString()
        let mapChars = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}
        return str.replace(/["&'<>]/g, a => mapChars[a])

    }
}

scoreToHTML('[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]')