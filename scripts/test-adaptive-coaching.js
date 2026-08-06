const assert=require("assert");
const fs=require("fs");
const path=require("path");
const adaptive=require("../adaptive-coaching.js");
const root=path.resolve(__dirname,"..");
const app=fs.readFileSync(path.join(root,"app.js"),"utf8");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const sw=fs.readFileSync(path.join(root,"sw.js"),"utf8");
const css=fs.readFileSync(path.join(root,"app.css"),"utf8");

const defaults=adaptive.normalizeProfile({});
assert.strictEqual(defaults.goal,"fatLoss");
assert.strictEqual(defaults.experience,"beginner");
assert.strictEqual(defaults.sessionMinutes,45);
assert.strictEqual(defaults.targetWeight,140);

const shortPlan=adaptive.buildRecommendation({profile:{sessionMinutes:30,goal:"fatLoss",experience:"beginner"},history:[],ratings:{}});
assert.strictEqual(shortPlan.strengthSetCap,2,"short sessions should cap working sets at two");
assert(shortPlan.cardioTargetMinutes>=20,"cardio must retain a useful minimum");
const threeDayPlan=adaptive.buildRecommendation({profile:{trainingDays:3,targetWeight:190},currentWeight:220});
assert(threeDayPlan.reasons.some(reason=>reason.includes("prioritize the three full-body sessions")),"available days must affect weekly priority guidance");
assert(threeDayPlan.reasons.some(reason=>reason.includes("never used to calculate lifting loads")),"weight goals must inform emphasis without calculating lifting loads");

const recoveryPlan=adaptive.buildRecommendation({profile:{sessionMinutes:60},history:[{id:"one"}],ratings:{one:"Exhausting"},latestRecovery:"Low"});
assert.strictEqual(recoveryPlan.strengthSetCap,2,"low recovery must reduce volume");
assert.strictEqual(recoveryPlan.progression,"hold","low recovery must never increase load");

const progressPlan=adaptive.buildRecommendation({profile:{experience:"intermediate"},history:[{id:"one"},{id:"two"}],ratings:{one:"Easy",two:"Easy"}});
assert.strictEqual(progressPlan.progression,"smallIncrease","two easy sessions may permit a controlled increase");

const limitationPlan=adaptive.buildRecommendation({profile:{limitations:"Sensitive knee"},history:[{id:"one"},{id:"two"}],ratings:{one:"Easy",two:"Easy"}});
assert.strictEqual(limitationPlan.progression,"hold","recorded limitations must disable automatic progression");
assert.strictEqual(limitationPlan.requiresProfessionalReview,true);

const source=[{name:"Lift",type:"strength",sets:3},{name:"Incline Treadmill Walk",type:"cardio",duration:"22:00"}];
const adapted=adaptive.applyRecommendation(source,shortPlan);
assert.strictEqual(adapted[0].sets,2);
assert.strictEqual(adapted[1].duration,`${shortPlan.cardioTargetMinutes}:00`);
assert.strictEqual(source[0].sets,3,"adaptive plans must not mutate workout definitions");

assert(html.includes('src="adaptive-coaching.js"'),"adaptive module must load in the production shell");
assert(sw.includes('"./adaptive-coaching.js"'),"adaptive module must remain available offline");
assert(/version:5,[\s\S]*?trainingProfile[\s\S]*?value\.schemaVersion=5;/.test(app),"carriefitv5 data needs an additive profile migration");
assert(/planned dates, completed workouts, or rest days/.test(app),"confirmation UI must state scheduling boundaries");
assert(!/plannedDate\s*=\s*state\.trainingProfile/.test(app),"profile logic must never rewrite plannedDate");
assert(/@media\(max-width:370px\)[\s\S]*?\.adaptive-profile-grid\{grid-template-columns:minmax\(0,1fr\)\}/.test(css),"adaptive profile must collapse safely on small iPhones");

console.log("Adaptive coaching tests passed: profile normalization, recovery guardrails, confirmation boundaries, immutable definitions, offline support, and storage compatibility.");
