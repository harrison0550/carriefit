window.CARRIEFIT_DATA = {
  workouts: [
    {
      id: "full-body-a",
      name: "Full Body A",
      duration: 45,
      difficulty: "Beginner",
      exercises: [
        { id:"chest-press", name:"Chest Press", sets:3, reps:10, tip:"Keep shoulders down and back. Press without locking your elbows." },
        { id:"lat-pulldown", name:"Lat Pulldown", sets:3, reps:12, tip:"Pull your elbows toward your ribs and avoid leaning back." },
        { id:"leg-press", name:"Leg Press", sets:3, reps:12, tip:"Keep your knees tracking over your toes and drive through your heels." },
        { id:"seated-row", name:"Seated Cable Row", sets:3, reps:12, tip:"Lead with your elbows and keep your chest tall." }
      ]
    },
    {
      id:"cardio-builder",
      name:"Cardio Builder",
      duration:30,
      difficulty:"Beginner",
      exercises:[
        { id:"treadmill-walk", name:"Treadmill Walk", sets:1, reps:"20 min", tip:"Use a pace that allows you to speak in short sentences." },
        { id:"rower-easy", name:"Easy Rower", sets:1, reps:"10 min", tip:"Push with your legs first, then finish with your arms." }
      ]
    }
  ],
  equipment: [
    {
      id:"ritfit-m1", name:"RitFit M1", category:"Strength",
      description:"Primary cable and guided-bar training station.",
      guides:[
        {title:"Chest Press", detail:"Bench flat. Seat centered. Handles at mid-chest height."},
        {title:"Lat Pulldown", detail:"Use the high pulley and wide bar. Sit tall with thighs secured."},
        {title:"Seated Row", detail:"Use the low pulley. Sit facing the machine with a neutral spine."}
      ]
    },
    {
      id:"bench", name:"Adjustable Bench", category:"Strength",
      description:"Flat and incline support for pressing, rowing, and core work.",
      guides:[
        {title:"Flat", detail:"Back pad fully horizontal for chest press and supported exercises."},
        {title:"Incline", detail:"Use a modest incline for beginner shoulder-friendly pressing."}
      ]
    },
    {
      id:"treadmill", name:"Treadmill", category:"Cardio",
      description:"Walking and steady-state cardio.",
      guides:[{title:"Beginner Walk", detail:"Start at a comfortable speed and add incline gradually."}]
    },
    {
      id:"rower", name:"Rower", category:"Cardio",
      description:"Low-impact full-body conditioning.",
      guides:[{title:"Stroke Order", detail:"Legs, body, arms on the pull; arms, body, legs on the return."}]
    }
  ]
};
