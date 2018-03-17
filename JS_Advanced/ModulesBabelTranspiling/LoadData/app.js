let arr = require('./data');

function sort(property) {
  arr = arr.sort((a,b) => {
    return a[property].localeCompare(b[property])
  });

  return arr;
}

function filter(property, value) {
 arr = arr.filter(a => a[property] === value);
 return arr;
}


result.sort = sort;
result.filter = filter;
