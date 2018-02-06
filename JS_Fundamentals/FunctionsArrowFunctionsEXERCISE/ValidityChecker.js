function validCheck(arr) {
    let [x1, y1, x2, y2] = arr
    let distance1 = calculateDistance(x1, y1, 0, 0)
    let distance2 = calculateDistance(x2, y2, 0, 0)
    let distance3 = calculateDistance(x1, y1, x2, y2)

    printResult(x1, y1, 0, 0, result(distance1))
    printResult(x2, y2, 0, 0, result(distance2))
    printResult(x1, y1, x2, y2, result(distance3))

    function printResult(a, b, c, d, str) {
        console.log(`{${a}, ${b}} to {${c}, ${d}} is ${str}`)
    }

    function result(dis) {
        if(dis === parseInt(dis)){
            return 'valid'
        }

        return 'invalid'
    }

    function calculateDistance(x1, y1, x2, y2) {
        let pointA = {x: x1, y: y1}
        let pointB = {x: x2, y: y2}

        let distanceX = Math.pow(pointA.x - pointB.x, 2)
        let distanceY = Math.pow(pointA.y - pointB.y, 2)

        return Math.sqrt(distanceX + distanceY)

    }
}

validCheck([2, 1, 1, 1])