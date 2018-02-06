function coneVoluem(r, h) {
    let volume = (Math.PI * r * r) * (h / 3)
    let area = Math.PI * r * (r + Math.sqrt((h * h) + (r * r)))

    console.log("volume = " + volume)
    console.log("area = " + area)

}

coneVoluem(3, 5)