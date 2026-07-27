
const pages={
Home:()=>`<div class="card"><h2>Today's Mission</h2><p>Full Body A</p><p>45 minutes</p></div>`,
Workouts:()=>`<div class="card"><h2>Workout</h2>${
exercises.map(e=>`<div class="exercise"><b>${e.name}</b><br>${e.sets} x ${e.reps}<br><input placeholder="Weight (lb)" style="width:90px"> <input type="checkbox"> Done<div class="tip">${e.tip}</div></div>`).join("")
}</div>`,
Equipment:()=>`<div class="card"><h2>Equipment Library</h2>${
equipment.map(e=>`<div class="equip"><b>${e.name}</b><br>${e.setup}</div>`).join("")
}<p class="tip">Replace placeholders with your gym photos in the assets/equipment folder.</p></div>`,
Progress:()=>`<div class="card"><h2>Progress</h2><p>Weight, waist, PRs and charts arrive in Phase 4.</p></div>`,
Wellness:()=>`<div class="card"><h2>Wellness</h2><label>Water <input type="number" value="0" style="width:60px"></label><br><label>Sleep <input type="number" value="8" style="width:60px"></label></div>`,
Settings:()=>`<div class="card"><h2>Settings</h2><p>Profile and preferences.</p></div>`
};
const app=document.getElementById("app"),nav=document.getElementById("nav");
Object.keys(pages).forEach(k=>{
 const b=document.createElement("button");
 b.textContent=k;
 b.onclick=()=>app.innerHTML=pages[k]();
 nav.appendChild(b);
});
app.innerHTML=pages.Home();
