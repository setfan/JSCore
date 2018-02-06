function cookingFunctions(arr) {
    let num = arr[0]

    for (let i = 1; i < arr.length; i++) {

        console.log(cookNum(arr[i]));
    }

    function cookNum(operation) {

        switch (operation){
            case 'chop':
                num = num / 2
                break
            case 'dice':
                num = Math.sqrt(num)
                break
            case 'spice':
                num++
                break
            case 'bake':
                num = num*3
                break
            case 'fillet':
                num = num - (num*0.2)
                break
        }

        return num
    }
    
}

cookingFunctions(['32', 'chop', 'chop', 'chop', 'chop', 'chop'])