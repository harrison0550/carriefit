const data=window.CARRIEFIT_DATA;
let state=Store.load();
let routeName="today";
let activeWorkout=null;
let trainView="week";
const app=document.getElementById("app");
const title=document.getElementById("pageTitle");
const sheet=document.getElementById("sheet");
const sheetContent=document.getElementById("sheetContent");

function save(){Store.save(state)}
function todayISO(){return new Date().toISOString().slice(0,10)}
function formatDate(iso){return new Date(iso+"T12:00:00").toLocaleDateString(undefined,{month:"short",day:"numeric"})}
function currentNutrition(){
  if(state.nutrition.date!==todayISO()) state.nutrition={date:todayISO(),meals:[],water:0};
  return state.nutrition;
}
function nutritionTotals(){
  const n=currentNutrition();
  return n.meals.reduce((t,m)=>({
    calories:t.calories+Number(m.calories||0),
    protein:t.protein+Number(m.protein||0),
    carbs:t.carbs+Number(m.carbs||0),
    fat:t.fat+Number(m.fat||0)
  }),{calories:0,protein:0,carbs:0,fat:0});
}
function weeklyWorkouts(){
  const cutoff=new Date();cutoff.setDate(cutoff.getDate()-6);
  return state.completedWorkouts.filter(x=>new Date(x.date)>=cutoff).length;
}
function latestWeight(){return state.weightHistory[state.weightHistory.length-1]?.value||state.profile.currentWeight}
function openSheet(html){sheetContent.innerHTML=html;sheet.classList.remove("hidden");bindSheet()}
function closeSheet(){sheet.classList.add("hidden");sheetContent.innerHTML=""}

function route(name){
  routeName=name;activeWorkout=null;
  document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.route===name));
  title.textContent={today:"Today",workouts:"Train",nutrition:"Nutrition",progress:"Progress",coach:"Coach"}[name];
  render();window.scrollTo({top:0,behavior:"smooth"});
}
function render(){
  if(activeWorkout){app.innerHTML=renderWorkout(activeWorkout);bindView();return}
  const views={today:renderToday,workouts:renderWorkouts,nutrition:renderNutrition,progress:renderProgress,coach:renderCoach};
  app.innerHTML=views[routeName]();bindView();
}
function renderToday(){
  const rec=CoachEngine.recommend(state,data);
  const totals=nutritionTotals();
  const count=weeklyWorkouts();
  return `
    <section class="hero">
      <p class="eyebrow" style="color:#fff">YOUR DAILY PLAN</p>
      <h2>Ready when you are, ${state.profile.name}.</h2>
      <p>${CoachEngine.message(state)}</p>
      <button class="secondary" data-open-workout="${rec.id}">Start ${rec.name}</button>
    </section>

    <div class="grid">
      <div class="card">
        <p class="eyebrow">WEEKLY TRAINING</p>
        <div class="metric">${count}<small> / 5 workouts</small></div>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.min(100,count/5*100)}%"></div></div>
      </div>
      <div class="card">
        <p class="eyebrow">WEIGHT</p>
        <div class="metric">${latestWeight()}<small> lb</small></div>
        <p class="subtle">${Math.max(0,latestWeight()-state.profile.goalWeight)} lb to goal</p>
      </div>
    </div>

    <div class="section-head"><h2>Today's Readiness</h2><button class="ghost" data-route-link="coach">Adjust</button></div>
    <div class="grid-3">
      <div class="card"><p class="eyebrow">SLEEP</p><div class="metric">${state.wellness.sleep}<small> hr</small></div></div>
      <div class="card"><p class="eyebrow">ENERGY</p><div class="metric">${state.wellness.energy}<small> / 5</small></div></div>
      <div class="card"><p class="eyebrow">STRESS</p><div class="metric">${state.wellness.stress}<small> / 5</small></div></div>
    </div>

    <div class="section-head"><h2>Nutrition Snapshot</h2><button class="ghost" data-route-link="nutrition">Open</button></div>
    <div class="card">
      <div class="macro-row">
        <div class="macro"><strong>${totals.calories}</strong><span>calories</span></div>
        <div class="macro"><strong>${totals.protein}g</strong><span>protein</span></div>
        <div class="macro"><strong>${currentNutrition().water}</strong><span>water</span></div>
        <div class="macro"><strong>${currentNutrition().meals.length}</strong><span>meals</span></div>
      </div>
      <p>${CoachEngine.nutritionTip(state)}</p>
    </div>
  `;
}

