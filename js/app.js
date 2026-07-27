
const list=document.getElementById('list');
let filter='All';
function render(){
 const q=document.getElementById('search').value.toLowerCase();
 list.innerHTML='';
 library.filter(e=>(filter==='All'||e.group===filter)&&JSON.stringify(e).toLowerCase().includes(q))
 .forEach(e=>{
  const d=document.createElement('div');
  d.className='card';
  d.innerHTML=`<h2>${e.name}</h2>
  <span class='tag'>${e.group}</span>
  <span class='tag'>${e.machine}</span>
  <span class='tag'>${e.difficulty}</span>
  <div class='guide'><strong>Setup</strong><br>${e.setup}<br><br><strong>Coach Tip</strong><br>${e.tip}<br><br><em>Add your real gym photo in assets/exercises.</em></div>`;
  list.appendChild(d);
 });
}
document.getElementById('search').oninput=render;
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;render();});
render();
