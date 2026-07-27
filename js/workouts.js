
const workout=[
{name:'Chest Press',sets:3,reps:10},
{name:'Lat Pulldown',sets:3,reps:12},
{name:'Leg Press',sets:3,reps:12}
];
function renderWorkout(){
 const w=document.getElementById('workout');
 w.innerHTML='';
 workout.forEach(e=>{
   const d=document.createElement('div');
   d.className='exercise';
   d.innerHTML=`<div><strong>${e.name}</strong><br>${e.sets} x ${e.reps}</div>
   <div><input placeholder='lb'></div>`;
   w.appendChild(d);
 });
}
