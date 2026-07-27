
window.CARRIEFIT_DATA = {
  weeklyPlan: [
    {day:"Monday", workoutId:"full-body-a", label:"Full Body A", focus:"Balanced strength", duration:45},
    {day:"Tuesday", workoutId:"cardio-builder", label:"Cardio + Mobility", focus:"Low-impact conditioning", duration:30},
    {day:"Wednesday", workoutId:"full-body-b", label:"Full Body B", focus:"Lower body and posture", duration:42},
    {day:"Thursday", workoutId:"recovery", label:"Recovery Walk", focus:"Easy movement", duration:20},
    {day:"Friday", workoutId:"full-body-a", label:"Full Body A — Progression", focus:"Repeat and improve", duration:45},
    {day:"Saturday", workoutId:"cardio-builder", label:"Optional Cardio", focus:"Treadmill, rower, or bike", duration:25},
    {day:"Sunday", workoutId:null, label:"Rest + Weekly Check-in", focus:"Recovery and preparation", duration:0}
  ],
  workouts: [
    {
      id:"full-body-a", name:"Full Body A", duration:45, difficulty:"Beginner",
      focus:"Balanced strength",
      exercises:[
        {id:"chest-press",name:"Chest Press",sets:3,reps:10,tip:"Keep shoulders down and back.",guide:"assets/guides/chest-press.svg",equipment:"RitFit M1 + Gator Bench",setup:"Bench flat and centered inside the rack. Set handles at mid-chest height."},
        {id:"lat-pulldown",name:"Lat Pulldown",sets:3,reps:12,tip:"Pull elbows toward your ribs.",guide:"assets/guides/lat-pulldown.svg",equipment:"RitFit M1 + lat bar",setup:"Attach the wide bar to the high pulley. Sit facing the machine and brace your thighs."},
        {id:"leg-press",name:"Leg Press",sets:3,reps:12,tip:"Drive through your heels.",guide:"assets/equipment/road-to-12-blueprint.png",equipment:"RitFit M1 guided bar / plate setup",setup:"Use the approved M1 leg-press configuration and keep feet shoulder-width."},
        {id:"seated-row",name:"Seated Cable Row",sets:3,reps:12,tip:"Keep your chest tall.",guide:"assets/guides/seated-row.svg",equipment:"RitFit M1 + low-row handle",setup:"Use the lowest pulley. Sit centered with feet braced and the cable aligned with your midsection."}
      ]
    },
    {
      id:"full-body-b", name:"Full Body B", duration:42, difficulty:"Beginner",
      focus:"Lower body and posture",
      exercises:[
        {id:"goblet-squat",name:"Goblet Squat",sets:3,reps:10,tip:"Sit between your hips and keep your chest lifted.",guide:"assets/equipment/road-to-12-layout-guide.png",equipment:"Dumbbell or weight plate",setup:"Stand in the clear working area in front of the M1."},
        {id:"incline-press",name:"Incline Chest Press",sets:3,reps:10,tip:"Use a modest incline and control the lowering phase.",guide:"assets/guides/incline-press.svg",equipment:"RitFit M1 + Gator Bench",setup:"Set the bench to roughly 25–35 degrees and align handles with the upper chest."},
        {id:"cable-pull-through",name:"Cable Pull-Through",sets:3,reps:12,tip:"Push your hips back, then stand tall.",guide:"assets/equipment/road-to-12-layout-guide.png",equipment:"RitFit M1 + rope attachment",setup:"Use the lowest pulley and stand facing away from the machine in the open working area."},
        {id:"face-pull",name:"Face Pull",sets:3,reps:15,tip:"Pull toward eyebrow height with elbows wide.",guide:"assets/equipment/road-to-12-layout-guide.png",equipment:"RitFit M1 + rope attachment",setup:"Set the pulley around eye level and stand facing the rack."}
      ]
    },
    {
      id:"cardio-builder", name:"Cardio Builder", duration:30, difficulty:"Beginner",
      focus:"Low-impact conditioning",
      exercises:[
        {id:"treadmill",name:"Treadmill Walk",sets:1,reps:"20 min",tip:"Choose a pace that allows short conversation.",guide:"assets/equipment/road-to-12-blueprint.png",equipment:"iFIT Treadmill",setup:"Use the treadmill in its permanent cardio position facing the TV."},
        {id:"rower",name:"Easy Rower",sets:1,reps:"10 min",tip:"Legs first, then body, then arms.",guide:"assets/equipment/road-to-12-layout-guide.png",equipment:"iFIT Rower",setup:"Pull the rower into the open cardio lane and leave the central walkway clear."}
      ]
    },
    {
      id:"recovery", name:"Recovery Session", duration:20, difficulty:"Easy",
      focus:"Movement and mobility",
      exercises:[
        {id:"easy-walk",name:"Easy Walk",sets:1,reps:"12 min",tip:"Keep the pace comfortable.",guide:"assets/equipment/road-to-12-blueprint.png",equipment:"Treadmill or open basement",setup:"Use a comfortable pace and avoid turning this into a hard workout."},
        {id:"mobility",name:"Mobility Flow",sets:1,reps:"8 min",tip:"Move slowly and avoid forcing range of motion.",guide:"assets/equipment/road-to-12-layout-guide.png",equipment:"Open mat area",setup:"Use the clear floor space in front of the M1."}
      ]
    }
  ],
  meals:[
    {name:"Greek Yogurt Protein Bowl",calories:340,protein:32,carbs:38,fat:7},
    {name:"Chicken Rice Bowl",calories:520,protein:46,carbs:58,fat:12},
    {name:"Turkey Wrap",calories:410,protein:35,carbs:42,fat:11},
    {name:"Protein Smoothie",calories:290,protein:30,carbs:34,fat:5}
  ],
  equipment:[
    {
      id:"ritfit-m1",name:"RitFit M1 Pro",type:"Strength",
      image:"assets/equipment/road-to-12-layout-guide.png",
      summary:"Primary strength station with cable pulleys, guided bar, plate storage, and attachments.",
      position:"Centered on the strength wall with the Gator bench working inside the rack.",
      setup:["Keep the open working area in front clear.","Store plates on the rear pegs.","Match pulley height to the exercise guide.","Center the bench before loading weight."]
    },
    {
      id:"gator-bench",name:"RitFit Gator Bench",type:"Strength",
      image:"assets/equipment/road-to-12-blueprint.png",
      summary:"Adjustable bench used flat, upright, and at modest incline positions.",
      position:"Normally centered inside the M1; roll it forward or outside the rack when required.",
      setup:["Flat: chest press and supported work.","25–35°: incline pressing.","Upright: seated cable exercises.","Confirm the backrest pin is fully engaged."]
    },
    {
      id:"treadmill",name:"iFIT Treadmill",type:"Cardio",
      image:"assets/equipment/road-to-12-blueprint.png",
      summary:"Walking and incline conditioning station.",
      position:"On the cardio side, facing the television.",
      setup:["Keep the rear exit area clear.","Use the safety key.","Start at a comfortable walking pace.","Do not block the center walkway."]
    },
    {
      id:"rower",name:"iFIT Rowing Machine",type:"Cardio",
      image:"assets/equipment/road-to-12-layout-guide.png",
      summary:"Low-impact full-body conditioning.",
      position:"Along the cardio wall or pulled slightly outward for use; store vertically only when the manufacturer permits.",
      setup:["Strap feet securely.","Start each stroke with the legs.","Keep the chain path straight.","Return it without blocking the walkway."]
    },
    {
      id:"bike",name:"Road Bike + Wahoo KICKR Core",type:"Cardio",
      image:"assets/equipment/road-to-12-layout-guide.png",
      summary:"Indoor cycling station for steady cardio and structured rides.",
      position:"Facing the television beside the other cardio equipment.",
      setup:["Verify the bike is locked into the trainer.","Place a mat beneath it.","Keep power and charging cables routed away from the walkway.","Use a fan for longer rides."]
    },
    {
      id:"plates",name:"Bumper Plates & Attachments",type:"Accessories",
      image:"assets/equipment/road-to-12-blueprint.png",
      summary:"Plates, handles, ropes, bars, and cable accessories.",
      position:"Plates on the M1 storage pegs; smaller attachments organized beside the machine.",
      setup:["Load both sides evenly.","Return each attachment after use.","Keep frequently used handles reachable.","Do not leave plates in the walkway."]
    }
  ]
};
