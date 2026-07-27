const d={weight:190,goal:140,streak:0};for(const[k,v]of Object.entries(d)){localStorage[k]??=v;}
wt.textContent=localStorage.weight+' lb';goal.textContent=localStorage.goal+' lb';streak.textContent=localStorage.streak+' days';
if('serviceWorker'in navigator){navigator.serviceWorker.register('sw.js');}
document.getElementById('start').onclick=()=>alert('Workout engine arrives in Sprint 2!');