function surveyParser(text) {
    let result = ''
    let invalidFormatError = 'Invalid format'
    let noSurveyError = 'No survey found'

    let svgTag = /<svg>.*<\/svg>/g
    let catTag = /(<cat>)(.+?)(<\/cat>)/g
    let textTag = /<text>.*<\/text>/g
    let labelTag = /(\[)(.*)(\])/g
    let gTag = /(<g>)(.+?)(<\/g>)/g
    let valTag = /<val>(.+?)<\/val>/

    let match1 = svgTag.exec(text)

    if(!match1){
        result = noSurveyError
    } else {
        let catMatch = catTag.exec(match1[0])
        let count = 0
        while (catMatch){
            count++
            if (count ===1){
                let textMatch = textTag.exec(catMatch[0])
                if(!textMatch){
                    result = invalidFormatError
                    console.log(result)
                    return

                } else{
                    let labelMatch = labelTag.exec(catMatch[0])
                    if(!labelMatch){
                        result = invalidFormatError
                        console.log(result);
                        return

                    } else {
                        result = labelMatch[0].substring(1, labelMatch[0].length-1) + ': '
                    }
                }
            }

            if(count === 2){
                let gMatch = gTag.exec(catMatch[2])

                if(!gMatch){
                    result = invalidFormatError
                }else {
                    let value = 0
                    let voters = 0
                    while (gMatch){
                        let tmpVoters = Number(gMatch[2].substring(gMatch[2].indexOf('</val>') + 6, gMatch[2].length))
                        voters += tmpVoters
                        let valMatch = gMatch[2].match(valTag)
                        if(!valMatch){
                            result = invalidFormatError
                            console.log(result);
                            return
                        }
                        value += tmpVoters * Number(valMatch[1])

                        gMatch = gTag.exec(catMatch[2])
                    }
                    let num = (value / voters).toFixed(2)

                    result += Number(num)
                }
            }

            catMatch = catTag.exec(match1[0])
        }
    }

    console.log(result);
}

surveyParser('<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat></svg><p>Some more random text</p>')

/*
function solve(textDoc) {
    const surveyContentRegex = /<svg>(.*?)<\/svg>/g;
    const innerSurveyDataRegex = /<cat>(<text>.*?\[(.+?)\].*?<\/text>)<\/cat>[^<\/>]*?<cat>(.+?)<\/cat>/g;
    const votesRegex = /<g><val>([1-9]|10)<\/val>([1-9][0-9]*)<\/g>/g;

    let category = "";
    let votesCounter = 0;
    let votesSum = 0;

    let hasData = false;
    let validFormat = true;
    while ((m = surveyContentRegex.exec(textDoc)) !== null) {
        hasData = true;
        let survData = innerSurveyDataRegex.exec(m[1]);
        if (survData !== null) {
            category = survData[2];
            let votes = survData[3];
            while ((v = votesRegex.exec(votes))) {
                let ratingValue = Number(v[1]);
                let ratingsCount = Number(v[2]);
                votesCounter += ratingsCount;
                votesSum += (ratingsCount * ratingValue);
            }
        } else {
            validFormat = false;
            break;
        }
    }

    if (hasData) {
        if (validFormat) {
            let average = (votesSum / votesCounter).toFixed(2);
            average = parseFloat(average);
            console.log(`${category}: ${average}`)
        } else {
            console.log("Invalid format");
        }
    } else {
        console.log("No survey found");
    }
}

 */