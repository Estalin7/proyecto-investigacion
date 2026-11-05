/* Ruta simulada (21,4 km), edificios, tramos sin señal, curvas y límites */
var R=rng(7),TOTAL=21.4,N=2200,STEP=6,P=[],FR=[.14,.33,.52,.7,.88],C=FR.map(function(f){return f*TOTAL});
var Z=[[4,8],[13,17]],RN=[9.5,12.5],B=[],T=[];
var x=0,y=0,a=0;
for(var i=0;i<N;i++){var k=.004*Math.sin(i/41),f=i/N;FR.forEach(function(c,j){var d=(f-c)*N;k+=(j%2?-1:1)*.02*Math.exp(-d*d/700)});a+=k;x+=Math.cos(a)*STEP;y+=Math.sin(a)*STEP;P.push({x:x,y:y,a:a})}
for(var j=20;j<N;j+=14){[-1,1].forEach(function(s){for(var q=0;q<2;q++){if(R()<.3)continue;var p=P[Math.min(N-1,j+Math.floor(R()*12))],off=s*(95+R()*260);B.push({i:j,x:p.x-Math.sin(p.a)*off,y:p.y+Math.cos(p.a)*off,w:40+R()*70,d:40+R()*70,h:25+R()*95,t:R()})}})}
for(var j=10;j<N;j+=5){var p=P[j],s=R()<.5?-1:1,off=s*(58+R()*50);T.push({i:j,x:p.x-Math.sin(p.a)*off,y:p.y+Math.cos(p.a)*off,r:6+R()*6})}
function near(d,w){return C.some(function(c){return Math.abs(c-d)<w})}
function limitAt(d){return d<1||near(d,.35)?40:60}
function inZ(d){return Z.some(function(z){return d>=z[0]&&d<=z[1]})}
