class person {
    constructor(name, age, year){
        this.name = name;
        this.age = age;
        this.year = year;
        this.name_s = name + age + year;
    }
}

const json_data = '{"name": "joy", "age": "21", "year": "2002"}';
let json_object = JSON.parse(json_data);

console.log(json_object.name);  // Output: Alice
console.log(json_object.age);   // Output: 25
console.log(json_object.year);  // Output: true

json_object.name = "sam";
json_object.age = "13";

console.log(json_object.name);  // Output: Alice
console.log(json_object.age);   // Output: 25
console.log(json_object.year);  // Output: true

console.log("test class");
let p = new person(json_object.name, json_object.age, json_object.year);
console.log(p);

console.log('test brace annotation');
console.log(json_object['name']);  // Output: Alice
console.log(json_object['age']);   // Output: 25
console.log(json_object['year']);  // Output: true

console.log("class test");
let student = {name : "ob", class : "2020", uni : "SFSU"};
console.log(student.name);
console.log(student.class);
console.log(student.uni);