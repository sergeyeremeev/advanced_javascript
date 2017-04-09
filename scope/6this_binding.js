// Every function, WHILE IT'S EXECUTING, has a reference to it's current execution context, called this.
// Call site - place in code where function gets executed (with open/close parentheses) - the only thing that matters
// when figuring out what this keyword points to.

function foo() {
    console.log(this.bar);
}

var bar = "bar1";
var o2 = { bar: "bar2", foo: foo };
var o3 = { bar: "bar3", foo: foo };

foo();
o2.foo();
o3.foo();

foo.call(o2); // foo.apply(o3) - same behavior here, different behavior with respect to arguments

// Binding rules in reversed order of precedence (intentional):

// this on line 5 is referenced by a function foo, it is an object from which we should be able to retrieve property bar
// look at call site of foo - line 12. This is a simple reference to a function, nothing special to it - immediate function
// called with parentheses the default binding rule applies (also applies to iifes):


// =====================================================================================================================
// 1) Default binding rule - if in strict mode - default this keyword to the undefined value, if not in strict - 
// default this keyword to global object (strict mode running inside the function, global stric mode doesn't matter)
// =====================================================================================================================


// on line 9 there are 2 references to function foo - global variable foo and object property named foo (o2.foo) and
// then on line 13 we have a reference to the function via the object property reference. When there is an object property
// reference at the call site the implicit binding rule kicks in:


// =====================================================================================================================
// 2) Implicit binding rule - this keyword will point to the base object (o2 on line 13 and o3 on line 14)
// =====================================================================================================================


// global variable is the same as a property of the global object.
// there is NO way to make a link between lexical scope and this binding - they are 2 completely separate mechanisms

// if there is call.() or apply.() method at the call site - use the explicit binding rule:


// =====================================================================================================================
// 3) Explicit binding rule - this refers to the object passed as an argument in call (or apply) method
// =====================================================================================================================


// this bindings often get lost, fall through to the global object, etc... One way to solve this is to create a hard
// binding:

function foo() {
    console.log(this.bar);
}

var obj = { bar: "bar" };
var obj2 = { bar: "bar2" };

var orig = foo; // create another reference to the same function
foo = function () { // override foo function
    orig.call(obj); // call orig function with obj binding
};

foo(); // "bar" - as expected
foo.call(obj2); // "bar" - due to hard binding. there is a this binding pointing to obj2 right after the opening curly
// brace on line 58, but the rest of the function doesn't care about it, because this is forced to be obj on line 59
// no matter how foo() is called, it now has a hard binding to obj (the value of this)

// ---------------------------------------------------------------------------------------------------------------------
// to avoid global variable just hanging and to give it a bit more flexibility, let's create a bind utility
function bind(fn, o) { // supply function and this
    return function () {
        fn.call(o); // this is now the call site
    };
}

foo = bind(foo, obj);
foo(); // call site on line 70 - explicit binding
foo.call(obj2); // still line 70 is the call site - hard binding, you have to go inside the wrapper to find call site.
// ---------------------------------------------------------------------------------------------------------------------

// this utility is still global, let's attach it to the function prototype (incomplete example):
if (!Function.prototype.bind2) {
    Function.prototype.bind2 = function (o) { // take object as a parameter
        var fn = this; // due to implicit binding, this refers to the function to which we are binding the object
        return function () {
            return fn.apply(o, arguments); // apply to be able to pass along any arguments to function
        }
    }
}
foo = foo.bind(obj); // implicit binding affecting line 81

// a better bind implementation exists in javascript since ES5, for pre ES5 browsers, there is a polyfill on MDN website
// which is more complete and spec-compliant

// * if you are using too much of the hard binding - maybe it's not worth using this keyword in some cases...
// ---------------------------------------------------------------------------------------------------------------------

// new keyword before any function call turns the function call into a constructor call (any function), 4 things occur:
// - brand new object is created;
// - this object gets linked to a different object
// - this object gets bound as this keyword for the purposes of that function call
// - if function didn't return anything, it will implicitly insert "return this;" before it's closing curly brace, so
// the brand new object would be implicitely returned for us.
// any function with keyword new before it's call will do everything it did before, plus these 4 things

// new keyword binding overrides everything, including hard binding (explicit binding)


// =====================================================================================================================
// 4) Constructor call binding rule - this referes to a brand new object that was created as part of the constructor function
// call hijacking
// =====================================================================================================================

// if binding matches more than 1 binding rule, the order of precedence is from 4 to 1. There are few questions you can ask:
// I - was it called with new keyword - if yes - this is the new object
// II - was ot called with call.() or apply.() - if yes - this is the object which was passed as the argument
// III - was it implicit binding (called with containing/owning object) - if yes - this refers to the base object
// IV - default binding rule - global object (if not in strict mode) or undefined