window.drawLineChart = function(canvas, values){
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 320;
  const height = canvas.clientHeight || 210;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  ctx.clearRect(0,0,width,height);

  const pad = 28;
  ctx.strokeStyle = "#ece6eb";
  ctx.lineWidth = 1;
  for(let i=0;i<4;i++){
    const y = pad + i*((height-pad*2)/3);
    ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(width-pad,y); ctx.stroke();
  }

  if(!values.length) return;
  const nums = values.map(v=>Number(v.value));
  const min = Math.min(...nums)-2;
  const max = Math.max(...nums)+2;
  const xStep = values.length===1 ? 0 : (width-pad*2)/(values.length-1);

  ctx.strokeStyle = "#d94b87";
  ctx.lineWidth = 3;
  ctx.beginPath();
  values.forEach((v,i)=>{
    const x = pad + i*xStep;
    const y = height-pad - ((Number(v.value)-min)/(max-min || 1))*(height-pad*2);
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();

  ctx.fillStyle = "#d94b87";
  values.forEach((v,i)=>{
    const x = pad + i*xStep;
    const y = height-pad - ((Number(v.value)-min)/(max-min || 1))*(height-pad*2);
    ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fill();
  });
};
