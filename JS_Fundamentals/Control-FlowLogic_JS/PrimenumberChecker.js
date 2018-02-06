function primeChecker(n) {

    let prime = true;
    if (n <= 0 || n === 1)
    {
        prime = false;
    }
    else
    {
        for (let i = 2; i <= Math.sqrt(n); i++)
        {
            if (n % i === 0)
            {
                prime = false;
                break;
            }
        }
    }
    return prime;
}