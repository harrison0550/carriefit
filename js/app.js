
const state={weight:190,goal:140,water:0};
const pages={
Home:()=>`<div class='card'><h2>Weekly Goal</h2><progress value='2' max='5'></progress><p>2 of 5 workouts complete</p></div>`,
Workout:()=>`<div class='card'><table>
<tr><th>Exercise</th><th>Wt</th><th>Done</th></tr>
${['Chest Press','Lat Pulldown','Leg Press'].map(e=>`<tr><td>${e}</td><td><input></td><td><input type='checkbox'></td></tr>`).join('')}
</table><button onclick="alert('Rest timer arrives in Phase 5')">Start Rest Timer</button></div>`,
Progress:()=>`<div class='card'><h2>Progress</h2>
<p>Current Weight: ${state.weight} lb</p>
<p>Goal Weight: ${state.goal} lb</p>
<progress value='50' max='100'></progress>
<p>Chart placeholders ready for future integration.</p></div>`,
Equipment:()=>`<div class='card'><h2>Equipment</h2><p>Add your RitFit M1 photos into assets/equipment.</p></div>`,
Wellness:()=>`<div class='card'><h2>Wellness</h2>
<label>Water <input value='0'></label><br>
<label>Sleep <input value='8'></label><br>
<label>Energy <input type='range'></label></div>`
};
const app=document.getElementById('app');
const nav=document.getElementById('nav');
Object.keys(pages).forEach(k=>{let b=document.createElement('button');b.textContent=k;b.onclick=()=>app.innerHTML=pages[k]();nav.appendChild(b);});
app.innerHTML=pages.Home();
