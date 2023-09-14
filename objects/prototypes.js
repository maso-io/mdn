const myDate = new Date();
console.log(Date.prototype);
let myObject = myDate;

do {
    myObject = Object.getPrototypeOf(myObject);     // access the prototype of myObject
    console.log(myObject);
} while (myObject);

// access a method of the Date object
console.log(myDate.getFullYear());

myDate.getFullYear = function (){
    console.log(`shadowing properties!`);
}
// because the object will check within itself first, it uses the updated version of getFullYear()
console.log(myDate.getFullYear());
// on the first try the function was found within the objects prototype (Date.prototype)
// on the second the method is found on the myData object itself so it is not neccesary to use/search its prototype

// Object.create(o:) , creates a new object, with the object passed as its' prototype
const personPrototype = {       // object literal
    greet() {
        console.log(`hello!, my name is ${this.name}!`);
    }
};
const carl = Object.create(personPrototype);
carl.greet();       // can use greet() as it is supplied by prototype (which points to personPrototype)

function Person(name) {     //create a person constructor that we can use in conjuction with personPrototype
    this.name = name;
}
// link personPrototype inside of a person object through its prototype member
Object.assign(Person.prototype, personPrototype); 
 const rueben = new Person("rueben");
 rueben.greet();
 // checking if a property belong to an object or its prototype
 console.log(Object.hasOwn(rueben, "name"));
 console.log(Object.hasOwn(rueben, "greet"));