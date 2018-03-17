class Dialog {
  constructor (msg, callback) {
    this.message = msg;
    this.callback = callback;
    this.inputs = [];
  }

  addInput (label, name, type) {
    this.inputs.push({label, name, type})

  }

  render(){
    let outerDiv = $('<div class="overlay">');
    let innerDiv = $('<div class="dialog">');
    for (let obj of this.inputs) {
      innerDiv.append($('<label>Name</label>'));
      innerDiv.append($('<input name="name" type="text">'));
    }
    innerDiv.append($(''))
  }
}