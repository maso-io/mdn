const worker = new Worker("worker.js"); // establish communications with the worker script
const quota = document.querySelector("#quota");
const textArea = document.querySelector("#user-input");

document.querySelector("#generate")
    .addEventListener("click", () => {
        worker.postMessage({
            command: "generate",
            quota: quota.value,
        })

    });

document.querySelector("#reload")
    .addEventListener("click", () => {
        quota.value = ``;
        textArea.value = `To test the responsiveness of the web page while it generates...`;
        document.location.reload()
    });

worker.addEventListener("message", (message) => {
    const output = document.querySelector("#output");
    output.textContent = `Gerated ${message.data.length} primes: ${message.data.primes}`;
});
