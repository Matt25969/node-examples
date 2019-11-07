const _ = require("lodash");

console.log("Hello World");

let array = [1, 2, 3, 4, 5];
console.log(array);
array = _.shuffle(array);
console.log(array);