function renderWorkouts(){
  const tabs=`
    <div class="segmented">
      <button class="${trainView==="week"?"active":""}" data-train-view="week">Weekly Plan</button>
      <button class="${trainView==="library"?"active":""}" data-train-view="library">Workouts</button>
      <button class="${trainView==="equipment"?"active":""}" data-train-view="equipment">Equipment</button>
    </div>`;
  if(trainView==="week") return tabs+renderWeeklyPlan();
  if(trainView==="equipment") return tabs+renderEquipment();
  return tabs+`
    <input class="search" id="workoutSearch" placeholder="Search workouts or exercises">
    <div id="workoutList">
      ${data.workouts.map(w=>`
        <div class="workout-card" data-search="${(w.name+" "+w.focus+" "+w.exercises.map(e=>e.name).join(" ")).toLowerCase()}">
          <h3>${w.name}</h3>
          <p>${w.focus}</p>
          <div class="badges"><span class="badge">${w.duration} min</span><span class="badge">${w.difficulty}</span><span class="badge">${w.exercises.length} exercises</span></div>
          <button class="primary" data-open-workout="${w.id}">Open Workout</button>
        </div>`).join("")}
    </div>`;
}
function getWeekDates(){
  const now=new Date(),day=now.getDay(),monday=new Date(now);
  monday.setDate(now.getDate()-((day+6)%7));
  monday.setHours(12,0,0,0);
  return data.weeklyPlan.map((x,i)=>{const d=new Date(monday);d.setDate(monday.getDate()+i);return d});
}
function renderWeeklyPlan(){
  const dates=getWeekDates(),today=todayISO();
  return `
    <div class="card">
      <div class="section-head" style="margin-top:0"><h2>This Week</h2><span class="badge">${weeklyWorkouts()} completed</span></div>
      ${data.weeklyPlan.map((p,i)=>{
        const iso=dates[i].toISOString().slice(0,10);
        const done=state.completedWorkouts.some(x=>x.date.slice(0,10)===iso && (!p.workoutId||x.workoutId===p.workoutId));
        const isToday=iso===today;
        return `<div class="week-day">
          <div><div class="day-name">${p.day}</div><div class="subtle">${formatDate(iso)}</div></div>
          <div><strong>${p.label}</strong><div class="subtle">${p.focus}${p.duration?` · ${p.duration} min`:""}</div></div>
          <div>
            <div class="day-status ${done?"done":isToday?"today":""}">${done?"Done":isToday?"Today":"Planned"}</div>
            ${p.workoutId?`<button class="ghost" data-open-workout="${p.workoutId}" style="margin-top:7px">Start</button>`:""}
          </div>
        </div>`;
      }).join("")}
    </div>
    <div class="notice">The plan repeats weekly. Your Coach tab can still swap today's recommendation when sleep, energy, or stress is low.</div>`;
}
function renderEquipment(){
  return `
    <div class="card">
      <h2>Your Home Gym</h2>
      <p class="subtle">Open any item for its position, setup checklist, and visual reference.</p>
    </div>
    ${data.equipment.map(e=>`
      <div class="equipment-card">
        <img class="equipment-image" src="${e.image}" alt="${e.name} reference image">
        <div class="equipment-body">
          <div class="badges"><span class="badge">${e.type}</span></div>
          <h3>${e.name}</h3>
          <p>${e.summary}</p>
          <p><strong>Position:</strong> ${e.position}</p>
          <button class="primary" data-equipment="${e.id}">Open Setup Guide</button>
        </div>
      </div>`).join("")}`;
}
function renderWorkout(id){
  const w=data.workouts.find(x=>x.id===id);
  const log=state.workoutLogs[id]||{};
  return `
    <button class="ghost" id="backToWorkouts">← Back</button>
    <div class="section-head"><h2>${w.name}</h2><button class="secondary" id="readinessAdjust">Adjust</button></div>
    <div class="card">
      <div class="badges"><span class="badge">${w.duration} minutes</span><span class="badge">${w.focus}</span></div>
      ${w.exercises.map(ex=>`
        <div class="exercise">
          <div class="exercise-head">
            <div><div class="exercise-title">${ex.name}</div><div class="exercise-tip">${ex.tip}</div></div>
            <button class="ghost" data-guide="${ex.id}">Guide</button>
          </div>
          ${Array.from({length:ex.sets},(_,i)=>{
            const key=`${ex.id}-${i}`,saved=log[key]||{};
            return `<div class="set-row">
              <strong>${i+1}</strong>
              <input inputmode="decimal" placeholder="lb" value="${saved.weight??""}" data-log="${key}" data-field="weight">
              <input inputmode="numeric" placeholder="${ex.reps}" value="${saved.reps??""}" data-log="${key}" data-field="reps">
              <button class="${saved.done?"done":""}" data-set-done="${key}">✓</button>
            </div>`;
          }).join("")}
        </div>`).join("")}
      <button class="primary wide" data-finish-workout="${w.id}">Finish Workout</button>
    </div>`;
}
function renderNutrition(){
  const n=currentNutrition(),t=nutritionTotals();
  return `
    <div class="card">
      <h2>Daily Targets</h2>
      <div class="macro-row">
        <div class="macro"><strong>${t.calories}</strong><span>/ ${state.profile.calorieGoal} cal</span></div>
        <div class="macro"><strong>${t.protein}g</strong><span>/ ${state.profile.proteinGoal}g protein</span></div>
        <div class="macro"><strong>${t.carbs}g</strong><span>carbs</span></div>
        <div class="macro"><strong>${t.fat}g</strong><span>fat</span></div>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${Math.min(100,t.calories/state.profile.calorieGoal*100)}%"></div></div>
    </div>

    <div class="card">
      <div class="section-head" style="margin-top:0"><h2>Meals</h2><button class="secondary" id="addMeal">Add meal</button></div>
      ${n.meals.length?n.meals.map((m,i)=>`
        <div class="history-item">
          <div><strong>${m.name}</strong><div class="subtle">${m.protein}g protein</div></div>
          <div><strong>${m.calories}</strong> cal <button class="ghost" data-delete-meal="${i}">×</button></div>
        </div>`).join(""):`<p class="subtle">No meals logged yet.</p>`}
    </div>

    <div class="card">
      <h2>Hydration</h2>
      <div class="range-row">
        <button class="ghost" id="waterDown">−</button>
        <div class="metric">${n.water}<small> glasses</small></div>
        <button class="secondary" id="waterUp">+</button>
      </div>
    </div>

    <div class="card"><h3>Coach Note</h3><p>${CoachEngine.nutritionTip(state)}</p></div>`;
}
function renderProgress(){
  return `
    <div class="grid">
      <div class="card"><p class="eyebrow">CURRENT</p><div class="metric">${latestWeight()}<small> lb</small></div></div>
      <div class="card"><p class="eyebrow">GOAL</p><div class="metric">${state.profile.goalWeight}<small> lb</small></div></div>
    </div>
    <div class="card chart-card"><h2>Weight Trend</h2><canvas id="weightChart"></canvas></div>
    <div class="card">
      <h2>Add Weight</h2>
      <div class="form-grid">
        <div class="field"><label>Date</label><input type="date" id="weightDate" value="${todayISO()}"></div>
        <div class="field"><label>Weight</label><input inputmode="decimal" id="weightValue" value="${latestWeight()}"></div>
      </div>
      <button class="primary wide" id="saveWeight" style="margin-top:12px">Save Entry</button>
    </div>
    <div class="card">
      <h2>Recent Workouts</h2>
      ${state.completedWorkouts.length?state.completedWorkouts.slice(-8).reverse().map(x=>`
        <div class="history-item"><span>${formatDate(x.date.slice(0,10))}</span><strong>${data.workouts.find(w=>w.id===x.workoutId)?.name||"Workout"}</strong></div>`).join(""):`<p class="subtle">No completed workouts yet.</p>`}
    </div>`;
}
function renderCoach(){
  const rec=CoachEngine.recommend(state,data);
  return `
    <div class="coach-bubble"><strong>Coach Recommendation</strong>${CoachEngine.message(state)}</div>
    <div class="card">
      <h2>Readiness Check</h2>
      ${["sleep","energy","stress","mood"].map(id=>`
        <div class="field" style="margin-top:14px">
          <label>${id[0].toUpperCase()+id.slice(1)} — <span id="${id}Value">${state.wellness[id]}</span>${id==="sleep"?" hr":" / 5"}</label>
          <input type="range" id="${id}" min="${id==="sleep"?4:1}" max="${id==="sleep"?10:5}" step="${id==="sleep"?0.5:1}" value="${state.wellness[id]}">
        </div>`).join("")}
      <button class="primary wide" id="saveReadiness" style="margin-top:18px">Update My Plan</button>
    </div>
    <div class="card">
      <p class="eyebrow">RECOMMENDED WORKOUT</p>
      <h2>${rec.name}</h2>
      <p>${rec.focus} · ${rec.duration} minutes</p>
      <button class="primary wide" data-open-workout="${rec.id}">Start Recommendation</button>
    </div>
    <div class="card">
      <h2>Quick Coaching</h2>
      <div class="quick-actions">
        <button class="secondary" data-coach-question="tired">I'm tired</button>
        <button class="secondary" data-coach-question="short">I only have 20 minutes</button>
        <button class="secondary" data-coach-question="sore">I'm sore</button>
        <button class="secondary" data-coach-question="hungry">I'm hungry</button>
      </div>
    </div>`;
}

