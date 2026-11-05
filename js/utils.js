/* Utilidades: acceso al DOM, RNG con semilla y formato de números/horas */
var $=function(i){return document.getElementById(i)};
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function fn(n){return n.toLocaleString('es-PE',{minimumFractionDigits:1,maximumFractionDigits:1})}
function fm(m){m=Math.round(m);return m<60?m+' min':Math.floor(m/60)+' h '+(m%60)+' min'}
function clk(d){return d.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit',hour12:false})}
function nz(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
