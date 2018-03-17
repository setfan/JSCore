function fibonachiNumber () {
  let num1 = 0;
  let num2 = 1;

  return function () {
    let sum = num1 + num2;

    num1 = num2;
    num2 = sum;

    return num1;
  };
}

let fib = fibonachiNumber();
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());