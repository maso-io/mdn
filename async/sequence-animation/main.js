const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

const keyFrames = [
    { transform: "rotate(0) scale(1) translate3D(-50%, -50%, 0)" },
    { transform: "rotate(360deg) scale(0) translate3D(-50%, -50%, 0)", color: "yellow" }
];

const animationTiming = {
    duration: 2000,
    iterations: 1,
    fill: "forwards"
};

// first method: using event listerners to animate "alice"
// const aliceAnime1 = alice1.animate(keyFrames, animationTiming);

// aliceAnime1.addEventListener("finish", () => {
//     alice2.animate(keyFramesObj, animationTiming)
//         .addEventListener("finish", () => {
//             alice3.animate(keyFrames, animationTiming);
//         });
// })

// second method: using the animation object's finished <promise> property
// const finishPromise = animateAlice(alice1);
// finishPromise.then(() => {
//     animateAlice(alice2)
//         .then(() => {
//             animateAlice(alice3);
//         });
// });

async function animateAlice(img) {
    try {
        const animationObj = await img.animate(keyFrames, animationTiming);
        const finishPromise = await animationObj.finished;  // returns a promise that is fulfilled when the obj finishes animating
        return (finishPromise);
    }
    catch (error) {
        console.log(`issue: ${error}`);
    }
}

// or animated all is one go:
async function animateAlices() {
    try {
        await alice1.animate(keyFrames, animationTiming).finished;  // ensures we don't move to the next animation untill the one running is done
        await alice2.animate(keyFrames, animationTiming).finished;
        await alice3.animate(keyFrames, animationTiming).finished;
    }
    catch (error) {
        console.log(error);
    }
}

animateAlices();