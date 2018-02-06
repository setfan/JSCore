function userNames(arr) {
    let result = new Set()

    for (let name of arr) {
        result.add(name)
    }

    let sorted = Array.from(result).sort((a,b) => {
        if(a.length > b.length){
            return 1
        } else if (a.length < b.length){
            return -1
        }

        return a.localeCompare(b)
    })

    sorted.forEach(a => console.log(a))
}

userNames(['Ashton',
'Kutcher',
'Ariel',
'Lilly',
'Keyden',
'Aizen',
'Billy',
'Braston'])