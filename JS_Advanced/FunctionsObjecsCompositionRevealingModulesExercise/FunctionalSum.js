function result (num1) {
  let sum = num1;

  function add (num2) {
    sum += num2;
    return add;
  }

  add.toString = function () {
    return sum;
  };
  let arr = [1,2,4]
  let result = 0;
  arr.forEach(a => result+=a);

  return add;
}

console.log(Number(result(15)(16)(21)));
