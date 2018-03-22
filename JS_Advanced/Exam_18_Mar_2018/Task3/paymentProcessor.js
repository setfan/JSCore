class PaymentProcessor {
  constructor (options) {
    this.setOptions(options);
    this._payments = new Map;
    this._totalPayments = 0;
    this._totalBalance = 0;
  }

  registerPayment (id, name, type, value) {
    this._validatePayment(id, name, type, value);
    let payment = {name, type, value};

    this._payments.set(id, payment);

    this._totalPayments++;
    this._totalBalance += value;

  }

  deletePayment (id) {
    if (!this._payments.has(id)) {
      throw  new Error('Id already exists.');
    }
    this._totalPayments--;
    this._totalBalance -= this._payments.get(id).value;

    this._payments.delete(id);
  }

  get (id) {

    if (!this._payments.has(id)) {
      throw  new Error('Id already exists.');
    }
    let elem = this._payments.get(id);

    let result = `Details about payment ID: ${id}\n- Name: ${elem.name}\n- Type: ${elem.type}\n- Value: ${elem.value.toFixed(
      this._options.precision)}`;

    return result;

  }

  setOptions (value) {

    let defOptions = {
      types: ['service', 'product', 'other'],
      precision: 2,
    };
    this._options = defOptions;

    if(value){
      if (this._validateOptions(value)) {
        for (let elem in value) {
          this._options[elem] = value[elem];
        }
      }
    }
  }

  toString () {
    let result = `Summary:\n- Payments: ${this._totalPayments}\n- Balance: ${this._totalBalance.toFixed(
      this._options.precision)}`;

    return result;
  }

  _validateOptions (value) {
    if (value.types === undefined && value.precision === undefined) {
      return false;
    }

    if ((value.types && typeof value.types[0] === 'string') ||
      (value.precision && typeof value.precision === 'number')) {
      return true;
    }

    return false;
  }

  _validatePayment (id, name, type, value) {

    if (this._payments.has(id) || id === '') {
      throw  new Error('Invalid id.');
    }

    if (name === undefined || name === '') {
      throw  new Error('Invalid name.');
    }

    if (typeof value !== 'number') {
      throw  new Error('Invalid value.');
    }

    if (!this._options.types.includes(type)) {
      throw  new Error('Invalid type.');
    }
  }
}

const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());

// Should throw an error (invalid type)
//generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials',
// 8000);

generalPayments.setOptions({types: ['product', 'material']});
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material',
  8000);
console.log(generalPayments.get('E028'));
generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);

// Should throw an error (ID not found)
//generalPayments.deletePayment('E027');
// Should throw an error (ID not found)
//generalPayments.get('E027');

generalPayments.deletePayment('E028');
console.log(generalPayments.toString());

// Initialize processor with custom types
const servicePyaments = new PaymentProcessor({types: ['service']});
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({precision: 5});
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other',
  0.00153);
console.log(transactionLog.toString());
