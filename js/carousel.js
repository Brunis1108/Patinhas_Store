(() => {
  const carousel   = document.querySelector('.carousel');
  const viewport   = carousel.querySelector('.carousel-viewport');
  const track      = carousel.querySelector('.carousel-track');
  const btnPrev    = carousel.querySelector('.arrow.prev');
  const btnNext    = carousel.querySelector('.arrow.next');


  let slideW = 0;
  let index  = 1;            
  let timer  = null;
  let canClick = true;

  
  const originalSlides = Array.from(track.children);
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone  = originalSlides[originalSlides.length - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');
  track.appendChild(firstClone);
  track.insertBefore(lastClone, originalSlides[0]);

  const allSlides = () => Array.from(track.children);


  function measure() {
    slideW = viewport.clientWidth;

   
    allSlides().forEach(s => (s.style.width = `${slideW}px`));

    
    jumpTo(index);
  }

  function jumpTo(i) {
    track.style.transition = 'none';
    track.style.transform = `translateX(${-i * slideW}px)`;
    void track.offsetHeight;
    track.style.transition = 'transform .6s ease';
  }

  function goTo(i) {
    canClick = false;
    index = i;
    track.style.transform = `translateX(${-index * slideW}px)`;
  }

  track.addEventListener('transitionend', () => {
    const slides = allSlides();

    if (slides[index].classList.contains('clone')) {
      if (index === slides.length - 1) index = 1;
      if (index === 0) index = slides.length - 2;

      jumpTo(index);
    }

    canClick = true;
  });

  btnNext.addEventListener('click', () => {
    if (!canClick) return;
    const slides = allSlides();
    goTo(index + 1);
    if (index >= slides.length) index = slides.length - 1;
  });

  btnPrev.addEventListener('click', () => {
    if (!canClick) return;
    goTo(index - 1);
    if (index < 0) index = 0;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') btnNext.click();
    if (e.key === 'ArrowLeft')  btnPrev.click();
  });

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => btnNext.click(), 3000);
  }
  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  window.addEventListener('resize', measure);

  measure();      
  startAutoplay();
})();
