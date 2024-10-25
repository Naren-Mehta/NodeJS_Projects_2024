const fs = require("fs");

const a = 100;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("promise").then(() => console.log("Promise"));

fs.readFile("./file.txt", "utf8", () => {
  setTimeout(() => console.log("2nd Timer expired"), 0);
  setImmediate(() => console.log("2nd setImmediate"));
  process.nextTick(() => console.log("2nd process.nextTick"));

  console.log("File reading CB");
});

setTimeout(() => console.log("Timer expired"), 0);

process.nextTick(() => console.log("process.nextTick"));

function printA() {
  console.log("a= ", a);
}

printA();

console.log("Last line of the file.");
