document.addEventListener('DOMContentLoaded', function () {
  var profileCard = document.querySelector(".card");
  var frontFlipBtn = document.getElementById("frontflip");
  var backFlipBtn = document.getElementById("backflip");
  var playing = false;
  var flipped = false;

  function flipCard() {
    document.body.style.transition = 'background-color 0.5s ease';

    if (playing) return;

    playing = true;

    if (flipped) {
      setTimeout(function() {
        document.body.style.backgroundColor = "#263548"; // New background color
      }, 500); // Delay in milliseconds (1000ms = 1s)

    } else {
      setTimeout(function() {
        document.body.style.backgroundColor = "#3a3846"; // New background color
      }, 500); // Delay in milliseconds (1000ms = 1s)
    }


    anime({
      targets: profileCard,
      opacity: ['100%', '100%'],

      translateX: ['-50%', '-50%'],
      translateY: ['-50%', '-50%'],
      scale: [{ value: 0.95, easing: 'easeInOutSine', delay: 0 }, { value: 1.05, easing: 'easeInOutSine', delay: 0 }, { value: 1, easing: 'easeInOutSine', delay: 0 }],
      // rotateX: { value: '+=180', easing: 'easeInOutSine', delay: 10 },
      skewY: [{ value: '+=4', easing: 'easeInOutSine', delay: 10 }, 0],
      skewX: [{ value: '+=4', easing: 'easeInOutSine', delay: 10 }, 0],
      rotateY: { value: '-=180', easing: 'easeInOutSine', delay: 10 },
      // rotateX: { value: '+=180', easing: 'easeInOutSine', delay: 10 },
      // rotateY: [0, 180],
      // rotateX: [0, 360],
      // rotateX: { value: '-=10', easing: 'easeInOutSine', delay: 10 },
      // rotateY: 180,
      // scale: [0.9, 1.2, 1],
      // translateX: 300,
      
      // rotateX: { value: '+=480', easing: 'easeInOutSine', delay: 0 },
      easing: 'easeInOutSine',
      duration: 900,
      complete: function (anim) {
        playing = false;
        flipped = !flipped;
      }
    });
  }

  frontFlipBtn.addEventListener('click', flipCard);
  backFlipBtn.addEventListener('click', flipCard);
});