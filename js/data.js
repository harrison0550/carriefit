window.CARRIEFIT_DATA = {
  workouts: [
    {
      id:"full-body-a", name:"Full Body A", duration:45, difficulty:"Beginner",
      focus:"Balanced strength",
      exercises:[
        {id:"chest-press",name:"Chest Press",sets:3,reps:10,tip:"Keep shoulders down and back."},
        {id:"lat-pulldown",name:"Lat Pulldown",sets:3,reps:12,tip:"Pull elbows toward your ribs."},
        {id:"leg-press",name:"Leg Press",sets:3,reps:12,tip:"Drive through your heels."},
        {id:"seated-row",name:"Seated Cable Row",sets:3,reps:12,tip:"Keep your chest tall."}
      ]
    },
    {
      id:"full-body-b", name:"Full Body B", duration:42, difficulty:"Beginner",
      focus:"Lower body and posture",
      exercises:[
        {id:"goblet-squat",name:"Goblet Squat",sets:3,reps:10,tip:"Sit between your hips and keep your chest lifted."},
        {id:"incline-press",name:"Incline Chest Press",sets:3,reps:10,tip:"Use a modest incline and control the lowering phase."},
        {id:"cable-pull-through",name:"Cable Pull-Through",sets:3,reps:12,tip:"Push your hips back, then stand tall."},
        {id:"face-pull",name:"Face Pull",sets:3,reps:15,tip:"Pull toward eyebrow height with elbows wide."}
      ]
    },
    {
      id:"cardio-builder", name:"Cardio Builder", duration:30, difficulty:"Beginner",
      focus:"Low-impact conditioning",
      exercises:[
        {id:"treadmill",name:"Treadmill Walk",sets:1,reps:"20 min",tip:"Choose a pace that allows short conversation."},
        {id:"rower",name:"Easy Rower",sets:1,reps:"10 min",tip:"Legs first, then body, then arms."}
      ]
    },
    {
      id:"recovery", name:"Recovery Session", duration:20, difficulty:"Easy",
      focus:"Movement and mobility",
      exercises:[
        {id:"easy-walk",name:"Easy Walk",sets:1,reps:"12 min",tip:"Keep the pace comfortable."},
        {id:"mobility",name:"Mobility Flow",sets:1,reps:"8 min",tip:"Move slowly and avoid forcing range of motion."}
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
    {name:"RitFit M1",type:"Strength",note:"Cable and guided-bar station"},
    {name:"Adjustable Bench",type:"Strength",note:"Flat and incline support"},
    {name:"Treadmill",type:"Cardio",note:"Walking and incline work"},
    {name:"Rower",type:"Cardio",note:"Low-impact conditioning"}
  ]
};
