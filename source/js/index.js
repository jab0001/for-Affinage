var slider = document.querySelector('.slider');
var slideOne = slider.querySelector('#first');
var slideTwo = slider.querySelector('#second');
var controlLeft = slider.querySelector('#controlLeft');
var controlRight = slider.querySelector('#controlRight');

var toggleSlideOrder = function() {
  slideOne.classList.toggle('slider__slide--first');
  slideOne.classList.toggle('slider__slide--second');
  slideTwo.classList.toggle('slider__slide--first');
  slideTwo.classList.toggle('slider__slide--second');
};

var removeClickHandlers = function() {
  controlLeft.removeEventListener('click', handleClick);
  controlRight.removeEventListener('click', handleClick);
};

var addClickHandlers = function() {
  controlLeft.addEventListener('click', handleClick);
  controlRight.addEventListener('click', handleClick);
};

var clearAnimationClasses = function() {
  var classes = ['animated', 'bounceOutLeft', 'bounceOutRight', 'bounceInLeft', 'bounceInRight'];
  slideOne.classList.remove(classes);
  slideTwo.classList.remove(classes);
};

var handleOutroAnimationEnd = function() {
  clearAnimationClasses();
};

var handleLeftAnimationEnd = function() {
  clearAnimationClasses();
  toggleSlideOrder();
  slideOne.removeEventListener('animationend', handleLeftAnimationEnd);
  slideOne.addEventListener('animationend', handleOutroAnimationEnd);
  slideOne.classList.add('animated', 'bounceInRight');
  slideTwo.classList.add('animated', 'bounceInLeft');
  slideOne.removeEventListener('animationend', handleOutroAnimationEnd);
  addClickHandlers();
};

var handleRightAnimationEnd = function() {
  clearAnimationClasses();
  toggleSlideOrder();
  slideOne.classList.add('animated', 'bounceInLeft');
  slideTwo.classList.add('animated', 'bounceInRight');
  slideOne.removeEventListener('animationend', handleRightAnimationEnd);
  addClickHandlers();
};

var handleClick = function(evt) {
  removeClickHandlers();
  var targetID = evt.target.id;
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
