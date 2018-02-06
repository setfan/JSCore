function townJson(strArr) {
    let result = []

    let [town, lat, long] = strArr[0].split(/\s*\|\s*/).filter(str => str !=='')

    strArr.slice(1).forEach(item => {

        let tokens = item.split(/\s*\|\s*/).filter(str => str !== '')
        let obj = {}
        obj[town] = tokens[0]
        obj[lat] = Number(tokens[1])
        obj[long] = Number(tokens[2])

        result.push(obj)
    })

    let resultStr = JSON.stringify(result)

    console.log(resultStr);

}

townJson(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |'])