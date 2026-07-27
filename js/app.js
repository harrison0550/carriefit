document.getElementById('startWorkout')
.addEventListener('click',()=>{
alert('Workout engine will be added in the next CarrieFit X phase.');
});

if('serviceWorker' in navigator){
navigator.serviceWorker.register('sw.js');
}
