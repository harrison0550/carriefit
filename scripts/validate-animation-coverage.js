const fs=require("fs");
const path=require("path");

const root=path.resolve(__dirname,"..");
const app=fs.readFileSync(path.join(root,"app.js"),"utf8");
const sw=fs.readFileSync(path.join(root,"sw.js"),"utf8");
const expected={
  "Arm Circles":"arm-circles-female.gif",
  "Bodyweight Squat":"bodyweight-squat-female.gif",
  "Hip Hinge":"hip-hinge-female.gif",
  "Goblet Squat":"goblet-squat-female.gif",
  "Kettlebell Around the World":"kettlebell-around-the-world-female.gif",
  "Kettlebell Deadlift":"kettlebell-deadlift-female.gif",
  "Kettlebell Swing":"kettlebell-swing-female.gif",
  "Zone 2 Cardio":"zone-2-cardio-female.gif",
  "Cable Chest Press":"cable-chest-press-female.gif",
  "Seated Cable Row":"seated-cable-row-female.gif",
  "Lat Pulldown":"lat-pulldown-female.gif",
  "Cable Shoulder Press":"cable-shoulder-press-female.gif",
  "Rope Triceps Pushdown":"rope-triceps-pushdown-female.gif",
  "Cable Curl":"cable-curl-female.gif",
  "Smith Machine RDL":"smith-machine-rdl-female.gif",
  "Smith Bulgarian Split Squat":"smith-bulgarian-split-squat-female.gif",
  "Smith Machine Calf Raise":"smith-machine-calf-raise-female.gif",
  "Smith Machine Squat":"smith-machine-squat-female.gif",
  "Incline Cable Press":"incline-cable-press-female.gif",
  "Single Arm Cable Row":"single-arm-cable-row-female.gif",
  "Cable Lateral Raise":"cable-lateral-raise-female.gif",
  "Cable Crunch":"cable-crunch-female.gif",
  "Cable Hammer Curl":"cable-hammer-curl-female.gif",
  "Rear Delt Cable Fly":"rear-delt-cable-fly-female.gif",
  "Cable Face Pull":"cable-face-pull-female.gif",
  "Cable Straight Arm Pushdown":"cable-straight-arm-pushdown-female.gif",
  "High to Low Cable Chop":"high-to-low-cable-chop-female.gif"
};

for(const [name,file] of Object.entries(expected)){
  const relative=`assets/exercise-library/generated/${file}`;
  if(!app.includes(`"${name}":"${relative}"`))throw new Error(`Missing animation mapping for ${name}`);
  if(!fs.existsSync(path.join(root,relative)))throw new Error(`Missing animation file ${relative}`);
  if(!sw.includes(`./${relative}`))throw new Error(`Animation is not cached offline: ${relative}`);
  const bytes=fs.readFileSync(path.join(root,relative));
  if(bytes.subarray(0,6).toString("ascii")!=="GIF89a")throw new Error(`Invalid GIF header: ${relative}`);
}

if(!app.includes("officialImage")||!app.includes("Official RitFit image")){
  throw new Error("Dual animation and official-reference presentation is missing");
}

console.log(`Animation coverage validation passed: ${Object.keys(expected).length} active movements, retained official references, and offline assets.`);
