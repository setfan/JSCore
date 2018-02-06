function splitWithDelim(str, delimiter) {

    let resultArr = str.split(delimiter)

    for (let obj of resultArr) {
        console.log(obj);
    }

}

splitWithDelim('One-Two-Three-Four-Five \n', '-')