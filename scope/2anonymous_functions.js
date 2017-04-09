var foo = function bar() {
    var foo = 'baz';

    function baz(foo) {
        foo = bar;
        foo;
    }
    baz();
};

foo();
bar();

// line 1 - declaration of a variable with an identifier foo;
// function keyword is not the first word in the statement, therefore it's a function expression (named in this case),
// and it doesn't get declared in the outer scope, name bar exists from line 1 through 9 in its own scope.




// Anonymous function expressions problems: 1) no way to refer to ourselves from the inside (recursion, unbinding click
// handler, etc). this keyword is not a reference to itself here, so we need a named function for these purposes. 
// 2) hard to debug - can have many anonymous functions; 3) names are self documenting, easier to understand what it's 
// doing without looking through it's scope. 4) by shadowing variable to which the function was assigned - no way to 
// refer to this function if it's anonymous.

// function is the only atomic unit of scope, but in ES3 it was specified that catch was block scoped - variables declared
// inside - only exist inside. IE6 allowed to access the variable outside, but it was fixed in later versions of IE.
// declaring variables with same identifiers in different catch clauses - this is not duplicate variable declaration, as
// they are in different block scopes.