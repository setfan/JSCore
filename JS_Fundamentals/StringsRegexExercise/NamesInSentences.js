function namesInSentences(text) {
    let pattern = /_[a-zA-Z0-9]+/g

    let result = []

    let match = pattern.exec(text)
    while (match){
        result.push(match[0].substr(1))
        match = pattern.exec(text)
    }

    console.log(result.join(','));

}

namesInSentences('Calculate the _area of the _perfectRectangle object.')