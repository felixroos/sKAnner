import open from "open"; // helper to open a url in the default browser
import { exec } from "node:child_process";
import "dotenv/config";
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
  3183940211242: () => {
    dirt({ s: "bd" });
    /* open(
      "https://strudel.tidalcycles.org/#Ly8gIm1hbGxldCBzYWxhZCIgQGJ5IGZyb29zCgphd2FpdCBzYW1wbGVzKCdnaXRodWI6dGlkYWxjeWNsZXMvRGlydC1TYW1wbGVzL21hc3RlcicpCgpzZXRjcG0oMTIwLzQpCgpsZXQgY2hvcmRzID0gYDwKQ205ITQKRm0xMSE0CkJeNyMxMSE0CkVeNyMxMSEyIEFeNyMxMSEyCj5gCgpzdGFjaygKICBzdGFjaygKICAvLyBjaG9yZHMKICBjaG9yZChjaG9yZHMpCiAgLnNldC5vdXQobigiPDAgMSAyIDwzIDQ%2BPio2IikuYWRkKCI8MCAxPiIpKQogIC5qdXgocmV2KQogIC5jbGlwKDEpLmRzKCIuMTI6MCIpLmRlbGF5KCIuNTouMTI1Oi44IikKICAuZGljdCgiaXJlYWwtZXh0IikKICAuYW5jaG9yKCJDNSIpCiAgLnNvbWV0aW1lcyh4PT54Lm9mZnNldCgxKSkKICAudm9pY2luZygpCiAgLnMoImdtX2VwaWFubzE6MyIpCiAgLnJlbGVhc2UoLjIpCiAgLmdhaW4oLjYpCiAgLnJvb20oLjgpLmNvbG9yKCdjeWFuJykKICAvLy5zdHJ1Y3QoIjx4ITMgeCgzLDgpPiIpCiAgLAogIG4oIjw4IDcgMyBbNCA1XSA2PioyIi5hZGQoIjwzIDQ%2BLzgiKSkKICAuY2hvcmQoY2hvcmRzKQogIC5kaWN0KCdpcmVhbCcpCiAgLnZvaWNpbmcoKQogIC5zKCJzYXd0b290aCxzcXVhcmUiKQogIC5qdXgocmV2KQogIC5hZGQobm90ZSgiMCwuMSIpKQogIC5kcygiLjE6MCIpLnBseSg2KQogIC5nYWluKHNhdykucm9vbSguNSkKICAubHBmKDQwMCkubHBxKDQpCiAgLmNvbG9yKCdtYWdlbnRhJykKICAubWFzaygiPDAhMiAxITMyPiIpCiAgLAogICAgCiAgLy8gYmFzcwogIGNob3JkKGNob3JkcykKICAucm9vdE5vdGVzKCIxLDIiKQogIC5zdHJ1Y3QoIngqMiIpCiAgLnMoImdtX2Fjb3VzdGljX2Jhc3MiKQogIC5nYWluKDEpCiAgLmNvbG9yKCd5ZWxsb3cnKQogIC5tYXNrKCI8MCE0IDEhMzI%2BIikKICApCiAgLmFkZChub3RlKHBlcmxpbi5yYW5nZSgwLC4zKSkpCiAgLAoKICAvLyBkcnVtcwogIG4oIlsxOSBbfkAxLjkgMTldXSoyLFt%2BIDRdKjIgLH5AMyA8fkAzIFsyQDEuOSAyXT4iKQogIC5zKCdncmV0c2NoJykKICAuZ2FpbigiWy45IC42XSozIikuc3BlZWQoLjUpLnNsb3coMikucm9vbSgxLjUpCiAgLnJhcmVseSh4PT54Lm11bChzcGVlZCgiMSwyIikpKQogIC5vZmYoMS84LCB4PT54LmhwZigxMDAwKS5kZWdyYWRlKCkuc3BlZWQoIi0yIikpCiAgLmNvbG9yKCd3aGl0ZScpLm1hc2soIjwxITMyIDAhOD4iKQogIAopCi8vLnB1bmNoY2FyZCh7Zm9sZDoxfSk%3D"
    ); */
  },
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
