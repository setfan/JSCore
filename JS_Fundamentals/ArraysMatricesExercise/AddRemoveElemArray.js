function addRemoveElem(arr) {
    let item = 1
    let result = []

    arr.forEach(a => {
        if (a === 'add'){
            result.push(item)
        }
        if(a === 'remove'){
            result.pop()
        }
        item++
    })

    if (result.length === 0){
        console.log('Empty');
    } else {
        console.log(result.join('\n'));
    }
}

addRemoveElem(["add", "add", "remove", "add", "add"])