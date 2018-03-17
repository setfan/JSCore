function functionProseccor(arr) {
  let commandPocessor = (function () {
    let text = '';

    return {
      append: (newText) => text += newText,
      removeStart: (count) => text = text.slice(count),
      removeEnd: (count) => text = text.slice(0, text.length - count),
      print: () => console.log(text),
  }
  })();

  for (let obj of arr) {
    let [command, transition] = obj.split(' ')
    commandPocessor[command](transition);
  }

}

functionProseccor(['append hello',
  'append again',
  'removeStart 3',
  'removeEnd 4',
  'print']
)