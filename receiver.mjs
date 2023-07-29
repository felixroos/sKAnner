import WebSocket from "ws";
import { action } from "./actions.mjs";
import { url, receiverLogo } from "./util.mjs";

receiverLogo();

function connect() {
  try {
    const server = `ws://${url}`;
    console.log("---------------------------------------------------");
    console.log("trying to connect to", server);
    const ws = new WebSocket(server);
    let timeout;
    const retry = () => {
      clearTimeout(timeout);
      timeout = setTimeout(connect, 1000);
    };

    ws.on("error", (err) => {
      console.log(`:( could not connect to scanner...`, err.message);
      retry();
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
    ws.on("close", () => {
      console.log("connection closed...");
      retry();
    });
  } catch (err) {
    console.error(
      "could not connect to scanner.. is it running? trying again in 1s.."
    );
    retry();
  }
}

connect();
