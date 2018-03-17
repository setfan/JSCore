let expect = require('chai').expect;
let isOddOrEven = require('../EvenOrOdd');

describe('test function odd-even', function () {
  it('numeric should return undefined', function () {
    expect(isOddOrEven(13)).to.equal(undefined, 'Function did not return the correct result.')
  });

  it('object should return undefined', function () {
    expect(isOddOrEven({name: 'Ivaka'})).to.equal(undefined, 'Function did not return the correct result.')
  });
  it('even length string should return correct result', function () {
    expect(isOddOrEven('roar')).to.equal('even', 'Function did not return the correct result.')
  });

  it('odd length string should return correct result', function () {
    expect(isOddOrEven('pesho')).to.equal('odd', 'Function did not return the correct result.')
  });

  it('multiple consecutive checks should return correct result', function () {
    expect(isOddOrEven('AMG')).to.equal('odd', 'Function did not return the correct result.')
    expect(isOddOrEven('Colorado')).to.equal('even', 'Function did not return the correct result.')
    expect(isOddOrEven('Dolores')).to.equal('odd', 'Function did not return the correct result.')
    expect(isOddOrEven('SONY')).to.equal('even', 'Function did not return the correct result.')
    expect(isOddOrEven('Sofia')).to.equal('odd', 'Function did not return the correct result.')
    expect(isOddOrEven('Kremikovci')).to.equal('even', 'Function did not return the correct result.')
  });

});