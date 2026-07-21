// kavach.html — page-specific JavaScript
// Micro-interaction for alert pulse
        setInterval(() => {
            const alerts = document.querySelectorAll('.animate-pulse');
            alerts.forEach(a => {
                a.style.opacity = a.style.opacity === '0.4' ? '1' : '0.4';
            });
        }, 1500);

        // Simple mock interaction for the alert cards
        document.querySelectorAll('.border-l-8').forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h4').innerText;
                console.log(`Analyzing Incident: ${title}`);
                // In a real app, this would update the details panel
            });
        });