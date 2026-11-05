/* Actualización del HUD: llegada, minutos, km, velocidad, chips y brújula */
function hud(){
  var e=eta(),rem=TOTAL-S.d,ns=inZ(S.d);
  $('arr').textContent=clk(new Date(S.t0.getTime()+(S.sim+e*60)*1000));$('min').textContent=S.arrived?0:Math.round(e);$('km').textContent=fn(rem);
  $('spd').textContent=Math.round(S.v);$('spd').style.color=S.v>S.lim?'#f87171':'#fff';$('lim').textContent=S.lim;
  var cs=$('cSig');cs.textContent=ns?'Sin señal móvil':'Señal móvil';cs.className='chip glass '+(ns?'r':'g');
  var cd=$('cDrv'),al=S.ear<.2;cd.textContent=al?'Conductor: alerta':(S.yawns>=2?'Conductor: atención':'Conductor: normal');cd.className='chip glass '+(al?'r':(S.yawns>=2?'y':'g'));
  var d=S.rot*180/Math.PI;$('cmp').style.transform='rotate('+d+'deg)';$('cmpN').style.transform='translateX(-50%) rotate('+(-d)+'deg)'}
