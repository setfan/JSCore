function sumByTown(arr) {
    let data = {}
    for (let i = 0; i < arr.length; i+=2) {
        let [town, population] = [arr[i], Number(arr[i+1])]

        if(data[town] == undefined){
            data[town] = population
        } else {
            data[town] += population
        }
    }

    return JSON.stringify(data)
}

console.log(sumByTown(['Sofia\n', '20', 'Varna', '3', 'Sofia', '5', 'Varna', '4']));