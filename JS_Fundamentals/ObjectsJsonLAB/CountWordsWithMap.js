function countWordsWithMap(inputArr) {
    let text = inputArr.join('\n').toLowerCase().split(/[^a-zA-Z0-9_]+/).filter(w => w !== '')

    let resultData = new Map()
    for (let word of text) {
        resultData.has(word)? resultData.set(word, resultData.get(word) +1) : resultData.set(word, 1)
    }

    let resultAarray = Array.from(resultData.keys()).sort()

    resultAarray.forEach(w => {
        console.log(`'${w}' -> ${resultData.get(w)} times`)
    })

}

countWordsWithMap(['Far too slow, you\'re far too slow.'])