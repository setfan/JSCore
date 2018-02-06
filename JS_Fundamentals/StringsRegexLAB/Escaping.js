function escaping(arr) {
    let result = '<ul>\n' + arr.map(escapeHTML).map(elem => `  <li>${elem}</li>`).join('\n') + '\n</ul>'

    console.log(result);

    function escapeHTML(str) {
        let mapChars = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',"'": '&#39;'}
        return str.replace(/["&'<>]/g, a => mapChars[a])
    }

}

escaping(['<b>unescaped text</b>', 'normal text']);