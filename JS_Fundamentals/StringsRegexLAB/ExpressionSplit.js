function expressionSplit(string) {
    let expression = string.split(/[\s.();,]+/)
    console.log(expression.join('\n'));

}

expressionSplit('let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}')

