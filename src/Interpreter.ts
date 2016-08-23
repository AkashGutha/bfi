/**
 * Interpreter
 */
import { Stack } from "./dataStructures/stack";
import { InterpreterState } from "./states";

export class Interpreter {

    //state machine variables    
    private input: string;
    private CurrentInterpreterState: InterpreterState;

    // environment variables

    private strip: number[] = [ 0 ];
    private currentPosition: number;
    private FallbackStack: Stack < number > ;
    private RunThroughStack: Stack < number > ;

    constructor( input: string ) {
        this.input = input;
        this.CurrentInterpreterState = InterpreterState.normal;
        this.FallbackStack = new Stack < number > ();
        this.RunThroughStack = new Stack < number > ();
        this.currentPosition = 0;
    }

    public make() {
        return new Interpreter(null);
    }    

    public run() {
        return this.interpret( null );
    }

    public runfor( input: string ) {
        return this.interpret( input );
    }

    private interpret( input: string ) {
        if (input !== null) { this.input = input; }
        if (this.input === null) { console.log("errored!"); return; }
        // console.log( "Starting Interpreter ..........................." );
        let out: string = "";
        let length = this.input.length;
        console.log( "input is " + input + " legth is " + length );

        for ( let i = 0; i < length; i++ ) {
            let charachter = this.input.charAt( i );

            switch ( charachter ) {
                case ".":
                    let temp = String.fromCharCode( this.strip[ this.currentPosition ] );
                    console.log( temp );
                    out += temp;
                    break;
                case ">":
                    this.currentPosition++;
                    break;
                case "<":
                    this.currentPosition--;
                    break;
                case "+":
                    this.strip[ this.currentPosition ]++;
                    break;
                case "-":
                    this.strip[ this.currentPosition ]--;
                    break;
                case "[":
                    break;
                case "]":
                    break;
                default:
                    console.log( "unexpected charachter enterd\n" );
                    break;
            }

        }
        return out;
    }
}
