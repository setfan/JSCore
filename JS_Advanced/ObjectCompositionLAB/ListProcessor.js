function listProcessor (inputArray) {

  let commandExecutor = (function () {
    let items = [];
    return {
      add: (newItem) => items.push(newItem),
      remove: (item) => items = items.filter(a => a !== item),
      print: () => console.log(items.join(','))
    }
  })();

  for (let obj of inputArray) {
    let [command, elem] = obj.split(' ');
    commandExecutor[command](elem);
  }
}

listProcessor(['add hello', 'add again', 'remove hello', 'add again', 'print'])