async function populate() {
    const requestURL = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
    const request = new Request(requestURL);    // create a request object

    const response = await fetch(request);      // allows us to make a network request and asynchonously waits for the response promise to resolve for the request
    const superHeroes = await response.json();  // Takes the Response object and returns a promise that resolves to a JS object .i.e. it "parses" the JSON body member of the Response object
    
    console.log(superHeroes);               // logs the squad data-object
    populateHeader(superHeroes);
    populateHeroes(superHeroes);
}
async function fill() {
    const path = `/heroes/superheroes.json`; 
    const response = await fetch(path); // fetches the data and returns a Response object
    const responseJson = await response.text();   // returns a string format of the body property in the Response object
    const superHeroes = JSON.parse(responseJson);

    populateHeader(superHeroes);
    populateHeroes(superHeroes);
}

function populateHeader(obj) {
    
    // create a h1 tag to add below header, with value of squadname
    
    const header = document.querySelector("header");
    const myH1 = document.createElement('h1');
    myH1.textContent = obj.squadName;
    header.appendChild(myH1);

    const myP = document.createElement("p");
    myP.textContent = `Location :${obj.homeTown} // Formed : ${obj.formed}`;
    header.appendChild(myP);

}

function populateHeroes(obj) {
    
    const section = document.querySelector("section");

    const heroes = obj.members;
    for (const hero of heroes) {
        
        const myArticle = document.createElement("article");
        const myH2 = document.createElement("h2");
        myH2.textContent = hero.name;

        const myPara1 = document.createElement("p");
        const myPara2 = document.createElement("p");
        const myPara3 = document.createElement("p");
        const myList = document.createElement("ul");

        myPara1.textContent = hero.secretIdentity;
        myPara2.textContent = hero.age;
        myPara3.textContent = `Super Powers :`;
        for (const power of hero.powers) {
            const item = document.createElement("li");
            item.textContent = `${power}`;
            myList.appendChild(item);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }
}
fill();
//populate();