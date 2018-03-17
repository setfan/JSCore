function result () {
  class Figure{
    constructor (){
      if(new.target === Figure){
        throw new Error('Abstract class can not be instanced.');
      }
    }

    get area(){
      return undefined;
    }

    toString(){
      return this.constructor.name;
    }
  }

  class Circle extends Figure{
    constructor(radius){
      super();
      this.radius = radius;
    }
    get area(){
      return Math.PI * this.radius * this.radius;
    }

    toString(){
      let str = super.toString();
      return str + ` - radius: ${this.radius}`
    }
  }

  class Rectangle extends Figure{
    constructor (width, heigth){
      super();
      this.width = width;
      this.height = heigth;
    }

    get area(){
      return this.height * this.width;
    }

    toString(){
      let str = super.toString();
      return str + ` - width: ${this.width}, height: ${this.height}`
    }
  }

  return {Figure, Circle, Rectangle}

}