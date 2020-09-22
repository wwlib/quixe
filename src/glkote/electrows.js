const { EventEmitter } = require('events');
const WebSocket = require('ws');

// Electrows exposes a socket server in lectrote to enable rudimentary socket clients

const wss = new WebSocket.Server({ port: 8080 });
let socket;


/* Put everything inside the GlkOte namespace. */
var Electrows = function () {

    const electrowsEmitter = new EventEmitter();


    function electrows_init() {
        console.log(`Electrows: init`);

        wss.on('connection', function connection(ws) {
            socket = ws;
            socket.on('message', function incoming(message) {
                console.log('received: %s', message);
                // const data = JSON.parse(message);
                try {
                    const messageData = JSON.parse(message);
                    emitSubmit({ input: messageData.text });
                } catch (ex) {
                    console.log(ex);
                }
            });
        });
        return electrowsEmitter;
    }

    function electrows_onUpdate(data) {
        console.log(`Electrows: onUpdate:`, data);
        const message = JSON.stringify(data);
        if (socket) {
            socket.send(message);
        } else {
            console.log(`Electrows: onUpdate: socket undefined`);
        }
    }

    function emitSubmit(data) {
        console.log(`Electrows: emitSubmit`);
        data = data || { input: 'North'};
        electrowsEmitter.emit('submit', data);
    }

    /* ---------------------------------------------- */

    /* End of Electrows namespace function. Return the object which will
       become the Electrows global. */
    return {
        version: '0.0.1',
        init: electrows_init,
        onUpdate: electrows_onUpdate,
    };

}();

// Node-compatible behavior
try { exports.Electrows = Electrows; } catch (ex) { };

/* End of Electrows library. */