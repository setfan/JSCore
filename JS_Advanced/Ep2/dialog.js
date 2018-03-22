class Dialog {
  constructor (msg, callback) {
    this.message = msg;
    this.callback = callback;
    this.inputs = [];
    this.element = null;
  }

  addInput (label, name, type) {
    this.inputs.push({label, name, type});

  }

  render () {
    this.element = $('<div class="overlay">');
    let innerDiv = $('<div class="dialog">');
    innerDiv.append($(`<p>${this.message}</p>`));
    for (let obj of this.inputs) {
      innerDiv.append($(`<label>${obj.label}</label>`));
      innerDiv.append($(`<input name="${obj.name}" type="${obj.type}">`));
    }
    innerDiv.append($('<button>OK</button>').on('click', this._ok.bind(this)));
    innerDiv.append(
      $('<button>Cancel</button>').on('click', this._cancel.bind(this)));
    this.element.append(innerDiv);
    $('body').append(this.element);
  }

  _cancel () {
    this.element.remove();
  }

  _ok () {
    let obj = {};
    this.element.find('input').each((i, e) => {
      obj[e.name] = e.value;
    });
    this.callback(obj);
    this._cancel();

  }
}