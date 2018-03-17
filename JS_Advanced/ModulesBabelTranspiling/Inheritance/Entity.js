class Entity{
  constructor (name){
    if(new.target === Entity){
      throw new Error('Unable to instance abstract class.')
    }
    this.name = name;
  }
}

module.exports = Entity;