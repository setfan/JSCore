const expect = require('chai').expect;
const Console = require('../CSharpConsole');

describe('C#Console', function () {
  it('correct string parameter should print correct result', function () {
    expect(Console.writeLine('test')).to.be.equal('test', 'Function did not return correct result!');
  });

  it('correct string parameter should print correct result', function () {
    let obj = {test: 'test'};
    expect(Console.writeLine(obj)).to.be.equal(JSON.stringify(obj), 'Function did not return correct result!');
  });

  it('correct string parameter should print correct result', function () {
    expect(Console.writeLine('{0}, {1}, {2}', 1, 2, 3))
      .to
      .be
      .equal('1, 2, 3', 'Function did not return correct result!');
  });

  it('Should throw RangeError', function () {
    expect(() => {Console.writeLine([], 1, 2)}).to.throw(TypeError)
  })

  it('Should throw RangeError', function () {
    expect(() => {Console.writeLine('{0}', 1, 2)}).to.throw(RangeError)
  })

  it('Should throw RangeError', function () {
    expect(() => {Console.writeLine('{10}', 1, 2)}).to.throw(RangeError)
  })

});
