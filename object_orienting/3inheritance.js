// In classical inheritance classes are like blueprints, when they get instantiated, the behaviour is copied into its
// instances. There is no linkage, characteristics and behavior are copied. Inheritance means copy.

// In JavaScript the word inheritance is misused. Prototypa inheritance is a common phrase, but it's still not inheritance,
// but rather a linkage.

// When an object is created the "link arrow" is directed form this new object to some other object (Foo.prototype). This
// is not a copy but rather a behavior link, a delegation link. The arrows of this [[Prototype]] links go towards
// prototypes and upwards, towards Object.prototype, which is the opposite of how inheritance would look like. So it's
// classic inheritance - copy down, vs JavaScript behavior linkage - delegation up the chain.

// JS inheritance or prototypal inheritance should be called *Behavior Delegation*

// OLOO - objects linked to other objects - provides a much cleaner approach which only deals with objects' [[Prototype]]
// linkages, but at the same time maintains all the functionality and performance:
var Foo = {
    init: function (who) {
        this.me = who;
    },
    identify: function () {
        return "I am " + this.me;
    }
};

var Bar = Object.create(Foo);

Bar.speak = function () {
    alert("Hello, " + this.identify() + ".");
}

var b1 = Object.create(Bar);
b1.init("b1");
b1.speak(); // alerts: "Hello, I am b1."

// all the magic is hidden in Object.create() function, which is:
if (!Object.create) {
    Object.create = function (o) {
        function F() {};
        F.prototype = o;
        return new F();
    }
}


// in classical class inheritance whenever the code is executed and children are instanciated, the snapshot happens.
// The behavior is copied to children and even if the parent changes, the children remain the same. In JavaScript there
// is a live linkage, if parent changes the results of the code execution will change, as there is a behavior delegation

// You can implement classes in delegation, but can't implement delegation in classes - Delegation is a more powerful concept

// Problems with delegation:
// - Shadowing
// - Everything is public

// Due to the nature of JavaScript usually only one instance is required, which means that creating complex hierarchies
// is completely unnecessary. Most of the time a module pattern would be a much better choice to delegation, delegation
// should be used when there are many instances of something (MANY! WITH MANY METHODS!)