function jsonToHtml(str) {
    let arr = JSON.parse(str)
    let html = '<table>\n\t<tr>'
    for (let key of Object.keys(arr[0])) {
        html += `<th>${escapeHTML(key)}</th>`
    }
    html += '</tr>\n'
    for (let obj of arr) {
        html += '\t<tr>'
        for (let property of Object.values(obj)) {
            html += `<td>${escapeHTML(property)}</td>`
        }
        html += '</tr>\n'
    }
    return html + '</table>'

    function escapeHTML(str) {
        let mapChars = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}
        return str.toString().replace(/["&'<>]/g, a => mapChars[a])
    }
}

console.log(jsonToHtml('[{"Name":"Pesho <div>-a","Age":20,"City":"Sofia"},{"Name":"Gosho","Age":18,"City":"Plovdiv"},{"Name":"Angel","Age":18,"City":"Veliko Tarnovo"}]'));