function strOccurrance(target, str) {
    let counter = 0
    let startIndex = str.indexOf(target)

    while (startIndex > -1) {
        counter++

        startIndex = str.indexOf(target, startIndex + 1)
    }

    console.log(counter)
}

strOccurrance('ma', 'Marine mammal training is the training and caring for marine life such as, dolphins, killer whales, sea lions, walruses, and other marine mammals. It is also a duty of the trainer to do mental and physical exercises to keep the animal healthy and happy.')