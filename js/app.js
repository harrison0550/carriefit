
const guides={
"Chest Press":{
setup:"Bench flat. Handles at chest height.",
movement:"Press forward until arms are nearly straight, then return under control.",
photo:"Replace placeholder with your RitFit M1 chest press photo."
},
"Lat Pulldown":{
setup:"Wide bar on high pulley.",
movement:"Pull elbows toward ribs.",
photo:"Replace placeholder with your pulldown photo."
},
"Leg Press":{
setup:"Feet shoulder-width.",
movement:"Press through your heels.",
photo:"Replace placeholder with your leg press photo."
},
"Seated Row":{
setup:"Low pulley with neutral grip.",
movement:"Drive elbows behind your body.",
photo:"Replace placeholder with your row photo."
}
};

function render(){
 const ex=document.getElementById("exercise").value;
 const g=guides[ex];
 document.getElementById("guide").innerHTML=`
 <div class="placeholder">📷 Exercise Photo / Diagram Placeholder</div>
 <div class="guide">
 <h3>${ex}</h3>
 <p><strong>Machine Setup:</strong> ${g.setup}</p>
 <p><strong>Movement:</strong> ${g.movement}</p>
 <p><strong>Photo Slot:</strong> ${g.photo}</p>
 <p><strong>Future:</strong> Animated arrows, cable height overlays, bench angle markers and short demo videos.</p>
 </div>`;
}
document.getElementById("exercise").onchange=render;
render();
