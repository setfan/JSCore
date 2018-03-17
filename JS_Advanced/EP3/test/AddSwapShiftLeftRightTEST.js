let expect = require('chai').expect;
let createList = require('../list-add-swap-shift-left-right');

describe('Test list functionality', function () {
  let list;
  beforeEach(function () {
    list = createList();
  });
  describe('add', function () {
    it('shuuld add correctly', function () {
      list.add('pesho');
      list.add('gosho');
      list.add(6);
      expect(list.toString()).to.be.equal('pesho, gosho, 6', 'Invalid Result!');
    });
  });

  describe('shiftLeft', function () {
    it('should shift correctly', function () {
      list.add('pesho');
      list.add('gosho');
      list.add(6);
      list.shiftLeft();
      expect(list.toString()).to.be.equal('gosho, 6, pesho', 'Invalid Result!');
    });
  });

  describe('shiftRight', function () {
    it('should shift correctly', function () {
      list.add('pesho');
      list.add('gosho');
      list.add(6);
      list.shiftRight();
      expect(list.toString()).to.be.equal('6, pesho, gosho', 'Invalid Result!');
    });
  });

  describe('swap', function () {
    it('should swap correctly', function(){
      list.add(1);
      list.add(2);
      list.add(3);
      list.add(4);
      expect(list.swap(1, 2)).to.equal(true, 'Incorrect result!');
      expect(list.toString()).to.be.eq('1, 3, 2, 4', 'Incorrect result!');
    });

    it('should swap correctly', function(){
      list.add(1);
      list.add(2);
      list.add(3);
      list.add(4);
      expect(list.swap(0, 2)).to.equal(true, 'Incorrect result!');
      expect(list.toString()).to.be.eq('3, 2, 1, 4', 'Incorrect result!');
    });

    it('should swap correctly', function(){
      list.add(1);
      list.add(2);
      list.add(3);
      list.add(4);
      expect(list.swap(1, 3)).to.equal(true, 'Incorrect result!');
      expect(list.toString()).to.be.eq('1, 4, 3, 2', 'Incorrect result!');
    });

    it('should swap correctly', function(){
      list.add(1);
      list.add(2);
      list.add(3);
      list.add(4);
      expect(list.swap(0, 10)).to.equal(false, 'Incorrect result!');
      expect(list.toString()).to.be.eq('1, 2, 3, 4', 'Incorrect result!');
    });

    it('should swap correctly', function(){
      list.add(1);
      list.add(2);
      list.add(3);
      list.add(4);
      expect(list.swap(-1, 3)).to.equal(false, 'Incorrect result!');
      expect(list.toString()).to.be.eq('1, 2, 3, 4', 'Incorrect result!');
    });

    it('should swap correctly', function(){
      list.add(1);
      list.add(2);
      expect(list.swap('ivo', 3)).to.equal(false, 'Incorrect result!');
      expect(list.toString()).to.be.eq('1, 2', 'Incorrect result!');
    });
  });

  describe('toString', function () {
    it('should add correctly', function(){
      list.add(1);
      list.add(2);
      list.add(3);
      expect(list.toString()).to.be.eq('1, 2, 3', 'Incorrect result!');
    });
  });

});
