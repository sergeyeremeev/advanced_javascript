// every single object is built by a constructor function (constructor call)

// saying that constructor makes an object *based on* its own prototype implies that we take the prototype and stamp out
// a copy of it, but this is not true in javascript. A correct phrase would be *linked to* its own prototype.

// A constructor makes an object linked to its own prototype

// Before the first line of the code there is a function called Object() and an object which doesn't have a name, but
// rather there is an arbitrary label Object.prototype that points at this object. The object has methods like .toString(), etc.

function Foo(who) { // function called Foo creates a new object and it's linked to it via .prototype (function -> object)
                    // there is also a connection in the opposite direction via .constructor (object -> function), however
                    // this doesn't mean that object was constructed by that function. This object is also linked to the
                    // very first object with arbitrary label Object.prototype
    this.me = who;
}

Foo.prototype.identify = function () { // adding identify property to the object the function is linked to via .prototype
    return "I am " + this.me;
};

var a1 = new Foo("a1"); // constructor function - a function call that has a new keyword in front of it
                        // - brand new object is created
                        // - this new object is linked to the original object, created on line 11
                        // - context is set to the new object, this now points to this newly created object, therefore
                        // this.me puts a property me directly on this new object
                        // - implicit return this means that this new object is assigned a label a1

var a2 = new Foo("a2"); // another object is created, linked to the original object, property me, labeled a2

a2.speak = function () { // property speak added directly to the object with label a2
    alert("Hello, " + this.identify() + ".");
}

a1.constructor === Foo; // there is NO constructor on a1, traverse the prototype chain, via linkages (called [[Prototype]]),
                        // reach original object created on line 11, check for .constructor property - success - points
                        // to Foo from line 11. => true
    
a1.constructor === a2.constructor; // true - same process as above

a1.__proto__ === Foo.prototype; // (called dunder proto) traverse prototype chain, no dunder proto on a1, no dunder proto
                                // on object from line 11, there is a dunder proto on the first object (Object.prototype)
                                // it is a *getter function which returns the internal prototype linkage of this binding*
                                // call site line 39, this refers to a1 (implicit binding), so we are interested in [[Prototype]] 
                                // to the object from line 11 - its internal link - public link for it is dunder proto.
                                // it is a public property which references the internal characteristic
                                // Therefore both point at the same object => true

a1.__proto__ === a2.__proto__  // similar process to above, both point to object created at line 11 via public links


// * dunder proto is not standardized in IE until ES6 (until IE11)
// for this they provided a method for IE9 and IE10
a1.__proto__ === Object.getPrototypeOf(a1);

// for <= IE8
a2.__proto__ === a2.constructor.prototype; // first go to the constructor function, then go back to the object from line 11
// the problem with this approach is that both .constructor and .prototype are writable properties, which might break this method

// example of shadowing (relative polymorphism with lots of non-good-looking syntax)
a1.identify = function () {
    alert("Hello, " + Foo.prototype.identify.call(this) + "."); // to call the original identify function, a lot more
                                                                // code needed and explicit binding to this (to bind to a1)
};

a1.identify(); // now calls a new identify method of a1, not identify of the object from line 11.

// adding methods without shadowing - much cleaner syntax
Foo.prototype.speak = function () {
    alert("Hello, " + this.identify() + // this refers to whoever calls it, then if identify not found, traverses prototype chain
        ".");
};

a1.speak(); // this from line 69 refers to a1, no speak() method, look at object Foo.prototype, success, call identify

// Object.prototype is at the top level, like global object in lexical scope, but these 2 mechanisms are orthagonal (never cross)