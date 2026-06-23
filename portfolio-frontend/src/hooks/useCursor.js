import { useEffect } from 'react';

const useCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const ring = document.querySelector('.cursor-ring');
    if (!cursor || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      animId = requestAnimationFrame(animateRing);
    };

    const onEnter = () => { cursor.classList.add('hover'); ring.classList.add('hover'); };
    const onLeave = () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); };

    document.addEventListener('mousemove', onMove);
    animId = requestAnimationFrame(animateRing);

    const interactables = document.querySelectorAll('a, button, [data-cursor]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, []);
};

export default useCursor;