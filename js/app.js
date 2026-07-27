const data = window.CARRIEFIT_DATA;
let state = Store.load();
let activeRoute = "home";
let timerSeconds = 90;
let timerRemaining = 90;
let timerHandle = null;
let timerRunning = false;

const app = document.getElementById("app");
const title = document.getElementById("pageTitle");
const timerSheet = document.getElementById("timerSheet");
const timerDisplay = document.getElementById("timerDisplay");
const timerToggle = document.getElementById("timerToggle");

function persist(){ Store.save(state); }

function formatDate(iso){
  return new Date(iso+"T12:00:00").toLocaleDateString(undefined,{month:"short",day:"numeric"});
}

function weeklyCount(){
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate()-6);
  return state.completedWorkouts.filter(d=>new Date(d)>=start).length;
}

function route(name){
  activeRoute = name;
  document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.route===name));
  const labels = {home:"Home",workouts:"Workouts",equipment:"Equipment",progress:"Progress",wellness:"Wellness"};
  title.textContent = labels[name];
  render();
  window.scrollTo({top:0,behavior:"smooth"});
}

function render(){
  const views = {home:renderHome,workouts:renderWorkouts,equipment:renderEquipment,progress:renderProgress,wellness:renderWellness};
  app.innerHTML = views[activeRoute]();
  bindView();
}

function renderHome(){
  const count = weeklyCount();
  const pct = Math.min(100,(count/5)*100);
  const latest = state.weightHistory[state.weightHistory.length-1]?.value || state.profile.currentWeight;
  return `
    <section class="hero">
      <p class="eyebrow" style="color:#fff">GOOD ${new Date().getHours()<12?"MORNING":"AFTERNOON"}</p>
      <h2>You've got this, ${state.profile.name}.</h2>
      <p>Today's mission is designed to build consistency without overwhelming you.</p>
      <button class="secondary" data-open-workout="full-body-a">Start Full Body A</button>
    </section>

    <div class="grid">
      <div class="card">
        <p class="eyebrow">WEEKLY GOAL</p>
        <div class="metric">${count}<small> / 5</small></div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="card">
        <p class="eyebrow">CURRENT WEIGHT</p>
        <div class="metric">${latest}<small> lb</small></div>
        <p>${Math.max(0,latest-state.profile.goalWeight)} lb to goal</p>
      </div>
    </div>

    <div class="section-head"><h2>Today's Mission</h2><button class="ghost" data-route-link="workouts">See all</button></div>
    <div class="card">
      <h3>Full Body A</h3>
      <div class="workout-meta"><span class="badge">45 minutes</span><span class="badge">Beginner</span><span class="badge">4 exercises</span></div>
      <p>Balanced strength work using the RitFit M1 and adjustable bench.</p>
      <button class="primary wide" data-open-workout="full-body-a">Begin Workout</button>
    </div>

    <div class="section-head"><h2>Coach's Message</h2></div>
    <div class="card">
      <h3>Consistency beats intensity.</h3>
      <p>Finish each set with good form. You do not need to train to exhaustion for the workout to count.</p>
    </div>
  `;
}

function renderWorkouts(){
  return `
    <input class="search" id="workoutSearch" placeholder="Search workouts or exercises">
    <div id="workoutList">
      ${data.workouts.map(w=>`
        <div class="workout-card" data-search="${(w.name+" "+w.exercises.map(e=>e.name).join(" ")).toLowerCase()}">
          <h3>${w.name}</h3>
          <div class="workout-meta"><span class="badge">${w.duration} min</span><span class="badge">${w.difficulty}</span><span class="badge">${w.exercises.length} exercises</span></div>
          <button class="primary" data-open-workout="${w.id}">Open Workout</button>
        </div>`).join("")}
    </div>
  `;
}

function workoutDetail(id){
  const w = data.workouts.find(x=>x.id===id);
  const log = state.workoutLogs[id] || {};
  return `
    <button class="ghost" data-route-link="workouts">← Back</button>
    <div class="section-head"><h2>${w.name}</h2><button class="secondary" id="openTimer">Rest Timer</button></div>
    <div class="card">
      <div class="workout-meta"><span class="badge">${w.duration} minutes</span><span class="badge">${w.difficulty}</span></div>
      ${w.exercises.map(ex=>`
        <div class="exercise">
          <div class="exercise-head">
            <div><div class="exercise-title">${ex.name}</div><div class="exercise-tip">${ex.tip}</div></div>
            <button class="ghost guide-button" data-guide="${ex.id}">Guide</button>
          </div>
          ${Array.from({length:ex.sets},(_,i)=>{
            const key = `${ex.id}-${i}`;
            const saved = log[key] || {};
            return `<div class="set-row">
              <strong>${i+1}</strong>
              <input inputmode="decimal" placeholder="lb" value="${saved.weight??""}" data-log="${key}" data-field="weight">
              <input inputmode="numeric" placeholder="${ex.reps}" value="${saved.reps??""}" data-log="${key}" data-field="reps">
              <button class="${saved.done?"done":""}" data-complete-set="${key}">✓</button>
            </div>`;
          }).join("")}
        </div>
      `).join("")}
      <button class="primary wide" data-finish-workout="${w.id}">Finish Workout</button>
    </div>
  `;
}

