// =========== SCROLL TO TOP FUNCTIONALITY ===========

class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scroll-to-top');
        this.init();
    }

    init() {
        if (!this.button) return;
        
        this.setupEventListeners();
        this.handleScroll();
    }

    setupEventListeners() {
        // Show/hide button on scroll
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Smooth scroll to top on click
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            this.showButton();
        } else {
            this.hideButton();
        }
    }

    showButton() {
        this.button.style.display = 'flex';
        setTimeout(() => {
            this.button.style.opacity = '1';
            this.button.style.transform = 'scale(1)';
        }, 10);
    }

    hideButton() {
        this.button.style.opacity = '0';
        this.button.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.button.style.display = 'none';
        }, 300);
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ScrollToTop();
});
