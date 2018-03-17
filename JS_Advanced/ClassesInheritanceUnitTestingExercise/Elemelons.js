function solve () {
  class Melon {
    constructor (weight, melonSort) {
      if (new.target === Melon) {
        throw new Error('Abstract class can not be instanced.');
      }
      this.weight = weight;
      this.melonSort = melonSort;
      this.setElement = this.constructor.name;
    }

    set setElement (value) {
      this.element = value.substr(0, value.length - 5);
    }

    get elementIndex () {
      return this.weight * this.melonSort.length;
    }

    toString () {

      return 'Element: ' + this.element + '\nSort: ' +
        this.melonSort + '\nElement Index: ' + this.elementIndex;
    }
  }

  class Watermelon extends Melon {
    constructor (weight, melonSort) {
      super(weight, melonSort);
    }
  }

  class Firemelon extends Melon {
    constructor (weight, melonSort) {
      super(weight, melonSort);
    }
  }

  class Earthmelon extends Melon {
    constructor (weight, melonSort) {
      super(weight, melonSort);
    }
  }

  class Airmelon extends Melon {
    constructor (weight, melonSort) {
      super(weight, melonSort);
    }
  }

  class Melolemonmelon extends Airmelon {
    constructor (weight, melonSort) {
      super(weight, melonSort);
      this.element = 'Water';
      this.morphStates = ['Fire', 'Earth', 'Air'];

    }

    morph () {
      let current = this.element;
      this.morphStates.push(current);
      this.element = this.morphStates.shift();
    }

  }

  return {Melon, Watermelon, Airmelon, Earthmelon, Firemelon, Melolemonmelon};

}