function renderEquipment(){
  return `
    <input class="search" id="equipmentSearch" placeholder="Search equipment or exercise setup">
    <div id="equipmentList">
      ${data.equipment.map(e=>`
        <div class="equipment-card" data-search="${(e.name+" "+e.category+" "+e.guides.map(g=>g.title).join(" ")).toLowerCase()}">
          <p class="eyebrow">${e.category}</p>
          <h3>${e.name}</h3>
          <p>${e.description}</p>
          <button class="secondary" data-toggle-equipment="${e.id}">View setup guides</button>
          <div class="equipment-guides hidden" id="equipment-${e.id}">
            ${e.guides.map(g=>`<div class="guide"><strong>${g.title}</strong>${g.detail}</div>`).join("")}
          </div>
        </div>`).join("")}
    </div>
  `;
}

function renderProgress(){
  const history = [...state.weightHistory].slice(-12);
  const latest = history[history.length-1]?.value || state.profile.currentWeight;
  return `
    <div class="grid">
      <div class="card"><p class="eyebrow">CURRENT</p><div class="metric">${latest}<small> lb</small></div></div>
      <div class="card"><p class="eyebrow">GOAL</p><div class="metric">${state.profile.goalWeight}<small> lb</small></div></div>
    </div>
    <div class="card chart-card">
      <h3>Weight Trend</h3>
      <canvas id="weightChart"></canvas>
    </div>
    <div class="card">
      <h3>Add Weight</h3>
      <div class="form-row">
        <div class="field"><label>Date</label><input type="date" id="weightDate" value="${new Date().toISOString().slice(0,10)}"></div>
        <div class="field"><label>Weight (lb)</label><input inputmode="decimal" id="weightValue" value="${latest}"></div>
      </div>
      <button class="primary wide" id="saveWeight" style="margin-top:12px">Save Entry</button>
    </div>
    <div class="card">
      <h3>History</h3>
      ${history.slice().reverse().map(v=>`<div class="history-item"><span>${formatDate(v.date)}</span><strong>${v.value} lb</strong></div>`).join("")}
    </div>
  `;
}

function renderWellness(){
  const w = state.wellness;
  return `
    <div class="card">
      <h3>Daily Wellness</h3>
      <div class="field"><label>Water — ${w.water} glasses</label><div class="range-row"><input type="range" id="water" min="0" max="12" value="${w.water}"><strong id="waterValue">${w.water}</strong></div></div>
      <div class="field" style="margin-top:18px"><label>Sleep — ${w.sleep} hours</label><div class="range-row"><input type="range" id="sleep" min="0" max="12" step=".5" value="${w.sleep}"><strong id="sleepValue">${w.sleep}</strong></div></div>
      <div class="field" style="margin-top:18px"><label>Mood — ${w.mood}/5</label><div class="range-row"><input type="range" id="mood" min="1" max="5" value="${w.mood}"><strong id="moodValue">${w.mood}</strong></div></div>
      <div class="field" style="margin-top:18px"><label>Energy — ${w.energy}/5</label><div class="range-row"><input type="range" id="energy" min="1" max="5" value="${w.energy}"><strong id="energyValue">${w.energy}</strong></div></div>
      <button class="primary wide" id="saveWellness" style="margin-top:18px">Save Wellness</button>
    </div>
    <div class="card">
      <h3>Today's Guidance</h3>
      <p>${w.energy<=2?"Keep today's workout light and focus on movement quality.":"Your energy looks good enough for the scheduled workout."}</p>
    </div>
  `;
}

