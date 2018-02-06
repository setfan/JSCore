function pointInRectangle(inputTokens) {
    let [x, y, xMin, xMax, yMin, yMax] = inputTokens

    let result
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax ){
        result = 'inside'
    } else {
        result = 'outside'
    }

    console.log(result)

}