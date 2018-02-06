function catalogue(arr) {
    let result = ''
    let catalogue = new Map()
    for (let obj of arr) {
        let [item, price] = obj.split(' : ')
        price = Number(price)
        catalogue.set(item, price)
    }
    let sorted = Array.from(catalogue.entries()).sort()

    let prev = ''
    for (let [key, value] of sorted) {
        if(prev !== key[0]){
            console.log(key[0]);
        }
        console.log(` ${key}: ${value}`);
        prev = key[0]
    }
}

catalogue(['Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10'])