/* Modo de voz: palabra clave “asistente”, escucha y respuesta hablada */
var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
var vOn=false,vSt='off',rec=null,handled=0,spk=false,tmo,rt,vs=$('vs');
function setV(st,tx){vSt=st;vs.className='vs glass '+st;vs.textContent=tx}
function nz(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function beep(){try{var A=window.AudioContext||window.webkitAudioContext,c=new A(),o=c.createOscillator(),g=c.createGain();o.frequency.value=880;g.gain.value=.08;o.connect(g);g.connect(c.destination);o.start();setTimeout(function(){o.stop();c.close()},130)}catch(e){}}
function toWake(){clearTimeout(tmo);setV('wake','Di “asistente” · o toca aquí')}
function toListen(){setV('listen','Te escucho…');beep();clearTimeout(tmo);tmo=setTimeout(function(){if(vSt==='listen'){msg('s','No te escuché. Di “asistente” otra vez.');toWake()}},9000)}
function offV(t){vOn=false;$('mic').classList.remove('on');setV('off','🎙 Activar voz');if(t){msg('s',t);bubble(t)}}
function say(t){clearTimeout(tmo);spk=true;setV('busy','Respondiendo…');try{rec&&rec.stop()}catch(e){}
  var done=function(){if(!spk)return;spk=false;if(vOn)startRec();else setV('off','🎙 Activar voz')};
  try{var u=new SpeechSynthesisUtterance(t);u.lang='es-PE';u.onend=done;u.onerror=done;speechSynthesis.cancel();speechSynthesis.speak(u);setTimeout(done,1500+t.length*90)}catch(e){done()}}
function voiceAsk(q){msg('u',q);var t0=performance.now(),r=answer(q),ms=performance.now()-t0;msg('a',r,'respuesta local · '+ms.toFixed(1)+' ms'+(inZ(S.d)?' · sin señal móvil':''));bubble(r);say(r)}
function onRes(e){
  for(var k=e.resultIndex;k<e.results.length;k++){
    if(k<handled)continue;
    var r=e.results[k],tx=r[0].transcript,fin=r.isFinal,m=nz(tx).search(/asistente/);
    if(vSt==='wake'){if(m>-1)toListen();else{if(fin)handled=k+1;continue}}
    if(vSt==='listen'){
      var q=(m>-1?tx.slice(m+9):tx).replace(/^[\s,.:;¿]+/,'');
      vs.textContent='Te escucho… '+(q?'“'+q+'”':'');
      if(fin){handled=k+1;if(q.trim().length>1)voiceAsk(q.trim())}
    }
  }
}
function startRec(){
  if(!vOn||spk)return;
  try{var me=new SR();rec=me;me.lang='es-PE';me.continuous=true;me.interimResults=true;handled=0;
    me.onstart=function(){if(vSt!=='listen')toWake()};
    me.onresult=onRes;
    me.onerror=function(e){var c=e.error;
      if(c==='not-allowed'||c==='service-not-allowed')offV('El navegador bloqueó el micrófono. Permítelo con el candado de la barra de direcciones. Si ves el demo dentro del chat, ábrelo en una pestaña propia con el enlace del artefacto.');
      else if(c==='network')offV('El reconocimiento de voz del navegador necesita internet. Escribe tu pregunta.');
      else if(c==='audio-capture')offV('No se detecta ningún micrófono.')};
    me.onend=function(){if(rec===me&&vOn&&!spk){clearTimeout(rt);rt=setTimeout(startRec,300)}};
    me.start()}catch(e){offV('No pude activar el micrófono.')}}
function toggleVoice(){
  if(vOn){vOn=false;try{rec&&rec.abort()}catch(e){}try{speechSynthesis.cancel()}catch(e){}spk=false;clearTimeout(tmo);offV();return}
  if(!SR){offV('Este navegador no tiene reconocimiento de voz. Usa Chrome o Edge, o escribe tu pregunta.');return}
  vOn=true;$('mic').classList.add('on');setV('busy','Activando micrófono…');msg('s','Voz activada. Di “asistente” y luego tu pregunta.');startRec()}
$('mic').onclick=toggleVoice;
vs.onclick=function(){if(vSt==='off')toggleVoice();else if(vSt==='wake')toListen()};
