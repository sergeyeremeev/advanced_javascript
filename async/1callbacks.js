// a callback is a continuation
// callback hell is not about indentation!!! it's first of all about loosing control

// as soon as we hand the continuation to some third party library - we give all the control over the rest of our
// program to it - Inversion of Control - a lot of trust is involved:
// - when it will be called
// - how many times
// - will the arguments be preserved
// - will there be any output if needed.

// We are attempting to express async looking code in a synchronous fashion:

// Generators (yield) - functions that don't have to ever complete:
// normally we assume that as soon as a function starts executing, it will go through all lines without being interrupted
// this is called *run to completion invariant*, we assume it can't be interrupted or paused. The new type of functions
// (ES6) can be paused/interrupted and then resume execution
function* gen() {
    console.log("Hello");
    yield null;
    console.log("World");
}

var it = gen(); // not execution - calling a generator function constructs an iterator to control the operation of the generator
it.next(); // starts the generator and runs until the next yield statement - prints "Hello"
it.next(); // to the next yield statement (or end) - prints "World"

// with yield we can pass messages to generator and receive back from it
var run = coroutine(function* () {
    var x = 1 + (yield null);
    var y = 1 + (yield null);
    yield (x + y);
});

run(); // starts the code return null (from the first yield)
run(10); // value 10 is passed as the expression result of the yield expression, 1 + 10 assigned to x (x === 11)
         // null comes back as the return value of the second yield
console.log(
    "Meaning of life: " + run(30).value // value 30 is passed, so y = 1 + 31 and the next yield returns 11 + 31 = 42
);

// to use yield in an assync example:
function getData(d) {
    setTimeout(function () { run2(d) }, 1000);
}

var run2 = coroutine(function* () {
    var x = 1 + (yield getData(10));
    var y = 1 + (yield getData(30));
    var answer = (yield getData(
        "Meaning of life: " + (x + y)
    ));
    console.log(answer);
});

run2();