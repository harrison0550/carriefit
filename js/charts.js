window.drawLineChart=function(canvas,values){
  const ratio=window.devicePixelRatio||1;
  const w=canvas.clientWidth||320,h=canvas.clientHeight||220,p=30;
  canvas.width=w*ratio;canvas.height=h*ratio;
  const ctx=canvas.getContext("2d");ctx.scale(ratio,ratio);ctx.clearRect(0,0,w,h);
  ctx.strokeStyle="#ece4e9";ctx.lineWidth=1;
  for(let i=0;i<4;i++){const y=p+i*((h-p*2)/3);ctx.beginPath();ctx.moveTo(p,y);ctx.lineTo(w-p,y);ctx.stroke()}
  if(!values.length)return;
  const nums=values.map(v=>Number(v.value));
  const min=Math.min(...nums)-2,max=Math.max(...nums)+2;
  const step=values.length===1?0:(w-p*2)/(values.length-1);
  ctx.strokeStyle="#cf4f89";ctx.lineWidth=3;ctx.beginPath();
  values.forEach((v,i)=>{
    const x=p+i*step,y=h-p-((Number(v.value)-min)/(max-min||1))*(h-p*2);
    i?ctx.lineTo(x,y):ctx.moveTo(x,y);
  });ctx.stroke();
  ctx.fillStyle="#cf4f89";
  values.forEach((v,i)=>{
    const x=p+i*step,y=h-p-((Number(v.value)-min)/(max-min||1))*(h-p*2);
    ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
  });
};
