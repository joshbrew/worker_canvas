import { Renderer, WorkerCanvas } from '../WorkerCanvas';

const canvas = document.createElement('canvas'); 
canvas.width = 800; canvas.height = 600;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.id = 'myCanvas';
document.body.appendChild(canvas);

const workerRenderer = Renderer({
  canvas: canvas,
  context:'2d',
  worker: true, //use our prebundled worker
  _id:canvas.id,
  init:(self:WorkerCanvas,canvas,context)=>{ //init called automatically before first draw on thread
      console.log('canvas', canvas)
      canvas.addEventListener('mousedown',(ev)=>{ //ProxyListener mimics most of the necessary mouse and key events e.g. for proxying threejs controls on thread for processing event logic locally on the thread. Also includes resize events
          console.log('clicked!', ev, canvas);
      })
  },
  draw:(self:WorkerCanvas,canvas:any,context:CanvasRenderingContext2D)=>{ //render loop starts automatically on thread after receiving canvas and instructions
      context.clearRect(0,0,canvas.width, canvas.height);
      
      context.fillStyle = `rgb(0,${Math.sin(Date.now()*0.001)*255},${Math.cos(Date.now()*0.001)*255})`;
      context.fillRect(0,0,canvas.width,canvas.height);
  }                        
});