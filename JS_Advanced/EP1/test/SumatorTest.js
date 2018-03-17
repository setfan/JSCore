let expect = require('chai').expect;
let Sumator = require('../Sumator');

describe('Summator tests', function () {
  let sumator;
  beforeEach(function () {
    sumator = new Sumator();
  });

  it('test data', function () {
    expect(sumator.hasOwnProperty('data')).to.be.equal(true, 'Property data does not exist.')
    expect(sumator.data.length).to.be.equal(0, 'Data length is not correct!');
  });

  it('has functions attached to prototype', function () {
    expect(Object.getPrototypeOf(sumator).hasOwnProperty('add')).to.equal(true, "Missing add function");
    expect(Object.getPrototypeOf(sumator).hasOwnProperty('sumNums')).to.equal(true, "Missing sumNums function");
   // expect(Object.getPrototypeOf(sumator).hasOwnProperty('removeByFilter')).to.equal(true, "Missing removeByFilter function");
    expect(Object.getPrototypeOf(sumator).hasOwnProperty('toString')).to.equal(true, "Missing toString function");
  });

  describe('add function tests', function () {
    it('add only numeric', function () {
      sumator.add(2);
      sumator.add(3);
      sumator.add(4);
      expect(sumator.data.join(', '))
        .to
        .be
        .equal('2, 3, 4', 'Incorrect answer!');
    });

    it('add only objects', function () {
      sumator.add({name: 'Ivo'});
      sumator.add({type: 'Car'});
      expect(sumator.data.join(', '))
        .to
        .be
        .equal('[object Object], [object Object]', 'Incorrect answer!');
    });

    it('add different elements', function () {
      sumator.add({name: 'Ivo'});
      sumator.add(5);
      sumator.add('JS');
      expect(sumator.data.join(', '))
        .to
        .be
        .equal('[object Object], 5, JS', 'Incorrect answer!');
    });
  });

  describe('test sum functionality', function () {
    it('should return zero if non-numeric input', function () {
      sumator.add('6');
      sumator.add('Emo');
      expect(sumator.sumNums()).to.be.equal(0, 'Invalid result!');
    });

    it('numeric input should return correct result', function () {
      sumator.add(8);
      sumator.add(2);
      expect(sumator.sumNums()).to.be.equal(10, 'Invalid result!');
    });

    it('numeric and string input should return correct result', function () {
      sumator.add(8);
      sumator.add('IvoAndonov');
      sumator.add(-2);
      expect(sumator.sumNums()).to.be.equal(6, 'Invalid result!');
    });
  });

  describe('test filter function', function () {
    it('by correct filter should filter correctly', function () {
      for (let i = 1; i <= 10; i++) {
        sumator.add(i);
      }
      sumator.removeByFilter(function (arg) {
        return arg % 2 === 0;
      });
      expect(sumator.data.join(', '))
        .to
        .be
        .equal('1, 3, 5, 7, 9', 'Incorrect result!');
    });

    it('by correct filter should filter correctly', function () {
      for (let i = 1; i <= 5; i++) {
        sumator.add(i);
      }
      sumator.removeByFilter(function (arg) {
        return arg > 5;
      });
      expect(sumator.data.join(', '))
        .to
        .be
        .equal('1, 2, 3, 4, 5', 'Incorrect result!');
    });
  });

  describe('test toString functionality', function () {
    it('with elements should return correct result', function () {
      sumator.add(2);
      sumator.add(2);
      sumator.add({name: 'Emo'});
      expect(sumator.toString()).to.be.equal('2, 2, [object Object]', 'Incorrect result!')
    })

    it('withouth elements should return empty string', function () {
      expect(sumator.toString()).to.be.equal('(empty)', 'Incorrect result!')
    })
  })
});