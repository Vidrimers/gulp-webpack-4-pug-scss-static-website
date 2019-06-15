export default function scrollTo(element, to, duration, scrollTop = true) {
  const easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
      return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const scrollDirection = scrollTop === true ? 'scrollTop' : 'scrollLeft';

  let start = element[scrollDirection];
  let change = to - start;
  let currentTime = 0;
  let increment = 20;

  const animateScroll = function () {
    currentTime += increment;
    let val = easeInOutQuad(currentTime, start, change, duration);
    element[scrollDirection] = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();

}
