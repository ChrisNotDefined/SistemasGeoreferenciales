const slider = document.querySelector(".slides");

const controls = document.querySelector(".slide-controls");
var animating = false;

const pageSlidesBy = (amount) => {
  if(animating) return
  const activeSlide = document.querySelector(".slides .slide.selected");
  const slides = Array.from(document.querySelectorAll(".slide"));
  let beforeIndex = slides.findIndex((elem) => elem === activeSlide) + amount;
  if (beforeIndex === -1) beforeIndex = slides.length - 1;
  if (beforeIndex === slides.length) beforeIndex = 0;


  animating = true
  slides[beforeIndex].classList.toggle("selected");
  slides[beforeIndex].animate(
    [
      { transform: `translateX(${amount * 100}%)`, position: "absolute" },
      { transform: "translateX(0)" },
    ],
    {
      duration: 300,
      easing: "ease-out",
    }
  )

  activeSlide.animate(
    [
      { transform: "translateX(0)", position: "absolute" },
      { transform: `translateX(${amount * -100}%)` },
    ],
    {
      duration: 300,
      easing: "ease-out",
    }
  ).onfinish = () => {
    activeSlide.classList.toggle("selected");
    animating = false
  };
};

controls.querySelector(".prev").addEventListener("click", () => {
  pageSlidesBy(-1);
});

controls.querySelector(".next").addEventListener("click", () => {
  pageSlidesBy(1);
});
