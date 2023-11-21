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
      translateX: ['-50%', '-50%'],
      translateY: ['-50%', '-50%'],
      scale: [{ value: 1, easing: 'easeInOutSine' }, { value: 1.15, easing: 'easeInOutSine', delay: 250 }, { value: 1, easing: 'easeInOutSine', delay: 250 }],
      rotateY: { value: '+=180', easing: 'easeInOutSine', delay: 250 },
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