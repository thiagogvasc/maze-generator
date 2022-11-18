var F=Object.defineProperty;var T=(d,t,i)=>t in d?F(d,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):d[t]=i;var r=(d,t,i)=>(T(d,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))h(s);new MutationObserver(s=>{for(const e of s)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&h(o)}).observe(document,{childList:!0,subtree:!0});function i(s){const e={};return s.integrity&&(e.integrity=s.integrity),s.referrerpolicy&&(e.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?e.credentials="include":s.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function h(s){if(s.ep)return;s.ep=!0;const e=i(s);fetch(s.href,e)}})();class q{constructor(t,i,h,s,e,o){r(this,"i");r(this,"j");r(this,"x");r(this,"y");r(this,"width");r(this,"height");r(this,"borders");r(this,"visited");r(this,"strokeColor");r(this,"frameFillColor");r(this,"baseFillColor");this.i=t,this.j=i,this.x=h,this.y=s,this.width=e,this.height=o,this.borders={top:!0,left:!0,bottom:!0,right:!0},this.visited=!1,this.strokeColor="black",this.frameFillColor="transparent",this.baseFillColor="transparent"}draw(t){t.beginPath();const{top:i,left:h,bottom:s,right:e}=this.borders;i&&(t.moveTo(this.x,this.y),t.lineTo(this.x+this.width,this.y)),h&&(t.moveTo(this.x,this.y),t.lineTo(this.x,this.y+this.height)),s&&(t.moveTo(this.x,this.y+this.height),t.lineTo(this.x+this.width,this.y+this.height)),e&&(t.moveTo(this.x+this.width,this.y),t.lineTo(this.x+this.width,this.y+this.height)),t.strokeStyle=this.strokeColor,t.fillStyle=this.frameFillColor,t.stroke(),t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fill(),this.frameFillColor=this.baseFillColor}update(){}}class k{constructor(t,i,h,s,e,o){r(this,"x");r(this,"y");r(this,"width");r(this,"height");r(this,"rows");r(this,"cols");r(this,"cells");this.x=t,this.y=i,this.width=h,this.height=s,this.rows=e,this.cols=o,this.cells=[];for(let n=0;n<e;n++){const l=[];for(let f=0;f<o;f++){const a=this.width/o,m=this.height/e,C=new q(n,f,this.x+f*a,this.y+n*m,a,m);l.push(C)}this.cells.push(l)}}cellAt(t,i){if(!(t<0||i<0||t>=this.cols||i>=this.rows))return this.cells[t][i]}draw(t){t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.stroke(),this.cells.forEach(i=>i.forEach(h=>h.draw(t)))}update(){}}class E{constructor(){}generateMaze(t){var s,e,o,n;const i=[],h=t.cellAt(0,0);for(h&&i.push(h);i.length>0;){const l=i.pop(),f=[];((s=t.cellAt(l.i-1,l.j))==null?void 0:s.visited)===!1&&f.push(t.cellAt(l.i-1,l.j)),((e=t.cellAt(l.i,l.j-1))==null?void 0:e.visited)===!1&&f.push(t.cellAt(l.i,l.j-1)),((o=t.cellAt(l.i+1,l.j))==null?void 0:o.visited)===!1&&f.push(t.cellAt(l.i+1,l.j)),((n=t.cellAt(l.i,l.j+1))==null?void 0:n.visited)===!1&&f.push(t.cellAt(l.i,l.j+1)),f.length>0&&i.push(l);const a=f[Math.floor(Math.random()*f.length)];a&&(a.visited=!0,i.push(a),a.i>l.i?(a.borders.top=!1,l.borders.bottom=!1):a.i<l.i?(a.borders.bottom=!1,l.borders.top=!1):a.j>l.j?(a.borders.left=!1,l.borders.right=!1):(a.borders.right=!1,l.borders.left=!1))}}}class M{constructor(t){r(this,"grid");r(this,"queue");r(this,"goalFound");r(this,"goalCell");this.grid=t,this.queue=[],this.goalFound=!1,this.goalCell=t.cellAt(15,15),this.goalCell.baseFillColor="green",this.queue.push(t.cellAt(0,0))}execute(){var t,i,h,s;for(;this.queue.length>0&&!this.goalFound;){const e=this.queue.shift();if(e.visited||(e.visited=!0),e.i===this.goalCell.i&&e.j===this.goalCell.j){this.goalFound=!0,console.log("end");return}e.frameFillColor="blue",e.baseFillColor="red";const o=[];((t=this.grid.cellAt(e.i-1,e.j))==null?void 0:t.visited)===!1&&e.borders.top===!1&&o.push(this.grid.cellAt(e.i-1,e.j)),((i=this.grid.cellAt(e.i,e.j-1))==null?void 0:i.visited)===!1&&e.borders.left===!1&&o.push(this.grid.cellAt(e.i,e.j-1)),((h=this.grid.cellAt(e.i+1,e.j))==null?void 0:h.visited)===!1&&e.borders.bottom===!1&&o.push(this.grid.cellAt(e.i+1,e.j)),((s=this.grid.cellAt(e.i,e.j+1))==null?void 0:s.visited)===!1&&e.borders.right===!1&&o.push(this.grid.cellAt(e.i,e.j+1)),o.forEach(n=>{n.visited||this.queue.push(n)})}}update(){var t,i,h,s;if(this.queue.length>0&&!this.goalFound){const e=this.queue.shift();if(e.visited||(e.visited=!0),e.i===this.goalCell.i&&e.j===this.goalCell.j){this.goalFound=!0,console.log("end");return}e.frameFillColor="blue",e.baseFillColor="blue";const o=[];((t=this.grid.cellAt(e.i-1,e.j))==null?void 0:t.visited)===!1&&e.borders.top===!1&&o.push(this.grid.cellAt(e.i-1,e.j)),((i=this.grid.cellAt(e.i,e.j-1))==null?void 0:i.visited)===!1&&e.borders.left===!1&&o.push(this.grid.cellAt(e.i,e.j-1)),((h=this.grid.cellAt(e.i+1,e.j))==null?void 0:h.visited)===!1&&e.borders.bottom===!1&&o.push(this.grid.cellAt(e.i+1,e.j)),((s=this.grid.cellAt(e.i,e.j+1))==null?void 0:s.visited)===!1&&e.borders.right===!1&&o.push(this.grid.cellAt(e.i,e.j+1)),o.forEach(n=>{n.visited||this.queue.push(n)})}}}const p=document.querySelector("canvas");p.width=window.innerWidth;p.height=window.innerHeight;p.style.backgroundColor="#d3d3d3";const w=p.getContext("2d"),c=new k(10,10,500,500,20,20),P=new E;P.generateMaze(c);c.cells.forEach(d=>d.forEach(t=>t.visited=!1));let j=new M(c);j.execute();console.log(j);let b=0;const y=document.getElementById("fps");y.innerText=`FPS: ${b}`;let g=Date.now(),u=g,v=u-g;setInterval(()=>y.innerText=`FPS: ${b}`,100);c.draw(w);function A(){u=Date.now(),v=u-g,g=u,b=Math.floor(1/(v/1e3)),requestAnimationFrame(A),c.draw(w),c.update()}A();
