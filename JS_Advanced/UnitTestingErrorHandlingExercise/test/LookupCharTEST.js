let expect = require('chai').expect;
let lookupChar = require('../CharLookup');

describe('loockupChar', function () {
  it('non-string first parameter should return undefined', function () {
    expect(lookupChar(13, 0)).to.equal(undefined, 'The function did not return the correct result!')
  });

  it('non-numeric second parameter should return undefined', function () {
    expect(lookupChar('Ivaka', 'Djaro')).to.equal(undefined, 'The function did not return the correct result!')
  });

  it('non-integer second parameter should return undefined', function () {
    expect(lookupChar('Ivaka', 2.123)).to.equal(undefined, 'The function did not return the correct result!')
  });

  it('incorrect index value should return incorrect index', function () {
    expect(lookupChar('Ivaka', 13)).to.equal('Incorrect index', 'The function did not return the correct result!')
  });

  it('negative index value should return incorrect index', function () {
    expect(lookupChar('Ivaka', -1)).to.equal('Incorrect index', 'The function did not return the correct result!')
  });

  it('index value equal to index length should return incorrect index', function () {
    expect(lookupChar('Ivaka', 5)).to.equal('Incorrect index', 'The function did not return the correct result!')
  });

  it('correct parameters should return correct result', function () {
    expect(lookupChar('Pesho', 0)).to.equal('P', 'The function did not return the correct result!')
  });

  it('correct parameters should return correct result', function () {
    expect(lookupChar('Miro', 3)).to.equal('o', 'The function did not return the correct result!')
  });
})