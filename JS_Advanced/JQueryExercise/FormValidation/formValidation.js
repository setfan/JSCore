function validate () {
  let userName = $('#username'),
    email = $('#email'),
    password = $('#password'),
    confirmPassword = $('#confirm-password'),
    companyCheckBox = $('#company'),
    companyInfo = $('#companyInfo'),
    companyNumber = $('#companyNumber'),
    submitBtn = $('#submit'),
    validation = $('#valid');

  let isValid = true;

  companyCheckBox.on('change', function () {
    if (companyCheckBox.is(':checked')) {
      companyInfo.css('display', 'block');
    } else {
      companyInfo.css('display', 'none');
    }
  });

  submitBtn.on('click', function (e) {
    e.preventDefault();
    validateForm();

    if (isValid) {
      validation.css('display', 'block');
    } else {
      validation.css('display', 'none');
    }
  });

  function validateForm () {
    isValid = true;
    regexValidate(userName, /^[A-Za-z\d]{3,20}$/g);
    regexValidate(email, /^.*?@.*?\..*$/g);

    if (password.val() === confirmPassword.val()) {
      regexValidate(password, /^\w{5,15}$/g);
      regexValidate(confirmPassword, /^\w{5,15}$/g);
    } else {
      password.css('border', 'solid red');
      confirmPassword.css('border', 'solid red');
      isValid = false;
    }

    if (companyCheckBox.is(':checked')) {
      validateCompanyNumber();
    }
  }

  function regexValidate (elem, pattern) {
    if (pattern.test(elem.val())) {
      elem.css('border', 'none');
    } else {
      elem.css('border', 'solid red');
      isValid = false;
    }
  }

  function validateCompanyNumber () {
    let numValue = Number(companyNumber.val());
    if (numValue >= 1000 && numValue <= 9999) {
      companyNumber.css('border', 'none');
    } else {
      companyNumber.css('border', 'solid red');
      isValid = false;
    }
  }
}
