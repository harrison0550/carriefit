
const h=new Date().getHours();
greeting.textContent=h<12?'Good Morning, Carrie!':h<18?'Good Afternoon, Carrie!':'Good Evening, Carrie!';
const msgs=[
'Small steps every day become amazing results.',
'Consistency beats perfection.',
'You are building strength one workout at a time.'
];
coach.textContent=msgs[new Date().getDay()%msgs.length];
start.onclick=()=>alert('Workout engine planned for the next development milestone.');
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
