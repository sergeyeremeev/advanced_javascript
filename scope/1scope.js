var foo = "bar";

function bar() {
    var foo = "baz";
}

function baz(foo) {
    foo = "bam";
    bam = "yay";
}

function yay(bam) {
    var bam = "hello";
}

// 1st pass - look for all the declarations - var and function keywords, and register them to the current scope
// "Hey global scope, I have a declaration of a variable with an identifier..."
// var foo; - global
// function bar() {}; - global
// it's a function, so we recursively descend into it and compile it
// var foo; - bar()
// function baz() {}; - global
// var foo; - baz() - named argument like local variable
// function yay() {}; - global
// var bam; - yay() - named argument
// var bam; (line 13) - ignored, yay() already has a reference to variable with identifier bam

// second pass:
// foo = "bar"; LHS reference with identifier foo - do we have variable foo registered in the current scope? - yes! -
// assign it to the RHS immediate string value of "bar"; "bar" is source here, foo is target

// imagine calling bar();
// LHS reference with identifier foo - do we have it in scope of bar()? yes! assign it to RHS immediate string value of
// "baz". "baz" - source, foo - target.

// calling baz();
// LHS reference with identifier foo - have in scope of baz()? yes! assign to RHS immediate string value of "bam";
// "bam" - source, foo - target
// LHS reference with identifier bam - have in scope of baz()? no! go up one level, check that scope. Reach global scope,
// global scope immediately declares a variable with this identifier, because it's an LHS reference (non strict mode
// behavior). In strict code variable doesn't get declared in global (in any) scope, resulting in error.

// undefined NOT SAME as undeclared. undefined is a value, variable is declared but hasn't been initialized, ie has
// absence of a value, ie holds value of undefined - empty placeholder - there is a declared variable.

function bar() { // global scope, here is a variable called bar
    var foo = "baz"; // scope of bar - here is a variable declaration with identifier foo
    // "shadowing" - any reference to foo here or inside will not reach any outer scopes' foo
    function baz(foo) { // scope of bar - here is a variable declaration with an identifier baz, scope of baz - variable named foo
        foo = "bam";
        bam = "yay";
    }
    baz();
}

bar(); // this is an RHS reference (because it's not an LHS). bar reference is not being assigned to anything, but it's
       // being used. global scope has this reference, it's a function object. () means that we attempt to execute this
       // function.
// line 47 scope of bar, I have an LHS reference for a variable called foo - success, assign it to the string value "baz"
// line 53 scope of bar, I have an RHS reference for a variable called baz - success, it's value is a function, execute ()
// line 50 scope of baz, I have an LHS reference for a variable with an identifier foo - success, assign string "bam"
// line 51 scope of baz, LHS variable named bam - nope, 1 scope up - scope of bar - nope, globale scope - just declared, assign.

foo; // hey global scope, I have an RHS reference for variable named foo, success, it's been assigned to "bar" - log "bar"
bam; // hey global scope, RHS reference for variable with identifier bam, success, declared when bar() was running,
     // current value is "yay"
baz(); // hey global scope, RHS reference for a variable named baz, no such variable reference. RHS, therefore it doesn't
       // create a new variable - throws reference error. In strict mode, both unfulfilled RHS and LHS result in reference
       // errors.

// LHS - compile time, RHS - execution time