var foo = "foo";

(function () {
    var foo = "foo2";
    console.log(foo) // "foo2"
})(); // pretty much no difference with }());
// this is a nod to lexical grammar - having to wrap function declaration in parenthesis

console.log(foo); // "foo"

// IIFE - immediately invoked function expression - hides inner variables into it's own scope and runs at runtime,
// assigning those variables and not polluting the global scope. Expression because it's wrapped in parenthesis, function
// is no longer the first word - not a declaration.

// var is attached to whatever function scope it's in.
// let finds a block it's in and attaches itself to this block scope. For example if blocks or for loops (let i = 0; ...)
function foo(bar) {
    if (bar) {
        let baz = bar; // baz is attached to if block
        if (baz) {
            let bam = baz;
        }
        console.log(bam); // Error
    }
    console.log(baz); // Error
}

foo("bar");

// let keyword implicitely creates a block scope. block is no longer just a block - it's also a scope. in for loops
// they not only scope variable to the for loop, but also to each iteration of the loop.
// let means that variables can be declared and attached to scopes as close as possible to where they will be used,
// they will be better garbage collected as the block to which they were attached go away, stylistic benefits by writing
// them where they are actually needed.
// var - for things that should be available to the entire function, let - for smaller block scopes

// let keyword doesn't hoist!!! all let's should be at the top of the blocks
// whenever you wrap something in block statement - watch out for let variables availability! they won't be available outside
// explicit is always better than implicity (just like with type coercion), 

for (let i = 0; i < b; i++) {
    // ...
}

// works like
// let k;
// for (k = 0; k < b; k++) {
    // let i = k; new i for each iteration
// }

// one option to make the block scoping explicit is to use let blocks with let-er
let (foo, bar) {
    foo = "foo";
    console.log(foo);
}