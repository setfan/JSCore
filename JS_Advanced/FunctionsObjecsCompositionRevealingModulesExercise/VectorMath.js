let vector = (() =>{
  function add(a, b) {
    return [a[0] + b[0], a[1] + b[1]]
  }
  function multiply(a, b) {
    return [a[0] * b, a[1] * b]
  }
  function length(num) {
    return Math.sqrt((num[0] * num[0]) + (num[1] * num[1]));
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1]
  }
  function cross(a, b) {
    return (a[0] * b[1]) - (a[1] * b[0]);
  }
  return { add, multiply, length, dot, cross }
})();

console.log(vector.add([1, 1], [1, 0]));