function rotate(arr) {
    let num = Number(arr.pop())
    for (let i = 0; i < num % arr.length; i++) {
        arr.unshift(arr.pop())
    }
    console.log(arr.join(' '));
}

rotate([1, 2, 3, 4, 2])
rotate(["Banana", "Orange", "Coconut", "Apple","15"])