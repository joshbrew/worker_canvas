var F=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var d=y(["ctrlKey","metaKey","altKey","shiftKey","button","which","pointerType","clientX","clientY","pageX","pageY","movementX","movementY","x","y","which","timeStamp"]),j=y(["deltaX","deltaY"]),G=y(["ctrlKey","metaKey","shiftKey","altKey","isComposing","keyCode","key","code","repeat","timeStamp"]),B=y(["alpha","beta","gamma","absolute","webkitCompassHeading","webkitCompassAccuracy"]),K=(t,e,n)=>{n&&t.preventDefault&&t.preventDefault();let a={type:"devicemotion",acceleration:{x:t.acceleration.x,y:t.acceleration.y,z:t.acceleration.y},accelerationIncludingGravity:{x:t.accelerationIncludingGravity.x,y:t.accelerationIncludingGravity.y,z:t.accelerationIncludingGravity.y},rotationRate:{alpha:t.rotationRate.alpha,beta:t.rotationRate.beta,gamma:t.rotationRate.gamma},interval:t.interval};e(a)},z=(t,e,n)=>{n&&t.preventDefault&&t.preventDefault();let a={type:"orientation",target:{type:t.target.type,angle:t.target.angle}};e(a)};function X(t,e,n){for(let a of e)n[a]=t[a]}function y(t){return function(n,a,r){r&&n.preventDefault&&n.preventDefault();let s={type:n.type};X(n,t,s),a(s)}}function Y(t,e,n){n&&t.preventDefault&&t.preventDefault()}function P(t,e){let n={type:t.type};n.isTrusted=t.isTrusted,n.bubbles=t.bubbles,n.cancelBubble=t.cancelBubble,n.cancelable=t.cancelable,n.composed=t.composed,n.defaultPrevent=t.defaultPrevented,n.eventPhase=t.eventPhase,n.returnValue=t.returnValue,n.currentTarget=t.currentTarget.id?t.currentTarget.id:t.currentTarget.constructor.name,n.target=n.currentTarget,n.srcElement=n.currentTarget,e(n)}function $(t,e,n){n&&t.preventDefault&&t.preventDefault(),j(t,e)}function m(t,e,n){n&&t.preventDefault&&t.preventDefault();let a=[],r={type:t.type,touches:a};for(let s=0;s<t.touches.length;++s){let i=t.touches[s];a.push({pageX:i.pageX,pageY:i.pageY})}e(r)}var C=1,W={};for(;C<222;)W[C]=!0,C++;function A(t,e,n){let{keyCode:a}=t;W[a]&&(n&&t.preventDefault&&(a<110||a>123)&&t.preventDefault(),G(t,e))}var c={contextmenu:Y,mousedown:d,mousemove:d,mouseup:d,pointerdown:d,pointermove:d,pointerup:d,pointerlockchange:d,webkitpointerlockchange:d,focus:P,blur:P,pointerout:d,touchstart:m,touchmove:m,touchend:m,wheel:$,keydown:A,keyup:A,deviceorientation:B,devicemotion:K,orientation:z};function p(t,e,n,a){n||(n="proxy"+Math.floor(Math.random()*1e15));let r=o=>{e?e.postMessage({route:"handleProxyEvent",args:[o,n]}):M(o,n)},s=Object.entries(c),i={};for(let[o,u]of s)i[o]=function(O){u(O,r,a)},t.addEventListener(o,i[o]);c.keydown&&(i.keydown=function(o){c.keydown(o,r,a)},globalThis.addEventListener("keydown",i.keydown)),c.keyup&&(i.keyup=function(o){c.keyup(o,r,a)},globalThis.addEventListener("keyup",i.keyup)),c.devicemotion&&(i.devicemotion=function(o){c.devicemotion(o,r,a)},globalThis.addEventListener("devicemotion",i.devicemotion)),c.deviceorientation&&(i.deviceorientation=function(o){c.deviceorientation(o,r,a)},globalThis.addEventListener("deviceorientation",i.deviceorientation)),c.orientation&&(i.orientation=o=>{c.orientation(o,r,a)},screen.orientation.addEventListener("change",i.orientation));let l=()=>{let o=t.getBoundingClientRect();r({type:"resize",left:o.left,top:o.top,width:t.clientWidth,height:t.clientHeight})};return l(),globalThis.addEventListener("resize",l),{functions:i,terminate:()=>{for(let o in i)o==="keyup"||o==="keydown"||o==="devicemotion"||o==="deviceorientation"?globalThis.removeEventListener(o,i[o]):o==="orientation"?screen.orientation.removeEventListener("change",i[o]):t.removeEventListener(o,i[o])},id:n}}var w=class{__listeners;addEventListener(e,n){this.__listeners===void 0&&(this.__listeners={});let a=this.__listeners;a[e]===void 0&&(a[e]=[]),a[e].indexOf(n)===-1&&a[e].push(n)}hasEventListener(e,n){if(this.__listeners===void 0)return!1;let a=this.__listeners;return a[e]!==void 0&&a[e].indexOf(n)!==-1}removeEventListener(e,n){if(this.__listeners===void 0)return;let r=this.__listeners[e];if(r!==void 0){let s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e,n){if(this.__listeners===void 0)return;let r=this.__listeners[e.type];if(r!==void 0){n?e.target=n:e.target=this;let s=r.slice(0);for(let i=0,l=s.length;i<l;i++)s[i].call(this,e)}}};function S(){}var b=class extends w{__listeners={};proxied;style={};width;left;right;top;height;constructor(){super(),this.style={}}get clientWidth(){return this.width}get clientHeight(){return this.height}setPointerCapture=()=>{};releasePointerCapture=()=>{};getBoundingClientRect=()=>({left:this.left,top:this.top,width:this.width,height:this.height,right:this.left+this.width,bottom:this.top+this.height});handleEvent=e=>{e.type==="resize"&&(this.left=e.left,this.top=e.top,this.width=e.width,this.height=e.height,typeof this.proxied=="object"&&(this.proxied.style.width=this.width+"px",this.proxied.style.height=this.height+"px",this.proxied.clientWidth=this.width,this.proxied.clientHeight=this.height)),e.preventDefault=S,e.stopPropagation=S,this.dispatchEvent(e,this.proxied)};focus(){}blur(){}},g=class{targets={};constructor(){globalThis.document||(globalThis.document={elementFromPoint:(...e)=>this.targets[Object.keys(this.targets)[0]].proxied})}makeProxy=(e,n)=>{e||(e=`proxyReceiver${Math.floor(Math.random()*1e15)}`);let a;this.targets[e]?a=this.targets[e]:(a=new b,this.targets[e]=a),typeof n=="object"&&(n.proxy=a,a.proxied=n,typeof WorkerGlobalScope<"u"&&(n.style=a.style),a.width&&(n.style.width=a.width+"px",n.clientWidth=a.width),a.height&&(n.style.height=a.height+"px",n.clientHeight=a.height),n.setPointerCapture=a.setPointerCapture.bind(a),n.releasePointerCapture=a.releasePointerCapture.bind(a),n.getBoundingClientRect=a.getBoundingClientRect.bind(a),n.addEventListener=a.addEventListener.bind(a),n.removeEventListener=a.removeEventListener.bind(a),n.handleEvent=a.handleEvent.bind(a),n.dispatchEvent=a.dispatchEvent.bind(a),n.focus=a.focus.bind(a),n.blur=a.blur.bind(a))};getProxy=e=>this.targets[e];handleEvent=(e,n)=>{if(this.targets[n]||this.makeProxy(n),this.targets[n])return this.targets[n].handleEvent(e),!0}};function q(t,e){return this?.__node?.graph?(this.__node.graph.ProxyManager||(this.__node.graph.ProxyManager=new g),this.__node.graph.ProxyManager.makeProxy(t,e)):(globalThis.ProxyManager||(globalThis.ProxyManager=new g),globalThis.ProxyManager.makeProxy(t,e)),t}function M(t,e){if(this?.__node?.graph){if(this.__node.graph.ProxyManager||(this.__node.graph.ProxyManager=new g),this.__node.graph.ProxyManager.handleEvent(t,e))return t}else if(globalThis.ProxyManager||(globalThis.ProxyManager=new g),globalThis.ProxyManager.handleEvent(t,e))return t}var v={initProxyElement:p,makeProxy:q,handleProxyEvent:M};var k;if(typeof process<"u")try{typeof import.meta<"u"&&(globalThis.__filename=fileURLToPath(import.meta.url),globalThis.__dirname=fileURLToPath(new URL(".",import.meta.url))),k=F("path").join(process.cwd(),__dirname,"canvas.worker.js")}catch{}else{let e=globalThis.location.href.split("/");e.pop(),e=e.join("/"),k=e+"/canvas.worker.js"}var T=k;function I(t){if(t.worker===!0&&(t.worker=T),t.worker){let e=t.worker,n=t.route;return(e instanceof Blob||typeof e=="string")&&(e=new Worker(e)),delete t.worker,delete t.route,N(e,t,n)}else return p(t.canvas,void 0,t._id,t.preventDefault),V(t)}function N(t,e,n){if(!e)return;e._id||(e._id=`canvas${Math.floor(Math.random()*1e15)}`);let a=e.canvas instanceof OffscreenCanvas?e.canvas:e.canvas.transferControlToOffscreen();e.width||(e.width=e.canvas.clientWidth),e.height||(e.height=e.canvas.clientHeight);let r={route:n||"setupCanvas",args:{...e,canvas:a}},s;this?.__node?.graph?s=this.__node.graph.run("initProxyElement",e.canvas,t,e._id,e.preventDefault):s=p(e.canvas,t,e._id,e.preventDefault),e.draw&&(typeof e.draw=="function"?r.args.draw=e.draw.toString():r.args.draw=e.draw),e.update&&(typeof e.update=="function"?r.args.update=e.update.toString():r.args.update=e.update),e.init&&(typeof e.init=="function"?r.args.init=e.init.toString():r.args.init=e.init),e.clear&&(typeof e.clear=="function"?r.args.clear=e.clear.toString():r.args.clear=e.clear);let i=[a];return e.transfer&&(i.push(...e.transfer),delete e.transfer),t.postMessage(r,i),{_id:e._id,width:e.width,height:e.height,worker:t,draw:(o,u)=>{t.postMessage({route:"drawFrame",args:[o,e._id]},u)},update:(o,u)=>{t.postMessage({route:"updateCanvas",args:[o,e._id]},u)},clear:()=>{t.postMessage({route:"clearCanvas",args:e._id})},init:()=>{t.postMessage({route:"initCanvas",args:e._id})},stop:()=>{t.postMessage({route:"stopAnim",args:e._id})},start:()=>{t.postMessage({route:"startAnim",args:e._id})},set:(o,u)=>{t.postMessage({route:"setDraw",args:[o,e._id]},u)},terminate:()=>{s&&s.terminate(),t.terminate()}}}function _(t,e){let n;if(this?.__node?.graph?e?n=this.__node.graph.CANVASES?.[t._id]:t._id?n=this.__node.graph.CANVASES?.[t._id]:n=this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]]:e||t._id?n=globalThis.CANVASES?.[t._id]:n=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]],n){if(t.canvas){n.canvas=t.canvas,n.proxy&&n.proxy.terminate();let a;this?.__node?.graph?a=this.__node.graph.run("makeProxy",n._id,n.canvas):a=v.makeProxy(n._id,n.canvas),n.proxy=a}return typeof t.context=="string"?n.context=n.canvas.getContext(t.context):t.context&&(n.context=t.context),t.width&&(n.canvas.width=t.width),t.height&&(n.canvas.height=t.height),typeof t.draw=="string"&&(t.draw=f(t.draw)),typeof t.draw=="function"&&(n.draw=t.draw.bind(t)),typeof t.update=="string"&&(t.update=f(t.update)),typeof t.update=="function"&&(n.update=t.update.bind(t)),typeof t.init=="string"&&(t.init=f(t.init)),typeof t.init=="function"&&(n.init=t.init.bind(t)),typeof t.clear=="string"&&(t.clear=f(t.clear)),typeof t.clear=="function"&&(n.clear=t.clear.bind(t)),t._id}}function V(t){this?.__node?.graph?this.__node.graph.CANVASES||(this.__node.graph.CANVASES={}):globalThis.CANVASES||(globalThis.CANVASES={});let e=t;t._id?e._id=t._id:e._id=`canvas${Math.floor(Math.random()*1e15)}`,typeof t.context=="string"?e.context=t.canvas.getContext(t.context):e.context=t.context,"animating"in t?e.animating=t.animating:e.animating=!0;let n;if(this?.__node?.graph?.CANVASES[e._id])this.__node.graph.run("setDraw",e);else if(globalThis.CANVASES?.[e._id])_(e);else{this?.__node?.graph&&(e.graph=this.__node.graph,e.__node||(e.__node={}),e.__node.tag||(e.__node.tag=e._id),e=this.__node.graph.add(e),e.__addOndisconnected=()=>{e.stop(),delete this.__node.graph.CANVASES[e._id]}),this?.__node?.graph?this.__node.graph.CANVASES[e._id]=e:globalThis.CANVASES[e._id]=e,this?.__node?.graph?n=this.__node.graph.run("makeProxy",e._id,e.canvas):n=v.makeProxy(e._id,e.canvas),t.width&&(e.canvas.width=t.width),t.height&&(e.canvas.height=t.height),typeof e.draw=="string"?e.draw=f(e.draw):typeof e.draw=="function"&&(e.draw=e.draw.bind(e)),typeof e.update=="string"?e.update=f(e.update):typeof e.update=="function"&&(e.update=e.update.bind(e)),typeof e.init=="string"?e.init=f(e.init):typeof e.init=="function"&&(e.init=e.init.bind(e)),typeof e.clear=="string"?e.clear=f(e.clear):typeof e.clear=="function"&&(e.clear=e.clear.bind(e));let a=()=>{if(e.stop=()=>{x(e._id)},e.start=r=>{E(e._id,r)},e.set=r=>{_(r,e._id)},typeof e.draw=="function"&&e.animating){let r=(s,i,l)=>{if(s.animating){let o=s.draw(s,i,l);o?.then?o.then(()=>{requestAnimationFrame(()=>{r(s,i,l)})}):requestAnimationFrame(()=>{r(s,i,l)})}};r(e,e.canvas,e.context)}if(typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope)return e._id;{let r={_id:t._id,width:t.width,height:t.height,proxy:n,draw:s=>{L(s,t._id)},update:s=>{R(s,t._id)},clear:()=>{D(t._id)},init:()=>{H(t._id)},stop:()=>{x(t._id)},start:()=>{E(t._id)},set:s=>{_(s,t._id)},terminate:()=>{r.proxy&&r.proxy.terminate(),this.__node?.graph?this.__node.graph.remove(t._id):(x(t._id),this?.__node?.graph?delete this.__node.graph.CANVASES[e._id]:delete globalThis.CANVASES[e._id])}};return r}};if(typeof e.init=="function"){let r=e.init(e,e.canvas,e.context);return r?.then?new Promise(s=>{r.then(()=>{s(a())})}):a()}else a()}}function L(t,e){let n=h.call(this,e);if(n&&(t&&Object.assign(n,t),n.draw))return n.draw(n,n.canvas,n.context),e}function D(t){let e=h.call(this,t);if(e?.clear)return e.clear(e,e.canvas,e.context),t}function H(t){let e=h.call(this,t);if(e?.init)return e.init(e,e.canvas,e.context),t}function R(t,e){let n=h.call(this,e);if(n?.update)return n.update(n,n.canvas,n.context,t),e}function U(t,e){let n=h.call(this,e);if(n&&t)return Object.assign(n,t),t.width&&(n.canvas.width=t.width),t.height&&(n.canvas.height=t.height),e}function E(t,e){let n=h.call(this,t);if(n.animating=!0,n&&e)return typeof e=="string"&&(e=f(e)),typeof e=="function"&&(n.draw=e),t;if(typeof n?.draw=="function"){let a=(r,s,i)=>{r.animating&&(r.draw(r,s,i),requestAnimationFrame(()=>{a(r,s,i)}))};return typeof n.clear=="function"&&n.clear(n,n.canvas,n.context),typeof n.init=="function"&&n.init(n,n.canvas,n.context),a(n,n.canvas,n.context),t}}function x(t){let e=h.call(this,t);if(e)return e.animating=!1,typeof e.clear=="function"&&requestAnimationFrame(e.clear(e,e.canvas,e.context)),t}function h(t){let e;return this?.__node?.graph?t?e=this.__node.graph.CANVASES?.[t]:e=this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]]:t?e=globalThis.CANVASES?.[t]:e=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]],e}var ne={...v,Renderer:I,transferCanvas:N,setupCanvas:V,setDraw:_,drawFrame:L,clearCanvas:D,initCanvas:H,updateCanvas:R,setProps:U,startAnim:E,stopAnim:x,getCanvas:h};function f(t=""){let e=i=>i.replace(/^\W*(function[^{]+\{([\s\S]*)\}|[^=]+=>[^{]*\{([\s\S]*)\}|[^=]+=>(.+))/i,"$2$3$4"),a=(i=>{let l=i.indexOf("=>")+1;return l<=0&&(l=i.indexOf("){")),l<=0&&(l=i.indexOf(") {")),i.slice(0,i.indexOf("{",l)+1)})(t),r=e(t),s;if(a.includes("function")){let i=a.split("(")[1].split(")")[0];s=new Function(i,r)}else if(a.substring(0,6)===r.substring(0,6)){let i=a.split("(")[1].split(")")[0];s=new Function(i,r.substring(r.indexOf("{")+1,r.length-1))}else try{s=(0,eval)(a+r+"}")}catch{}return s}export{b as ElementProxyReceiver,w as EventDispatcher,g as ProxyManager,I as Renderer,D as clearCanvas,L as drawFrame,c as eventHandlers,h as getCanvas,H as initCanvas,p as initProxyElement,v as proxyElementWorkerRoutes,_ as setDraw,U as setProps,V as setupCanvas,E as startAnim,x as stopAnim,N as transferCanvas,R as updateCanvas,ne as workerCanvasRoutes};
