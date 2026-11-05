/* Estado de la simulación, ETA, clima e inicio del recorrido */
var S,voz=false;
function init(){S={d:0,sim:0,v:0,run:false,started:false,mult:+$('mult').value,ear:.3,closed:0,yawns:0,fx:null,fxT:0,rain:0,done:{},t0:new Date(),lim:40,arrived:false,rot:0};$('log').innerHTML='';$('pause').textContent='Pausar';$('start').style.display='flex';msg('s','Asistente listo. Pulsa “Iniciar recorrido”; luego pregúntame mientras avanzamos.')}
function eta(){var rem=TOTAL-S.d,avg=S.sim>120&&S.d>.3?S.d/(S.sim/3600):50;return rem/Math.max(30,avg)*60}
function raining(){return S.rain>0||(S.d>=RN[0]&&S.d<=RN[1])}
function startTrip(){if(S.started)return;S.started=true;S.run=true;$('start').style.display='none';bubble('Recorrido iniciado. Di “asistente” para preguntarme algo.')}
