
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>show(b.dataset.page));
show('home');
