function epicness(kingdomArr, battlesArr) {
    let kingdomsMap = new Map()

    for (let obj of kingdomArr) {
        if (kingdomsMap.has(obj.kingdom)) {
            if (kingdomsMap.get(obj.kingdom).has(obj.general)) {
                let tmp = kingdomsMap.get(obj.kingdom).get(obj.general).army
                let stats = {army: tmp + obj.army, wins: 0, losses: 0}
                kingdomsMap.get(obj.kingdom).set(obj.general, stats)
            } else {
                let stats = {army: obj.army, wins: 0, losses: 0}
                kingdomsMap.get(obj.kingdom).set(obj.general, stats)
            }
        } else {
            let generalStats = new Map()
            let stats = {army: obj.army, wins: 0, losses: 0}
            generalStats.set(obj.general, stats)
            kingdomsMap.set(obj.kingdom, generalStats)
        }
    }

    for (let obj of battlesArr) {
        let [AKingdom, AGeneral, DefKingdom, DefGeneral] = obj

        if (AKingdom !== DefKingdom) {
            let army1 = kingdomsMap.get(AKingdom).get(AGeneral).army
            let wins1 = kingdomsMap.get(AKingdom).get(AGeneral).wins
            let loses1 = kingdomsMap.get(AKingdom).get(AGeneral).losses

            let army2 = kingdomsMap.get(DefKingdom).get(DefGeneral).army
            let wins2 = kingdomsMap.get(DefKingdom).get(DefGeneral).wins
            let loses2 = kingdomsMap.get(DefKingdom).get(DefGeneral).losses

            if (army1 > army2) {
                let statsWinner = {army: parseInt(army1 * 1.1), wins: wins1 + 1, losses: loses1}
                kingdomsMap.get(AKingdom).set(AGeneral, statsWinner)
                let statsLoser = {army: parseInt(army2 * 0.9), wins: wins2, losses: loses2 + 1}
                kingdomsMap.get(DefKingdom).set(DefGeneral, statsLoser)
            } else if (army1 < army2) {
                let statsWinner = {army: parseInt(army2 * 1.1), wins: wins2 + 1, losses: loses2}
                kingdomsMap.get(DefKingdom).set(DefGeneral, statsWinner)
                let statsLoser = {army: parseInt(army1 * 0.9), wins: wins1, losses: loses1 + 1}
                kingdomsMap.get(AKingdom).set(AGeneral, statsLoser)
            }
        }
    }

    let sortedKingdoms = Array.from(kingdomsMap.entries()).sort((a, b) => {
        let [aWins, aLosses, bWins, bLosses] = [sumWins([...a[1]]), sumLosses([...a[1]]), sumWins([...b[1]]), sumLosses([...b[1]])]
        function sumWins(arr) {return arr.map(e => a.wins).reduce((a, b) => a + b)}
        function sumLosses(arr) {return arr.map(e => a.losses).reduce((a, b) => a + b)}

        if (aWins !== bWins) {
            return bWins - aWins
        } else if (aLosses !== bLosses) {
            return aLosses - bLosses
        }
        return a[0].localeCompare(b[0])
    })

    console.log(`Winner: ${sortedKingdoms[0][0]}`)
    Array.from(sortedKingdoms[0][1]).sort((a, b) => {
        return b[1].army - a[1].army
    }).forEach(a => {
        console.log(`/\\general: ${a[0]}\n---army: ${a[1].army}\n---wins: ${a[1].wins}\n---losses: ${a[1].losses}`)
    })
}

epicness([{kingdom: "Maiden Way", general: "Merek", army: 5000},
        {kingdom: "Stonegate", general: "Ulric", army: 4900},
        {kingdom: "Stonegate", general: "Doran", army: 70000},
        {kingdom: "YorkenShire", general: "Quinn", army: 0},
        {kingdom: "YorkenShire", general: "Quinn", army: 2000}],
    [["YorkenShire", "Quinn", "Stonegate", "Doran"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"]]
)