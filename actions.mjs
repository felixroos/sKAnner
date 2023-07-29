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
  // st actions will only work if SuperCollder is in PATH!
  sc1: () => cmd("SuperCollider ./sc/sc1.sc"),
  sc2: () => cmd("SuperCollider ./sc/sc2.sc"),
  sc3: () => cmd("SuperCollider ./sc/sc3.sc"),
  sc4: () => cmd("SuperCollider ./sc/sc4.sc"),
  sc5: () => cmd("SuperCollider ./sc/sc5.sc"),
  sc6: () => cmd("SuperCollider ./sc/sc6.sc"),
  sc7: () => cmd("SuperCollider ./sc/sc7.sc"),
  sc8: () => cmd("SuperCollider ./sc/sc8.sc"),
  sc9: () => cmd("SuperCollider ./sc/sc9.sc"),
  st1: () => open("https://strudel.tidalcycles.org/?7VoIcReDMO-M"),
  st2: () => open("https://strudel.tidalcycles.org/?dDsZmIqDmCXf"),
  st3: () => open("https://strudel.tidalcycles.org/?kl_UEvr3rc07"),
  st4: () => open("https://strudel.tidalcycles.org/?VUbgKpHsf-G9"),
  hd1: () => open("https://hydra.ojack.xyz/?sketch_id=Pr16zeXkfaLUd5Kd"),
  hd2: () => open("https://hydra.ojack.xyz/?sketch_id=ExeOTZVE9hrn6IIW"),
  hd3: () => open("https://hydra.ojack.xyz/?sketch_id=vcWMV3vi1ykmd9U1"),
  hd4: () => open("https://hydra.ojack.xyz/?sketch_id=rhKdR4tUnVqL9gzX"),
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
