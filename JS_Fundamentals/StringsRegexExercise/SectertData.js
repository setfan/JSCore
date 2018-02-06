function secretData(arr) {
    let result = []
    let patterns = {
    namePattern: /(\*[A-Z]{1}[A-Za-z]*)(?= |\t|$)/g,
    phonePattern: /(\+[0-9\-]{10})(?= |\t|$)/g,
    idPattern: /(![a-zA-Z0-9]+)(?= |\t|$)/g,
    secretPattern: /(_[a-zA-Z0-9]+)(?= |\t|$)/g }

    for (let obj of arr) {
        for (const pattern of Object.values(patterns)) {
            obj = obj.replace(pattern, function (match) {
                return '|'.repeat(match.length)
            })
        }
        result.push(obj)
    }
    console.log(result.join('\n'));
}

secretData(['Agent *Ivankov was in the room when it all happened.',
    'The person in the room was heavily armed.',
    'Agent *Ivankov had to act quick in order.',
    'He picked up his phone and called some unknown number. ',
    'I think it was +555-49-796',
    'I can\'t really remember...',
    'He said something about "finishing work" with subject !2491a23BVB34Q and returning to Base _Aurora21',
    'Then after that he disappeared from my sight.',
    'As if he vanished in the shadows.',
    'A moment, shorter than a second, later, I saw the person flying off the top floor.',
    'I really don\'t know what happened there.',
    'This is all I saw, that night.',
    'I cannot explain it myself...'])