function firstLastKElem(array) {
    let k = Number(array.shift())
    let firstK = array.slice()

    console.log(array.slice(0, k));
    console.log(array.slice(array.length-k))

}