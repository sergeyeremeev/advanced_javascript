// Promises - like a receipt in McDonalds - you don't get food immediately, but wait and then exchange receipt for food
// Call a function but it can't give the result yet, instead you receive a Promise and when the task is finished, the
// Promise is traded for the result (value)

// Promises are *continuation events* - you subscribe to a continuation event and once notified, then you proceed

// jQuery style promises:
var wait = jQuery.Deferred(); // create Deferred
var p = wait.promise(); // pull a promise object off of a Deferred

p.done(function (value) { // listening for the done event (continuation event)
    console.log(value);
});

setTimeout(function () {
    wait.resolve(Math.random()); // when we call resolve on a Deferred it automaticall fires the done event for promises
                                 // that are listening to it
}, 1000);

// example - delay function:
function waitForN(n) {
    var d = $.Deferred();
    setTimeout(d.resolve, n);
    return d.promise;
}

waitForN(1000) // returns back a promise (line 24)
.then(function () { // listening for continuation event, once it's resolved - execute a function
    console.log('1000ms later');
    return waitForN(2000); // returns back another promise, which is resolved in another 2000ms
})
.then(function () { // listening for continuation event, execute in 2000ms
    console.log('another 2000ms later');
});

// after the invertion of control, the utility now gives us back our promise, so now we get back the control over the program
// we listen for the completion of promise and decide what to do next
// promises are important to the problem of callback hell because they uninvert the loss of control

// Promises are built in ES6:
// error version of resolve is reject in native version of Promises
function getData(d) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(d); }, 1000);
    });
}

var x;

getData(10)
.then(function (n1) {
    x = 1 + n1;
    return getData(30);
})
.then(function (n2) {
    var y = 1 + n2;
    return getData("Meaning of life: " + (x + y));
})
.then(function (answer) {
    console.log(answer);
});



// sequence - automatically chained promisses
// usually you want to chain promisses, some libraries allow for that (asynquence)
ASQ() // call the constructor
.then(function (done) { // no need to create promisses each time
    setTimeout(done, 1000);
})
.gate( // wait for all things inside to finish
    function (done) {
        setTimeout(done, 1000);
    },
    function () {
        setTimeout(done, 1000);
    }
)
.then(function () {
    console.log("2000ms passed");
});