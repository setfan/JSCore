function sumAndVat(numbers) {

    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum+= numbers[i];

    }

    let vat = (sum * 0.20);

    let total = sum * 1.20;

    console.log(`sum =${sum}\nVAT = ${vat}\ntotal =${total}`)
}

sumAndVat([1.20,2.60,3.50])