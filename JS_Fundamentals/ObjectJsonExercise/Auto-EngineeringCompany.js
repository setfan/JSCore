function autoEngineer(arr) {
    let result = new Map()

    for (let obj of arr) {
        let [car, model, quantity] = obj.split(' | ')
        quantity = Number(quantity)

        if (result.has(car)) {
            if (result.get(car).has(model)) {
                let tmp = result.get(car).get(model)
                result.get(car).set(car, tmp + quantity)
            } else {
                result.get(car).set(model, quantity)
            }
        } else {
            let modelQuantity = new Map()
            modelQuantity.set(model, quantity)
            result.set(car, modelQuantity)
        }
    }

    for (let [key, value] of result) {
        console.log(key);
        for (let [model, num] of value) {
            console.log(`###${model} -> ${num}`)
        }
    }
}