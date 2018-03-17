function carFactory (orderedCar) {
  const ENGINES = new Map();
  ENGINES.set('small', { power: 90, volume: 1800 });
  ENGINES.set('normal', { power: 120, volume: 2400 });
  ENGINES.set('monster', { power: 200, volume: 3500 });

  const CARRIAGE = new Map();
  CARRIAGE.set('hatchback', { type: 'hatchback', color: '' });
  CARRIAGE.set('coupe', { type: 'coupe', color: '' });

  let productCar = {};
  productCar.model = orderedCar.model;

  orderedCar.power <= 90 ? productCar.engine = ENGINES.get('small')
    : orderedCar.power > 90 && orderedCar.power <= 120 ? productCar.engine = ENGINES.get('normal') : productCar.engine = ENGINES.get('monster');

  productCar.carriage = CARRIAGE.get(orderedCar.carriage);
  productCar.carriage.color = orderedCar.color;

  let wheelsize = Math.trunc(orderedCar.wheelsize);
  wheelsize % 2 === 0 ? wheelsize = wheelsize -1 : 0;
  productCar.wheels = [wheelsize, wheelsize, wheelsize, wheelsize];


  return productCar;

}

console.log(carFactory({
    model: 'Ferrari',
    power: 200,
    color: 'red',
    carriage: 'coupe',
    wheelsize: 21
  },
));