window.Store = {
  key:"carriefit-phase10",
  defaults:{
    profile:{name:"Carrie",currentWeight:190,goalWeight:140,calorieGoal:1750,proteinGoal:120},
    completedWorkouts:[],
    workoutLogs:{},
    weightHistory:[{date:new Date().toISOString().slice(0,10),value:190}],
    nutrition:{date:new Date().toISOString().slice(0,10),meals:[],water:6},
    wellness:{sleep:8,mood:3,energy:3,stress:3},
    settings:{units:"lb"}
  },
  load(){
    try{
      const raw=localStorage.getItem(this.key);
      return raw?{...this.defaults,...JSON.parse(raw)}:JSON.parse(JSON.stringify(this.defaults));
    }catch(e){
      return JSON.parse(JSON.stringify(this.defaults));
    }
  },
  save(state){localStorage.setItem(this.key,JSON.stringify(state))}
};
