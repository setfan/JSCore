function argumentsInfo () {
  let result = {};

  for (let i = 0; i < arguments.length; i++) {

    let obj = arguments[i];

    let type = typeof obj;

    console.log(type + ': ' + obj);

    !result[type] ? result[type] = 1 : result[type] += 1;

  }

  let sorted = [];
  for (let obj in result) {
    sorted.push([obj, result[obj]]);
  }

  sorted.sort((a, b) => b[1] - a[1]);

  for (let obj of sorted) {
    console.log(obj[0] + ' = ' + obj[1]);
  }

}

argumentsInfo('cat', 42, function () { console.log('Hello world!'); });