# canvas.worker.ts Documentation

## Overview

The `canvas.worker.ts` file defines a minimalistic web worker designed to handle offscreen canvases. This worker operates independently from GraphScript and provides a simple execution environment to offload graphical computations from the main thread.

## Import

The script imports `workerCanvasRoutes` from `./WorkerCanvas`, which is presumably a module containing specific offscreen canvas-related functions and routes.

```typescript
import { workerCanvasRoutes } from './WorkerCanvas';
```

## Worker Scope Check

The worker ensures it is being executed within the correct context by checking the existence of `WorkerGlobalScope`. This step is crucial to prevent the worker code from running outside of a web worker context.

```typescript
declare var WorkerGlobalScope;

if (typeof WorkerGlobalScope !== 'undefined') {
    // Worker code will execute here
}
```

## Message Handling

The worker uses an `onmessage` listener to intercept messages from the main thread. It expects messages to follow a certain structure with `route` and `args` properties.

- `route`: A string that matches a function name in `workerCanvasRoutes`
- `args`: An array or singular argument to be passed into the route's corresponding function

If a route is received, the corresponding function is invoked with the provided arguments. The handling of the worker's internal communication is performed by the called functions.

```typescript
self.onmessage = (ev) => {
    if (ev.data.route) {
        if (Array.isArray(ev.data.args)) {
            routes[ev.data.route](...ev.data.args);
        } else routes[ev.data.route](ev.data.args);
    }
    // Function execution based on route occurs here
}
```

## Export

The worker script exports itself, allowing it to be used as a module if desired, which can be beneficial for certain worker instantiation patterns. We use it for tinybuild to recognize a worker bundle.

```typescript
export default self as any;
```

## Usage Example

This worker is to be instantiated in the main thread, and messages are posted to it, expecting it to process and handle offscreen canvas renderings or other computations. The details of the message protocol are assumed to be specified in the `workerCanvasRoutes` module.

## Conclusion

`canvas.worker.ts` is a lightweight foundation for offscreen canvas operations in web workers, delegating route-specific functions to handle the nuances of worker communication. This structure allows for an organized, scalable approach to enhance performance in web applications through parallel computing.