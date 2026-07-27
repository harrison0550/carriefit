window.Store = {
  key: "carriefit-phase5",
  defaults: {
    completedWorkouts: [],
    workoutLogs: {},
    weightHistory: [{date:new Date().toISOString().slice(0,10), value:190}],
    wellness: {water:0, sleep:8, mood:3, energy:3},
    profile: {name:"Carrie", goalWeight:140, currentWeight:190}
  },
  load(){
    try{
      const raw = localStorage.getItem(this.key);
      return raw ? {...this.defaults, ...JSON.parse(raw)} : structuredClone(this.defaults);
    }catch(e){
      return JSON.parse(JSON.stringify(this.defaults));
    }
  },
  save(state){ localStorage.setItem(this.key, JSON.stringify(state)); }
};
