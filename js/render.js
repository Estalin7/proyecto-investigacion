/* Dibujo del mapa 3D en canvas */
var cv=$('cv'),ctx=cv.getContext('2d'),map=$('map');
function rs(){cv.width=Math.round(map.clientWidth*1.5);cv.height=Math.round(map.clientHeight*2.3)}
function rr(x,y,w,h,r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);ctx.fill()}
function draw(){
  var W=cv.width,H=cv.height,OX=W/2,OY=H*.75,f=S.d/TOTAL*(N-1),i0=Math.floor(f),fr=f-i0,p0=P[i0],p1=P[Math.min(N-1,i0+1)];
  var cx=p0.x+(p1.x-p0.x)*fr,cy=p0.y+(p1.y-p0.y)*fr,rot=-Math.PI/2-P[Math.min(N-1,i0+10)].a,c=Math.cos(rot),s=Math.sin(rot);S.rot=rot;
  function tf(px,py){var dx=px-cx,dy=py-cy;return[OX+dx*c-dy*s,OY+dx*s+dy*c]}
  var g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2c3253');g.addColorStop(1,'#454d78');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  var a0=Math.max(0,i0-50),b0=Math.min(N-1,i0+300);
  function path(u,v){ctx.beginPath();for(var k=u;k<=v;k++){var q=tf(P[k].x,P[k].y);k==u?ctx.moveTo(q[0],q[1]):ctx.lineTo(q[0],q[1])}}
  ctx.lineCap='round';ctx.lineJoin='round';
  path(a0,b0);ctx.strokeStyle='#222849';ctx.lineWidth=74;ctx.stroke();ctx.strokeStyle='#59628a';ctx.lineWidth=62;ctx.stroke();
  ctx.setLineDash([16,20]);ctx.strokeStyle='rgba(255,255,255,.28)';ctx.lineWidth=2;ctx.stroke();ctx.setLineDash([]);
  path(i0,b0);ctx.strokeStyle='rgba(56,161,255,.3)';ctx.lineWidth=28;ctx.stroke();
  ctx.shadowColor='#38a1ff';ctx.shadowBlur=18;ctx.strokeStyle='#38a1ff';ctx.lineWidth=14;ctx.stroke();ctx.shadowBlur=0;ctx.strokeStyle='#9bd6ff';ctx.lineWidth=4;ctx.stroke();
  var it=[];
  B.forEach(function(b){if(b.i>i0-80&&b.i<i0+320)it.push({y:tf(b.x,b.y)[1],b:b})});
  T.forEach(function(t){if(t.i>i0-80&&t.i<i0+320)it.push({y:tf(t.x,t.y)[1],t:t})});
  it.sort(function(u,v){return u.y-v.y});
  it.forEach(function(o){
    if(o.t){var q=tf(o.t.x,o.t.y);ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.ellipse(q[0],q[1],o.t.r*1.2,o.t.r*.8,0,0,7);ctx.fill();ctx.fillStyle='#1f6d72';ctx.beginPath();ctx.arc(q[0],q[1]-o.t.r*1.2,o.t.r*1.3,0,7);ctx.fill();return}
    var b=o.b,hw=b.w/2,hd=b.d/2,H2=b.h*1.3,cs=[[b.x-hw,b.y-hd],[b.x+hw,b.y-hd],[b.x+hw,b.y+hd],[b.x-hw,b.y+hd]].map(function(q){return tf(q[0],q[1])});
    ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();cs.forEach(function(q,k){k?ctx.lineTo(q[0]+6,q[1]+6):ctx.moveTo(q[0]+6,q[1]+6)});ctx.fill();
    [0,1,2,3].map(function(k){var u=cs[k],v=cs[(k+1)%4];return{u:u,v:v,y:(u[1]+v[1])/2,k:k}}).sort(function(m,n){return m.y-n.y}).forEach(function(e){
      ctx.fillStyle='hsl(232,26%,'+(24+b.t*8+e.k*3)+'%)';ctx.beginPath();ctx.moveTo(e.u[0],e.u[1]);ctx.lineTo(e.v[0],e.v[1]);ctx.lineTo(e.v[0],e.v[1]-H2);ctx.lineTo(e.u[0],e.u[1]-H2);ctx.fill()});
    ctx.fillStyle='hsl(228,30%,'+(50+b.t*14)+'%)';ctx.beginPath();cs.forEach(function(q,k){k?ctx.lineTo(q[0],q[1]-H2):ctx.moveTo(q[0],q[1]-H2)});ctx.fill()});
  ctx.save();ctx.translate(OX,OY);ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(0,6,20,32,0,0,7);ctx.fill();
  ctx.fillStyle='#fff';rr(-14,-28,28,56,8);ctx.fillStyle='#2b3560';rr(-10,-14,20,11,3);rr(-10,13,20,8,3);ctx.restore();
  if(raining()){ctx.fillStyle='rgba(20,30,70,.18)';ctx.fillRect(0,0,W,H);ctx.strokeStyle='rgba(200,220,255,.4)';ctx.lineWidth=1.5;ctx.beginPath();for(var r=0;r<110;r++){var rx=Math.random()*W,ry=Math.random()*H;ctx.moveTo(rx,ry);ctx.lineTo(rx-4,ry+16)}ctx.stroke()}}
