(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.stack = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Stack = (function () {
    function Stack() {
        this.pipe = [];
    }
    Stack.prototype.push = function (value) {
        this.pipe.push(value);
    };
    Stack.prototype.pop = function () {
        return this.pop();
    };
    return Stack;
}());
exports.Stack = Stack;

},{}],2:[function(require,module,exports){
(function (InterpreterState) {
    InterpreterState[InterpreterState["normal"] = 0] = "normal";
    InterpreterState[InterpreterState["runthrough"] = 1] = "runthrough";
    InterpreterState[InterpreterState["setback"] = 2] = "setback";
})(exports.InterpreterState || (exports.InterpreterState = {}));
var InterpreterState = exports.InterpreterState;

},{}]},{},[1,2])(2)
});