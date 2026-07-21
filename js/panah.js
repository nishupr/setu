// panah.html — page-specific JavaScript
// Micro-interactions for hovering and active states
        document.querySelectorAll('button, a').forEach(el => {
            el.addEventListener('mousedown', () => {
                el.classList.add('scale-95', 'opacity-80');
            });
            el.addEventListener('mouseup', () => {
                el.classList.remove('scale-95', 'opacity-80');
            });
            el.addEventListener('mouseleave', () => {
                el.classList.remove('scale-95', 'opacity-80');
            });
        });

        // Simple animation on scroll for sections
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section, .grid > div').forEach(el => {
            el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
            observer.observe(el);
        });