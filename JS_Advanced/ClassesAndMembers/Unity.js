function result () {
  class Rat{
    constructor (name){
      this.name = name;
      this.rats = [];
    }

    unite(rat){
      if(rat instanceof Rat){
        this.rats.push(rat);
      }
    }

    getRats () {
      return this.rats;
    }

    toString(){
      let resultStr = '';
      resultStr = this.name;

      for (let obj of this.rats) {
        resultStr += '\n##' + obj.name;
      }

      return resultStr;
    }
  }

  let test = new Rat("Pesho");
  console.log(test.toString()); //Pesho

  console.log(test.getRats()); //[]

  test.unite(new Rat("Gosho"));
  test.unite(new Rat("Sasho"));
  console.log(test.getRats());
//[ Rat { name: 'Gosho', unitedRats: [] },
//  Rat { name: 'Sasho', unitedRats: [] } ]

  console.log(test.toString());

}

result();