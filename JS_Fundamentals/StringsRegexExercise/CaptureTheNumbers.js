function captureTheNumbers(arr) {
    let result = []
    let text = ''
    let pattern = /\d+/g
    for (let obj of arr) {
        text += obj
    }
    let match = pattern.exec(text)

    while (match) {
        result.push(match[0])
        match = pattern.exec(text)
    }
    console.log(result.join(' '));
}

captureTheNumbers(['The300',
    'What is that?',
    'I think it’s the 3rd movie.',
    'Lets watch it at 22:45'])