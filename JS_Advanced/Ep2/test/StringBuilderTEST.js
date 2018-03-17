let expect = require('chai').expect;
let StringBuilder = require('../StringBulider');

describe('Test StringBuilder Class', function () {
  let sb;
  beforeEach(function () {
    sb = new StringBuilder('test');
  });
  it('Should contain certain functionality', function () {
    expect(Object.getPrototypeOf(sb).hasOwnProperty('append')).to.equal(true, 'Missing function!');
    expect(Object.getPrototypeOf(sb).hasOwnProperty('prepend')).to.equal(true, 'Missing function!');
    expect(Object.getPrototypeOf(sb).hasOwnProperty('insertAt')).to.equal(true, 'Missing function!');
    expect(Object.getPrototypeOf(sb).hasOwnProperty('remove')).to.equal(true, 'Missing function!');
    expect(Object.getPrototypeOf(sb).hasOwnProperty('toString')).to.equal(true, 'Missing function!');

  });

  it('should instance object without string argument', function () {
    let builder = new StringBuilder();
    expect(builder._stringArray.length).to.be.equal(0, 'Invalid length!');
    expect(builder.toString()).to.be.equal('', 'Invalid instance!');
  });

  it('should instance object with string argument', function () {
    let builder = new StringBuilder('name:');
    expect(builder._stringArray.length).to.be.equal(5, 'Invalid length!');
    expect(builder.toString()).to.be.equal('name:', 'Invalid instance!');
  });

  it('should throw error with invalid input type', function () {
    expect(() => new StringBuilder(18)).to.throw(TypeError);
  });

  it('should append string at the end', function () {
    sb.append(' ' + 'string');
    expect(sb._stringArray.length).to.be.equal(11, 'Invalid length');
    expect(sb.toString()).to.be.equal('test string', 'Invalid result!');
  });

  it('append should throw error with invalid argument type', function () {
    expect(() => sb.append(18)).to.throw(TypeError);
  });

  it('should prepend string at the beginning', function () {
    sb.prepend('tested ');
    expect(sb._stringArray.length)
      .to
      .be
      .equal(sb.toString().length, 'Invalid length!');
    expect(sb.toString()).to.be.equal('tested test', 'Invalid result!');
  });

  it('prepend should throw error with invalid argument type', function () {
    expect(() => sb.prepend(18)).to.throw(TypeError);
  });

  it('insertAt should insert correctly', function () {
    sb.insertAt('demo', 2);
    expect(sb._stringArray.length).to.be.equal(8, 'Invalid length');
    expect(sb.toString()).to.be.equal('tedemost', 'Invalid result!');
  });

  it('insertAt should throw error with invalid argument type', function () {
    expect(() => sb.insertAt({}, 3)).to.throw(TypeError);
  });

  it('remove should remove correctly', function () {
    sb.remove(1, 3);
    expect(sb._stringArray.length).to.be.equal(1, 'Invalid length');
    expect(sb.toString()).to.be.equal('t', 'Invalid result!');
  });
});