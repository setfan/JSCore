class Textbox {
  constructor (selector, regex) {
    this.selector = selector;
    this._invalidSymbols = regex;
    this._elements = $(selector);
    $(this._elements).on('input', (e) => {
      this.value = $(e.target).val();
      this.updateElements();
    });
  }

  get value () {
    return this._value;
  }

  set value (newValue) {
    this._value = newValue;
    this.updateElements();

  }

  get elements () {
    return this._elements;
  }

  isValid () {
    return !this._invalidSymbols.test(this.value);
  }

  updateElements(){
    for (let obj of this._elements) {
      $(obj).val(this.value);
    }
  }
}

let textbox = new Textbox('.textbox', /[^a-zA-Z0-9]/);
let inputs = $('.textbox');

inputs.on('input', function () {console.log(textbox.value);});
