function sort(arr) {
    console.log(arr.sort(function (a, b) {
        if (a.length === b.length) {
            return a.toLowerCase() > b.toLowerCase()
        }
        return a.length > b.length
    }).join('\n'));

}

sort(["test", "Deny", "omen", "Default"])