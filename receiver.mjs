import WebSocket from "ws";
import { action } from "./actions.mjs";
import "dotenv/config";
import { url, receiverLogo } from "./util.mjs";

receiverLogo();

function connect() {
  try {
    const server = `ws://${url}`;
    console.log("---------------------------------------------------");
    console.log("trying to connect to", server);
    const ws = new WebSocket(server);

    ws.on("error", (err) => {
      console.log(`:( could not connect to scanner...`, err.message);
      setTimeout(connect, 1000);
    });

    ws.on("open", function open() {
      console.log("connected to scanner! come on scan a code!!");
      // ws.send("hello i am the client");
    });

    ws.on("message", function message(data) {
      const code = String(data);
      // console.log(">: %s", code);
      action(code);
    });
  } catch (err) {
    console.error(
      "could not connect to scanner.. is it running? trying again in 1s.."
    );
    setTimeout(connect, 1000);
  }
}

connect();
