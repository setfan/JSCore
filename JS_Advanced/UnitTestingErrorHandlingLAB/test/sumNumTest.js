let expect = require('chai').expect;
let sum = require('../SumOfNumbers');

describe('sum(arr) - sum Array of numbers', function () {
  it('should return 3 for [1, 2]', function () {
    let expectedSum = 3;
    let actualSum = sum([1, 2]);
    expect(actualSum).to.be.equal(expectedSum);
  });

  it('should return 1 for [1]', function () {
    expect(sum([1])).to.be.equal(1);
  });

  it('should return 0 for empty array', function () {
    expect(sum([])).to.be.equal(0);
  });

  it('should return 3 for [1.5, 2.5, -1]', function () {
    let expectedSum = 3;
    let actualSum = sum([1.5, 2.5, -1]);
    expect(actualSum).to.be.equal(expectedSum);
  });

  it('should return NaN for invalid data', function () {
    //expect().is(NaN);
    expect(isNaN(sum([1, 'five', 3])), true);
  });

})