/**
 * Interpreter
 */

import { InterpreterState } from "./states";
import { Stack } from "./stack";

export class Interpreter {

    private options: string = "";
    private CurrentInterpreterState: InterpreterState;
    private FallbackStack: Stack < number > ;
    private FallbackThrough: Stack < number > ;

    constructor(options: string) {
        this.options = options;
        this.CurrentInterpreterState = InterpreterState.normal;
        this.FallbackStack = new Stack < number > ();
        this.FallbackThrough = new Stack < number > ();
    }

}
