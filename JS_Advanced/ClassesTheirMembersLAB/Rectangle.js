class Rectangle {
  constructor (width, height, color){
    this.width = width;
    this.height = height;
    this.color = color;
  }

  calcArea(){
    return this.width * this.height;
  }

}

let redRec = new Rectangle(5, 10, 'red');

console.log(redRec);