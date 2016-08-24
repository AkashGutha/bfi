"use strict";

var expect = require( 'chai' )
    .expect;
var assert = require( 'assert' );
var Interpreter = require( '../lib/brainfuck_interpreter-1.0.0' )
    .Interpreter;

var BFI;

// before( 'setup the response', function ( done ) {
//     BFI = new Interpreter( "" );
// } );
describe( 'if given +{5}. print 0x05', function () {
    let input = "+++++.";
    let byte = 0x05;

    BFI = new Interpreter( "" );

    it( 'should print 5 ', function () {
        // expect( true )
        //     .to.be.true;
        assert.deepEqual( BFI.runfor( input ), byte );
    } );

} );
