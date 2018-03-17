function airPollution(sofiaMap, arr) {
    let result = []

    let resultMap = []
    sofiaMap.forEach(a => {
        resultMap.push(a.split(' ').map(Number))
    })

    function negativeTest(num) {
        return num < 0 ? 0 : num
    }

    for (let obj of arr) {
        let [command, num] = obj.split(' ')
        num = Number(num)

        switch (command) {
            case 'breeze':
                resultMap[num] = resultMap[num].map(e => negativeTest(num - 15))
                break
            case 'gale':
                resultMap = resultMap.map(row =>
                    row.map((x, i) => i === num ? negativeTest(x - 20): x))
                break
            case 'smog':
                resultMap = resultMap.map(a => a.map(e => e + num))
                break
        }
    }

    resultMap.forEach((row, i) => {
        row.forEach((col, j) => {
            if (col >= 50)
                result.push(`[${i}-${j}]`)
        })
    })
    result.length > 0 ? console.log('Polluted areas: ' + result.join(', ')) : console.log('No polluted areas')
}

airPollution([
        "5 7 72 14 4",
        "41 35 37 27 33",
        "23 16 27 42 12",
        "2 20 28 39 14",
        "16 34 31 10 24",
    ],
    ["breeze 1", "gale 2", "smog 25"]
)