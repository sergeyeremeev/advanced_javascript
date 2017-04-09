// Closure is a capability of a function to remember and have access to its lexical scope even if it's executed outside 
// that lexical scope. Created by transporting the inner function to the outside of its outer function

// functions can be passed around and remain useful because of the closure (they still have access to their lexical scope)
// it's a necessary mechanism in a language with first class functions for them to be useful (functions treated as values -
// assign it to a variable, pass around, etc)

// function maintains access to the entire scope, no matter how deep nested it is, this is what is called a closure

// Example 1
function foo() {
    var bar = "bar";

    function baz() {
        console.log(bar);
    }

    bam(baz); // pass reference to  a baz function
}

function bam(baz) {
    baz(); // when called baz still has the access to its lexical scope, despite being called from outside of that scope
}

foo();

// Example 2
function foo() {
    var bar = "bar";

    return function () {
        console.log(bar);
    }
}

function bam() {
    foo()(); // between first and second set of parentheses, function object is transported outside of its lexical scope
             // but still able to access lexical scope - this is closure
}

bam();

// Example 3
function foo() {
    var bar = "bar";
    setTimeout(function () { // callback function, which will be executed after timer, well outside of its lexical scope
        console.log(bar); // still has access to its lexical scope (actual reference / "live link", references actual variable)
    }, 1999);
}
foo();

// Example 4
function foo() {
    var bar = "bar";

    $('#btn').click(function (e) { // click handlers are able to remember their lexical environment - closure
        console.log(bar);
    });
}
foo();

// Example 5
for (var i = 1; i <= 5; i++) {
    setTimeout(function () { // 5 separate anonymous functions, all in the same scope, with the same variable i in it
        console.log("i: " + i); // references the same variable, which will be 6 by the time callback function is executed
    }, i * 500);
}

// Solution to 5
for (var i = 1; i <= 5; i++) {
    (function (i) { // create a separate scope for each iteration with its own local i
        setTimeout(function () {
            console.log("i: " + i);
        }, i * 500);
    })(i);
}

// Another solition with let
for (let i = 1; i <= 5; i++) { // as per spec, let i binds i for the for loop AND rebinds it for each iteration
    setTimeout(function () {
        console.log("i: " + i);
    }, i * 500);
}

// Not a closure example
var foo = (function () {
    var o = { bar: "bar" };
    return {obj: o};
})();

console.log(foo.obj.bar); // "bar" - code works, but it's object referencing, not a closure by definition (no function
// is being passed around / transported out)

// whenever you declare a function within another function - this is a closure. when the outer function is called, the
// inner function(s) is/are recreated each time