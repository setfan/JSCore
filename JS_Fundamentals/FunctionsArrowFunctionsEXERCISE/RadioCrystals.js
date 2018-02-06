function radioCrystals(inputTokens) {
    let targetSize = inputTokens[0]

    let cut = (num) => num / 4
    let lap = (num) => num * 0.8
    let grind = (num) => num - 20
    let etch = (num) => num - 2
    let transportAndWash = (num) => {
        console.log('Transporting and washing')
        return Math.floor(num)
    }

    let xray = (num) => {
        console.log('X-ray x1')
        return ++num
    }

    for (let i = 1; i < inputTokens.length; i++) {
        let size = inputTokens[i]

        console.log(`Processing chunk ${size} microns`)
        size = shapeUp(inputTokens[0], size, 'Cut', cut)
        size = shapeUp(inputTokens[0], size, 'Lap', lap)
        size = shapeUp(inputTokens[0], size, 'Grind', grind)
        size = shapeUp(inputTokens[0], size, 'Etch', etch)

        if(size + 1 === targetSize){
            size = xray(size)
        }

        console.log(`Finished crystal ${size} microns`)
    }
    
    function shapeUp(targetSize, currentSize, operationName, operation) {

        let counter = 0

        while (operation(currentSize) >= targetSize || targetSize - operation(currentSize) === 1){
            currentSize = operation(currentSize)
            counter++
        }
        if(counter > 0){
            console.log(`${operationName} x${counter}`)
            currentSize = transportAndWash(currentSize)
        }
        return currentSize
    }

}

radioCrystals([1375, 50000])