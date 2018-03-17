function sortArray (numArray, order) {

  let ascendingOrder = (a, b) => {
    return a - b;
  };

  let descendingOrder = (a, b) => {
    return b - a;
  };

  let sorting = {
    'asc': ascendingOrder,
    'desc': descendingOrder,
  };

  return numArray.sort(sorting[order]);

}

console.log(sortArray([14, 7, 17, 6, 8], 'desc'));