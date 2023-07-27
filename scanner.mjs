import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { WebSocketServer } from "ws";
import { getIP, port, scannerLogo } from "./util.mjs";

async function init() {
  scannerLogo();
  const ip = await getIP();

  const wss = new WebSocketServer({ port });

  const rl = readline.createInterface({ input, output });

  console.log(`

Come on, give me some of these lovely black and white stripes!!!
    
On another machine, run:

SCANNER=${ip}:${port} npm run receiver

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
}

init();
