import { initProxyElement } from './ProxyListener';
export type WorkerCanvasTransferProps = {
    canvas: HTMLCanvasElement;
    context?: string;
    _id?: string;
    draw?: string | ((self: any, canvas: any, context: any) => void);
    update?: string | ((self: any, canvas: any, context: any, input: any) => void);
    init?: string | ((self: any, canvas: any, context: any) => void);
    clear?: string | ((self: any, canvas: any, context: any) => void);
    transfer?: any[];
    animating?: boolean;
    [key: string]: any;
};
export type CanvasProps = {
    canvas: any;
    context?: string | CanvasRenderingContext2D | WebGL2RenderingContext | WebGLRenderingContext;
    _id: string;
    width?: number;
    height?: number;
    draw?: string | ((self: any, canvas: any, context: any) => void);
    update?: string | ((self: any, canvas: any, context: any, input: any) => void);
    init?: string | ((self: any, canvas: any, context: any) => void);
    clear?: string | ((self: any, canvas: any, context: any) => void);
    animating?: boolean;
    preventDefault?: boolean;
    [key: string]: any;
};
export type CanvasControls = {
    _id: string;
    draw: (props?: any, transfer?: any) => void;
    update: (props: {
        [key: string]: any;
    }, transfer?: any) => void;
    clear: () => void;
    init: () => void;
    stop: () => void;
    start: () => void;
    set: (newDrawProps: CanvasProps, transfer?: any) => void;
};
export type WorkerCanvasControls = {
    worker: Worker | MessagePort;
    terminate: () => void;
} & CanvasControls;
export type WorkerCanvas = {
    graph: any;
    canvas: any;
    context?: CanvasRenderingContext2D | WebGL2RenderingContext | WebGLRenderingContext;
    _id: string;
    draw?: ((self: WorkerCanvas, canvas: WorkerCanvas['canvas'], context: WorkerCanvas['context']) => void);
    update?: ((self: WorkerCanvas, canvas: WorkerCanvas['canvas'], context: WorkerCanvas['context'], input: any) => void);
    init?: ((self: WorkerCanvas, canvas: WorkerCanvas['canvas'], context: WorkerCanvas['context']) => void);
    clear?: ((self: WorkerCanvas, canvas: WorkerCanvas['canvas'], context: WorkerCanvas['context']) => void);
    stop: () => void;
    start: () => void;
    set: (newDrawProps: CanvasProps, transfer?: any) => void;
    terminate: () => void;
    animating: boolean;
    [key: string]: any;
};
export declare function Renderer(options: CanvasProps & {
    worker?: Worker | string | Blob | MessagePort | true;
    route?: string;
}): string | CanvasControls | Promise<unknown>;
export declare function transferCanvas(worker: Worker | MessagePort, options: WorkerCanvasTransferProps, route?: string): WorkerCanvasControls;
export declare function setDraw(settings: CanvasProps, _id?: string): string;
export declare function setupCanvas(options: CanvasProps): string | CanvasControls | Promise<unknown>;
export declare function drawFrame(props?: {
    [key: string]: any;
}, _id?: string): string;
export declare function clearCanvas(_id?: string): string;
export declare function initCanvas(_id?: string): string;
export declare function updateCanvas(input?: any, _id?: string): string;
export declare function setProps(props?: {
    [key: string]: any;
}, _id?: string): string;
export declare function startAnim(_id?: string, draw?: string | ((this: any, canvas: any, context: any) => void)): string;
export declare function stopAnim(_id: string): string;
export declare function getCanvas(_id?: string): any;
export declare const workerCanvasRoutes: {
    Renderer: typeof Renderer;
    transferCanvas: typeof transferCanvas;
    setupCanvas: typeof setupCanvas;
    setDraw: typeof setDraw;
    drawFrame: typeof drawFrame;
    clearCanvas: typeof clearCanvas;
    initCanvas: typeof initCanvas;
    updateCanvas: typeof updateCanvas;
    setProps: typeof setProps;
    startAnim: typeof startAnim;
    stopAnim: typeof stopAnim;
    getCanvas: typeof getCanvas;
    initProxyElement: typeof initProxyElement;
    makeProxy: (id: any, elm?: any) => any;
    handleProxyEvent: (data: any, id: any) => any;
};
