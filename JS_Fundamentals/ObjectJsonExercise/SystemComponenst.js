function systemComponents(arr) {
    let result = new Map()

    for (let obj of arr) {
        let [item, element, property] = obj.split(' | ')

        if (result.has(item)) {
            if (result.get(item).has(element)) {
                result.get(item).get(element).push(property)
            } else {
                result.get(item).set(element, [property])
            }
        } else {
            let modelQuantity = new Map()
            modelQuantity.set(element, [property])
            result.set(item, modelQuantity)
        }
    }

    let systems = [...result.keys()].sort((a, b) => {
        if (result.get(a).size > result.get(b).size) return -1;
        if (result.get(a).size < result.get(b).size) return 1;

        return b.toLowerCase().localeCompare(b.toLocaleLowerCase());
    });
    for (let system of systems) {
        console.log(system);
        let components = [...result.get(system).keys()].sort((s1, s2) => result.get(system).get(s2).length - result.get(system).get(s1).length);
        for (let component of components) {
            console.log(`|||${component}`);
            for (let subComponent of result.get(system).get(component)) {
                console.log(`||||||${subComponent}`);
            }
        }
    }

    /*
    let sorted = Array.from(result.entries()).sort((a, b) => {
        if (a[1].size < b[1].size) {
            return 1
        } else if (a[1].size > b[1].size) {
            return -1
        } else {
            if( a[0].localeCompare(b[0]) === 0){
                return b[1].value.length-a[1].value.length
            }
            return a[0].localeCompare(b[0])
        }
    })

    for (let [key, value] of sorted) {
        console.log(key);
        for (let [elem, prop] of value) {
            console.log(`|||${elem}`)
            for (let obj of prop) {
                console.log(`||||||${obj}`)
            }
        }
    }
    */
}

systemComponents(['SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'])