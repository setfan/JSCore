function expedition(map, decoder, decoderCoordinates, startPosition) {
    let n = map.length
    let m = map[0].length
    let p = decoder.length
    let q = decoder[0].length

    if(decoderCoordinates.length > 0){
        for (let obj of decoderCoordinates) {
            let row = obj[0]
            let col = obj[1]
            decode(row, col)
        }
    }

    function decode(row, col) {
        let decodeRow = row
        let decodeCol = col
        for (let i = 0; i < p; i++) {
            decodeCol = col
            for (let j = 0; j < q; j++) {
                if (decodeRow < n && decodeCol < m) {
                    if (decoder[i][j] === 1) {
                        if (map[decodeRow][decodeCol] === 0) {
                            map[decodeRow][decodeCol] = 1
                        } else {
                            map[decodeRow][decodeCol] = 0
                        }
                    }
                    decodeCol++
                }
            }
            decodeRow++
        }
    }

    function inMap(x,y){
        let result = (x >= 0 && x < n) && (y >= 0 && y < m)
        return result
    }

    function countSteps(position) {
        let end = []
        map[position[0]][position[1]] = 1
        let result = 1
        let queue = [position]
        while (queue.length > 0){
            let coordinates = queue.pop()
            let row = coordinates[0]
            let col = coordinates[1]

            if(inMap(row, col+1) && map[row][col+1] === 0){
                queue.push([row, col+1])
                result++
                map[row][col+1] = result
            } else if(inMap(row, col-1) && map[row][col-1] === 0){
                queue.push([row, col-1])
                result++
                map[row][col-1] = result
            }else if(inMap(row+1, col) && map[row+1][col] === 0){
                queue.push([row+1, col])
                result++
                map[row+1][col] = result
            }else if(inMap(row-1, col) && map[row-1][col] === 0){
                queue.push([row-1, col])
                result++
                map[row-1][col] = result
            }
            end = coordinates
        }
        return [result, end]
    }

    let result = countSteps(startPosition)

    console.log(result[0]);

    let end = result[1][0] === 0 ? 'Top' : result[1][1] === 0 ? 'Left' : result[1][0] === n-1 ? 'Bottom' : result[1][0] === m-1 ? 'Right' :
        result[1][0] < n/2 && result[1][1] >= m/2 ? 'Dead end 1' : result[1][0] < n/2 && result[1][1] < m/2 ? 'Dead end 2' :
            result[1][0] >= n/2 && result[1][1] < m/2 ? 'Dead end 3' : 'Dead end 4'
    console.log(end);


    //console.log(map.map(e => e.join(' ')).join('\n'))
}

expedition([[1, 1],
        [1, 1],
        [0, 0],
        [1, 1],
        [1, 1],
        [1, 1]],
    [[0, 0],
        [0, 0]],
    [],
    [2, 1])