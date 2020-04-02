const slider = document.querySelector('.slider');
const slideOne = slider.querySelector('#first');
const slideTwo = slider.querySelector('#second');
const controlLeft = slider.querySelector('#controlLeft');
const controlRight = slider.querySelector('#controlRight');

const toggleSlideOrder = () => {
  slideOne.classList.toggle('slider__slide--first');
  slideOne.classList.toggle('slider__slide--second');
  slideTwo.classList.toggle('slider__slide--first');
  slideTwo.classList.toggle('slider__slide--second');
};

const removeClickHandlers = () => {
  controlLeft.removeEventListener('click', handleClick);
  controlRight.removeEventListener('click', handleClick);
};

const addClickHandlers = () => {
  controlLeft.addEventListener('click', handleClick);
  controlRight.addEventListener('click', handleClick);
};

const clearAnimationClasses = () => {
  const classes = ['animated', 'bounceOutLeft', 'bounceOutRight', 'bounceInLeft', 'bounceInRight'];
  slideOne.classList.remove(...classes);
  slideTwo.classList.remove(...classes);
};

const handleOutroAnimationEnd = () => {
  clearAnimationClasses();
};

const handleLeftAnimationEnd = () => {
  clearAnimationClasses();
  toggleSlideOrder();
  slideOne.removeEventListener('animationend', handleLeftAnimationEnd);
  slideOne.addEventListener('animationend', handleOutroAnimationEnd);
  slideOne.classList.add('animated', 'bounceInRight');
  slideTwo.classList.add('animated', 'bounceInLeft');
  slideOne.removeEventListener('animationend', handleOutroAnimationEnd);
  addClickHandlers();
};

const handleRightAnimationEnd = () => {
  clearAnimationClasses();
  toggleSlideOrder();
  slideOne.classList.add('animated', 'bounceInLeft');
  slideTwo.classList.add('animated', 'bounceInRight');
  slideOne.removeEventListener('animationend', handleRightAnimationEnd);
  addClickHandlers();
};

const handleClick = (evt) => {
  removeClickHandlers();
  const targetID = evt.target.id;
  if (targetID === 'controlLeft') {
    slideOne.classList.add('animated', 'bounceOutLeft');
    slideTwo.classList.add('animated', 'bounceOutRight');
    slideOne.addEventListener('animationend', handleLeftAnimationEnd);
  } else {
    slideOne.classList.add('animated', 'bounceOutRight');
    slideTwo.classList.add('animated', 'bounceOutLeft');
    slideOne.addEventListener('animationend', handleRightAnimationEnd);
  }
};

addClickHandlers();
