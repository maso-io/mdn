class Person {
    // properties of the person class
    name;

    // constructor to instantiate a Person object
    constructor(name){
        this.name = name;
    }

    // methos of person class
    introduceSelf(){
        console.log(`Hi! I'm ${this.name}`);
    }
}

// creates an person-object using the person class
const maso = new Person("maso");
maso.introduceSelf();
const giles = new Person("giles");
giles.introduceSelf();

// inheritance - creating classes that extends on our person class
class Proffesor extends Person{
    // properties
    teaches;

    // constuctor
    constructor(name, teaches){
        super(name);    // first init the constructor of the class you inherit
        this.teaches = teaches;
    }

    // methods - since this was defined up - it can be considered some form of polymorphism
    introduceSelf(){
        console.log(`Hi my name is ${this.name}, and i will be your ${this.teaches} proffesor.`);
    };
    grade(leaner) {
        const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C', 'D', 'F'];
        const random = Math.floor((Math.random() * grades.length) + 1);
        console.log(`${leaner} biology grade: ${grades[random]}`);
    }
}

// create some Proffesor objects
const mrPark = new Proffesor("Mr. Park", "Biology");
mrPark.introduceSelf();
mrPark.grade("maso");

// implement a student class with private properties
class Student extends Person{
    // encapsulation, protect the properties of this class to keep them to its objects only
    #year;

    constructor(name, year) {
        super(name);
        this.#year = year;
    }

    introduceSelf() {
        console.log(`Hi im ${this.name} and i'm in year ${this.#year}`);
    }
    canStudyArchery() {
        return (this.#year > 1);
    }
}
