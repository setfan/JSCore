class Circle {
  constructor (radius) {
    this.radius = radius;
  }

  set diameter (value) {
    this.radius = value / 2;
  }
  get diameter(){
    return this.radius * 2;
  }

  get area () {
    //return Math.PI * (this.radius **2);
    return Math.PI * this.radius * this.radius;
  }
}

let circle = new Circle(5);

console.log(circle.area);