function bindView(){
  document.querySelectorAll("[data-route-link]").forEach(b=>b.onclick=()=>route(b.dataset.routeLink));
  document.querySelectorAll("[data-open-workout]").forEach(b=>b.onclick=()=>{activeWorkout=b.dataset.openWorkout;title.textContent="Workout";render()});
  document.querySelectorAll("[data-train-view]").forEach(b=>b.onclick=()=>{
    trainView=b.dataset.trainView;render();
  });
  const search=document.getElementById("workoutSearch");
  if(search)search.oninput=e=>document.querySelectorAll("#workoutList .workout-card").forEach(c=>c.style.display=c.dataset.search.includes(e.target.value.toLowerCase())?"":"none");

  const back=document.getElementById("backToWorkouts");
  if(back)back.onclick=()=>{activeWorkout=null;route("workouts")};

  document.querySelectorAll("[data-log]").forEach(input=>input.onchange=()=>{
    state.workoutLogs[activeWorkout] ||= {};
    state.workoutLogs[activeWorkout][input.dataset.log] ||= {};
    state.workoutLogs[activeWorkout][input.dataset.log][input.dataset.field]=input.value;save();
  });
  document.querySelectorAll("[data-set-done]").forEach(b=>b.onclick=()=>{
    state.workoutLogs[activeWorkout] ||= {};
    state.workoutLogs[activeWorkout][b.dataset.setDone] ||= {};
    const entry=state.workoutLogs[activeWorkout][b.dataset.setDone];
    entry.done=!entry.done;b.classList.toggle("done",entry.done);save();
  });
  document.querySelectorAll("[data-finish-workout]").forEach(b=>b.onclick=()=>{
    state.completedWorkouts.push({date:new Date().toISOString(),workoutId:b.dataset.finishWorkout});
    save();alert("Workout saved. Great job.");activeWorkout=null;route("today");
  });
  document.querySelectorAll("[data-guide]").forEach(b=>b.onclick=()=>{
    const ex=data.workouts.flatMap(w=>w.exercises).find(e=>e.id===b.dataset.guide);
    openSheet(`<h2>${ex.name}</h2>
      <img class="guide-image" src="${ex.guide}" alt="${ex.name} setup guide">
      <p class="image-caption">Visual reference for equipment placement and setup.</p>
      <p><strong>Equipment:</strong> ${ex.equipment}</p>
      <p><strong>Setup:</strong> ${ex.setup}</p>
      <p><strong>Movement cue:</strong> ${ex.tip}</p>
      <button class="primary wide" data-close-sheet style="margin-top:14px">Close</button>`);
  });
  document.querySelectorAll("[data-equipment]").forEach(b=>b.onclick=()=>{
    const e=data.equipment.find(x=>x.id===b.dataset.equipment);
    openSheet(`<h2>${e.name}</h2>
      <img class="guide-image" src="${e.image}" alt="${e.name} setup reference">
      <p>${e.summary}</p>
      <p><strong>Permanent position:</strong> ${e.position}</p>
      <h3>Setup checklist</h3>
      <ul class="detail-list">${e.setup.map(x=>`<li>${x}</li>`).join("")}</ul>
      <button class="primary wide" data-close-sheet style="margin-top:14px">Close</button>`);
  });

  const addMeal=document.getElementById("addMeal");
  if(addMeal)addMeal.onclick=()=>openMealSheet();
  document.querySelectorAll("[data-delete-meal]").forEach(b=>b.onclick=()=>{
    currentNutrition().meals.splice(Number(b.dataset.deleteMeal),1);save();render();
  });
  const waterUp=document.getElementById("waterUp");
  if(waterUp)waterUp.onclick=()=>{currentNutrition().water++;save();render()};
  const waterDown=document.getElementById("waterDown");
  if(waterDown)waterDown.onclick=()=>{currentNutrition().water=Math.max(0,currentNutrition().water-1);save();render()};

  const saveWeight=document.getElementById("saveWeight");
  if(saveWeight)saveWeight.onclick=()=>{
    const date=document.getElementById("weightDate").value;
    const value=Number(document.getElementById("weightValue").value);
    if(!date||!value)return alert("Enter a valid date and weight.");
    state.weightHistory.push({date,value});
    state.weightHistory.sort((a,b)=>a.date.localeCompare(b.date));
    state.profile.currentWeight=value;save();render();
  };
  const chart=document.getElementById("weightChart");
  if(chart)drawLineChart(chart,state.weightHistory.slice(-12));

  ["sleep","energy","stress","mood"].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.oninput=()=>document.getElementById(id+"Value").textContent=el.value;
  });
  const saveReadiness=document.getElementById("saveReadiness");
  if(saveReadiness)saveReadiness.onclick=()=>{
    ["sleep","energy","stress","mood"].forEach(id=>state.wellness[id]=Number(document.getElementById(id).value));
    save();render();
  };
  document.querySelectorAll("[data-coach-question]").forEach(b=>b.onclick=()=>showCoachAnswer(b.dataset.coachQuestion));
  const adjust=document.getElementById("readinessAdjust");
  if(adjust)adjust.onclick=()=>{activeWorkout=null;route("coach")};
}
function openMealSheet(){
  openSheet(`
    <h2>Add Meal</h2>
    <div class="field"><label>Quick choice</label>
      <select id="mealPreset"><option value="">Custom meal</option>${data.meals.map((m,i)=>`<option value="${i}">${m.name}</option>`).join("")}</select>
    </div>
    <div class="field" style="margin-top:10px"><label>Name</label><input id="mealName"></div>
    <div class="form-grid" style="margin-top:10px">
      <div class="field"><label>Calories</label><input id="mealCalories" inputmode="numeric"></div>
      <div class="field"><label>Protein (g)</label><input id="mealProtein" inputmode="numeric"></div>
      <div class="field"><label>Carbs (g)</label><input id="mealCarbs" inputmode="numeric"></div>
      <div class="field"><label>Fat (g)</label><input id="mealFat" inputmode="numeric"></div>
    </div>
    <button class="primary wide" id="saveMeal" style="margin-top:14px">Save Meal</button>
    <button class="ghost wide" data-close-sheet style="margin-top:8px">Cancel</button>`);
}
function bindSheet(){
  document.querySelectorAll("[data-close-sheet]").forEach(b=>b.onclick=closeSheet);
  const preset=document.getElementById("mealPreset");
  if(preset)preset.onchange=()=>{
    if(preset.value==="")return;
    const m=data.meals[Number(preset.value)];
    mealName.value=m.name;mealCalories.value=m.calories;mealProtein.value=m.protein;mealCarbs.value=m.carbs;mealFat.value=m.fat;
  };
  const saveMeal=document.getElementById("saveMeal");
  if(saveMeal)saveMeal.onclick=()=>{
    const meal={name:mealName.value.trim(),calories:Number(mealCalories.value||0),protein:Number(mealProtein.value||0),carbs:Number(mealCarbs.value||0),fat:Number(mealFat.value||0)};
    if(!meal.name)return alert("Enter a meal name.");
    currentNutrition().meals.push(meal);save();closeSheet();render();
  };
}
function showCoachAnswer(type){
  const answers={
    tired:"Choose Recovery Session or reduce every strength exercise to two sets. Finishing fresh is better than skipping.",
    short:"Do one set of each Full Body A exercise, then walk for five minutes. That gives you a useful 20-minute session.",
    sore:"Use easy cardio and mobility today. Avoid training through sharp pain or pain that changes your movement.",
    hungry:"Choose a meal with protein, produce, and a moderate carbohydrate serving. The Chicken Rice Bowl is a strong option."
  };
  openSheet(`<h2>Coach Response</h2><p>${answers[type]}</p><button class="primary wide" data-close-sheet>Got it</button>`);
}

