function printNElem(arr) {
    let step = Number(arr.pop())
    console.log(arr.filter((elem, i) => {
        return i === 0 || i % step === 0

    }).join('\n'));
}

printNElem(["dsa", "asd", "test", "tset","2"])