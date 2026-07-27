const plans={
'Full Body A':['Leg Press','Chest Press','Lat Pulldown','Seated Row'],
'Full Body B':['Goblet Squat','Shoulder Press','Cable Row','Romanian Deadlift'],
'Cardio':['Rower 20 min','Treadmill 20 min'],
'Recovery':['Stretching','Easy Walk']
};
const q=['Every rep counts.','Small wins become big victories.','You are stronger than yesterday.'];
const wt=Number(localStorage.weight||190),goal=Number(localStorage.goal||140);
const pct=Math.max(0,Math.min(100,((190-wt)/(190-goal))*100));
progressBar.style.width=pct+'%';
goalText.textContent=`${wt} lb → Goal ${goal} lb`;
const h=new Date().getHours();
greeting.textContent=h<12?'Good Morning, Carrie!':h<18?'Good Afternoon, Carrie!':'Good Evening, Carrie!';
quote.textContent=q[new Date().getDay()%q.length];
Object.keys(plans).forEach(p=>plan.add(new Option(p,p)));
function draw(){
 let ex=plans[plan.value];
 exerciseList.innerHTML=ex.map(e=>`<div class='exercise'><span>${e}</span><span><input type='number' placeholder='Wt' style='width:55px'> x <input type='number' value='10' style='width:45px'></span></div>`).join('');
 guide.innerHTML=ex.map(e=>`<li>${e} (Guide coming in v5)</li>`).join('');
}
plan.onchange=draw;plan.selectedIndex=0;draw();
finishBtn.onclick=()=>{let c=Number(localStorage.completed||0)+1;localStorage.completed=c;alert('Workout saved! Total completed: '+c);}
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
