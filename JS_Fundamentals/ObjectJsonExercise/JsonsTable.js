function jsonsTable(arr) {
    let html = '<table>\n'
    for (let item of arr) {
        let obj = JSON.parse(item)
        html += `\t<tr>\n\t\t<td>${escapeHTML(obj['name'])}</td>\n\t\t<td>${escapeHTML(obj['position'])}</td>\n\t\t<td>${escapeHTML(obj['salary'])}</td>\n\t<tr>\n`

    }

    html += '</table>'

    console.log(html);

    function escapeHTML(str) {
        str = str.toString()
        let mapChars = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}
        return str.replace(/["&'<>]/g, a => mapChars[a])

    }

}

jsonsTable(['{"name":"Pesho","position":"Promenliva","salary":100000}',
'{"name":"Teo","position":"Lecturer","salary":1000}',
'{"name":"Georgi","position":"Lecturer","salary":1000}'])