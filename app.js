const d={weight:190,goal:140,streak:0,weekly:0};
Object.keys(d).forEach(k=>{if(localStorage[k]==null)localStorage[k]=d[k];});
w.textContent=localStorage.weight+' lb';g.textContent=localStorage.goal+' lb';s.textContent=localStorage.streak+' days';p.value=localStorage.weekly;
const h=new Date().getHours();greet.textContent=h<12?'Good Morning, Carrie!':h<18?'Good Afternoon, Carrie!':'Good Evening, Carrie!';
const quotes=['Progress over perfection.','Strong women lift each other up.','One workout at a time.'];quote.textContent=quotes[new Date().getDay()%quotes.length];
const ex=['Leg Press - 3 x 12','Chest Press - 3 x 10','Lat Pulldown - 3 x 12','Seated Row - 3 x 12','Treadmill Walk - 15 min'];
list.innerHTML=ex.map(e=>`<li><label><input type='checkbox'> ${e}</label></li>`).join('');
start.onclick=()=>alert('Workout logging arrives in Version 3.');
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');