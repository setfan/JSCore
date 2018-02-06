function extractLinks(arr) {
   let pattern = /www\.[a-zA-Z0-9-]+(\.[a-z]+)+/g

    let result = []

    for (let item of arr) {
       let match = pattern.exec(item)

        while (match){
           result.push(match[0])

            match = pattern.exec(item)
        }
    }

    console.log(result.join('\n'));
}

extractLinks(['Join WebStars now for free, at www.web-stars.com',
'You can also support our partners:',
'Internet - www.internet.com',
'WebSpiders - www.webspiders101.com',
'Sentinel - www.sentinel.-ko '])