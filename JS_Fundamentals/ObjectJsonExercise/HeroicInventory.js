function heroicInventory(arr) {
    let resultData = []
    for (let elem of arr) {
        let [name, level, items] = elem.split(' / ')
        let hero = {name: name, level:Number(level), items: []}
        if(items != undefined){
            let itemsArr = items.split(', ')
            for (let item of itemsArr) {
                hero.items.push(item)
            }
        }

        resultData.push(hero)
    }
    console.log(JSON.stringify(resultData));
}

heroicInventory(['Isacc / 25 / Apple, GravityGun',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara'])