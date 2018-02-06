function uniqueSequence(arr) {
    let store = new Set()
    let result = []

    arr.forEach(a => store.add(JSON.stringify(JSON.parse(a).sort((a, b) => b - a))))
    store.forEach(a => result.push(JSON.parse(a)))
    result.sort((a, b) => a.length - b.length).forEach(c => console.log('[' + c.join(', ') + ']'))
}

uniqueSequence(['[-3, -2, -1, 0, 1, 2, 3, 4]',
    '[10, 1, -17, 0, 2, 13]',
    '[4, -3, 3, -2, 2, -1, 1, 0]'
])

function extractInput(arr) {
    console.log(arr);
}