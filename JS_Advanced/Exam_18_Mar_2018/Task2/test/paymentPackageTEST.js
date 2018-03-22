let expect = require('chai').expect;
let PaymentPackage = require('../paymentPackage');

describe("test PaymentPackage", function() {
  let obj;
  beforeEach(function () {
    obj = new PaymentPackage('test', 55);
  })

  it("should not instance without params", function () {
    expect(() => new PaymentPackage()).to.throw(Error);
  });

  it("should not instance with only one param", function () {
    expect(() => obj = new PaymentPackage('Ivo')).to.throw(Error);
  });

  it("should not instance with only one param", function () {
    expect(() => obj = new PaymentPackage(55)).to.throw(Error);
  });
  it("should not instance with wrong type params", function () {
    expect(() => obj = new PaymentPackage([], 55)).to.throw(Error);
    expect(() => obj = new PaymentPackage('Ivo', {})).to.throw(Error);
  });

  it("should not instance with empty string", function () {
    expect(() => obj = new PaymentPackage('', 55)).to.throw(Error);
  });

  it("should not instance with empty negative value", function () {
    expect(() => obj = new PaymentPackage('', -2)).to.throw(Error);
  });

  describe('test default values', function () {
    let obj = new PaymentPackage('test', 55);
    it('correct name', function () {
      expect(obj.name).to.be.equal('test');
    })

    it('correct name', function () {
      expect(obj.value).to.be.equal(55);
    })

    it('correct name', function () {
      expect(obj.VAT).to.be.equal(20);
    })

    it('correct name', function () {
      expect(obj.active).to.be.equal(true);
    })
  })

  describe('test set methods', function () {

    it('set new name', function () {
      obj.name = 'newName'
      expect(obj.name).to.be.equal('newName');
    })

    it('set new name', function () {
      expect(() => obj.name = '').to.throw(Error);
    })

    it('set new name', function () {
      expect(() => obj.name = 55).to.throw(Error);
    })

    it('set new value', function () {
      obj.value = 99
      expect(obj.value).to.be.equal(99);
    })

    it('set new value', function () {
      obj.value = 99.18
      expect(obj.value).to.be.equal(99.18);
    })

    it('set new value', function () {
      obj.value = 0
      expect(obj.value).to.be.equal(0);
    })

    it('set new value', function () {
      expect(() => obj.value = '').to.throw(Error);
    })

    it('set new value', function () {
      expect(() => obj.value = -18).to.throw(Error);
    })
  })

  describe('test set vat VAT', function () {
    it('set new value', function () {
      obj.VAT = 99
      expect(obj.VAT).to.be.equal(99);
    })

    it('set new VAT', function () {
      obj.VAT = 29.99
      expect(obj.VAT).to.be.equal(29.99);
    })

    it('set new VAT', function () {
      obj.VAT = 0
      expect(obj.VAT).to.be.equal(0);
    })

    it('set new VAT', function () {
      expect(() => obj.VAT = {}).to.throw(Error);
    })

    it('set new VAT', function () {
      expect(() => obj.VAT = -20).to.throw(Error);
    })

    it('set new VAT', function () {
      expect(() => obj.VAT = '').to.throw(Error);
    })
  })

  describe('test set active method', function () {
    it('should throw error', function () {
      expect(() => obj.active = 'NO').to.throw(Error);
    })

    it('should set correctly', function () {
      obj.active = false
      expect(obj.active).to.be.equal(false);
    })
  })

  describe('test toString', function () {
    it('should return correctly', function () {
      expect(obj.toString()).to.be.equal('Package: test\n' +
        '- Value (excl. VAT): 55\n' +
        '- Value (VAT 20%): 66');
    })

  })

  it('has functions attached to prototype', function () {
    expect(Object.getPrototypeOf(obj).hasOwnProperty('name'))
      .to
      .equal(true, "Missing append function");
    expect(Object.getPrototypeOf(obj).hasOwnProperty('value'))
      .to
      .equal(true, "Missing prepend function");
    expect(Object.getPrototypeOf(obj).hasOwnProperty('VAT'))
      .to
      .equal(true, "Missing insertAt function");
    expect(Object.getPrototypeOf(obj).hasOwnProperty('active'))
      .to
      .equal(true, "Missing remove function");
    expect(Object.getPrototypeOf(obj).hasOwnProperty('toString'))
      .to
      .equal(true, "Missing toString function");
  });

  it('all geters should return correct type', function () {
    expect(typeof obj.name).to.be.eq('string');
    expect(typeof obj.value).to.be.eq('number');
    expect(typeof obj.VAT).to.be.eq('number');
    expect(typeof obj.active).to.be.eq('boolean');
    expect(typeof obj.toString()).to.be.eq('string');

  });

})
