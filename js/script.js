document.addEventListener('DOMContentLoaded', function () {
  var profileCard = document.querySelector(".card");
  var frontFlipBtn = document.getElementById("frontflip");
  var backFlipBtn = document.getElementById("backflip");
  var playing = false;

  function flipCard() {
    if (playing) return;

    playing = true;

    anime({
      targets: profileCard,
      opacity: ['100%', '100%'],
      translateX: ['-50%', '-50%'],
      translateY: ['-50%', '-50%'],
      scale: [{ value: 0.85, easing: 'easeInOutSine', delay: 100 }, { value: 1.05, easing: 'easeInOutSine', delay: 300 }, { value: 1, easing: 'easeInOutSine' }],
      rotateY: { value: '+=180', easing: 'easeInOutSine', delay: 150 },
      easing: 'easeInOutSine',
      duration: 600,
      complete: function (anim) {
        playing = false;
      }
    });
  }

  frontFlipBtn.addEventListener('click', flipCard);
  backFlipBtn.addEventListener('click', flipCard);
});