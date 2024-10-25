// // require('./text');
// // require('./sum');

// // import {calculateSum} from './sum.js';
// const { calculateSum, x } = require('./sum');

// const a =10;
// const b =100;

// console.log(a);

// // console.log(global);
// // console.log("===", this);
// // console.log("=globalThis==", globalThis);
// console.log("=globalThis==", globalThis === global);

// console.log("===",calculateSum(a, b));
// console.log("=x==",x);


const {sum, multiply} = require('./calculate');

console.log(sum(100, 200));
console.log(multiply(100, 200));
