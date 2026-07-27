window.CoachEngine={
  recommend(state,data){
    const e=state.wellness.energy;
    const s=state.wellness.sleep;
    const stress=state.wellness.stress;
    if(e<=2||s<6||stress>=5) return data.workouts.find(w=>w.id==="recovery");
    const last=state.completedWorkouts[state.completedWorkouts.length-1]?.workoutId;
    if(last==="full-body-a") return data.workouts.find(w=>w.id==="full-body-b");
    if(last==="full-body-b") return data.workouts.find(w=>w.id==="cardio-builder");
    return data.workouts.find(w=>w.id==="full-body-a");
  },
  message(state){
    const e=state.wellness.energy,s=state.wellness.sleep,stress=state.wellness.stress;
    if(s<6) return "Sleep was low, so keep intensity moderate and focus on clean movement.";
    if(e<=2) return "Energy is low. A recovery session still counts as showing up.";
    if(stress>=5) return "Stress is elevated. Choose a shorter session and stop before exhaustion.";
    return "Your readiness looks solid. Follow the plan, leave a little energy in reserve, and build consistency.";
  },
  nutritionTip(state){
    const meals=state.nutrition.meals||[];
    const protein=meals.reduce((a,m)=>a+Number(m.protein||0),0);
    if(protein<state.profile.proteinGoal*0.6) return "Protein is running low today. Add a protein-forward meal or snack.";
    if(state.nutrition.water<6) return "Hydration is behind. Add a glass of water with your next meal.";
    return "Nutrition is tracking well. Keep portions consistent and finish the day near your targets.";
  }
};
