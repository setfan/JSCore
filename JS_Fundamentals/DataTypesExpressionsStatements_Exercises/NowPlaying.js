function nowPlaying(arr) {
    let trackName = arr[0]
    let artistName = arr[1]
    let duration = arr[2]

    let result = `Now Playing: ${artistName} - ${trackName} [${duration}]`

    console.log(result)
}