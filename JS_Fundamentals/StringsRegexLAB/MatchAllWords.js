function matchAllWords(text) {
   let regex = /\w+/g

    let result = text.match(regex).join('|')

    console.log(result);
}

matchAllWords('A Regular Expression needs to have the global flag in order to match all occurrences in the text')

