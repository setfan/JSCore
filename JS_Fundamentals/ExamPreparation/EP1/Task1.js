function hungryProgrammer(stock, commands) {
    let eatenCounter = 0

    for (let obj of commands) {
        let commandTokens = obj.split(' ')
        switch (commandTokens[0]) {
            case 'Serve':
                if(stock.length > 0){
                    console.log(`${stock.pop()} served!`)
                }
                break
            case 'Add':
                if(commandTokens[1] !== undefined){
                    stock.unshift(commandTokens[1])
                }
                break
            case 'Eat':
                if (stock.length > 0) {
                    console.log(`${stock.shift()} eaten`)
                    eatenCounter++
                }
                break
            case'Shift':
                swapElements(commandTokens)
                break
            case'Consume':
                consume(commandTokens)
                break
            case'End':
                printResult()
                return
            default:
                break
        }
    }

    function printResult() {
        if (stock.length === 0) {
            console.log('The food is gone')
        } else {
            console.log('Meals left: ' + stock.join(', '));
        }
        console.log(`Meals eaten: ${eatenCounter}`)

    }

    function consume(commandTokens) {
        let index1 = Number(commandTokens[1])
        let index2 = Number(commandTokens[2])
        tmp = []

        if ((index1 < 0 || index1 > stock.length - 1) || (index2 < 0 || index2 > stock.length - 1)) {
            return
        }

        for (let i = index1; i <= index2; i++) {
            stock[i] = '0'
            eatenCounter++
        }

        for (let obj of stock) {
            if (obj !== '0') {
                tmp.push(obj)
            }
        }
        stock = tmp
        console.log('Burp!')
    }

    function swapElements(commandTokens) {
        let index1 = Number(commandTokens[1])
        let index2 = Number(commandTokens[2])

        if ((index1 < 0 || index1 > stock.length - 1) || (index2 < 0 || index2 > stock.length - 1)) {
            return
        }
        let tmp = stock[index1]
        stock[index1] = stock[index2]
        stock[index2] = tmp
    }
}

hungryProgrammer(['bacon', 'veggies', 'chicken'],
['Add',
'End'])