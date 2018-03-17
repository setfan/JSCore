let result = (function() {

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

  class Form {
    constructor (){
      this._element = $('<div>').addClass('form');
      this.textboxes = arguments;
    }

    get textboxes () {
      return this._textboxes;
    }

    set textboxes (args) {
      for (let elem of args) {
        if(!elem instanceof Textbox){
          throw new Error('The argument is not a Textbox!')
        }
      }

      this._textboxes = args;

      for (let textbox of this._textboxes) {
        for (let obj of textbox._elements) {
          this._element.append($(obj));
        }
      }
    }

    submit(){
      let allValid = true;
      for (let obj of this._textboxes) {
        if(obj.isValid()){
          for (let elem of obj._elements) {
            $(elem).css('border', '2px solid green')
          }
        } else {
          for (let elem of obj._elements) {
            $(elem).css('border', '2px solid red')
          }
          allValid = false;
        }
      }
      return allValid;
    }

    attach(selector){
      $(selector).append(this._element);
    }

  }

  return {
    Textbox: Textbox,
    Form: Form
  }
}())

let Textbox = result.Textbox;
let Form = result.Form;
let username = new Textbox("#username",/[^a-zA-Z0-9]/);
let password = new Textbox("#password",/[^a-zA-Z]/);
username.value = "username";
password.value = "password2";
let form = new Form(username,password);
form.attach("#root");

