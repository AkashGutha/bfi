import primitives = require("./tokens/datatypes");

let input = "akash";
let output = "akshay";

function hello() {
    console.log("hi from typescript!" + input + output + primitives.INT);
}

hello();
