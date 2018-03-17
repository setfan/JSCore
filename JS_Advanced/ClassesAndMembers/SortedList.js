class SortedList{
  constructor (){
    this.items = [];
    this.size = 0;
  }

  add(elem){
    this.items.push(elem);
    this.size++;
    this.sort();
  }

  remove(index){
    if (index >= -0 && index < this.items.length) {
      this.items.splice(index, 1);
      this.size--;
    }
    this.sort();
  }

  get(index){
    if (index >= 0 && index < this.items.length) {
      return this.items[index];
    }
  }

  getSize(){
    return this.size;
  }

  sort () {
    this.items.sort((a, b) => a - b);
  }

}