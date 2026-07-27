
const quotes=["Every rep counts.","Consistency beats perfection.","Strong today. Stronger tomorrow."];
const plans={
"Full Body A":["Leg Press","Chest Press","Lat Pulldown","Seated Row"],
"Full Body B":["Goblet Squat","Shoulder Press","Cable Row","Romanian Deadlift"],
"Cardio":["Rower 20 min","Treadmill 20 min"],
"Recovery":["Stretching","Easy Walk"]
};
const store=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const load=(k,d)=>JSON.parse(localStorage.getItem(k)??JSON.stringify(d));
let completed=load("completed",0);
weight.textContent=(load("weight",190))+" lb";
goal.textContent=(load("goal",140))+" lb";
count.textContent=completed;
const h=new Date().getHours();
greeting.textContent=h<12?"Good Morning, Carrie!":h<18?"Good Afternoon, Carrie!":"Good Evening, Carrie!";
quote.textContent=quotes[new Date().getDay()%quotes.length];
function render(){
 const ex=plans[plan.value];
 workout.innerHTML=ex.map(e=>`<div class="exercise"><span>${e}</span><label>✓ <input type="checkbox"></label></div>`).join("");
}
plan.onchange=render; render();
startBtn.onclick=()=>alert("Workout started!");
saveBtn.onclick=()=>{
 completed++;
 store("completed",completed);
 count.textContent=completed;
 alert("Workout saved locally!");
}
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js');}
