function carFactory (inputTokens) {
  let garage = new Map();
  let commandExecutor = {
    create: function ([name, inherits, parent]) {
      parent = parent ? garage.get(parent) : null;
      let newCar = Object.create(parent);
      garage.set(name, newCar);
      return newCar;
    },
    set: function ([name, key, value]) {
      let car = garage.get(name);
      car[key] = value;
    },
    print: function ([name]) {
      let car = garage.get(name);
      let result = [];
      for (let key in car) {
        result.push(`${key}:${car[key]}`)
      }
      console.log(result.join(', '));
    }

  };

  for (let obj of inputTokens) {
    let tokens = obj.split(' ');
    let command = tokens.shift();
    commandExecutor[command](tokens);
  }
}

carFactory([
  'create c1',
  'create c2 inherit c1',
  'set c1 color red',
  'set c2 model new',
  'print c1',
  'print c2']);