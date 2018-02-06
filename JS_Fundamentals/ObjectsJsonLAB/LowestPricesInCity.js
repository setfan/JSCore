function lowestPricesInCity(arr) {
    let result = new Map()
    for (let elem of arr) {
        let tokens = elem.split(' | ')
        let [town, product, price] = tokens
        if (result.has(product)) {
            result.get(product).set(town, Number(price))
        } else {
            let townPrice = new Map()
            townPrice.set(town, Number(price))
            result.set(product, townPrice)
        }
    }

    for (let [product, value] of result) {
        let temp = new Map([...value].sort((a, b) => {return a[1] - b[1]}))
        for (let [town, price] of temp) {
            console.log(`${product} -> ${price} (${town})`)
            break
        }
    }
}

/*lowestPricesInCity(['Sample Town | Sample Product | 1000',
'Sample Town | Orange | 2',
'Sample Town | Peach | 1',
'Sofia | Orange | 3',
'Sofia | Peach | 2',
'New York | Sample Product | 1000.1',
'New York | Burger | 10'])
*/

lowestPricesInCity(['Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'New York City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Mexico City | Audi | 100000',
    'Washington City | Mercedes | 1000'])
