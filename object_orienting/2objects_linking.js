function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function () {
    return "I am " + this.me;
};

function Bar(who) { // Bar.prototype has a constructor property here
    Foo.call(this, who);
}

// Bar.prototype = new Foo(); wouldn't just create a new object that was linked to Foo.prototype, but would also call
// the Foo function - add properties, etc...
Bar.prototype = Object.create(Foo.prototype); // this method does only 2 out of 4 things that new Foo(); would do:
                                              // - create new object
                                              // - link this object
                                              // there is no constructor for it to bind this to and no need to return it

// Bar.prototype no longer has a constructor property as we created a new prototype

Bar.prototype.speak = function () {
    alert("Hello, " + this.identify() + "."); // finds identify in prototype chain at Foo.prototype
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak(); // alerts: "Hello, I am b1." => this points to b1 (form line 21)

// problem with constructor:
b1.constructor === Foo; // no .constructor at b1 and Bar.prototype, but we find one at Foo.prototype (which is Foo)
// b1 - [[Prototype]] - Bar.prototype - [[Prototype]] - Foo.prototype (linkage)


// can't do Bar.prototype.constructor = Bar as this would create enumerable property which would break for loops
// would have to use Object.define() to create a non-enumerable property