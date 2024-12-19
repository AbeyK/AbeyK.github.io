particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 250,
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
      "value": 0.8,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.2,
        "sync": false } },


    "size": {
      "value": 13,
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
        "distance": 125,
        "duration": 2,},

      "push": {
        "particles_nb": 50 },

      "remove": {
        "particles_nb": 2 } } },



  "retina_detect": true });

// Variable to track if a shake has recently been detected
let shakeTimeout = false;

// Function to detect shake motion
function handleShakeEvent(event) {
  const acceleration = event.acceleration;
  if (!acceleration) return;

  // Calculate total acceleration force
  const totalAcceleration = Math.sqrt(
    acceleration.x ** 2 +
    acceleration.y ** 2 +
    acceleration.z ** 2
  );

  // Threshold for detecting a shake
  const shakeThreshold = 20; // Adjust based on sensitivity

  if (totalAcceleration > shakeThreshold && !shakeTimeout) {
    shakeSnow();
    shakeTimeout = true;

    // Prevent repeated triggers for a short time
    setTimeout(() => {
      shakeTimeout = false;
    }, 1000); // 1 second delay between shakes
  }
}

// Function to apply the snow shake effect
function shakeSnow() {
  const particles = window.pJSDom[0].pJS.particles.array;

  particles.forEach((particle) => {
    // Apply a burst of random movement
    particle.vx = (Math.random() - 0.5) * 10; // Random horizontal speed
    particle.vy = (Math.random() - 0.5) * 10; // Random vertical speed
  });

  // Reset particles after 1 second to normal behavior
  setTimeout(() => {
    particles.forEach((particle) => {
      particle.vx *= 0.5; // Reduce speed back to normal
      particle.vy *= 0.5;
    });
  }, 4000); // Shake duration
}

// Request permission for motion access (iOS specific)
function requestMotionAccess() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener("devicemotion", handleShakeEvent, true);
        } else {
          alert("Motion access denied.");
        }
      })
      .catch((error) => {
        console.error("Error requesting motion access:", error);
      });
  } else {
    // Non-iOS browsers
    window.addEventListener("devicemotion", handleShakeEvent, true);
  }
}

// Call the motion access request on page load
document.addEventListener("DOMContentLoaded", requestMotionAccess);


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
