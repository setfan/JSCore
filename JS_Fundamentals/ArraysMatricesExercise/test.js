function sorting(arr) {
    arr = arr.sort(function(a, b){return a - b})

    console.log(arr.join(', '));

}

sorting([30, 10, 50, 100, 10, 10, 9, 11, 0, 1, -5, -6, 5])