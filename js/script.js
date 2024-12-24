window.addEventListener('load', function () {
  console.log('All assets are loaded');
  anime({
    targets: '.card',
    translateX: ['-50%', '-50%'],
    translateY: ['-50%', '-50%'],
  opacity: [0, 1], // Fade in

  scale: [
    { value: [0.8, 1.05], easing: 'easeOutQuad', duration: 300 }, // Fast grow
    { value: [1.05, 1], easing: 'easeOutQuad', duration: 200 }, // Bounce back
  ],
    duration: 500, // Animation duration

    easing: 'easeOutExpo', // Smooth easing
  });
  // Preload backside images or styles explicitly
  const backsideImage = new Image();
  backsideImage.src = 'images/fiddle-smaller.png';

  // Precompute styles for the backside
  const back = document.querySelector('.back');
  getComputedStyle(back).transform; // Force style computation

  var profileCard = document.querySelector(".card");
  var frontFlipBtn = document.getElementById("frontflip");
  var backFlipBtn = document.getElementById("backflip");
  var playing = false;
  var flipped = false;

  function flipCard() {
    document.body.style.transition = 'background-color 0.4s ease';

    if (playing) return;

    playing = true;

    if (flipped) {
      setTimeout(function() {
        document.body.style.backgroundColor = "#324053"; // New background color
      }, 320); // Delay in milliseconds (1000ms = 1s)

    } else {
      setTimeout(function() {
        document.body.style.backgroundColor = "#3a3846"; // New background color
      }, 320); // Delay in milliseconds (1000ms = 1s)
    }


    anime({
      targets: profileCard,
      opacity: ['100%', '100%'],

      translateX: ['-50%', '-50%'],
      translateY: ['-50%', '-50%'],
      scale: [
        { value: 0.96, easing: 'easeOutBack', duration: 400 },
        { value: 1, easing: 'easeInOutQuad', duration: 400 }
      ],
      skewY: [
        { value: '+=6', easing: 'easeInOutQuad', duration: 400 },
        { value: 0, easing: 'easeOutQuad', duration: 400 }
      ],
      rotateY: { value: '-=180', easing: 'easeInOutSine', duration: 700 },
      easing: 'easeInOutSine',
      duration: 800,
      complete: function (anim) {
        playing = false;
        flipped = !flipped;
      }
    });
  }

  frontFlipBtn.addEventListener('click', flipCard);
  backFlipBtn.addEventListener('click', flipCard);
  document.addEventListener('keydown', function(event) {
    if (event.code == "Space" || event.code == "ArrowUp" || event.code == "ArrowDown" || event.code == "ArrowRight" || event.code == "ArrowLeft") {
      flipCard();
    }
  });

});