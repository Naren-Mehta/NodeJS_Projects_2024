function sum(a, b) {
  return a + b;
}

console.log("=sum==",arguments);
console.log("=module==",module);
console.log("=require==",require);

module.exports = { sum };
