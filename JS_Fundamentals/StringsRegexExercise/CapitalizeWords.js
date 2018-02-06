function capitalizeWords(text) {
    let words = text.split(' ')
    let result = ''

    for (let word of words) {
        let firstLetter = word.substr(0,1)
        let restOfLetters = word.substr(1)
        result += firstLetter.toUpperCase() + restOfLetters.toLowerCase() + ' '
    }

    console.log(result);
}

capitalizeWords('iVAn IVANOV')