document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>route(b.dataset.route));
document.getElementById("settingsButton").onclick=()=>openSheet(`
  <h2>Profile</h2>
  <div class="field"><label>Name</label><input id="profileName" value="${state.profile.name}"></div>
  <div class="form-grid" style="margin-top:10px">
    <div class="field"><label>Goal weight</label><input id="goalWeight" value="${state.profile.goalWeight}"></div>
    <div class="field"><label>Protein goal</label><input id="proteinGoal" value="${state.profile.proteinGoal}"></div>
  </div>
  <div class="field" style="margin-top:10px"><label>Calorie goal</label><input id="calorieGoal" value="${state.profile.calorieGoal}"></div>
  <button class="primary wide" id="saveProfile" style="margin-top:14px">Save Profile</button>
  <button class="ghost wide" data-close-sheet style="margin-top:8px">Cancel</button>`);
sheet.addEventListener("click",e=>{if(e.target===sheet)closeSheet()});
document.addEventListener("click",e=>{
  if(e.target.id==="saveProfile"){
    state.profile.name=profileName.value.trim()||"Carrie";
    state.profile.goalWeight=Number(goalWeight.value)||140;
    state.profile.proteinGoal=Number(proteinGoal.value)||120;
    state.profile.calorieGoal=Number(calorieGoal.value)||1750;
    save();closeSheet();render();
  }
});
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
route("today");
