const h=new Date().getHours();greet.textContent=h<12?'Good Morning, Carrie!':h<18?'Good Afternoon, Carrie!':'Good Evening, Carrie!';
localStorage.streak??=0;streak.textContent=localStorage.streak+' days';
document.querySelector('.cta').onclick=()=>alert('Workout engine will expand in v5.1');
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');