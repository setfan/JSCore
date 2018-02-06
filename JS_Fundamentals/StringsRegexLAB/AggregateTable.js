function agregateTable(arr) {
    let towns = []
    let sum = 0

    for (let i = 0; i < arr.length; i++) {

        let temp = arr[i].split('|')

        towns.push(temp[1].trim())
        sum += Number(temp[2].trim())

    }


    console.log(towns.join(', '));
    console.log(sum);


}

agregateTable(['| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275']
)