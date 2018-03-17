function solve () {
  let sortedList = {
    items: [],
    add: add,
    remove: remove,
    get: get,
    size: 0,
  };

  return sortedList;

  function add (elem) {
    sortedList.items.push(elem);
    sortedList.size++;
    sort();
  }

  function remove (index) {
    if (index >= -0 && index < sortedList.items.length) {
      sortedList.items.splice(index, 1);
      sortedList.size--;
    }
    sort();
  }

  function get (index) {
    if (index >= 0 && index < sortedList.items.length) {
      return sortedList.items[index];
    }
  }

  function sort () {
    sortedList.items.sort((a, b) => a - b);
  }
}