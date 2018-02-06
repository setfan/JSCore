function print(arr) {
    let delimiter = arr.pop()
    console.log(arr.join(delimiter))
}

print(["One", "Two", "Three","Four", "Five", "-"])