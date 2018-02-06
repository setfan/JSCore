function roadradar(arr) {

    let drivingSpeed = arr[0]
    let drivingArea = arr[1]

    function checklimit(drivingArea) {
        switch (drivingArea) {
            case 'motorway':
                return 130
                break
            case 'interstate':
                return 90
                break
            case 'city':
                return 50
                break
            case 'residential':
                return 20
                break
        }
    }
    let drivingLimit = checklimit(drivingArea)
    let result = ''

    if (drivingSpeed > drivingLimit){
        let diff = drivingSpeed - drivingLimit
        if (diff <= 20){
            result = 'speeding'
        } else if (diff > 20 && diff <= 40){
            result = 'excessive speeding'
        } else {
            result = 'reckless driving'
        }
    }

    console.log(result)

}