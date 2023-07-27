import OSC from "osc-js";

export function connect() {
  const options = {
    type: "udp4", // @param {string} 'udp4' or 'udp6'
    open: {
      host: "localhost", // @param {string} Hostname of udp server to bind to
      port: 41234, // @param {number} Port of udp server to bind to
      exclusive: false, // @param {boolean} Exclusive flag
    },
    send: {
      host: "localhost", // @param {string} Hostname of udp client for messaging
      port: 57120, // @param {number} Port of udp client for messaging
    },
  };

  const osc = new OSC({ plugin: new OSC.DatagramPlugin(options) });

  osc.on("open", () => {
    console.log("superdirt ready");
  });

  osc.on("*", (message) => {
    console.log(message.args);
  });

  osc.open();
  return (controls) => {
    const entries = Object.entries(controls).flat();
    console.log("superdirt", entries.join("/"));
    const message = new OSC.Message("/dirt/play", ...entries);
    osc.send(message);
  };
}
