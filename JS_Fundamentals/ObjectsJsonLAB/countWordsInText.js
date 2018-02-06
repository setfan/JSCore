function countWordsInText(input) {
    let text = input.join('\n')
    let words = text.split(/[^a-zA-Z0-9_]+/).filter(w => w != '')

    let resultData = {}
    for (let item of words) {
        resultData[item]? resultData[item] ++ : resultData[item] = 1
    }

    return JSON.stringify(resultData)
}

function test(arr) {
    console.log(arr);
}

console.log(countWordsInText(['Far too slow, you\'re far too slow.']));