function upperCaseWords(str) {
    console.log(str.toUpperCase()
        .split(/\W+/)
        .filter(a => a !== '')
        .join(', '));

}

upperCaseWords('Hi, how are you?')