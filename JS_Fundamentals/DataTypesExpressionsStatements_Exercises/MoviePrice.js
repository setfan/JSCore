function moviePrice(array) {
    let title = array[0].toLowerCase()
    let day = array[1].toLowerCase()
    let result = ""

    if (title === 'the godfather') {
        switch(day){
            case "wednesday":
            case "friday":
                result = 15
                break
            case "monday":
                result = 12
                break
            case "tuesday":
                result = 10
                break
            case "thursday":
                result = 12.50
                break
            case "saturday":
                result = 25
                break
            case "sunday":
                result = 30
                break
            default:
                result = "error"
                break
        }
    } else if (title === "schindler's list") {
        switch(day){
            case "wednesday":
            case "friday":
            case "monday":
            case "tuesday":
            case "thursday":
                result = 8.50
                break
            case "saturday":
            case "sunday":
                result = 15
                break
            default:
                result = "error"
                break
        }
    } else if (title === "casablanca") {
        switch(day){
            case "wednesday":
            case "friday":
            case "monday":
            case "tuesday":
            case "thursday":
                result = 8
                break
            case "saturday":
            case "sunday":
                result = 10
                break
            default:
                result = "error"
                break
        }
    } else if (title === "the wizard of oz") {
        switch(day){
            case "wednesday":
            case "friday":
            case "monday":
            case "tuesday":
            case "thursday":
                result = 10
                break
            case "saturday":
            case "sunday":
                result = 15
                break
            default:
                result = "error"
                break
        }
    } else {
        result = "error"
    }

    console.log(result)
}