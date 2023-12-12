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


import threewrkr from './three.worker'

const canvas2 = document.createElement('canvas'); 
canvas2.width = 800; canvas2.height = 600;
canvas2.id = 'myCanvas2';
document.body.appendChild(canvas2);
const myOffscreenCanvas = Renderer(
    {
        canvas: canvas2,
        worker: threewrkr, //use our prebundled worker
        route:"receiveThreeCanvas", //set a custom function to pass our Renderer creation logic to, e.g. to create a stage for setting up ThreeJS on the worker
        _id:canvas2.id,
        context:undefined, //Threejs sets the context
        init:(self:WorkerCanvas,canvas,context)=>{

            //these are installed to the 'self' reference
            const THREE = self.THREE;
            const OrbitControls = self.OrbitControls;
            const PickHelper = self.PickHelper;
            
            const renderer = new THREE.WebGLRenderer({canvas});
            let time = 0;
            let lastFrame = Date.now();

            const fov = 75;
            const aspect = 2;
            const near = 0.1;
            const far = 100;
            
            const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            camera.position.z = 4;

            renderer.setSize(canvas.width, canvas.height, false);
                if(camera) {
                    camera.aspect = canvas.clientWidth / canvas.clientHeight;
                    camera.updateProjectionMatrix();
                }

            const controls = new OrbitControls(camera, canvas);
            controls.target.set(0,0,0);
            controls.update();

            const scene = new THREE.Scene();

            {
                const color = 0xFFFFFF;
                const intensity = 1;
                const light = new THREE.DirectionalLight(color, intensity);
                light.position.set(-1, 2, 4);
                scene.add(light);
            }
        
            const boxWidth = 1;
            const boxHeight = 1;
            const boxDepth = 1;
            const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        
            const makeInstance = (geometry, color, x) => {
                const material = new THREE.MeshPhongMaterial({
                    color,
                });
            
                const cube = new THREE.Mesh(geometry, material);
                scene.add(cube);
            
                cube.position.x = x;
            
                return cube;
            }
        
            const cubes = [
                makeInstance(geometry, 0x44aa88, 0),
                makeInstance(geometry, 0x8844aa, -2),
                makeInstance(geometry, 0xaa8844, 2),
            ];

            let getCanvasRelativePosition = (event) => {
                const rect = canvas.getBoundingClientRect();
                return {
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top,
                };
            }
        
            const pickPosition = {x: -2, y: -2};
            const pickHelper = new PickHelper();

            let setPickPosition = (event) => {
                const pos = getCanvasRelativePosition(event);
                pickPosition.x = (pos.x / canvas.clientWidth ) *  2 - 1;
                pickPosition.y = (pos.y / canvas.clientHeight) * -2 + 1;  // note we flip Y
            }
        
            let clearPickPosition = () => {
                // unlike the mouse which always has a position
                // if the user stops touching the screen we want
                // to stop picking. For now we just pick a value
                // unlikely to pick something
                pickPosition.x = -100000;
                pickPosition.y = -100000;
            }
            
            canvas.addEventListener('mousemove', setPickPosition);
            canvas.addEventListener('mouseout', clearPickPosition);
            canvas.addEventListener('mouseleave', clearPickPosition);
        
            canvas.addEventListener('touchstart', (event) => {
                // prevent the window from scrolling
                event.preventDefault();
                setPickPosition(event.touches[0]);
            }, {passive: false});
        
            canvas.addEventListener('touchmove', (event) => {
                setPickPosition(event.touches[0]);
            });
        
            canvas.addEventListener('touchend', clearPickPosition);

            canvas.addEventListener('resize', (ev) => {
                renderer.setSize(canvas.width, canvas.height, false);
                if(camera) {
                    camera.aspect = canvas.clientWidth / canvas.clientHeight;
                    camera.updateProjectionMatrix();
                }
            });

            Object.assign(self, {
                renderer,
                camera,
                controls,
                scene,
                cubes,
                time,
                lastFrame,
                pickPosition,
                pickHelper
            }); //assign these to self for the draw function

            clearPickPosition();
            //this.renderer.setAnimationLoop(this.draw);


        },
        draw:(self:WorkerCanvas,canvas:any,context:any)=>{
            let now = Date.now();
            self.time += (now - self.lastFrame) * 0.001;
            self.lastFrame = now;

            self.cubes.forEach((cube, ndx) => {
                const speed = 1 + ndx * .1;
                const rot = self.time * speed;
                cube.rotation.x = rot;
                cube.rotation.y = rot;
                });
            
                
                self.pickHelper.pick(self.pickPosition, self.scene, self.camera, self.time);
                //console.log(this.pickPosition);
                self.renderer.render(self.scene, self.camera);
        },
        clear:(self:WorkerCanvas, canvas, context) => {
            if(self.renderer) {
                self.render.domElement = null;
                self.renderer = null;
                self.composer = null;
                self.gui = null;
                self.controls = null;
                self.camera = null;
                self.scene = null;
            }
        }
    }                
);