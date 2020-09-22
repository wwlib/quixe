# quixe-notes

Modifications by wwlib - August 2020

### connecting to quixe via socket client

Added: Electrows (src/glkote/electrows.js)
- starts a WebSocket server
- accepts unauthenticated connections
- acts as an event emitter - emits socket messages when they are received
- messages are sent to clients via: `electrows_onUpdate(data)`

Build
- modified build.py to include `electrows.js` in `lib/elkote.min.js`
```
python build.py
```

```js
compress_source(
    'lib/elkote.min.js', [
        'src/glkote/glkote.js',
        'src/glkote/electrofs.js',
        'src/glkote/glkapi.js',
        'src/glkote/electrows.js',
        ])
```

### integration with glkote.js

- glkote.js calls `electrowsOnUpdate` during `glkote_update`

### integration with lectrote

- lectrote is an electron wrapper for quixe
- lectrote instantiates `Electrows` on init in `play.html`