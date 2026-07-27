const pages=document.querySelectorAll('.page');
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{
document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('active'));
b.classList.add('active');
pages.forEach(p=>p.classList.remove('active'));
document.getElementById(b.dataset.page).classList.add('active');
});
document.querySelector('.tabs button').classList.add('active');
const h=new Date().getHours();
greeting.textContent=h<12?'Good Morning, Carrie!':h<18?'Good Afternoon, Carrie!':'Good Evening, Carrie!';
const quotes=['Progress over perfection.','One workout at a time.','You are getting stronger.'];
quote.textContent=quotes[new Date().getDay()%quotes.length];
const current=190,goalWt=140,start=190;
const pct=Math.max(0,Math.min(100,(start-current)/(start-goalWt)*100));
progress.style.width=pct+'%';
goal.textContent=`${current-goalWt} lb to reach your goal`;
completed.textContent=localStorage.completed||0;
list.innerHTML=['Leg Press','Chest Press','Lat Pulldown','Seated Row'].map(x=>'<div style="padding:12px 0;border-bottom:1px solid #eee">'+x+'</div>').join('');
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');