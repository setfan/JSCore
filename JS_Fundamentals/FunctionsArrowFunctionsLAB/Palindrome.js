function palindrome(value) {
    return value.split('').reverse().join('') === value
}

console.log(palindrome("tacocat"))

s