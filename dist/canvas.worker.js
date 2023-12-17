(()=>{var mouseEventHandler=makeSendPropertiesHandler(["ctrlKey","metaKey","altKey","shiftKey","button","which","pointerType","clientX","clientY","pageX","pageY","movementX","movementY","x","y","which","timeStamp"]);var wheelEventHandlerImpl=makeSendPropertiesHandler(["deltaX","deltaY"]);var keydownEventHandler=makeSendPropertiesHandler(["ctrlKey","metaKey","shiftKey","altKey","isComposing","keyCode","key","code","repeat","timeStamp"]);var orientationHandler=makeSendPropertiesHandler(["alpha","beta","gamma","absolute","webkitCompassHeading","webkitCompassAccuracy"]);var motionHandler=(event,sendFn,preventDefault)=>{if(preventDefault&&event.preventDefault)event.preventDefault();const data={type:"devicemotion",acceleration:{x:event.acceleration.x,y:event.acceleration.y,z:event.acceleration.y},accelerationIncludingGravity:{x:event.accelerationIncludingGravity.x,y:event.accelerationIncludingGravity.y,z:event.accelerationIncludingGravity.y},rotationRate:{alpha:event.rotationRate.alpha,beta:event.rotationRate.beta,gamma:event.rotationRate.gamma},interval:event.interval};sendFn(data)};var screenOrientationHandler=(event,sendFn,preventDefault)=>{if(preventDefault&&event.preventDefault)event.preventDefault();const data={type:"orientation",target:{type:event.target.type,angle:event.target.angle}};sendFn(data)};function copyProperties(src,properties,dst){for(const name of properties){dst[name]=src[name]}}function makeSendPropertiesHandler(properties){return function sendProperties(event,sendFn,preventDefault){if(preventDefault&&event.preventDefault)event.preventDefault();const data={type:event.type};copyProperties(event,properties,data);sendFn(data)}}function preventDefaultHandler(event,sendFn,preventDefault){if(preventDefault&&event.preventDefault)event.preventDefault()}function focusEventHandler(event,sendFn){const data={type:event.type};data.isTrusted=event.isTrusted;data.bubbles=event.bubbles;data.cancelBubble=event.cancelBubble;data.cancelable=event.cancelable;data.composed=event.composed;data.defaultPrevent=event.defaultPrevented;data.eventPhase=event.eventPhase;data.returnValue=event.returnValue;data.currentTarget=event.currentTarget.id?event.currentTarget.id:event.currentTarget.constructor.name;data.target=data.currentTarget;data.srcElement=data.currentTarget;sendFn(data)}function wheelEventHandler(event,sendFn,preventDefault){if(preventDefault&&event.preventDefault)event.preventDefault();wheelEventHandlerImpl(event,sendFn)}function touchEventHandler(event,sendFn,preventDefault){if(preventDefault&&event.preventDefault)event.preventDefault();const touches=[];const data={type:event.type,touches};for(let i2=0;i2<event.touches.length;++i2){const touch=event.touches[i2];touches.push({pageX:touch.pageX,pageY:touch.pageY})}sendFn(data)}var i=1;var keys={};while(i<222){keys[i]=true;i++}function filteredKeydownEventHandler(event,sendFn,preventDefault){let{keyCode}=event;if(keys[keyCode]){if(preventDefault&&event.preventDefault&&(keyCode<110||keyCode>123))event.preventDefault();keydownEventHandler(event,sendFn)}}var eventHandlers={contextmenu:preventDefaultHandler,mousedown:mouseEventHandler,mousemove:mouseEventHandler,mouseup:mouseEventHandler,pointerdown:mouseEventHandler,pointermove:mouseEventHandler,pointerup:mouseEventHandler,pointerlockchange:mouseEventHandler,webkitpointerlockchange:mouseEventHandler,focus:focusEventHandler,blur:focusEventHandler,pointerout:mouseEventHandler,touchstart:touchEventHandler,touchmove:touchEventHandler,touchend:touchEventHandler,wheel:wheelEventHandler,keydown:filteredKeydownEventHandler,keyup:filteredKeydownEventHandler,deviceorientation:orientationHandler,devicemotion:motionHandler,orientation:screenOrientationHandler};function initProxyElement(element,worker,id,preventDefault){if(!id)id="proxy"+Math.floor(Math.random()*1e15);const sendEvent=data=>{if(!worker){handleProxyEvent(data,id)}else worker.postMessage({route:"handleProxyEvent",args:[data,id]})};let entries=Object.entries(eventHandlers);let functions={};for(const[eventName,handler]of entries){functions[eventName]=function(event){handler(event,sendEvent,preventDefault)};element.addEventListener(eventName,functions[eventName])}if(eventHandlers.keydown){functions["keydown"]=function(event){eventHandlers.keydown(event,sendEvent,preventDefault)};globalThis.addEventListener("keydown",functions["keydown"])}if(eventHandlers.keyup){functions["keyup"]=function(event){eventHandlers.keyup(event,sendEvent,preventDefault)};globalThis.addEventListener("keyup",functions["keyup"])}if(eventHandlers.devicemotion){functions["devicemotion"]=function(event){eventHandlers.devicemotion(event,sendEvent,preventDefault)};globalThis.addEventListener("devicemotion",functions["devicemotion"])}if(eventHandlers.deviceorientation){functions["deviceorientation"]=function(event){eventHandlers.deviceorientation(event,sendEvent,preventDefault)};globalThis.addEventListener("deviceorientation",functions["deviceorientation"])}if(eventHandlers.orientation){functions["orientation"]=event=>{eventHandlers.orientation(event,sendEvent,preventDefault)};screen.orientation.addEventListener("change",functions["orientation"])}const sendSize=()=>{const rect=element.getBoundingClientRect();sendEvent({type:"resize",left:rect.left,top:rect.top,width:element.clientWidth,height:element.clientHeight})};sendSize();globalThis.addEventListener("resize",sendSize);return{functions,terminate:()=>{for(const key in functions){if(key==="keyup"||key==="keydown"||key==="devicemotion"||key==="deviceorientation"){globalThis.removeEventListener(key,functions[key])}else if(key==="orientation"){screen.orientation.removeEventListener("change",functions[key])}else{element.removeEventListener(key,functions[key])}}},id}}var EventDispatcher=class{__listeners;addEventListener(type,listener){if(this.__listeners===void 0)this.__listeners={};const listeners=this.__listeners;if(listeners[type]===void 0){listeners[type]=[]}if(listeners[type].indexOf(listener)===-1){listeners[type].push(listener)}}hasEventListener(type,listener){if(this.__listeners===void 0)return false;const listeners=this.__listeners;return listeners[type]!==void 0&&listeners[type].indexOf(listener)!==-1}removeEventListener(type,listener){if(this.__listeners===void 0)return;const listeners=this.__listeners;const listenerArray=listeners[type];if(listenerArray!==void 0){const index=listenerArray.indexOf(listener);if(index!==-1){listenerArray.splice(index,1)}}}dispatchEvent(event,target){if(this.__listeners===void 0)return;const listeners=this.__listeners;const listenerArray=listeners[event.type];if(listenerArray!==void 0){if(!target)event.target=this;else event.target=target;const array=listenerArray.slice(0);for(let i2=0,l=array.length;i2<l;i2++){array[i2].call(this,event)}}}};function noop(){}var ElementProxyReceiver=class extends EventDispatcher{__listeners={};proxied;style={};width;left;right;top;height;constructor(){super();this.style={}}get clientWidth(){return this.width}get clientHeight(){return this.height}setPointerCapture=()=>{};releasePointerCapture=()=>{};getBoundingClientRect=()=>{return{left:this.left,top:this.top,width:this.width,height:this.height,right:this.left+this.width,bottom:this.top+this.height}};handleEvent=data=>{if(data.type==="resize"){this.left=data.left;this.top=data.top;this.width=data.width;this.height=data.height;if(typeof this.proxied==="object"){this.proxied.style.width=this.width+"px";this.proxied.style.height=this.height+"px";this.proxied.clientWidth=this.width;this.proxied.clientHeight=this.height}}data.preventDefault=noop;data.stopPropagation=noop;this.dispatchEvent(data,this.proxied)};focus(){}blur(){}};var ProxyManager=class{targets={};constructor(){if(!globalThis.document)globalThis.document={elementFromPoint:(...args)=>{return this.targets[Object.keys(this.targets)[0]].proxied}}}makeProxy=(id,addTo)=>{if(!id)id=`proxyReceiver${Math.floor(Math.random()*1e15)}`;let proxy;if(this.targets[id])proxy=this.targets[id];else{proxy=new ElementProxyReceiver;this.targets[id]=proxy}if(typeof addTo==="object"){addTo.proxy=proxy;proxy.proxied=addTo;if(typeof WorkerGlobalScope!=="undefined")addTo.style=proxy.style;if(proxy.width){addTo.style.width=proxy.width+"px";addTo.clientWidth=proxy.width}if(proxy.height){addTo.style.height=proxy.height+"px";addTo.clientHeight=proxy.height}addTo.setPointerCapture=proxy.setPointerCapture.bind(proxy);addTo.releasePointerCapture=proxy.releasePointerCapture.bind(proxy);addTo.getBoundingClientRect=proxy.getBoundingClientRect.bind(proxy);addTo.addEventListener=proxy.addEventListener.bind(proxy);addTo.removeEventListener=proxy.removeEventListener.bind(proxy);addTo.handleEvent=proxy.handleEvent.bind(proxy);addTo.dispatchEvent=proxy.dispatchEvent.bind(proxy);addTo.focus=proxy.focus.bind(proxy);addTo.blur=proxy.blur.bind(proxy)}};getProxy=id=>{return this.targets[id]};handleEvent=(data,id)=>{if(!this.targets[id])this.makeProxy(id);if(this.targets[id]){this.targets[id].handleEvent(data);return true}return void 0}};function makeProxy(id,elm){if(this?.__node?.graph){if(!this.__node.graph.ProxyManager)this.__node.graph.ProxyManager=new ProxyManager;this.__node.graph.ProxyManager.makeProxy(id,elm)}else{if(!globalThis.ProxyManager)globalThis.ProxyManager=new ProxyManager;globalThis.ProxyManager.makeProxy(id,elm)}return id}function handleProxyEvent(data,id){if(this?.__node?.graph){if(!this.__node.graph.ProxyManager)this.__node.graph.ProxyManager=new ProxyManager;if(this.__node.graph.ProxyManager.handleEvent(data,id))return data}else{if(!globalThis.ProxyManager)globalThis.ProxyManager=new ProxyManager;if(globalThis.ProxyManager.handleEvent(data,id))return data}}var proxyElementWorkerRoutes={initProxyElement,makeProxy,handleProxyEvent};function Renderer(options){if(options.worker===true){options.worker=canvas_worker_default}if(options.worker){let worker=options.worker;let route=options.route;if(worker instanceof Blob||typeof worker==="string"){worker=new Worker(worker)}delete options.worker;delete options.route;return transferCanvas(worker,options,route)}else{initProxyElement(options.canvas,void 0,options._id,options.preventDefault);return setupCanvas(options)}}function transferCanvas(worker,options,route){if(!options)return void 0;if(!options._id)options._id=`canvas${Math.floor(Math.random()*1e15)}`;let offscreen=options.canvas instanceof OffscreenCanvas?options.canvas:options.canvas.transferControlToOffscreen();if(!options.width)options.width=options.canvas.clientWidth;if(!options.height)options.height=options.canvas.clientHeight;let message={route:route?route:"setupCanvas",args:{...options,canvas:offscreen}};let proxy;if(this?.__node?.graph)proxy=this.__node.graph.run("initProxyElement",options.canvas,worker,options._id,options.preventDefault);else proxy=initProxyElement(options.canvas,worker,options._id,options.preventDefault);if(options.draw){if(typeof options.draw==="function")message.args.draw=options.draw.toString();else message.args.draw=options.draw}if(options.update){if(typeof options.update==="function")message.args.update=options.update.toString();else message.args.update=options.update}if(options.init){if(typeof options.init==="function")message.args.init=options.init.toString();else message.args.init=options.init}if(options.clear){if(typeof options.clear==="function")message.args.clear=options.clear.toString();else message.args.clear=options.clear}let tr=[offscreen];if(options.transfer){tr.push(...options.transfer);delete options.transfer}worker.postMessage(message,tr);const canvascontrols={_id:options._id,width:options.width,height:options.height,worker,draw:(props,transfer)=>{worker.postMessage({route:"drawFrame",args:[props,options._id]},transfer)},update:(props,transfer)=>{worker.postMessage({route:"updateCanvas",args:[props,options._id]},transfer)},clear:()=>{worker.postMessage({route:"clearCanvas",args:options._id})},init:()=>{worker.postMessage({route:"initCanvas",args:options._id})},stop:()=>{worker.postMessage({route:"stopAnim",args:options._id})},start:()=>{worker.postMessage({route:"startAnim",args:options._id})},set:(newDrawProps,transfer)=>{worker.postMessage({route:"setDraw",args:[newDrawProps,options._id]},transfer)},terminate:()=>{if(proxy)proxy.terminate();worker.terminate()}};return canvascontrols}function setDraw(settings,_id){let canvasopts;if(this?.__node?.graph){if(_id)canvasopts=this.__node.graph.CANVASES?.[settings._id];else if(settings._id)canvasopts=this.__node.graph.CANVASES?.[settings._id];else canvasopts=this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]]}else{if(_id)canvasopts=globalThis.CANVASES?.[settings._id];else if(settings._id)canvasopts=globalThis.CANVASES?.[settings._id];else canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]]}if(canvasopts){if(settings.canvas){canvasopts.canvas=settings.canvas;if(canvasopts.proxy)canvasopts.proxy.terminate();let proxy;if(this?.__node?.graph)proxy=this.__node.graph.run("makeProxy",canvasopts._id,canvasopts.canvas);else proxy=proxyElementWorkerRoutes.makeProxy(canvasopts._id,canvasopts.canvas);canvasopts.proxy=proxy}if(typeof settings.context==="string")canvasopts.context=canvasopts.canvas.getContext(settings.context);else if(settings.context)canvasopts.context=settings.context;if(settings.width)canvasopts.canvas.width=settings.width;if(settings.height)canvasopts.canvas.height=settings.height;if(typeof settings.draw==="string")settings.draw=parseFunctionFromText(settings.draw);if(typeof settings.draw==="function"){canvasopts.draw=settings.draw.bind(settings)}if(typeof settings.update==="string")settings.update=parseFunctionFromText(settings.update);if(typeof settings.update==="function"){canvasopts.update=settings.update.bind(settings)}if(typeof settings.init==="string")settings.init=parseFunctionFromText(settings.init);if(typeof settings.init==="function"){canvasopts.init=settings.init.bind(settings)}if(typeof settings.clear==="string")settings.clear=parseFunctionFromText(settings.clear);if(typeof settings.clear==="function"){canvasopts.clear=settings.clear.bind(settings)}return settings._id}return void 0}function setupCanvas(options){if(this?.__node?.graph){if(!this.__node.graph.CANVASES)this.__node.graph.CANVASES={}}else if(!globalThis.CANVASES)globalThis.CANVASES={};let canvasOptions=options;options._id?canvasOptions._id=options._id:canvasOptions._id=`canvas${Math.floor(Math.random()*1e15)}`;typeof options.context==="string"?canvasOptions.context=options.canvas.getContext(options.context):canvasOptions.context=options.context;"animating"in options?canvasOptions.animating=options.animating:canvasOptions.animating=true;let proxy;if(this?.__node?.graph?.CANVASES[canvasOptions._id]){this.__node.graph.run("setDraw",canvasOptions)}else if(globalThis.CANVASES?.[canvasOptions._id]){setDraw(canvasOptions)}else{if(this?.__node?.graph){canvasOptions.graph=this.__node.graph;if(!canvasOptions.__node){canvasOptions.__node={}}if(!canvasOptions.__node.tag)canvasOptions.__node.tag=canvasOptions._id;canvasOptions=this.__node.graph.add(canvasOptions);canvasOptions.__addOndisconnected=()=>{canvasOptions.stop();delete this.__node.graph.CANVASES[canvasOptions._id]}}if(this?.__node?.graph)this.__node.graph.CANVASES[canvasOptions._id]=canvasOptions;else globalThis.CANVASES[canvasOptions._id]=canvasOptions;if(this?.__node?.graph)proxy=this.__node.graph.run("makeProxy",canvasOptions._id,canvasOptions.canvas);else proxy=proxyElementWorkerRoutes.makeProxy(canvasOptions._id,canvasOptions.canvas);if(options.width)canvasOptions.canvas.width=options.width;if(options.height)canvasOptions.canvas.height=options.height;if(typeof canvasOptions.draw==="string"){canvasOptions.draw=parseFunctionFromText(canvasOptions.draw)}else if(typeof canvasOptions.draw==="function"){canvasOptions.draw=canvasOptions.draw.bind(canvasOptions)}if(typeof canvasOptions.update==="string"){canvasOptions.update=parseFunctionFromText(canvasOptions.update)}else if(typeof canvasOptions.update==="function"){canvasOptions.update=canvasOptions.update.bind(canvasOptions)}if(typeof canvasOptions.init==="string"){canvasOptions.init=parseFunctionFromText(canvasOptions.init)}else if(typeof canvasOptions.init==="function"){canvasOptions.init=canvasOptions.init.bind(canvasOptions)}if(typeof canvasOptions.clear==="string"){canvasOptions.clear=parseFunctionFromText(canvasOptions.clear)}else if(typeof canvasOptions.clear==="function"){canvasOptions.clear=canvasOptions.clear.bind(canvasOptions)}if(typeof canvasOptions.init==="function")canvasOptions.init(canvasOptions,canvasOptions.canvas,canvasOptions.context);canvasOptions.stop=()=>{stopAnim(canvasOptions._id)};canvasOptions.start=draw=>{startAnim(canvasOptions._id,draw)};canvasOptions.set=settings=>{setDraw(settings,canvasOptions._id)};if(typeof canvasOptions.draw==="function"&&canvasOptions.animating){let draw=(s,canvas,context)=>{if(s.animating){s.draw(s,canvas,context);requestAnimationFrame(()=>{draw(s,canvas,context)})}};draw(canvasOptions,canvasOptions.canvas,canvasOptions.context)}}if(typeof WorkerGlobalScope!=="undefined"&&self instanceof WorkerGlobalScope)return canvasOptions._id;else{const canvascontrols={_id:options._id,width:options.width,height:options.height,proxy,draw:props=>{drawFrame(props,options._id)},update:props=>{updateCanvas(props,options._id)},clear:()=>{clearCanvas(options._id)},init:()=>{initCanvas(options._id)},stop:()=>{stopAnim(options._id)},start:()=>{startAnim(options._id)},set:newDrawProps=>{setDraw(newDrawProps,options._id)},terminate:()=>{if(canvascontrols.proxy){canvascontrols.proxy.terminate()}if(this.__node?.graph)this.__node.graph.remove(options._id);else{stopAnim(options._id);if(this?.__node?.graph)delete this.__node.graph.CANVASES[canvasOptions._id];else delete globalThis.CANVASES[canvasOptions._id]}}};return canvascontrols}}function drawFrame(props,_id){let canvasopts=getCanvas.call(this,_id);if(canvasopts){if(props)Object.assign(canvasopts,props);if(canvasopts.draw){canvasopts.draw(canvasopts,canvasopts.canvas,canvasopts.context);return _id}}return void 0}function clearCanvas(_id){let canvasopts=getCanvas.call(this,_id);if(canvasopts?.clear){canvasopts.clear(canvasopts,canvasopts.canvas,canvasopts.context);return _id}return void 0}function initCanvas(_id){let canvasopts=getCanvas.call(this,_id);if(canvasopts?.init){canvasopts.init(canvasopts,canvasopts.canvas,canvasopts.context);return _id}return void 0}function updateCanvas(input,_id){let canvasopts=getCanvas.call(this,_id);if(canvasopts?.update){canvasopts.update(canvasopts,canvasopts.canvas,canvasopts.context,input);return _id}return void 0}function setProps(props,_id){let canvasopts=getCanvas.call(this,_id);if(canvasopts&&props){Object.assign(canvasopts,props);if(props.width)canvasopts.canvas.width=props.width;if(props.height)canvasopts.canvas.height=props.height;return _id}return void 0}function startAnim(_id,draw){let canvasopts=getCanvas.call(this,_id);canvasopts.animating=true;if(canvasopts&&draw){if(typeof draw==="string")draw=parseFunctionFromText(draw);if(typeof draw==="function"){canvasopts.draw=draw}return _id}if(typeof canvasopts?.draw==="function"){let draw2=(s,canvas,context)=>{if(s.animating){s.draw(s,canvas,context);requestAnimationFrame(()=>{draw2(s,canvas,context)})}};if(typeof canvasopts.clear==="function")canvasopts.clear(canvasopts,canvasopts.canvas,canvasopts.context);if(typeof canvasopts.init==="function")canvasopts.init(canvasopts,canvasopts.canvas,canvasopts.context);draw2(canvasopts,canvasopts.canvas,canvasopts.context);return _id}return void 0}function stopAnim(_id){let canvasopts=getCanvas.call(this,_id);if(canvasopts){canvasopts.animating=false;if(typeof canvasopts.clear==="function")requestAnimationFrame(canvasopts.clear(canvasopts,canvasopts.canvas,canvasopts.context));return _id}return void 0}function getCanvas(_id){let canvasopts;if(this?.__node?.graph){if(!_id)canvasopts=this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];else canvasopts=this.__node.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}return canvasopts}var workerCanvasRoutes={...proxyElementWorkerRoutes,Renderer,transferCanvas,setupCanvas,setDraw,drawFrame,clearCanvas,initCanvas,updateCanvas,setProps,startAnim,stopAnim,getCanvas};function parseFunctionFromText(method=""){let getFunctionBody=methodString=>{return methodString.replace(/^\W*(function[^{]+\{([\s\S]*)\}|[^=]+=>[^{]*\{([\s\S]*)\}|[^=]+=>(.+))/i,"$2$3$4")};let getFunctionHead=methodString=>{let startindex=methodString.indexOf("=>")+1;if(startindex<=0){startindex=methodString.indexOf("){")}if(startindex<=0){startindex=methodString.indexOf(") {")}return methodString.slice(0,methodString.indexOf("{",startindex)+1)};let newFuncHead=getFunctionHead(method);let newFuncBody=getFunctionBody(method);let newFunc;if(newFuncHead.includes("function")){let varName=newFuncHead.split("(")[1].split(")")[0];newFunc=new Function(varName,newFuncBody)}else{if(newFuncHead.substring(0,6)===newFuncBody.substring(0,6)){let varName=newFuncHead.split("(")[1].split(")")[0];newFunc=new Function(varName,newFuncBody.substring(newFuncBody.indexOf("{")+1,newFuncBody.length-1))}else{try{newFunc=(0,eval)(newFuncHead+newFuncBody+"}")}catch{}}}return newFunc}if(typeof WorkerGlobalScope!=="undefined"){const routes={...workerCanvasRoutes};self.onmessage=ev=>{if(ev.data.route){if(Array.isArray(ev.data.args)){routes[ev.data.route](...ev.data.args)}else routes[ev.data.route](ev.data.args)}}}var canvas_worker_default=self;})();
