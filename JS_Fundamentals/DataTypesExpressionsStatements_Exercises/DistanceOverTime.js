function calculateDistanceOverTime(arr) {
    let timeInHours = (arr[2] / 60) / 60
    let distance1 = arr[0] * timeInHours
    let distance2 = arr[1] * timeInHours;

    let result = Math.abs(distance1 - distance2) * 1000

    console.log(result)

}

calculateDistanceOverTime(0, 60, 3600)