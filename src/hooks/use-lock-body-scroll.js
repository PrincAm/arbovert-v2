import { useLayoutEffect } from 'react';

const useLockBodyScroll = (locked = true) => {
  useLayoutEffect(() => {
    if (!locked) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = originalStyle);
  }, [locked]);
};

export default useLockBodyScroll;
