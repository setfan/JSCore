function imperialUnits(num) {
let foot = parseInt(num / 12)
let leftInches = num % 12
    console.log(`${foot}'-${leftInches}"`)
}

imperialUnits(55)