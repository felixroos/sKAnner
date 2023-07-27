# sKAnner

this is a little barcode scanner tool for toplap KA. It consists of 2 tasks:

1. scanner.mjs: a websocket server that sends line inputs from the barcode scanner to all connected clients
2. receiver.mjs: a node script that connects to the scanner, running actions for scanned codes

There can potentially be multiple machines running scanners and/or receivers.

## Why all of this?

A typical barcode scanner is an USB device that acts similar to a computer keyboard: When a code is scanned, the code is entered wherever the cursor is.
In our case, the barcode writes to the terminal where the scanner script is running.
This means that for the scanner to work, the terminal window has to be in focus, which is annoying.

This is why a separate machine is needed for the scanning and one or more others that receive scanned codes (without needing to focus the terminal).

## setup

```sh
# 1. install node 18 (skip if already installed)
# https://github.com/Schniz/fnm
curl -fsSL https://fnm.vercel.app/install | bash
# restart shell
fnm use 18
# 2. clone repo
git clone https://github.com/felixroos/sKAnner.git
cd sKAnner
# 3. install dependencies
```

## How to run

1. connect scanner to machine A
2. run `npm run scanner` on machine A, keep terminal in focus
3. it should print a command that you can run on another machine. it looks like `SCANNER=<ip>:4422 npm run receiver`, with the ip of the machine where the scanner is running
4. scan a code!
5. the code should now appear on all connected machines

## actions

In `actions.mjs` you can define what a specific code does when it is scanned.

- `open`: open url in browser
- `dirt`: play something with superdirt, e.g. `dirt({ s:"bd", crush: 8 })` (all you can do in tidal with "#").
  - expects you to run `sclang` with tidal bootfile separately
- `cmd`: e.g `cmd("echo hello")`
- ...anything else you can do with nodejs
