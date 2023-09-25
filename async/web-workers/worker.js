addEventListener("message", (message) => {
    if (message.data.command === "generate") {
        generatePrimes(message.data.quota);
    }
})

function generatePrimes(quota) {

    function isPrime(n) {
        for (c = 2; c < Math.sqrt(n); c++) {
            if (n % c == 0) {
                return false;
            }
        }
        return true;
    }

    const primes = [];
    const max = 10000;

    while (primes.length < quota) {
        const num = Math.floor(Math.random() * (max + 1));
        if (isPrime(num)) {
            primes.push(num);
        }
    }

    postMessage({
        primes: primes,
        length: primes.length,
    })
}