
const meals=[];
const mealList=document.getElementById('meals');
const water=document.getElementById('water');
water.oninput=()=>document.getElementById('waterValue').textContent=water.value;
document.getElementById('addMeal').onclick=()=>{
 const name=document.getElementById('meal').value.trim();
 const cal=document.getElementById('mealcal').value;
 if(!name)return;
 meals.push({name,cal});
 mealList.innerHTML=meals.map(m=>`<li>${m.name} — ${m.cal||0} kcal</li>`).join('');
 document.getElementById('meal').value='';
 document.getElementById('mealcal').value='';
};
document.getElementById('save').onclick=()=>{
 const data={
 calories:cal.value,
 protein:protein.value,
 carbs:carbs.value,
 fat:fat.value,
 water:water.value,
 meals
 };
 localStorage.setItem('carriefit-phase9-nutrition',JSON.stringify(data));
 alert('Nutrition saved locally.');
};
