var a = b();
var c = d();

a;
c;

function b() {
    return c;
}

var d = function() {
    return b();
};

// becomes:

function b() {
    return c;
}

var a;
var c;
var d;
a;
c;
d = function () {
    return b();
};

// =====================================================================================================================
foo(); // "foo"

var foo = 2; // hoisted third, declaration ignored as variable with this identifier (name) already exists

function foo() { // hoisted first
    console.log("bar");
}

function foo() { // hoisted second - overrite first foo
    console.log("foo");
}

// function declaration - declaration that implies that the value comes along with it -> overrites previous one
// variable declaration - the value is left as executable code, only var foo gets hoisted -> doesn't overrite.

// Hoisting is necessary for mutual recursion - when 2 functions call each other, without hoisting one of the functions
// would always be declared too late.

function foo(bar) {
    if (bar) {
        console.log(baz); // ReferenceError
        let baz = bar; // let doesn't hoist - TMZ - temporal dead zone between beginning of block scope and declaration
    }
}