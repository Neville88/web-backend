// single line comment

/**
 multi line comment
 */

//int
let numberOne = 1;
let numberTwo = 3;

console.log(numberOne + numberTwo);

let firstName = `Charles`;
let lastName = `Simon`;

let welcome = `Welcome back ${firstName}👋`
console.log(welcome)



//objects
let credentials = {
    "email": "chmuganga@ucu.ac.ug",
    "password": "12345"

}
let signIn = {
    "username": "Aaron",
    "password": "012"
}

console.log(credentials);
credentials["username"] = "Aaron"
console.log(credentials);
//comparison operators 
console.log(credentials);
credentials["confirmPassword"] = "012"
console.log(credentials);
console.log(credentials.password == credentials.confirmPassword);
console.log(credentials.password === credentials.confirmPassword);
