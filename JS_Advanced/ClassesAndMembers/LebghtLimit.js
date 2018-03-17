class Stringer {
  constructor (str, lenght) {
    this.innerString = str;
    this.innerLength = lenght;
  }

  increase (length) {
    this.innerLength += length;
  }

  decrease (length) {
    this.innerLength -= length;

    if (this.innerLength < 0) {
      this.innerLength = 0;
    }
  }

  toString () {
    let str = this.innerString.substr(0, this.innerLength);

    if (str.length < this.innerString.length) {
      str += '...'
    }

    return str;
  }

}

let test = new Stringer("Test", 5);
console.log(test.toString()); //Test

test.decrease(3);
console.log(test.toString()); //Te...

test.decrease(5);
console.log(test.toString()); //...

test.increase(4);
console.log(test.toString()); //Test