function bindView(){
  document.querySelectorAll("[data-route-link]").forEach(b=>b.onclick=()=>route(b.dataset.routeLink));
  document.querySelectorAll("[data-open-workout]").forEach(b=>b.onclick=()=>{
    title.textContent = "Workout";
    app.innerHTML = workoutDetail(b.dataset.openWorkout);
    bindView();
  });

  const workoutSearch = document.getElementById("workoutSearch");
  if(workoutSearch) workoutSearch.oninput = e => filterCards("#workoutList .workout-card", e.target.value);

  const equipmentSearch = document.getElementById("equipmentSearch");
  if(equipmentSearch) equipmentSearch.oninput = e => filterCards("#equipmentList .equipment-card", e.target.value);

  document.querySelectorAll("[data-toggle-equipment]").forEach(b=>b.onclick=()=>{
    document.getElementById("equipment-"+b.dataset.toggleEquipment).classList.toggle("hidden");
  });

  document.querySelectorAll("[data-log]").forEach(input=>input.onchange=()=>{
    const detail = input.closest(".card");
    const workoutId = data.workouts.find(w=>detail.textContent.includes(w.name))?.id;
    if(!workoutId) return;
    state.workoutLogs[workoutId] ||= {};
    state.workoutLogs[workoutId][input.dataset.log] ||= {};
    state.workoutLogs[workoutId][input.dataset.log][input.dataset.field] = input.value;
    persist();
  });

  document.querySelectorAll("[data-complete-set]").forEach(b=>b.onclick=()=>{
    const detail = b.closest(".card");
    const workoutId = data.workouts.find(w=>detail.textContent.includes(w.name))?.id;
    if(!workoutId) return;
    state.workoutLogs[workoutId] ||= {};
    state.workoutLogs[workoutId][b.dataset.completeSet] ||= {};
    const entry = state.workoutLogs[workoutId][b.dataset.completeSet];
    entry.done = !entry.done;
    b.classList.toggle("done",entry.done);
    persist();
  });

  document.querySelectorAll("[data-finish-workout]").forEach(b=>b.onclick=()=>{
    state.completedWorkouts.push(new Date().toISOString());
    persist();
    alert("Workout saved. Great job!");
    route("home");
  });

  const openTimer = document.getElementById("openTimer");
  if(openTimer) openTimer.onclick = ()=>timerSheet.classList.remove("hidden");

  const saveWeight = document.getElementById("saveWeight");
  if(saveWeight) saveWeight.onclick=()=>{
    const date = document.getElementById("weightDate").value;
    const value = Number(document.getElementById("weightValue").value);
    if(!date || !value) return alert("Enter a valid date and weight.");
    state.weightHistory.push({date,value});
    state.weightHistory.sort((a,b)=>a.date.localeCompare(b.date));
    state.profile.currentWeight = value;
    persist(); render();
  };

  if(document.getElementById("weightChart")) drawLineChart(document.getElementById("weightChart"),state.weightHistory.slice(-12));

  ["water","sleep","mood","energy"].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.oninput=()=>document.getElementById(id+"Value").textContent=el.value;
  });
  const saveWellness = document.getElementById("saveWellness");
  if(saveWellness) saveWellness.onclick=()=>{
    ["water","sleep","mood","energy"].forEach(id=>state.wellness[id]=Number(document.getElementById(id).value));
    persist(); render();
  };
}

function filterCards(selector,query){
  const q = query.trim().toLowerCase();
  document.querySelectorAll(selector).forEach(card=>{
    card.style.display = card.dataset.search.includes(q) ? "" : "none";
  });
}

function updateTimerDisplay(){
  const m = String(Math.floor(timerRemaining/60)).padStart(2,"0");
  const s = String(timerRemaining%60).padStart(2,"0");
  timerDisplay.textContent = `${m}:${s}`;
}
function stopTimer(){
  clearInterval(timerHandle); timerHandle=null; timerRunning=false; timerToggle.textContent="Start";
}
function startTimer(){
  if(timerRemaining<=0) timerRemaining=timerSeconds;
  timerRunning=true; timerToggle.textContent="Pause";
  timerHandle=setInterval(()=>{
    timerRemaining--; updateTimerDisplay();
    if(timerRemaining<=0){
      stopTimer();
      if(navigator.vibrate) navigator.vibrate([200,100,200]);
      alert("Rest complete.");
    }
  },1000);
}

document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>route(b.dataset.route));
document.getElementById("profileButton").onclick=()=>alert("Profile settings are planned for Phase 6.");
document.getElementById("closeTimer").onclick=()=>{ stopTimer(); timerSheet.classList.add("hidden"); };
document.querySelectorAll("[data-seconds]").forEach(b=>b.onclick=()=>{
  stopTimer(); timerSeconds=Number(b.dataset.seconds); timerRemaining=timerSeconds; updateTimerDisplay();
});
timerToggle.onclick=()=>timerRunning?stopTimer():startTimer();

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
}

route("home");
