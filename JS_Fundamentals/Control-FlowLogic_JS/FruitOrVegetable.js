function fruitOrVeg(word) {
    let reult = ""
    switch (word) {
        case "banana":
        case "apple":
        case "kiwi":
        case "cherry":
        case "lemon":
        case "grapes":
        case "peach":
            reult = "fruit"
            break
        case "tomato":
        case "cucumber":
        case "pepper":
        case "onion":
        case "garlic":
        case "parsley":
            reult = "vegetable"
            break
        default:
            reult = "unknown"
    }

    console.log(reult)

}

fruitOrVeg("Ivo")