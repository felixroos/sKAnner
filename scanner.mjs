import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { WebSocketServer } from "ws";
import { getIP, port, scannerLogo } from "./util.mjs";

scannerLogo();
const ip = getIP();

const wss = new WebSocketServer({ port });

const rl = readline.createInterface({ input, output });

console.log(`

Come on, give me some of these lovely black and white stripes!!!
    
On another machine, run:

SCANNER=${ip}:${port} npm run receiver

Make sure to keep this terminal in focus!

`);

let send;
wss.on("connection", function connection(ws) {
  console.log("client connected.");
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("message received: %s", data);
  });

  send = (input) => ws.send(input); // send code via web socket
});

rl.on("line", (input) => {
  // the following stuff makes sure the last log is overwritten
  process.stdout.moveCursor(0, -2);
  process.stdout.clearLine(1);
  process.stdout.moveCursor(0, 1);
  process.stdout.clearLine(1);
  process.stdout.write(input);
  send && send(input);
});
