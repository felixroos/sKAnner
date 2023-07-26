import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import "dotenv/config";

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

if (!process.env.RECEIVERS) {
  console.log(`no RECEIVERS given! run this script via
  
  RECEIVERS="http://localhost:4321" node scanner.mjs

  or
  
  RECEIVERS="http://localhost:4321 http://localhost:1234" node scanner.mjs
  
for multiple receivers. 

Make sure these URLs point to a computer running the receiver.mjs script!
`);
} else {
  const rl = readline.createInterface({ input, output });
  let servers = process.env.RECEIVERS.split(" ");

  rl.on("line", (input) => {
    // console.log("received", input);
    servers.forEach((server) => {
      try {
        fetch(`${server}?${input}`);
      } catch (err) {
        console.log(`error fetching ${server}: ${err.message}`);
      }
    });
  });

  console.log(
    `
    Come on, give me some of these lovely black and white stripes!!!
    
    I'll then send them to "${servers.join("& ")}"
    
    ... hopefully someone is listening for GET requests there
    
    
    `
  );
}
