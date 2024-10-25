const https = require('https');
const fs = require('fs');

console.log('Hello World');

const a = 10000;
const b =3042424;

https.get('https://dummyjson.com/products/1', res => {
    console.log("Fetch Data Successfully ");
});

setTimeout(() => {
    console.log('setTimeout called after 5 seconds');
}, 5000);

fs.readFile('./file.txt', 'utf8', (err, data) => {
    console.log('File data : ', data);
});

function multiplyFn(x, y) {
    const result = a * b;
    return result;
}

const c = multiplyFn();

console.log(c);