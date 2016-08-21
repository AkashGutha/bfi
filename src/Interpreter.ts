/**
 * Interpreter
 */

import { InterpreterState } from "./states";
import { Stack } from "./dataStructures/stack";

export class Interpreter {

    private input: string;
    private CurrentInterpreterState: InterpreterState;
    private FallbackStack: Stack < number > ;
    private RunThroughStack: Stack < number > ;

    constructor(input: string) {
        this.input = input;
        this.CurrentInterpreterState = InterpreterState.normal;
        this.FallbackStack = new Stack < number > ();
        this.RunThroughStack = new Stack < number > ();
    }
    public run() {
        this.interpret();
    }

    private interpret() {
        console.log("Starting Interpreter ...........................");
    }

}
