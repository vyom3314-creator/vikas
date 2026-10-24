import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { shouldShowScrollToTop } from '../utils/portfolioLogic';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const evaluateScroll = () => {
      const heroEl = document.getElementById('home');
      const heroBottomOffset = heroEl
        ? heroEl.offsetTop + heroEl.offsetHeight
        : 500;
      setIsVisible(shouldShowScrollToTop(window.scrollY, heroBottomOffset));
    };

    evaluateScroll();
    window.addEventListener('scroll', evaluateScroll, { passive: true });
    window.addEventListener('resize', evaluateScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', evaluateScroll);
      window.removeEventListener('resize', evaluateScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-purple-950/60 border border-violet-400/30 smooth-gpu cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
};
