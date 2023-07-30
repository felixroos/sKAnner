import openURL from "open"; // helper to open a url in the default browser
import { exec } from "node:child_process";
// import { connect } from "./superdirt.mjs";

// helper to send messages to superdirt (expects sclang to run with tidal config)
// const dirt = connect();
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

// prequisite:
// 1. Google Chrome needs to be the default Browser
// 2. Visual Studio Code needs the rights to control keyboard input
// just enter
// osascript -e 'tell application "System Events" to keystroke return using control down'
// into the vscode terminal and you should get a prompt...
// 3. make sure to set SuperCollider Shortcut "Evaluate File" to ctrl+enter

const ctrlEnter = () => {
  cmd(
    `osascript -e 'tell application "System Events" to keystroke return using control down'`
  );
};

const killall = () => {
  cmd('killall "Google Chrome"');
  cmd('killall "SuperCollider"');
};

const sc = async (n) => {
  killall();
  await sleep(200);
  cmd(`SuperCollider ./sc/sc${n}.sc`);
  await sleep(5000);
  ctrlEnter();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const open = async (url) => {
  killall();
  await sleep(500);
  openURL(url);
  await sleep(2000);
  ctrlEnter();
};

const actions = {
  killall: () => killall(),
  // st actions will only work if SuperCollder is in PATH!
  sc1: () => sc(1),
  sc2: () => sc(2),
  sc3: () => sc(3),
  sc4: () => sc(4),
  sc5: () => sc(5),
  sc6: () => sc(6),
  sc7: () => sc(7),
  sc8: () => sc(8),
  sc9: () => sc(9),
  // using long urls instead of short ones, we can skip loading the code from the database..
  //st1: () => open("https://strudel.tidalcycles.org/?7VoIcReDMO-M"),
  st1: () =>
    open(
      "https://strudel.tidalcycles.org/?bihydW4oOCkucGFsaW5kcm9tZSgpKQouY2hvcmQoIjxEbTdbRzcgQTddPiIpCi52b2ljaW5nKCkgIC5zKCJzaW5lIikKLmFkZC5zcXVlZXplKG4oIjAgLjI1IgopKS5yb29tKDEpLmNsaXAoY29zaW5lCi5yYW5nZSguMSwyKSAuc2xvdyg0KSkKLmVjaG9XaXRoKDQsLjEsKHgsbik9Pgp4IC5hZGQobm90ZShuICogLjI1KSkpCi5zbG93KDQpLnB1bmNoY2FyZCh7fSk%3D"
    ),
  // st2: () => open("https://strudel.tidalcycles.org/?dDsZmIqDmCXf"),
  st2: () =>
    open(
      "https://strudel.tidalcycles.org/#cygiYmQgcmltLCBbfiBoaCoyXSIpCi5iYW5rKCAiUm9sYW5kVFI5MDkiKQouZml0KCkuanV4KHJldikuY2h1bmsKKDQsIG11bCggc3BlZWQoMC41KSkpCi5yZXN0YXJ0KGA8eEA3IHgoNSw4KQo%2BYCkuanV4KHggPT4geCAuZ2FpbigKcmFuZCkucmV2KCkpLnN0YWNrKHMoCiJzYXd0b290aCIpLmV1Y2xpZFJvdAooMyw4LDQpLmxwZig4MDApLmxwcSgKc2F3LnJhbmdlKDEsOSkpKS8vIGZy"
    ),
  //st3: () => open("https://strudel.tidalcycles.org/?kl_UEvr3rc07"),
  st3: () =>
    open(
      "https://strudel.tidalcycles.org/#bihydW4oMTIpKS5jaG9yZCgiRCIpCi52b2ljaW5nKCkucygicGlhbm8iKQouYWRkKCAiPC0xIDAgMSAwPi80IikKLmp1eChyZXYpLmxwcSg0KS5scGYoCnNhdy5yYW5nZSgxMDAsNDAwMCkpLgpyYXJlbHkoYWRkKG5vdGUoMTIpKSkKLmFkZChub3RlKHBlcmxpbi5kaXYoCjIpKSkubGFzdE9mKDQscmV2KS8vLwouc3ViKG5vdGUoIjEyWzAgMl0iKSkKLnNsb3coMikgIC5yb29tKHNpbmUpCi5waWFub3JvbGwoe2ZvbGQ6MSB9KQ%3D%3D"
    ),
  //st4: () => open("https://strudel.tidalcycles.org/?VUbgKpHsf-G9"),
  st4: () =>
    open(
      "https://strudel.tidalcycles.org/#bGV0IGNob3JkcyA9Y2hvcmQoYDwKQ143IEZeNyBFYl43IEFiXjc%2BYCkKc3RhY2sobihydW4oMTIpLnNsb3cKKDIpKS5qdXgoeD0%2BeC5yZXYoKS4KbGF0ZSguNSkpLnNldChjaG9yZHMKKS5vZmZzZXQoYDwwIDEgMiAxIDAgCi0xIC0yIC0xPi8yYC5hZGQoMSkpCi52b2ljaW5nKCkuY2xpcCgiMiIpCi5kZWxheSguNSkuZ2FpbihzaW5lCi5yYW5nZSguMiwxKS5mYXN0KC45CikpLGNob3Jkcy5yb290Tm90ZXMoCjIpKS5waWFubygpLmFkZChub3RlCihwZXJsaW4ucmFuZ2UoMCwuMjUpCikpLnB1bmNoY2FyZCgpIC8vIDwz"
    ),
  hd1: () => open("https://hydra.ojack.xyz/?sketch_id=Pr16zeXkfaLUd5Kd"),
  hd2: () => open("https://hydra.ojack.xyz/?sketch_id=ExeOTZVE9hrn6IIW"),
  hd3: () => open("https://hydra.ojack.xyz/?sketch_id=vcWMV3vi1ykmd9U1"),
  hd4: () => open("https://hydra.ojack.xyz/?sketch_id=rhKdR4tUnVqL9gzX"),
};

let pending = null;
export const action = async (code) => {
  console.log("beep", code);
  if (pending) {
    console.log(`waiting for code "${code}" to finish...`);
    await pending;
    console.log(`code "${code}" finished!`);
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
  pending = action();
};
