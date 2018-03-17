let expect = require('chai').expect;
let mathEnforcer = require('../MathEnforcer');

describe('mathEbforcer', function () {
  describe('addFive', function () {
    it('non-number parameter should return correct result', function () {
      expect(mathEnforcer.addFive('5')).to.equal(undefined, 'Function did not return the correct result.')
    })

    it('non-number parameter should return correct result', function () {
      expect(mathEnforcer.addFive({number: 5})).to.equal(undefined, 'Function did not return the correct result.')
    })

    it('correct integer parameter should return correct result', function () {
      expect(mathEnforcer.addFive(5)).to.be.equal(10, 'Function did not return the correct result.')
    })

    it('correct float parameter should return correct result', function () {
      expect(mathEnforcer.addFive(2.52)).to.be.equal(7.52, 'Function did not return the correct result.')
    })

    it('negative parameter should return correct result', function () {
      expect(mathEnforcer.addFive(-5)).to.be.equal(0, 'Function did not return the correct result.')
    })
  })

  describe('subtractTen', function () {
    it('non-number parameter should return correct result', function () {
      expect(mathEnforcer.subtractTen('20')).to.equal(undefined, 'Function did not return the correct result.')
    })

    it('non-number parameter should return correct result', function () {
      expect(mathEnforcer.subtractTen({number: 50})).to.equal(undefined, 'Function did not return the correct result.')
    })

    it('negative parameter should return correct result', function () {
      expect(mathEnforcer.subtractTen(-5)).to.be.equal(-15, 'Function did not return the correct result.')
    })

    it('correct integer parameter should return correct result', function () {
      expect(mathEnforcer.subtractTen(20)).to.be.equal(10, 'Function did not return the correct result.')
    })

    it('correct float parameter should return correct result', function () {
      expect(mathEnforcer.subtractTen(20.52)).to.be.equal(10.52, 'Function did not return the correct result.')
    })
  })

  describe('sum', function () {
    it('non-number parameters should return correct result', function () {
      expect(mathEnforcer.sum('20', 18)).to.equal(undefined, 'Function did not return the correct result.')
    })

    it('non-number parameter should return correct result', function () {
      expect(mathEnforcer.sum(18, '15')).to.equal(undefined, 'Function did not return the correct result.')
    })

    it('non-number parameters should return correct result', function () {
      expect(mathEnforcer.sum('20', '15')).to.equal(undefined, 'Function did not return the correct result.')
    })

    it('correct integer parameters should return correct result', function () {
      expect(mathEnforcer.sum(5, 10)).to.be.equal(15, 'Function did not return the correct result.')
    })

    it('correct float parameter should return correct result', function () {
      expect(mathEnforcer.sum(10.25, 10.25)).to.be.equal(20.50, 'Function did not return the correct result.')
    })

    it('negative parameters should return correct result', function () {
      expect(mathEnforcer.sum(-5, 15)).to.be.equal(10, 'Function did not return the correct result.')
    })
  })

})