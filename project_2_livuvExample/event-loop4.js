const fs = require("fs");


setImmediate(() => console.log("setImmediate"));
setTimeout(() => console.log("Timer expired"), 0);
Promise.resolve("promise").then(() => console.log("Promise"));


fs.readFile("./file.txt", "utf8", () => {
  console.log("File reading CB");
});
 

process.nextTick(() => {
  process.nextTick(() => console.log("inner process.nextTick"));
  Promise.resolve("promise").then(() => console.log("Promise 2"));

  console.log("process.nextTick");
});


console.log("Last line of the file.");
