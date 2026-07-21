// sachchi.html — page-specific JavaScript
// Micro-interactions
        const searchInput = document.getElementById('search-input');
        const progressBar = document.getElementById('progress-bar');

        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.classList.add('ring-2', 'ring-primary', 'ring-opacity-20');
        });

        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.classList.remove('ring-2', 'ring-primary', 'ring-opacity-20');
        });

        // Simulating analysis progress
        setInterval(() => {
            let width = Math.random() * 100;
            progressBar.style.width = width + '%';
            progressBar.style.transition = 'width 1s ease-in-out';
        }, 3000);

        // Language toggle behavior simulation
        document.querySelectorAll('.region-filter-group button').forEach(btn => {
            btn.addEventListener('click', function() {
                this.parentElement.querySelectorAll('button').forEach(b => {
                    b.classList.remove('bg-primary', 'text-on-primary');
                    b.classList.add('text-on-surface-variant');
                });
                this.classList.remove('text-on-surface-variant');
                this.classList.add('bg-primary', 'text-on-primary');
            });
        });