function populationTowns(arr) {
    let towns = new Map()
    for (let obj of arr) {
        let [name, value] = obj.split(/\s*<->\s*/).filter(a => a !== '')
        towns.has(name) ? towns.set(name, towns.get(name) + Number(value)) : towns.set(name, Number(value))
    }

    for (let [town, population] of towns) {
        console.log(`${town} : ${population}`)
    }
}

populationTowns(['Istanbul <-> 100000','Honk Kong <-> 2100004','Jerusalem <-> 2352344','Mexico City <-> 23401925','Istanbul <-> 1000'])