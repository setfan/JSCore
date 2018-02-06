function wordOccurrences(text, word) {
    let regex = '\\b' + word + '\\b'
    let pattern = new RegExp(regex, 'gi')
    let counter = 0
    let match = pattern.exec(text)

    while (match){
        counter++
        match = pattern.exec(text)
    }
    console.log(counter);
}

wordOccurrences('There was one. Therefore I bought it. I wouldn’t buy it otherwise.', 'there')