var v=Object.defineProperty;var x=(o,e,t)=>e in o?v(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var c=(o,e,t)=>(x(o,typeof e!="symbol"?e+"":e,t),t);const m=o=>o.toDataURL("image/png",1),k=o=>typeof o=="function",u=(o,e={},t="http://www.w3.org/2000/svg")=>{const i=document.createElementNS(t,o);for(const s in e)i.setAttribute(s,e[s]);return i},y=(o,e,t)=>{const i=[];let s="";for(let n=0,a=e.length;n<a;n++)s+=e.charAt(n),o.measureText(s).width>t&&(i.push(s.substring(0,s.length-1)),s="",n--);return i.push(s),i},O=(o,e)=>{const t=u("svg",{xmlns:"http://www.w3.org/2000/svg"}),i=u("foreignObject",{width:e.width.toString(),height:e.height.toString()}),s=document.createElement("div");return s.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),s.style.cssText=`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font: ${o.font};
  color: ${e.fontColor};
  `,s.innerHTML=e.content,i.appendChild(s),t.appendChild(i),t},T=o=>`data:image/svg+xml;charset=utf-8,${o.outerHTML.replace(/\n/g,"").replace(/\t/g,"").replace(/#/g,"%23")}`;var r=(o=>(o.text="text",o.image="image",o.multiLineText="multi-line-text",o.richText="rich-text",o))(r||{}),w=(o=>(o.center="center",o.left="left",o.right="right",o))(w||{}),f=(o=>(o.top="top",o.bottom="bottom",o.middle="middle",o))(f||{}),g=(o=>(o.default="default",o.blind="blind",o))(g||{}),d=(o=>(o.canvas="canvas",o.html="html",o.svg="svg",o))(d||{});class l{constructor(e={}){c(this,"options");c(this,"observer");c(this,"parentObserve");c(this,"watermarkDom");var t;this.options=Object.assign({width:300,height:300,rotate:45,contentType:r.text,content:"hello watermark-js-plus",imageWidth:0,imageHeight:0,lineHeight:30,zIndex:1e4,backgroundPosition:"0 0, 0 0",fontSize:20,fontFamily:"sans-serif",textAlign:w.center,textBaseline:f.middle,fontColor:"#000",globalAlpha:.5,fontWeight:"normal",mode:g.default,mutationObserve:!0,unique:!0,parentElement:document.body,onSuccess:()=>{},onBeforeDestroy:()=>{},onDestroyed:()=>{}},e),(t=this.options)!=null&&t.rotate&&(this.options.rotate=(360-this.options.rotate%360)*(Math.PI/180))}static createCanvas(e,t){var n;const i=window.devicePixelRatio||1,s=document.createElement("canvas");return s.width=e*i,s.height=t*i,s.style.width=`${e}px`,s.style.height=`${t}px`,(n=s.getContext("2d"))==null||n.setTransform(i,0,0,i,0,0),s}async create(){var s,n;if(!this.validateUnique()||!this.validateContent())return;const e=await this.draw(),t=m(e);this.watermarkDom=document.createElement("div");const i=document.createElement("div");this.watermarkDom.__WATERMARK__="watermark",this.watermarkDom.__WATERMARK__INSTANCE__=this,this.watermarkDom.style.cssText=`
      z-index: ${this.options.zIndex};
    `,i.style.cssText=`
      position: fixed;
      z-index: ${this.options.zIndex};
      pointer-events: none;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: url(${t});
      background-repeat: repeat;
      background-size: ${this.options.width}px ${this.options.height}px;
      background-position: ${this.options.backgroundPosition};
      -webkit-print-color-adjust: exact;
    `,this.watermarkDom.append(i),this.options.parentElement.appendChild(this.watermarkDom),this.options.mutationObserve&&this.bindMutationObserve(),(n=(s=this.options).onSuccess)==null||n.call(s)}destroy(){var e,t,i,s,n,a,h;(t=(e=this.options).onBeforeDestroy)==null||t.call(e),(i=this.observer)==null||i.disconnect(),(s=this.parentObserve)==null||s.disconnect(),(n=this.watermarkDom)==null||n.remove(),(h=(a=this.options).onDestroyed)==null||h.call(a)}validateUnique(){let e=!0;return this.options.unique&&this.options.parentElement.childNodes.forEach(t=>{!e||Object.hasOwnProperty.call(t,"__WATERMARK__")&&(e=!1)}),e}validateContent(){switch(this.options.contentType){case r.image:return Object.hasOwnProperty.call(this.options,"image");case r.multiLineText:case r.richText:case r.text:return this.options.content.length>0}return!1}draw(){const t=l.createCanvas(this.options.width,this.options.height).getContext("2d");if(t===null)throw new Error("get context error");return t.font=`${this.options.fontWeight} ${this.options.fontSize}px ${this.options.fontFamily}`,t.textAlign=this.options.textAlign,t.textBaseline=this.options.textBaseline,t.fillStyle=this.options.fontColor,t.globalAlpha=this.options.globalAlpha,new Promise(i=>{switch(this.options.contentType){case r.text:this.drawText(t,i);break;case r.image:this.drawImage(t,i);break;case r.multiLineText:this.drawMultiLineText(t,i);break;case r.richText:this.drawRichText(t,i);break}})}drawText(e,t){e.translate(this.options.width/2,this.options.height/2),e.rotate(this.options.rotate),e.fillText(this.options.content,0,0),t(e.canvas)}drawImage(e,t){const i=new Image;i.setAttribute("crossOrigin","Anonymous"),i.src=this.options.image,i.onload=()=>{e.translate(this.options.width/2,this.options.height/2),e.rotate(this.options.rotate);const{width:s,height:n}=this.getImageRect(i);e.drawImage(i,0-s/2,0-n/2,s,n),t(e.canvas)}}drawMultiLineText(e,t){const i=y(e,this.options.content,this.options.width);e.translate(this.options.width/2,this.options.height/2),e.rotate(this.options.rotate);const s=(i.length-1)*this.options.lineHeight/2;i.forEach((n,a)=>{e.fillText(n,0,this.options.lineHeight*a-s)}),t(e.canvas)}drawRichText(e,t){const i=new Image;i.width=this.options.width,i.height=this.options.height;const s=O(e,this.options);i.src=T(s),i.onload=()=>{e.translate(this.options.width/2,this.options.height/2),e.rotate(this.options.rotate),e.drawImage(i,-this.options.width/2,-this.options.height/2,e.canvas.width,e.canvas.height),t(e.canvas)}}getImageRect(e){const t={width:this.options.imageWidth,height:this.options.imageHeight};switch(!0){case(t.width!==0&&t.height===0):t.height=t.width*e.height/e.width;break;case(t.width===0&&t.height!==0):t.width=t.height*e.width/e.height;break;case(t.width===0&&t.height===0):t.width=e.width,t.height=e.height;break}return t}bindMutationObserve(){!this.watermarkDom||(this.observer=new MutationObserver(e=>{e.length>0&&(this.destroy(),this.create())}),this.observer.observe(this.watermarkDom,{attributes:!0,childList:!0,subtree:!0,characterData:!0}),this.parentObserve=new MutationObserver(e=>{e.forEach(t=>{var i;((t==null?void 0:t.target)===this.watermarkDom||((i=t==null?void 0:t.removedNodes)==null?void 0:i[0])===this.watermarkDom)&&(this.destroy(),this.create())})}),this.parentObserve.observe(this.options.parentElement,{attributes:!0,childList:!0,subtree:!0,characterData:!0}))}}class D extends l{constructor(e={}){super(e),this.options.globalAlpha=.005,this.options.mode=g.blind}static decode(e){const t=Object.assign({url:"",fillColor:"#000",compositeOperation:"color-burn",mode:d.canvas},e);if(!!t.url&&t.mode===d.canvas){const i=new Image;i.src=t.url,i.onload=()=>{var p;const{width:s,height:n}=i,a=l.createCanvas(s,n),h=a.getContext("2d");if(h===null)throw new Error("get context error");h.drawImage(i,0,0,s,n),h.globalCompositeOperation=t.compositeOperation,h.fillStyle=t.fillColor,h.fillRect(0,0,s,n);const b=m(a);t.onSuccess&&k(t.onSuccess)&&((p=t.onSuccess)==null||p.call(t,b))}}}}const C={Watermark:l,BlindWatermark:D};export{C as w};