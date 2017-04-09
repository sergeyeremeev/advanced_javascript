// classic module pattern:
// 1) there must be an outer wrapper function that gets executed; 
// 2) it must return 1 or more functions that have a closure over the inner private scope
var foo = (function () {

    var o = { bar: "bar" };

    return { // this object is like a public api
        bar: function () {
            console.log(o.bar)
        }
    } // no way to update the object after it has been returned

})();

foo.bar(); // bar

// api-like module pattern (modified module pattern):
var foo = (function () {
    var publicAPI = { // keep reference to this object
        bar: function () {
            publicAPI.baz(); // can do this due to internal reference
        },
        baz: function () {
            console.log("baz");
        }
    };

    return publicAPI;
    // stylistically, helps to keep track of public vs private, when you see properties attached to publicAPI
    // functional benefit - can modify public api at runtime by keeping a reference to the object, because now both
    // foo and publicAPI are references to the same object
})();

foo.bar(); // "baz"

// modern module pattern
define("foo", function () {
    var o = { bar: "bar" };

    return {
        bar: function () {
            console.log(o.bar);
        }
    };
});

// ES6 module pattern
// contents of a file are treated as if they exist inside a function - it has its own scope. Every export is added to 
// the public api of that module
var o = { bar: "bar" };

export function bar() {
    return o.bar;
}

// 2 ways to import
import bar from "foo";
bar(); // "bar"

module foo from "foo";
foo.bar(); // "bar"

// all of this allows to hide variables from the scopes where they are not needed - principle of least priviledge (exposure)

// Tradeoffs:
// - it's harded to test hidden/private stuff (unit testing)



// SIDENOTE
$(document).ready(someFunc); // vs
$(document).ready(someFunc()); // someFunc is not deferred anymore, it's called immediately, and what's returned,
// gets passed in to the ready function. To fix it do the function indirection:
$(document).ready(function () {
    someFunc(arguments);
});