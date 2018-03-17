let expect = require('chai').expect;
let createCalculator = require('../AddSubtract');

describe('test calculator', function () {
  let calc;
  beforeEach(function() {
    calc = createCalculator();
  });

  it("should return 0 after {}", function() {
    let value = calc.get();
    expect(value).to.be.equal(0);
  });
  it("should return 5 after {add 3; add 2}", function() {
    calc.add(3); calc.add(2); let value = calc.get();
    expect(value).to.be.equal(5);
  });

  it("should return 5 after {add 3; add 2}", function() {
    calc.subtract(3); calc.subtract(2); let value = calc.get();
    expect(value).to.be.equal(-5);
  });

  it("should return 5 after {add 3; add 2}", function() {
    calc.add(5.3); calc.subtract(1.1); let value = calc.get().toFixed(1);
    expect(Number(value)).to.be.equal(4.2);
  });

  it("should return 5 after {add 3; add 2}", function() {
    calc.add(10); calc.subtract('7'); calc.add('-2'); calc.subtract(-1);  let value = calc.get();
    expect(value).to.be.equal(2);
  });

  it("should return 5 after {add 3; add 2}", function() {
    calc.add('Hello'); let value = calc.get();
    expect(isNaN(calc.get()), true);
  });

  it("should return 5 after {add 3; add 2}", function() {
    calc.subtract('Hello'); let value = calc.get();
    expect(isNaN(calc.get()), true);
  });

});