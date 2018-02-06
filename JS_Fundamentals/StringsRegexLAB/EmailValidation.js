function emailValidation(mailStr) {
    let mailPattern = /^[a-zA-Z0-9]+@[a-z]+(\.[a-z]+)+$/g

    let match = mailPattern.test(mailStr)
    if(match){
        console.log('Valid')
    } else {
        console.log('Invalid');
    }
}

emailValidation('valid@email1.bg')