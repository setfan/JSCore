class CheckingAccount{
  constructor (clientId, email, firstName, lastName ){
    this.clientId = clientId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  set clientId (value) {
    let requiredIdParams = /^[0-9]{6}$/g;
    CheckingAccount.isValid(value, requiredIdParams, 'Client ID must be a 6-digit number')
    this._clientId = value;
  }

  set email (value) {
    let requiredEmailParams = /^[a-zA-Z]+@[a-zA-Z.]+$/g;
    CheckingAccount.isValid(value, requiredEmailParams, 'Invalid e-mail')
    this._email = value;
  }

  set firstName (value) {
    let requiredNameLength = /.{3,20}/g;
    let requiredNameChars = /^[a-zA-Z]+$/g;
    CheckingAccount.isValid(value, requiredNameLength, 'First name must be between 3 and 20 characters long');
    CheckingAccount.isValid(value, requiredNameChars, 'First name must contain only Latin characters');
    this._firstName = value;
  }

  set lastName (value) {
    let requiredNameLength = /.{3,20}/g;
    let requiredNameChars = /^[a-zA-Z]+$/g;
    CheckingAccount.isValid(value,requiredNameLength, 'Last name must be between 3 and 20 characters long');
    CheckingAccount.isValid(value, requiredNameChars, 'Last name must contain only Latin characters');
    this._lastName = value;
  }

  static isValid(value, regex, errorMessage){
    if(!regex.test(value)){
      throw new TypeError(errorMessage);
    }
  }
}

let acc = new CheckingAccount('1314', 'ivan@some.com', 'Ivan', 'Petrov');