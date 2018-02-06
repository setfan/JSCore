function cityMarket(arr) {
    let resultData = new Map()
    for (let elem of arr) {
        let [town, item, value] = elem.split(/\s*->\s*/)
        let profit = value.split(/\s+:\s*/).map(s => Number(s)).reduce((a, b) => a * b)

        if (resultData.has(town)) {
            if (resultData.get(town).has(item)) {
                let tmp = resultData.get(town).get(item)
                resultData.get(town).set(item, tmp + profit)
            } else {
                resultData.get(town).set(item, profit)
            }
        } else {
            let productIncome = new Map()
            productIncome.set(item, profit)
            resultData.set(town, productIncome)
        }
    }

    for (let [key, value] of resultData) {
        console.log(`Town - ${key}`)
        for (let [elem, sum] of value) {
            console.log(`$$$${elem} : ${sum}`)
        }

    }
}

cityMarket(['Sofia -> Laptops HP -> 200 : 2000','Sofia -> Raspberry -> 200000 : 1500','Sofia -> Audi Q7 -> 200 : 100000','Montana -> Portokals -> 200000 : 1','Montana -> Qgodas -> 20000 : 0.2','Montana -> Chereshas -> 1000 : 0.3'])