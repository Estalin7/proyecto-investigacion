/* Asistente: interpreta preguntas y genera respuestas locales */
function nextC(){for(var i=0;i<C.length;i++)if(C[i]>S.d)return C[i]-S.d;return null}
function answer(q){
  var t=q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''),h=function(w){return w.some(function(z){return t.indexOf(z)>-1})};
  var rem=Math.max(0,TOTAL-S.d),e=eta(),arr=clk(new Date(S.t0.getTime()+(S.sim+e*60)*1000));
  if(!S.started&&h(['inicia','empez','comenz','arranc'])){startTrip();return 'Iniciando el recorrido. Buen viaje.'}
  if(h(['hola','buenas']))return 'Hola. Estoy atento al recorrido. Pregúntame por distancia, tiempos, señal, curvas o tu estado.';
  if(h(['ayuda','que puedes','que sabes']))return 'Puedo decirte: tiempo y km que faltan, km recorridos, hora de llegada, velocidad y límite, señal móvil, próxima curva, clima, tu estado de fatiga y el tiempo conduciendo.';
  if(h(['resumen','como vamos','estado general']))return 'Llevamos '+fn(S.d)+' km en '+fm(S.sim/60)+'. Faltan '+fn(rem)+' km, unos '+fm(e)+' (llegada a las '+arr+'). Velocidad '+Math.round(S.v)+' km/h.';
  if(h(['tiempo'])&&h(['llevamos','conduc','manej','viaj']))return 'Llevas '+fm(S.sim/60)+' conduciendo.'+(S.sim/60>=120?' Ya pasaste las 2 horas: conviene hacer una pausa.':'');
  if(h(['que hora es','hora actual']))return 'Son las '+clk(new Date(S.t0.getTime()+S.sim*1000))+'.';
  if(h(['falta','queda','llegar','llegada','llego','destino'])){
    if(S.arrived)return 'Ya llegaste a tu destino.';
    if(h(['km','kilomet','distancia','metros']))return 'Faltan '+fn(rem)+' km para llegar.';
    return 'Faltan unos '+fm(e)+' ('+fn(rem)+' km). Llegarás a las '+arr+' manteniendo el ritmo actual.'}
  if(h(['velocidad','km/h','rapido','a cuanto voy']))return 'Vas a '+Math.round(S.v)+' km/h. El límite en este tramo es '+S.lim+' km/h'+(S.v>S.lim?' y estás por encima, reduce.':'.');
  if(h(['llevamos','recorr','avanz','km','kilomet']))return 'Llevamos '+fn(S.d)+' km recorridos de '+fn(TOTAL)+' km ('+Math.round(S.d/TOTAL*100)+' %).';
  if(h(['senal','cobertura','internet','conexion'])){
    if(inZ(S.d)){var z=Z.filter(function(z){return S.d>=z[0]&&S.d<=z[1]})[0];return 'Ahora no hay señal móvil. Se recupera en '+fn(z[1]-S.d)+' km. El asistente sigue funcionando en local.'}
    var nz=Z.filter(function(z){return z[0]>S.d})[0];return nz?'Hay señal. El próximo tramo sin señal empieza en '+fn(nz[0]-S.d)+' km y dura '+fn(nz[1]-nz[0])+' km.':'Hay señal y no quedan tramos sin cobertura en esta ruta.'}
  if(h(['curva','peligro','proxim'])){var n=nextC();return n==null?'No hay más curvas peligrosas en la ruta.':'La próxima curva peligrosa está a '+fn(n)+' km.'}
  if(h(['clima','lluvia','llov']))return raining()?'Hay lluvia en el tramo actual. Reduce la velocidad y aumenta la distancia de seguridad.':(S.d<RN[0]?'Despejado. Se prevé lluvia en '+fn(RN[0]-S.d)+' km.':'Despejado por ahora.');
  if(h(['conductor','fatiga','cansad','sueno','somnol','bostez','ojos','estado del','como estoy'])){
    var nv=S.closed>0.5||S.ear<.2?'alto: ojos cerrados':(S.yawns>=2?'atención: varios bostezos':'normal');
    return 'Nivel de alerta: '+nv+'. EAR '+S.ear.toFixed(2)+', bostezos detectados: '+S.yawns+'.'+(S.yawns>=2?' Te recomiendo una pausa en el próximo lugar seguro.':'')}
  if(h(['descans','pausa','parar','dormir']))return S.yawns>=2||S.sim/60>=120?'Sí, te recomiendo parar a descansar unos 15 minutos.':'Por ahora no hay señales de fatiga. Llevas '+fm(S.sim/60)+' conduciendo.';
  return 'No entendí del todo. Prueba con “¿cuánto falta?”, “¿cuántos km llevamos?” o “¿hay señal?”.'}
function ask(q,mic){q=q.trim();if(!q)return;msg('u',q);var t0=performance.now(),r=answer(q),ms=performance.now()-t0;msg('a',r,'respuesta local · '+ms.toFixed(1)+' ms'+(inZ(S.d)?' · sin señal móvil':''));bubble(r);if(voz||mic){var v=voz;voz=true;speak(r);voz=v}}
