"use strict";

import { Interpreter } from "./interpreter";

function hello() {
    console.log("hi Welcome to BFI!");
}

{
    hello();
    const comString: string = ".................................................................................+";
    let interpeter: Interpreter = new Interpreter(comString);

    console.log(interpeter.run());
}
