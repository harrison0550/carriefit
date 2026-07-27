
const h=new Date().getHours();
greeting.textContent=h<12?'Good Morning, Carrie!':h<18?'Good Afternoon, Carrie!':'Good Evening, Carrie!';
const notes={
'🏋️':'RitFit M1: Functional trainer, Smith machine, cables and bench.',
'🏃':'Treadmill: Warm up 10–15 minutes before lifting.',
'🚣':'Rower: Great low-impact cardio.',
'🚴':'Bike: Recovery rides or endurance sessions.'
};
document.querySelectorAll('.equip').forEach(btn=>{
 btn.onclick=()=>{
   const icon=btn.textContent.trim()[0];
   details.innerHTML='<h2>'+btn.innerText.replace('\n',' ')+'</h2><p>'+notes[icon]+'</p>';
 };
});
startBtn.onclick=()=>alert('Workout flow coming in the next milestone.');
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js');}
