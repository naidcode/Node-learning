const fs = require("fs");
const crypto = require("crypto");
let start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("settimeout fineshed"), 0);
setImmediate(() => console.log("set immediate fineshed"));

fs.readFile("text-file.txt", () => {
  console.log("hello world");
  console.log("--------------------");
  setTimeout(() => console.log("settimeout 1 fineshed"), 0);
  setTimeout(() => console.log("settimeout 2 fineshed"), 3000);
  setImmediate(() => console.log("set immediate 3 fineshed"));

  process.nextTick(() => console.log("process.nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
});

console.log("hello world first");
