# ProxyListener.ts Documentation

## Overview

`ProxyListener.ts` serves as an intermediary layer to facilitate event handling between UI and worker threads, particularly within the context of offscreen canvases and web applications employing proxy elements to forward events to worker threads.

This file encapsulates the logic required to register event handlers, preprocess events, and send structured event data to worker threads. It also provides the foundational classes and functions needed to replicate the event dispatch mechanism within the worker context.

## Event Handlers

This script offers a variety of event handlers tailored to specific DOM events, such as mouse, keyboard, touch, and wheel events. Handlers are designed to capture necessary event properties and send a serialized form of the event to worker threads. Event processing can be customized to prevent the default behavior if needed.

Handlers include:

- Mouse events (`mousedown`, `mousemove`, `mouseup`, `pointerdown`, etc.)
- Touch events (`touchstart`, `touchmove`, `touchend`)
- Keyboard events (`keydown`, `keyup`) with filtering support to prevent default handling of specified keys
- Focus events (`focus`, `blur`)
- Wheel events (`wheel`)

## Proxy Initialization

`initProxyElement` is a crucial function exported from this module. This function initializes the proxying of events from a given DOM element to a specified worker thread. It dynamically assigns a unique identifier if one isn't provided and registers an event listener for each event type the application requires.

This function ensures event data are correctly forwarded to the worker thread, triggering the associated listener within the worker's context.

## Worker Thread Classes

### EventDispatcher

`EventDispatcher` is a utility class that mimics the browser's EventTarget interface. It allows adding, removing, and checking event listeners and dispatching events to them.

### ElementProxyReceiver

`ElementProxyReceiver` extends `EventDispatcher` and acts as a virtual representation of the DOM element within the worker thread. This class receives event data from the main thread and dispatches events as if they are happening to the actual DOM element.

### ProxyManager

`ProxyManager` maintains a collection of `ElementProxyReceiver` instances and provides methods to create and manage proxies for different elements. This class provides a faux `document` with an `elementFromPoint` function to support libraries like Three.js when operating in a worker context.

## Usage Example

```typescript
// Frontend:
let canvas = document.getElementById('myCanvas');
let worker = new Worker('worker.js');
let id = canvas.id;

initProxyElement(canvas, worker, id);

// Worker:
addEventListener('mousedown', (ev) => {
  // Handle mousedown event...
});
```

In the frontend, the `canvas` element is initialized with a proxy to send its events to the worker. The worker thread sets up an event listener that receives and processes the forwarded `mousedown` event as if it were the original event on the `canvas`.

## Conclusion

`ProxyListener.ts` abstracts the complexities of forwarding DOM events to worker threads, enabling developers to write smoother, more performance-efficient web applications by utilizing multi-threading for event handling.