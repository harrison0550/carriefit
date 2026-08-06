(function(root,factory){
  const api=factory();
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  root.CARRIEFIT_ADAPTIVE=api;
})(typeof self!=="undefined"?self:this,function(){
  const DEFAULT_PROFILE={age:null,heightIn:null,targetWeight:140,goal:"fatLoss",experience:"beginner",trainingDays:5,sessionMinutes:45,limitations:"",healthClearance:false};
  function numberBetween(value,min,max,fallback=null){
    const number=Number(value);
    return Number.isFinite(number)&&number>=min&&number<=max?number:fallback;
  }
  function normalizeProfile(value={}){
    const profile=Object.assign({},DEFAULT_PROFILE,value||{});
    profile.age=numberBetween(profile.age,18,100,null);
    profile.heightIn=numberBetween(profile.heightIn,48,84,null);
    profile.targetWeight=numberBetween(profile.targetWeight,90,500,null);
    profile.goal=["fatLoss","recomposition","strength","general"].includes(profile.goal)?profile.goal:"fatLoss";
    profile.experience=["beginner","intermediate","advanced"].includes(profile.experience)?profile.experience:"beginner";
    profile.trainingDays=numberBetween(profile.trainingDays,2,7,5);
    profile.sessionMinutes=numberBetween(profile.sessionMinutes,20,120,60);
    profile.limitations=String(profile.limitations||"").trim().slice(0,500);
    profile.healthClearance=profile.healthClearance===true;
    return profile;
  }
  function recentRatings(history=[],ratings={},limit=3){
    return history.slice(-limit).map(session=>ratings[session.id]).filter(Boolean);
  }
  function buildRecommendation(input={}){
    const profile=normalizeProfile(input.profile);
    const currentWeight=numberBetween(input.currentWeight,70,700,null);
    const ratings=recentRatings(input.history,input.ratings,3);
    const latestRecovery=String(input.latestRecovery||"Good");
    const difficult=ratings.some(value=>value==="Exhausting")||latestRecovery==="Low";
    const consistentlyEasy=ratings.length>=2&&ratings.slice(-2).every(value=>value==="Easy");
    const hasLimitations=profile.limitations.length>0;
    const needsConservativeProgression=hasLimitations||profile.healthClearance;
    let strengthSetCap=profile.sessionMinutes<=35?2:3;
    let cardioTargetMinutes=profile.goal==="fatLoss"?Math.min(45,Math.max(25,profile.sessionMinutes-10)):Math.min(35,Math.max(20,profile.sessionMinutes-15));
    let progression="hold";
    const reasons=[];
    if(difficult){
      strengthSetCap=Math.min(strengthSetCap,2);
      cardioTargetMinutes=Math.max(20,cardioTargetMinutes-5);
      reasons.push("Recent difficulty or recovery feedback favors a lighter training dose.");
    }else if(consistentlyEasy&&!needsConservativeProgression){
      progression="smallIncrease";
      reasons.push("Your last two rated sessions felt easy, so a small load increase may be appropriate when form stays controlled.");
    }else reasons.push("Your recent feedback supports holding the current loads while building consistent completed reps.");
    if(profile.experience==="beginner")reasons.push("Beginner volume is capped at three working sets per exercise.");
    if(profile.sessionMinutes<=35)reasons.push("The plan uses two working sets to fit your preferred session length without removing warm-ups or cooldowns.");
    if(profile.goal==="fatLoss")reasons.push("The weekly structure retains strength and aerobic work to support fat loss while preserving muscle.");
    if(profile.trainingDays<=3)reasons.push(`With ${profile.trainingDays} available days, prioritize the three full-body sessions; cardio remains useful when additional time is available.`);
    else if(profile.trainingDays===4)reasons.push("Use three full-body sessions plus one cardio day as the weekly priority.");
    else reasons.push("Your available days support the full strength, cardio, mobility, and recovery rotation.");
    if(currentWeight&&profile.targetWeight&&profile.targetWeight<currentWeight)reasons.push(`Your ${profile.targetWeight} lb target supports the fat-loss emphasis, but body weight is never used to calculate lifting loads.`);
    if(profile.age>=65)reasons.push("Recovery and balance work remain emphasized for an age-appropriate multicomponent plan.");
    if(hasLimitations){
      progression="hold";
      reasons.push("Movement limitations are recorded; automatic load increases stay off until you confirm an appropriate approach with a qualified professional.");
    }
    if(profile.healthClearance){
      progression="hold";
      reasons.push("The health-concern flag keeps progression conservative; discuss appropriate exercise intensity with a qualified health professional.");
    }
    return {id:`adaptive-${profile.goal}-${profile.experience}-${strengthSetCap}-${cardioTargetMinutes}-${progression}`,strengthSetCap,cardioTargetMinutes,progression,title:difficult?"Recovery-focused training dose":progression==="smallIncrease"?"Controlled progression available":"Build consistency at the current level",summary:difficult?"Use fewer working sets and slightly shorter cardio until recovery improves.":progression==="smallIncrease"?"Keep the program structure and consider the smallest available load increase.":"Keep the current program structure and repeat controlled performance.",reasons,requiresProfessionalReview:needsConservativeProgression,createdAt:new Date().toISOString()};
  }
  function applyRecommendation(exercises=[],recommendation){
    if(!recommendation)return exercises;
    return exercises.map(exercise=>{
      const copy=Object.assign({},exercise);
      if(copy.type==="strength"&&Number.isFinite(copy.sets))copy.sets=Math.min(copy.sets,recommendation.strengthSetCap||copy.sets);
      if(copy.name==="Incline Treadmill Walk"||copy.name==="Zone 2 Cardio"){
        copy.adaptiveDurationMinutes=recommendation.cardioTargetMinutes;
        copy.duration=`${recommendation.cardioTargetMinutes}:00`;
      }
      copy.adaptiveProgression=recommendation.progression||"hold";
      return copy;
    });
  }
  return {DEFAULT_PROFILE,normalizeProfile,buildRecommendation,applyRecommendation};
});
