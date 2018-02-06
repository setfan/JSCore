function tresureLocator(input) {
    let tuvalu = {x1: 1, x2: 3, y1: 1, y2: 3}
    let tonga = {x1: 0, x2: 2, y1: 6, y2: 8}
    let tokelau = {x1: 8, x2: 9, y1: 0, y2: 1}
    let samoa = {x1: 5, x2: 7, y1: 3, y2: 6}
    let cook = {x1: 4, x2: 9, y1: 7, y2: 8}

    for (let i = 0; i < input.length; i+=2) {
        whereIs(input[i], input[i+1])

    }
    function whereIs(x, y) {
        if (isInside(x, y, tuvalu)) {
            console.log('Tuvalu')
        } else if (isInside(x, y, tonga)) {
            console.log('Tonga')
        } else if (isInside(x, y, tokelau)){
            console.log('Tokelau')
        } else if (isInside(x,y, samoa)){
            console.log('Samoa')
        } else if (isInside(x,y,cook)){
            console.log('Cook')
        } else {
            console.log('On the bottom of the ocean')
        }
    }


    function isInside(x, y, iseland) {
        let x1 = iseland.x1, x2 = iseland.x2
        let y1 = iseland.y1, y2 = iseland.y2
        if (x >= x1 && x <= x2) {
            if (y >= y1 && y <= y2) {
                return true
            }
        }
        return false
    }


}

tresureLocator([4, 2, 1.5, 6.5, 1, 3])