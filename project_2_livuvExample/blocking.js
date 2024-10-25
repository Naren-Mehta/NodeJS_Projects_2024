const crypto = require('crypto');

console.log('Hello World');

const a = 10000;
const b =3042424;

// pbkdf2Sync is sync function
// Synchronous finction - will BLOCK the MAIN THREAD - DON'T use this
crypto.pbkdf2Sync('password123', 'salt', 5000000, 50, 'sha512');
console.log("First key with sync generated");

// password base key deravative function
// pbkdf2 is Async function
crypto.pbkdf2('password123', 'salt', 500000, 50, 'sha512', (err, key)=> {
    console.log('Key is generated');
});

function multiplyFn(x, y) {
    const result = a * b;
    return result;
}

const c = multiplyFn();

console.log("Multiplication result: ", c);