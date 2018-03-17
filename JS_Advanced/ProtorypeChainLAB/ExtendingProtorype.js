function extendPrototype (className) {
  className.prototype.species = 'Human'
  className.prototype.toSpeciesString = function () {
   return `I am a ${this.species}. ${this.toString()}`;
  }

}

class Person {
  constructor(name, email){
    this.name = name;
    this.email = email;
  }

  toString(){
    let className = this.constructor.name;
    return `${className} (name: ${this.name}, email: ${this.email})`
  }
}
extendPrototype(Person)

let test = new Person('Ivo', 'ivaka@abv.bg')

console.log(test.toSpeciesStrin());