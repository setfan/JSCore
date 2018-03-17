function bitcoins(arr) {
    let result = ''
    let bitcoins = 0
    let firstBitcoinDay = 0
    let money = 0

    for (let i = 0; i < arr.length; i++) {
        let dailyMoney = Number(arr[i]) * 67.51
        if ((i + 1) % 3 === 0) {
            dailyMoney = dailyMoney * 0.7
        }
        money += dailyMoney
        let tmp = parseInt(money / 11949.16)
        if (tmp >= 1) {
            if (bitcoins === 0) {
                firstBitcoinDay = i + 1
            }
            bitcoins += tmp

            money -= (tmp * 11949.16)
        }
    }

    result = `Bought bitcoins: ${bitcoins}\n`
    if (firstBitcoinDay >= 1) {
        result += `Day of the first purchased bitcoin: ${firstBitcoinDay}\n`
    }
    result += `Left money: ${money.toFixed(2)} lv.`
    console.log(result);
}

bitcoins(['100', '200', '300'])