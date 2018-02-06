function lastKNumSequence(n, k) {
    let result = [1]

    for (let i = 1; i < n; i++) {
        let elem =
        result[i] = result.slice(Math.max(0, i-k), i+k).reduce((a,b) => {return a+b})

    }

    console.log(result.join(' '));
}

lastKNumSequence(8, 2)