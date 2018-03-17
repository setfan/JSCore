function robot(){
  let products = { protein: 0, carbohydrate: 0, fat: 0, flavour: 0 };
  let recipes = {
    apple: { carbohydrate: 1, flavour: 2 },
    coke: { carbohydrate: 10, flavour: 20 },
    burger: { carbohydrate: 5, fat: 7, flavour: 3 },
    omelet: { protein: 5, fat: 1, flavour: 1 },
    cheverme: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 }
  };

  function restock(elem, quantity){
    products[elem] += Number(quantity);
    return 'Success'
  }

  function prepare(recipe, quantity){
    for(let elem of Object.keys(recipes[recipe])){
      let total = recipes[recipe][elem]*Number(quantity);
      console.log(total);
      if(products[elem] < total){
        return `Error: not enough ${elem} in stock`
      } else{
        products[elem] -= total
      }
    }
    return 'Success'
  }

  function report(){
    return [...Object.keys(products)].map(elem => elem + '=' + products[elem]).join(' ')
  }

  return function commandProcessor(input){
    let tokens = input.split(' ');
    let command = tokens.shift();
    if(command === 'restock'){
      return restock(...tokens)
    } else if(command === 'prepare'){
      return prepare(...tokens)
    } else {
      return report()
    }
  }

};
let manager = robot();
console.log(manager('restock flavour 50'));
