console.log("this is sum.js file");

function calculateSum(a, b) {
  return a + b;
}

const x = 100;

console.log("=module===", module);

module.exports = { calculateSum, x };
