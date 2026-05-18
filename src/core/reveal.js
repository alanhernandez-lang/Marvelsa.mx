export const activateRevealObserver = ({ includeTimeline = false } = {}) => {
  setTimeout(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (includeTimeline && entry.target.classList.contains('timeline-item')) {
              entry.target.classList.add('timeline-active');
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 100px 0px' }
    );

    const selectors = ['.reveal-up', '.reveal-left', '.reveal-right', '.reveal-scale'];
    if (includeTimeline) selectors.push('.timeline-item');

    document.querySelectorAll(selectors.join(', ')).forEach((el) => observer.observe(el));
  }, 100);
};
