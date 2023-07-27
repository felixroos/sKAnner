import open from "open"; // helper to open a url in the default browser
import { exec } from "node:child_process";
import { connect } from "./superdirt.mjs";

// helper to send messages to superdirt (expects sclang to run with tidal config)
const dirt = connect();
// helper to run a terminal command
const cmd = (command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
};

const actions = {
  3183940211242: () => open("https://strudel.tidalcycles.org/?iQFu_XBniSyL"),
  191924481409: () => dirt({ s: "bd" }),
  496958: () => dirt({ s: "sd" }),
};

export const action = (code) => {
  console.log("beep", code);
  // custom code matchers
  if (code.length === 8 && code.startsWith("00000")) {
    const n = Number(code.slice(-3, -1));
    const note = ((n * 7) % 36) - 24;
    dirt({ s: "supermandolin", note });
    return;
  }
  if (code.startsWith("s-")) {
    let chunks = code.split("-");
    let v = {};
    while (chunks.length) {
      v[chunks[0]] = chunks[1];
      chunks = chunks.slice(2);
    }
    dirt(v);
    //console.log(v);
    return;
  }
  if (!code) {
    console.log("request without code.. am I a joke to you?");
    return;
  }

  // actions
  const action = actions[code];
  if (!action) {
    console.log(
      `code "${code}" is unknown.. just pretending nothing happened...`
    );
    return;
  }
  console.log(`running code "${code}"`);
  action();
};
