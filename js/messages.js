/* Mensajes en el chat, alertas (toast), burbuja y voz de salida */
function msg(t,h,meta){var e=document.createElement('div');e.className='m '+t;e.textContent=h;if(meta){var s=document.createElement('small');s.textContent=meta;e.appendChild(s)}var l=$('log');l.appendChild(e);l.scrollTop=l.scrollHeight}
function speak(t){if(!voz)return;try{var u=new SpeechSynthesisUtterance(t);u.lang='es-PE';speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function toast(t,crit){var e=document.createElement('div');e.className='toast glass'+(crit?' c':'');e.textContent=t;$('ov').appendChild(e);setTimeout(function(){e.remove()},5000);msg('s','⚠ '+t,'alerta local');speak(t)}
var bt;function bubble(t){var b=$('bub');b.textContent=t;b.style.display='block';clearTimeout(bt);bt=setTimeout(function(){b.style.display='none'},9000)}
