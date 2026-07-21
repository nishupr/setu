// dastaan.html — page-specific JavaScript
// Micro-interaction for audio playing simulation
        const playButtons = document.querySelectorAll('.audio-voice-list .material-symbols-outlined');
        playButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const icon = e.target;
                if (icon.innerText === 'play_arrow') {
                    icon.innerText = 'pause';
                    icon.classList.add('text-secondary');
                } else {
                    icon.innerText = 'play_arrow';
                    icon.classList.remove('text-secondary');
                }
            });
        });