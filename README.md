# sKAnner

this is a little barcode scanner tool for toplap KA. It consists of 2 tasks:

1. scanner.mjs: a node script that receives line inputs, intended for usage with a barcode scanner
2. receiver.mjs: a node script that opens a server, receiving GET requests from the scanner script

There can potentially be multiple machines running scanners and/or receivers.

## Why all of this?

A typical barcode scanner is an USB device that acts similar to a computer keyboard: When a code is scanned, the code is entered wherever the cursor is.
In our case, the barcode writes to the terminal where the scanner script is running.
This means that for the scanner to work, the terminal window has to be in focus, which is annoying.

This is why a separate machine is needed for the scanning and one or more others that receive scanned codes (without needing to focus the terminal).

## .env config

the `.env` file configures:

```sh
# the port at which
RECEIVER_PORT=4321
# adress of receiver server (ran by npm run receiver)
# replace "192.168.1.24" with your local ip + 4321 with the receiver
RECEIVERS='http://192.168.1.24:4321'
```

## setup guide

0. make sure you're running nodejs v18.
1. run `npm run receiver` on one or multiple machines. If using multiple machines, make sure each has a unique `RECEIVER_PORT` in `.env`
2. on another machine, connect the barcode scanner and configure `RECEIVERS` to contain all urls of the receivers with the format `http://<IP>:<RECEIVER_PORT>`. Then run `npm run scanner`. keep terminal in focus!
3. scan a code, watch how it is written into the terminal
4. the running scanner script detects that and sends a HTTP GET request with `RECEIVER?code` to all RECEIVERS configured in `.env`
5. each receiver receives the get request and handles it when it's defined in `codes`

## actions

In `receiver.mjs` you can define what a specific code does when it is scanned.
One typical use is to open an URL via `open(...)` but you could do whatever you want / what is possible with nodejs!
