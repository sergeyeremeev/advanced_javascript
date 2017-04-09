// lexical scope - predominant scoping mode. Refers to the parsing stage called lexing. You wrote code, it got compiled,
// the scoping decisions were made and finilazed at this point. Scoping bubbles are strictly nested within each other,
// they never overlap. Compiler processes nested scopes and knows exactly what the scope looks like, because the code
// can not change at run time and scopes were defined at author time. As it compiles it can cache all the references
// and when encountering a variable it know exacly in which scope it is.

// dynamic scope - like in bash scripting language. how scoping works is determined at runtime vs lexical scope
// where scoping is determined at author time (runtime vs author time decisions)
// dynamic scope checks call stack to see if variable exists

var bar = "bar";

function foo(str) {
    eval(str);
    console.log(bar);
}

foo("var bar = 42");

// on line 13 there is no local variable bar, however eval cheats and pretends there was a variable with an identifier
// bar at compile time. It modifies the existing lexical scope of foo. When javascript engine sees eval it assumes that
// it might affect local or global scope, which prevents engine from making some optimizations, resulting in the code
// running slower at runtime. Strict mode runs faster because it creates a new scope if it sees variables inside eval statement.

// one very rare example of eval being necessary is for a templating engine.
// never use setTimeout('string', ...) syntax, it runs in the global scope and provides insecurities; this code gets
// eval'ed at runtime, thus making the code run slower.

var obj = {
    a: 2,
    b: 3,
    c: 4
};

obj.a = obj.b + obj.c;
obj.c = obj.a - obj.b;

with (obj) { // treated as lexical scope
    a = b + c;
    c = a - b;
    d = 3; // LHS reference for variable with an identifier d - none in local scope (with statement obj), go to global - created!
}

obj.d; // undefined
d; // 3 - exists in global scope

// eval modified existing lexical scope at runtime, with - created a new lexical scope at runtime, in both cases compiler
// has to assume the worst and disable many optimizations. in strict mode with keyword is disallowed.