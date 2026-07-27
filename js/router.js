
const pages={
home:`<div class='card'><h2>Today's Mission</h2><p>Full Body A</p></div>`,
workouts:`<div class='card'><h2>Workout Engine</h2><div id='workout'></div></div>`,
equipment:`<div class='card'><h2>Equipment</h2><p>RitFit M1, Bench, Treadmill, Rower, Bike</p></div>`,
progress:`<div class='card'><h2>Progress</h2><p>Charts coming in Phase 3.</p></div>`,
wellness:`<div class='card'><h2>Wellness</h2><p>Water • Sleep • Mood</p></div>`,
settings:`<div class='card'><h2>Settings</h2><p>Profile options.</p></div>`
};
function show(p){view.innerHTML=pages[p]; if(p==='workouts')renderWorkout();}
