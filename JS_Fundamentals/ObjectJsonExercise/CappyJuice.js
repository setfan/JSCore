function cappyJuice(arr) {
    let stock = {};
    let bottles = {};

    for(let line of arr) {
        let tokens = line.split(" => ");
        let fruit = tokens[0];
        let quantity = Number(tokens[1]);

        if(! stock.hasOwnProperty(fruit)) {
            stock[fruit] = 0;
        }

        stock[fruit] += quantity;
        if(stock[fruit] >= 1000) {
            bottles[fruit] = parseInt(stock[fruit]/1000);
        }
    }

    for(let key of Object.keys(bottles)) {
        console.log(`${key} => ${bottles[key]}`);
    }
}

cappyJuice(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789'])