const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed');

console.log(navigator.oscpu);

navigator.geolocation.watchPosition((data) => {
    console.log(data);
    speed.textContent = Math.round(data.coords.speed);
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;

});