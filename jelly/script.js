particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 200,
      "density": {
        "enable": true,
        "value_area": 1000 } },


    "color": {
      "value": "#fff" },

    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000" },

      "polygon": {
        "nb_sides": 5 } },


    "opacity": {
      "value": 0.9,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false } },


    "size": {
      "value": 10,
      "random": true,
      "anim": {
        "enable": false } },


    "line_linked": {
      "enable": false },

    "move": {
      "enable": true,
      "speed": 0.8,
      "direction": "bottom",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200 } } },



  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse" },

      "onclick": {
        "enable": true,
        "mode": "push" },

      "resize": true },

    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 0.5 } },


      "bubble": {
        "distance": 300,
        "size": 10,
        "duration": 0.3,
        "opacity": 0.5,
        "speed": 10 },

      "repulse": {
        "distance": 75,
        "duration": 1 },

      "push": {
        "particles_nb": 50 },

      "remove": {
        "particles_nb": 2 } } },



  "retina_detect": true });

document.querySelector("#particles-js canvas").addEventListener("click", () => {
  const particles = window.pJSDom[0].pJS.particles.array;

  // Modify only the newly added particles (last 50, since push adds 50)
  particles.slice(-50).forEach((particle) => {
    // Initial explosion effect: Set outward velocity
    const angle = Math.random() * Math.PI * 2; // Random angle
    const speed = Math.random() * 3 + 2; // Explosion speed (higher range)
    particle.vx = Math.cos(angle) * speed; // Horizontal velocity
    particle.vy = Math.sin(angle) * speed * -1; // Strong upward velocity

    // Gradually apply gravity
    const gravityInterval = setInterval(() => {
      // Gradually increase downward velocity (gravity effect)
      particle.vy += 0.05; // Smaller gravity increment for a smoother transition

      // Gradually reduce horizontal movement (air resistance)
      particle.vx *= 0.98;

      // Stop applying gravity after particles have fully transitioned to falling
      if (particle.vy >= 1.5) { // Lower threshold for smoother falling
        clearInterval(gravityInterval); // Stop gravity adjustment
      }
    }, 50); // Apply adjustments every 50ms for a smoother effect
  });
});

const playButton = document.querySelector('.floating-play-button');
const audio = document.getElementById('background-audio');
let isPlaying = false;

playButton.addEventListener('click', () => {
  const icon = playButton.querySelector('i'); // Select the icon inside the button
  if (isPlaying) {
    audio.pause();
    icon.classList.remove('fa-volume-mute'); // Remove pause icon
    icon.classList.add('fa-music'); // Add play icon
  } else {
    audio.play();
    icon.classList.remove('fa-music'); // Remove play icon
    icon.classList.add('fa-volume-mute'); // Add pause icon
  }
  isPlaying = !isPlaying;
});
