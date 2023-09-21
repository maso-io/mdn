// implementation of a promised-based API to set an alarm for a person
function alarm(person, delay) {
    console.log(`Setting an alarm for ${person}\nFor ${delay}ms`)
    return new Promise((resolve, reject) => {
        if (delay < 0) {
            // if we throw an error 'reject' is automatically called
            throw new Error(`Delay cannot be a negative value`);
        }
        setTimeout(() => {
            resolve(`Wake up ${person}!!`);
        }, delay);
    })
};

async function setAlarm(person, delay) {
    try {
        const resolve = await alarm(person, delay); // This makes the code wait at this point until the promise is settled, at which point the fulfilled(succeded) value of the promise is treated as a return value, or the rejected value is thrown 
        console.log(resolve);
        //return resolve; // async function returns a promise object, so you have to use then() or return void
    }
    catch (error) {         // grabs the rejected value in case of error
        console.log(`couldn't set alarm, ${error}`);
    }
}

setAlarm('maso', 2000);
//const prom = setAlarm('maso', 2000);
//prom.then((m) => console.log(`mhhhh: ${m}`))
//setAlarm('steve', -20);