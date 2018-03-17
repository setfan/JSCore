let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');
let sharedObject = require('../SharedObject');

document.body.innerHTML = '<body>\n' +
  '<div id="wrapper">\n' +
  '    <input type="text" id="name">\n' +
  '    <input type="text" id="income">\n' +
  '</div>';

describe('Shared object unit tests', function () {
  describe('Initial value tests', function () {
    it('initial name should be null', function () {
      expect(sharedObject.name)
        .to
        .be
        .equal(null, 'Expected result is not correct.');
    });

    it('initial income should be null', function () {
      expect(sharedObject.income)
        .to
        .be
        .equal(null, 'Expected result is not correct.');
    });
  });

  describe('ChangeName tests', function () {
    it('With empty string name should be null', function () {
      sharedObject.changeName('');
      expect(sharedObject.name)
        .to
        .be
        .equal(null, 'Expected result is not correct.');
    });

    it('With non-empty string name should be correct', function () {
      sharedObject.changeName('Ivaka');
      expect(sharedObject.name)
        .to
        .be
        .equal('Ivaka', 'Expected result is not correct.');
    });
  });

  describe('Input name tests', function () {
    it('With empty string name should be correct', function () {
      sharedObject.changeName('Andonov');
      sharedObject.changeName('');
      let textName = $('#name');
      expect(textName.val())
        .to
        .be
        .equal('Andonov', 'Expected result is not correct.');
    });

    it('With empty string name should be empty string', function () {
      sharedObject.changeName('TheHook');
      let textName = $('#name');
      expect(textName.val())
        .to
        .be
        .equal('TheHook', 'Expected result is not correct.');
    });
  });

  describe('ChangeIncome tests', function () {
    it('with string input should be null', function () {
      sharedObject.changeIncome('test');
      expect(sharedObject.income)
        .to
        .be
        .equal(null, 'Expected result is not correct.');
    });

    it('with string input should be null', function () {
      sharedObject.changeIncome(8);
      sharedObject.changeIncome('test');
      let incomeObj = $('#income');
      expect(incomeObj.val())
        .to
        .be
        .equal('8', 'Expected result is not correct.');
    });

    it('with floating number should be null', function () {
      sharedObject.changeIncome(8);
      sharedObject.changeIncome(4.73);
      let incomeObj = $('#income');
      expect(incomeObj.val())
        .to
        .be
        .equal('8', 'Expected result is not correct.');
    });

    it('with negative number should be null', function () {
      sharedObject.changeIncome(8);
      sharedObject.changeIncome(-18);
      let incomeObj = $('#income');
      expect(incomeObj.val())
        .to
        .be
        .equal('8', 'Expected result is not correct.');
    });

    it('with zero should be null', function () {
      sharedObject.changeIncome(8);
      sharedObject.changeIncome(0);
      let incomeObj = $('#income');
      expect(incomeObj.val())
        .to
        .be
        .equal('8', 'Expected result is not correct.');
    });

    it('float number input should be integer', function () {
      sharedObject.changeIncome(5);
      sharedObject.changeIncome(4.73);
      expect(sharedObject.income)
        .to
        .be
        .equal(5, 'Expected result is not correct.');
    });

    it('negative number input should not change the value', function () {
      sharedObject.changeIncome(5);
      sharedObject.changeIncome(-3);
      expect(sharedObject.income)
        .to
        .be
        .equal(5, 'Expected result is not correct.');
    });

    it('zero az input should not change the value', function () {
      sharedObject.changeIncome(5);
      sharedObject.changeIncome(0);
      expect(sharedObject.income)
        .to
        .be
        .equal(5, 'Expected result is not correct.');
    });

    it('correct input should change the value', function () {
      sharedObject.changeIncome(5);
      sharedObject.changeIncome(8);
      expect(sharedObject.income)
        .to
        .be
        .equal(8, 'Expected result is not correct.');
    });
  });

});