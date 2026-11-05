/* Simulación: avance del vehículo, conductor (EAR) y eventos */
function startFx(k){if(S.fx)return;S.fx=k;S.fxT=0;if(k==='yawn'){S.yawns++;toast('Bostezo detectado. Considera una pausa pronto.',0)}}
function step(dt){
  if(!S.run||S.arrived)return;var sd=dt*S.mult;S.sim+=sd;S.lim=limitAt(S.d);
  var tg=S.lim-6+Math.sin(S.sim/40)*4-(raining()?8:0);S.v+=(tg-S.v)*Math.min(1,dt*1.2);S.d=Math.min(TOTAL,S.d+S.v/3600*sd);
  if(!S.fx&&Math.random()<dt*S.mult/900)startFx('yawn');
  var et=S.fx==='micro'?.1:(S.fx==='yawn'?.22:.3);S.ear+=(et-S.ear)*Math.min(1,dt*6)+(Math.random()-.5)*.008;
  if(S.fx){S.fxT+=dt;if(S.fxT>(S.fx==='micro'?3.2:2.2))S.fx=null}
  S.closed=S.ear<.2?S.closed+dt:0;
  if(S.closed>=1&&!S.done.m){S.done.m=1;toast('Microsueño detectado. Detenga el vehículo.',1)}if(S.ear>.25)S.done.m=0;
  Z.forEach(function(z,i){var n=S.d>=z[0]&&S.d<=z[1];if(n&&!S.done['z'+i]){S.done['z'+i]=1;toast('Entrando a tramo sin señal. El asistente sigue activo en local.',0)}if(!n&&S.d>z[1]&&S.done['z'+i]&&!S.done['e'+i]){S.done['e'+i]=1;toast('Señal móvil recuperada.',0)}});
  C.forEach(function(c,i){if(S.d>=c-.5&&!S.done['c'+i]){S.done['c'+i]=1;toast('Curva peligrosa en 500 m. Reduzca la velocidad.',1)}});
  if(S.rain>0)S.rain-=dt;if(raining()&&!S.done.r){S.done.r=1;toast('Lluvia en el tramo. Reduzca la velocidad.',0)}if(!raining())S.done.r=0;
  if(S.d>=TOTAL){S.arrived=true;toast('Llegaste a tu destino.',0)}}
