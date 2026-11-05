/* Arranque: bucle principal, controles y eventos de la interfaz */
var last=performance.now(),ht=0;
function loop(now){var dt=Math.min(.1,(now-last)/1000);last=now;step(dt);draw();ht+=dt;if(ht>.2){ht=0;hud()}requestAnimationFrame(loop)}
['¿Cuánto falta?','¿Cuántos km llevamos?','¿Cuántos km faltan?','¿A qué hora llego?','¿Qué velocidad llevo?','¿Hay señal?','¿Próxima curva?','¿Cómo está el conductor?','¿Cuánto tiempo llevamos?','Resumen'].forEach(function(t){var b=document.createElement('button');b.textContent=t;b.onclick=function(){ask(t)};$('chips').appendChild(b)});
$('send').onclick=function(){ask($('q').value);$('q').value=''};
$('q').onkeydown=function(e){if(e.key==='Enter'){ask(this.value);this.value=''}};
$('vz').onclick=function(){voz=!voz;this.textContent=voz?'🔊':'🔇';if(!voz)try{speechSynthesis.cancel()}catch(e){}};
$('gear').onclick=function(){$('ctl').classList.toggle('on')};
$('mult').onchange=function(){S.mult=+this.value};
$('pause').onclick=function(){if(!S.started)return;S.run=!S.run;this.textContent=S.run?'Pausar':'Reanudar'};
$('yawn').onclick=function(){startFx('yawn')};$('micro').onclick=function(){S.fx=null;startFx('micro')};
$('rain').onclick=function(){S.rain=40};$('reset').onclick=init;
$('go').onclick=function(){startTrip();msg('s','Recorrido iniciado.')};
window.addEventListener('resize',rs);rs();init();requestAnimationFrame(loop);
