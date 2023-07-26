# sKAnner

this is a little barcode scanner tool for toplap KA. It consists of 2 parts:

1. scanner.mjs: a node script that receives line inputs, intended for usage with a barcode scanner
2. receiver.mjs: a node script that opens a server, receiving GET requests from the scanner.

There can potentially be multiple scanners and/or receivers. Just make sure the receivers use different ports.

start a receiver:

```js
PORT=4321 node receiver.js
```

start the scanner:

```js
RECEIVERS="http://localhost:4321" node scanner.js
```

1. make sure the terminal where the scanner runs is focussed.
2. scan a barcode
3. the code should now be logged to the receiver
4. add the code to `codes` to assign an action to it!
