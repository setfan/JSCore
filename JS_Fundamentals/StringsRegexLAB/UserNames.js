function userNames(arr) {
    let result = []

    for (let email of arr) {
        let tokenns = email.split('@')
        let user = tokenns[0] + '.'
        let domain = tokenns[1].split('.')

        domain.forEach(a => user += a[0])

        result.push(user)

    }

    console.log(result.join(', '));
}

userNames(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com'])