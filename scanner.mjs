import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { WebSocketServer } from "ws";
import { port, scannerLogo } from "./util.mjs";

scannerLogo();

const wss = new WebSocketServer({ port });

const rl = readline.createInterface({ input, output });

console.log(`

Come on, give me some of these lovely black and white stripes!!!
    
I'll then send them to all clients connecting to me on port ${port}

Make sure to keep this terminal in focus!

`);

wss.on("connection", function connection(ws) {
  console.log("client connected.");
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("message received: %s", data);
  });

  // ws.send("hello, I am the server");

  rl.on("line", (input) => {
    ws.send(input);
  });
});
