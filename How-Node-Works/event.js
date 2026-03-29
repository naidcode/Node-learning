const EvenEmitter = require("events");
const http = require("http");

const myEmitter = new EvenEmitter();

myEmitter.on("new Sales", () => {
  console.log("new stock coming soon");
});

myEmitter.on("new Sales", () => {
  console.log("new customer sign up");
});

myEmitter.on("new Sales", () => {
  console.log("new customer sign up");
});

myEmitter.on("new Sales", (stock, day1, day2) => {
  console.log(`${stock} new cloth is coming on ${day1} or maybe ${day2}`);
});

myEmitter.emit("new Sales", 9, "monday", "tuesday");

//////////////////
const server = http.createServer();
server.on("request", (req, res) => {
  console.log("message recieved");
  console.log(req.url);
  res.end("message recieved");
});

server.on("request", (req, res) => {
  console.log("message recieved another time");
});

server.on("close", () => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for server and port number is 8000");
});
