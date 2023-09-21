// using promise based API
// chaining promises
// a promise is an object returned by an asynchrouns function and provides infomartion about the current state of the operation as well as provides methods to handle the eventual success or failure of an operation
//const fetchPromise = fetch("https://mdnn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");

async function fetchPromise() {
    try {
        const response = await fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"); // returns a response object for the fetcht promise function called or throws an error
        if (!response.ok) { // anticipates the error in response object .i.e. 404 Not found
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();  // call the json() parse method of the response object, returns a promise

        return (data); // returns the jsno() parse method promise
    }
    catch (error) { // try and catch block anticipates an error with the fetch function
        console.log(`Error could not get products:: ${error}`)
    }
}
console.log("FETCH STARTING...");
const dataJS = fetchPromise();
//console.log(dataJS);
dataJS.then((data) => console.log(data));
