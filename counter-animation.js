// Counter Animation for Statistics
function animateCounter(element, target, duration = 2000, hasPlus = false) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target) + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current)) + (hasPlus ? '+' : '');
        }
    }, 16);
}

function formatNumber(num) {
    // Add comma for thousands
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function initCounters() {
    const stats = [
        { selector: '.hero-stats .stat-item:nth-child(1) strong', target: 2500, hasPlus: true },
        { selector: '.hero-stats .stat-item:nth-child(2) strong', target: 15, hasPlus: false },
        { selector: '.hero-stats .stat-item:nth-child(3) strong', target: 1200, hasPlus: true }
    ];
    
    // Check if elements are in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const element = document.querySelector(stat.selector);
                    if (element && !element.dataset.animated) {
                        element.dataset.animated = 'true';
                        // Start animation with slight delay for visual effect
                        setTimeout(() => {
                            animateCounter(element, stat.target, 2000, stat.hasPlus);
                        }, 100);
                    }
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    // Observe the stats container
    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
} else {
    initCounters();
}
