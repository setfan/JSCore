function tempFormat(inputArray) {
    let result = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n'

    for (let i = 0; i < inputArray.length; i+=2) {

        result += `  <question>\n    ${inputArray[i]}\n  </question>\n`

        result+= `  <answer>\n    ${inputArray[i+1]}\n  </answer>\n`

    }

    result += '</quiz>'



    return result
}