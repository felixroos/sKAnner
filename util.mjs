import dns from "node:dns";
import os from "node:os";

export const url = process.env.SCANNER || "localhost:4422";
export const port = Number(url.split(":").slice(-1)[0] || "4422");

if (isNaN(port)) {
  console.log(
    `invalid port "${port}". make sure "${url}" has the right format. examples:
    
    - localhost
    - 192.168.1.24
    - localhost:4422
    - 192.168.1.54:1234
    `
  );
}

export function scannerLogo() {
  console.log(
    `this is the official
  
    $$\\                         $$\\                           $$\\                
    $$ |                        $$ |                          $$ |               
  $$$$$$\\    $$$$$$\\   $$$$$$\\  $$ | $$$$$$\\   $$$$$$\\        $$ |  $$\\ $$$$$$\\  
  \\_$$  _|  $$  __$$\\ $$  __$$\\ $$ | \\____$$\\ $$  __$$\\       $$ | $$  |\\____$$\\ 
    $$ |    $$ /  $$ |$$ /  $$ |$$ | $$$$$$$ |$$ /  $$ |      $$$$$$  / $$$$$$$ |
    $$ |$$\\ $$ |  $$ |$$ |  $$ |$$ |$$  __$$ |$$ |  $$ |      $$  _$$< $$  __$$ |
    \\$$$$  |\\$$$$$$  |$$$$$$$  |$$ |\\$$$$$$$ |$$$$$$$  |      $$ | \\$$\\\\$$$$$$$ |
     \\____/  \\______/ $$  ____/ \\__| \\_______|$$  ____/       \\__|  \\__|\\_______|
                      $$ |                    $$ |                               
                      $$ |                    $$ |                               
                      \\__|                    \\__|
                        
      |_   _. ._ _  _   _|  _     _  _  _. ._  ._   _  ._ 
      |_) (_| | (_ (_) (_| (/_   _> (_ (_| | | | | (/_ |
      
      `
  );
}

export function receiverLogo() {
  console.log(
    `this is the official
  
    $$\\                         $$\\                           $$\\                
    $$ |                        $$ |                          $$ |               
  $$$$$$\\    $$$$$$\\   $$$$$$\\  $$ | $$$$$$\\   $$$$$$\\        $$ |  $$\\ $$$$$$\\  
  \\_$$  _|  $$  __$$\\ $$  __$$\\ $$ | \\____$$\\ $$  __$$\\       $$ | $$  |\\____$$\\ 
    $$ |    $$ /  $$ |$$ /  $$ |$$ | $$$$$$$ |$$ /  $$ |      $$$$$$  / $$$$$$$ |
    $$ |$$\\ $$ |  $$ |$$ |  $$ |$$ |$$  __$$ |$$ |  $$ |      $$  _$$< $$  __$$ |
    \\$$$$  |\\$$$$$$  |$$$$$$$  |$$ |\\$$$$$$$ |$$$$$$$  |      $$ | \\$$\\\\$$$$$$$ |
     \\____/  \\______/ $$  ____/ \\__| \\_______|$$  ____/       \\__|  \\__|\\_______|
                      $$ |                    $$ |                               
                      $$ |                    $$ |                               
                      \\__|                    \\__|

      |_   _. ._ _  _   _|  _    ._ _   _  _  o     _  ._ 
      |_) (_| | (_ (_) (_| (/_   | (/_ (_ (/_ | \/ (/_ |
                      
      `
  );
}

export function getIP() {
  const { networkInterfaces } = os;

  const nets = networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        results.push(net.address);
      }
    }
  }
  return results.find((r) => r.startsWith("192"));
}
